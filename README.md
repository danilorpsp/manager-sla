# Manager SLA

Projeto base para uma plataforma multi-tenant de gestao de SLA com integracao Zabbix, cadastro de servicos, ativos monitorados, usuarios por empresa e permissoes por dashboard.

## Abrir o prototipo

Abra `index.html` no navegador.

## Acesso padrao

Usuario de desenvolvimento:

- E-mail: `admin@manager-sla.local`
- Senha: `Admin@123`
- Papel: administrador geral

## Escopo inicial

- Multi-tenant: varias empresas, cada uma com administradores, usuarios, servicos, ativos e dashboards.
- Autenticacao: entrada via Office 365 e Google, com liberacao obrigatoria por administrador do tenant.
- Permissoes: acesso por usuario e por dashboard.
- SLA por servico: meta, disponibilidade atual, janela de suporte, dono, incidentes e acao ITIL.
- Integracao Zabbix: cadastro de servidores Zabbix por tenant, descoberta de hosts/itens monitorados, cadastro de ativos e vinculo com hosts, triggers e itens.
- Templates de grafico: modelos estilo Grafana vinculados a ativos e itens Zabbix.
- ITIL: fluxo de evento, incidente, problema, mudanca e revisao de SLA.

## Estrutura

- `index.html`: prototipo navegavel da aplicacao.
- `styles.css`: interface responsiva.
- `script.js`: dados simulados, grafico canvas e interacoes.
- `docs/architecture.md`: arquitetura sugerida.
- `docs/data-model.md`: modelo de dados inicial.
- `docs/zabbix-integration.md`: contrato tecnico para integracao com Zabbix.
- `database/migrations/001_initial_schema.sql`: schema inicial do banco.
- `database/seeds/001_demo_data.sql`: massa de dados demonstrativa.
- `backend/database.py`: utilitarios SQLite.
- `backend/init_db.py`: cria o banco local com schema e dados iniciais.
- `backend/zabbix_client.py`: cliente Python inicial para Zabbix API.

## Banco de dados local

Para criar o banco SQLite de desenvolvimento:

```bash
python3 "Manager SLA/backend/init_db.py"
```

O arquivo sera criado em `Manager SLA/database/manager_sla.sqlite3`.

## Proxima etapa recomendada

Evoluir o backend para API real e trocar SQLite por PostgreSQL em producao, mantendo o mesmo desenho de tabelas e isolamento por `tenant_id`.
