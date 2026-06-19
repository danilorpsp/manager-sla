# Modelo de dados inicial

## Tabelas principais

O schema executavel esta em `database/migrations/001_initial_schema.sql`.
Para desenvolvimento local, use SQLite. Para producao, a recomendacao e PostgreSQL mantendo o mesmo desenho logico.

### tenants

- id
- name
- status
- created_at
- updated_at

### users

- id
- name
- email
- auth_provider
- external_subject
- status
- created_at
- updated_at

### tenant_users

- id
- tenant_id
- user_id
- role
- status
- approved_by_user_id
- approved_at

Esta tabela representa o vinculo editavel entre usuario e tenant.

Roles sugeridos:

- `tenant_admin`
- `service_manager`
- `analyst`
- `viewer`

### dashboards

- id
- tenant_id
- name
- type
- status

### dashboard_permissions

- id
- tenant_id
- dashboard_id
- user_id
- can_view
- can_manage

### services

- id
- tenant_id
- name
- description
- owner_user_id
- criticality
- sla_target
- support_window
- status

### service_assets

- id
- tenant_id
- service_id
- asset_id

### assets

- id
- tenant_id
- name
- type
- environment
- status
- created_by_user_id

### zabbix_discovered_hosts

- id
- tenant_id
- zabbix_connection_id
- host_id
- host_name
- interface_ip
- status
- last_seen_at

### zabbix_discovered_items

- id
- tenant_id
- zabbix_connection_id
- discovered_host_id
- item_id
- name
- key_
- value_type
- metric_type
- status
- last_seen_at

### zabbix_connections

- id
- name
- base_url
- auth_type
- encrypted_secret
- environment
- version
- status
- last_sync_at

Cadastro global de servidores Zabbix.

### tenant_zabbix_access

- id
- tenant_id
- zabbix_connection_id
- status
- granted_by_user_id
- granted_at

Define quais tenants podem usar cada servidor Zabbix global.

### zabbix_bindings

- id
- tenant_id
- asset_id
- zabbix_connection_id
- host_id
- item_id
- trigger_id
- zabbix_service_id
- metric_type

### graph_templates

- id
- tenant_id
- name
- chart_type
- description
- unit
- aggregation
- warning_threshold
- critical_threshold
- status

### asset_graph_templates

- id
- tenant_id
- asset_id
- graph_template_id
- zabbix_connection_id
- host_id
- item_id
- item_key
- panel_title
- status

### sla_snapshots

- id
- tenant_id
- service_id
- period_start
- period_end
- target_percent
- actual_percent
- downtime_minutes
- incident_count
- source

### itil_records

- id
- tenant_id
- service_id
- type
- status
- severity
- title
- description
- root_cause
- change_plan
- opened_at
- closed_at

Tipos sugeridos:

- `event`
- `incident`
- `problem`
- `change`
- `sla_review`

## Indices obrigatorios

- `tenant_users(tenant_id, user_id)`
- `dashboard_permissions(tenant_id, dashboard_id, user_id)`
- `services(tenant_id, status)`
- `assets(tenant_id, status)`
- `tenant_zabbix_access(tenant_id, zabbix_connection_id)`
- `zabbix_discovered_hosts(zabbix_connection_id)`
- `zabbix_discovered_items(discovered_host_id)`
- `zabbix_bindings(tenant_id, asset_id)`
- `graph_templates(tenant_id, status)`
- `asset_graph_templates(tenant_id, asset_id)`
- `sla_snapshots(tenant_id, service_id, period_start, period_end)`
- `itil_records(tenant_id, service_id, type, status)`
