# Integracao Zabbix

## Objetivo

Permitir que cada tenant conecte sua propria origem Zabbix e vincule ativos do painel a hosts, itens, triggers ou servicos do Zabbix.

## Fluxo de cadastro

1. Administrador do tenant cadastra um servidor Zabbix.
2. Cadastro recebe nome, URL da API, ambiente, metodo de autenticacao e segredo.
3. Sistema valida `apiinfo.version`.
4. Sistema autentica via token ou usuario/senha.
5. Cliente cadastra um ativo no painel.
6. Administrador escolhe qual servidor Zabbix sera usado pelo ativo.
7. Administrador vincula o ativo a um `hostid`.
8. Para cada servico, administrador define itens ou triggers que afetam o SLA.
9. Worker coleta historico e consolida snapshots.

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
- Preferir API token por tenant.
- Criptografar segredo em repouso.
- Registrar auditoria de quem cadastrou ou alterou conexoes.
- Limitar acesso as credenciais apenas a administradores do tenant.
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
