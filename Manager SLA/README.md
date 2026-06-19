# Manager SLA

Projeto base para uma plataforma multi-tenant de gestao de SLA com integracao Zabbix, cadastro de servicos, ativos monitorados, usuarios por empresa e permissoes por dashboard.

## Abrir o prototipo

Abra `index.html` no navegador.

## Escopo inicial

- Multi-tenant: varias empresas, cada uma com administradores, usuarios, servicos, ativos e dashboards.
- Autenticacao: entrada via Office 365 e Google, com liberacao obrigatoria por administrador do tenant.
- Permissoes: acesso por usuario e por dashboard.
- SLA por servico: meta, disponibilidade atual, janela de suporte, dono, incidentes e acao ITIL.
- Integracao Zabbix: desenho para cadastrar ativos, vincular hosts, triggers e itens.
- ITIL: fluxo de evento, incidente, problema, mudanca e revisao de SLA.

## Estrutura

- `index.html`: prototipo navegavel da aplicacao.
- `styles.css`: interface responsiva.
- `script.js`: dados simulados, grafico canvas e interacoes.
- `docs/architecture.md`: arquitetura sugerida.
- `docs/data-model.md`: modelo de dados inicial.
- `docs/zabbix-integration.md`: contrato tecnico para integracao com Zabbix.
- `backend/zabbix_client.py`: cliente Python inicial para Zabbix API.

## Proxima etapa recomendada

Definir o stack backend e banco. Para este produto, uma boa base seria PostgreSQL + backend API + worker de sincronizacao Zabbix + frontend SPA.
