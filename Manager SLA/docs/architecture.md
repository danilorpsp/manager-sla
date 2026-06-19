# Arquitetura inicial

## Objetivo

Construir uma plataforma multi-tenant para gestao de SLA seguindo praticas ITIL, com coleta de dados via Zabbix e dashboards com permissoes por usuario.

## Modulos

1. Identidade e acesso
   - Login via Office 365 e Google.
   - Usuario autenticado entra como `pending` ate um administrador aprovar.
   - Usuario pertence a um tenant.
   - Tenant sempre deve ter pelo menos um administrador.
   - Permissao por dashboard, servico e acao administrativa.

2. Tenant e empresas
   - Cadastro de empresas clientes.
   - Configuracoes isoladas por tenant.
   - Cada tenant possui administradores, usuarios, servicos, ativos e dashboards.
   - Administradores podem mover usuarios entre tenants e ajustar papel/permissoes.

3. Catalogo de servicos
   - Servicos seguindo uma logica ITIL.
   - Meta SLA, horario de suporte, criticidade, dono, contrato e regras de excecao.
   - Vinculo com um ou mais ativos Zabbix.

4. Ativos e Zabbix
   - Administrador global cadastra servidores Zabbix uma vez.
   - Administrador global libera quais tenants podem usar cada Zabbix.
   - Um mesmo Zabbix pode atender varios tenants.
   - Cliente cadastra ativo pelo painel usando somente Zabbix liberados ao tenant.
   - Administrador vincula host, item, trigger ou service do Zabbix.
   - Worker coleta historico periodicamente.
   - Dados consolidados viram metricas de SLA.

5. Dashboards
   - Dashboards executivos, operacionais e por contrato.
   - Permissao por usuario.
   - Graficos por servico, periodo, tenant, severidade e disponibilidade.
   - Templates de grafico estilo Grafana vinculados a ativos e itens Zabbix.

6. ITIL
   - Evento vindo do Zabbix.
   - Incidente quando ha impacto em servico.
   - Problema para recorrencia ou causa raiz.
   - Mudanca para correcao planejada.
   - Revisao de SLA mensal ou por contrato.

## Componentes sugeridos

- Frontend SPA: React, Vue ou Svelte.
- Backend API: Django, Laravel, NestJS, FastAPI ou .NET.
- Banco: PostgreSQL com `tenant_id` em todas as tabelas de negocio.
- Desenvolvimento local: SQLite inicializado por `backend/init_db.py`.
- Cache/fila: Redis.
- Worker: sincronizacao Zabbix, calculo de SLA e geracao de snapshots.
- Observabilidade: logs por tenant, auditoria de acesso e trilha de alteracoes.

## Regras essenciais

- Toda consulta de negocio deve filtrar por `tenant_id`.
- Usuario so acessa dashboard se tiver permissao explicita ou papel administrativo.
- Nao permitir remover o ultimo administrador ativo de um tenant.
- Ao alterar o tenant de um usuario, recalcular permissoes e auditar a alteracao.
- Login externo nao cria acesso automatico ao tenant.
- Credenciais Zabbix devem ser criptografadas.
- Credenciais Zabbix pertencem ao catalogo global; tenants recebem apenas direito de uso.
