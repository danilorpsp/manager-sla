# Modelo de dados inicial

## Tabelas principais

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

### zabbix_connections

- id
- tenant_id
- name
- base_url
- auth_type
- encrypted_secret
- status

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
- `zabbix_bindings(tenant_id, asset_id)`
- `sla_snapshots(tenant_id, service_id, period_start, period_end)`
- `itil_records(tenant_id, service_id, type, status)`
