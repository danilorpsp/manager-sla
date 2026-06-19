# Integracao Zabbix

## Objetivo

Permitir que a plataforma cadastre servidores Zabbix globais, libere acesso por tenant e vincule ativos do painel a hosts, itens, triggers ou servicos do Zabbix.

## Fluxo de cadastro

1. Administrador global cadastra um servidor Zabbix.
2. Cadastro recebe nome, URL da API, ambiente, metodo de autenticacao e segredo.
3. Sistema valida `apiinfo.version`.
4. Sistema autentica via token ou usuario/senha.
5. Administrador global libera acesso para um ou mais tenants.
6. Sistema executa descoberta inicial com `host.get` e `item.get`.
7. Sistema grava hosts em `zabbix_discovered_hosts` e itens em `zabbix_discovered_items`.
8. Cliente cadastra um ativo no painel escolhendo um host descoberto em um Zabbix liberado.
9. Administrador escolhe quais itens ou triggers daquele host afetam o SLA.
10. Para cada servico, administrador vincula ativos e metricas de SLA.
11. Worker coleta historico e consolida snapshots.

## Metodos Zabbix relevantes

- `apiinfo.version`
- `user.login`
- `host.get`
- `item.get`
- `trigger.get`
- `problem.get`
- `event.get`
- `history.get`
- `trend.get`
- `service.get`, quando o recurso de IT services estiver em uso

## Calculo de SLA

Formula base:

```text
SLA = ((periodo_total_minutos - indisponibilidade_minutos) / periodo_total_minutos) * 100
```

O periodo total deve respeitar a janela do contrato:

- `24x7`
- `8x5`
- janela personalizada
- feriados e excecoes contratuais

## Regras de indisponibilidade

- Trigger critica ativa pode contar como indisponibilidade.
- Item de disponibilidade com valor `0` pode contar como indisponibilidade.
- Eventos em manutencao planejada devem ser excluidos se o contrato permitir.
- Incidentes duplicados do mesmo servico no mesmo periodo devem ser consolidados.

## Seguranca

- Nao armazenar senha Zabbix em texto puro.
- Preferir API token por servidor Zabbix global.
- Criptografar segredo em repouso.
- Registrar auditoria de quem cadastrou conexoes e quem liberou acesso a tenants.
- Limitar acesso as credenciais apenas a administradores globais.
- Validar se a URL informada aponta para `/api_jsonrpc.php` antes de ativar a conexao.

## Exemplo de chamada

```json
{
  "jsonrpc": "2.0",
  "method": "host.get",
  "params": {
    "output": ["hostid", "host", "name"],
    "selectInterfaces": ["ip", "dns"]
  },
  "auth": "ZABBIX_API_TOKEN",
  "id": 1
}
```
