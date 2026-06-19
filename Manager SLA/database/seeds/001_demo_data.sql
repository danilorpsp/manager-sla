PRAGMA foreign_keys = ON;

INSERT OR IGNORE INTO tenants (id, name, slug, status)
VALUES
  (1, 'Acme Telecom', 'acme-telecom', 'active'),
  (2, 'Hospital Prisma', 'hospital-prisma', 'active');

INSERT OR IGNORE INTO users (id, name, email, auth_provider, external_subject, status)
VALUES
  (1, 'Ana Costa', 'ana.costa@acme.example', 'office365', 'oidc-acme-ana', 'active'),
  (2, 'Marcos Lima', 'marcos.lima@acme.example', 'google', 'oidc-acme-marcos', 'active'),
  (3, 'Paula Melo', 'paula.melo@acme.example', 'office365', 'oidc-acme-paula', 'active'),
  (4, 'Joao Freitas', 'joao.freitas@acme.example', 'google', 'oidc-acme-joao', 'pending'),
  (5, 'Livia Duarte', 'livia.duarte@prisma.example', 'office365', 'oidc-prisma-livia', 'active'),
  (6, 'Mateus Rocha', 'mateus.rocha@prisma.example', 'google', 'oidc-prisma-mateus', 'active'),
  (7, 'Carla Mendes', 'carla.mendes@prisma.example', 'office365', 'oidc-prisma-carla', 'active'),
  (8, 'Administrador Geral', 'admin@manager-sla.local', 'local', 'local-platform-admin', 'active');

INSERT OR IGNORE INTO tenant_users (tenant_id, user_id, role, status, approved_by_user_id, approved_at)
VALUES
  (1, 1, 'tenant_admin', 'active', 1, CURRENT_TIMESTAMP),
  (1, 2, 'tenant_admin', 'active', 1, CURRENT_TIMESTAMP),
  (1, 3, 'analyst', 'active', 1, CURRENT_TIMESTAMP),
  (1, 4, 'viewer', 'pending', NULL, NULL),
  (1, 8, 'platform_admin', 'active', 8, CURRENT_TIMESTAMP),
  (2, 5, 'tenant_admin', 'active', 5, CURRENT_TIMESTAMP),
  (2, 6, 'analyst', 'active', 5, CURRENT_TIMESTAMP),
  (2, 7, 'viewer', 'active', 5, CURRENT_TIMESTAMP),
  (2, 8, 'platform_admin', 'active', 8, CURRENT_TIMESTAMP);

INSERT OR IGNORE INTO dashboards (id, tenant_id, name, type, status)
VALUES
  (1, 1, 'Operacional', 'operational', 'active'),
  (2, 1, 'Executivo', 'executive', 'active'),
  (3, 2, 'Operacional', 'operational', 'active'),
  (4, 2, 'Executivo', 'executive', 'active');

INSERT OR IGNORE INTO dashboard_permissions (tenant_id, dashboard_id, user_id, can_view, can_manage)
VALUES
  (1, 1, 1, 1, 1),
  (1, 2, 1, 1, 1),
  (1, 1, 2, 1, 1),
  (1, 2, 2, 1, 1),
  (1, 1, 3, 1, 0),
  (1, 1, 8, 1, 1),
  (1, 2, 8, 1, 1),
  (2, 3, 5, 1, 1),
  (2, 4, 5, 1, 1),
  (2, 3, 6, 1, 0),
  (2, 4, 7, 1, 0),
  (2, 3, 8, 1, 1),
  (2, 4, 8, 1, 1);

INSERT OR IGNORE INTO zabbix_connections (
  id, tenant_id, name, base_url, auth_type, encrypted_secret, environment, version, status, last_sync_at
)
VALUES
  (1, 1, 'Zabbix NOC', 'https://zabbix-noc.acme.local/api_jsonrpc.php', 'api_token', 'demo-encrypted-secret', 'production', '6.4', 'active', CURRENT_TIMESTAMP),
  (2, 1, 'Zabbix Aplicacoes', 'https://zabbix-apps.acme.local/api_jsonrpc.php', 'api_token', 'demo-encrypted-secret', 'production', '7.0', 'warning', CURRENT_TIMESTAMP),
  (3, 2, 'Zabbix Hospitalar', 'https://monitor.prisma.local/api_jsonrpc.php', 'api_token', 'demo-encrypted-secret', 'production', '6.0 LTS', 'active', CURRENT_TIMESTAMP);

INSERT OR IGNORE INTO services (
  id, tenant_id, name, description, owner_user_id, criticality, sla_target, support_window, status
)
VALUES
  (1, 1, 'Internet Corporativa', 'Conectividade principal do cliente.', 1, 'critical', 99.90, '24x7', 'risk'),
  (2, 1, 'VPN Cliente', 'Acesso remoto seguro para usuarios do cliente.', 2, 'high', 99.50, '24x7', 'active'),
  (3, 1, 'Portal de Faturamento', 'Portal web de faturamento e segunda via.', 3, 'high', 99.00, '8x5', 'breached'),
  (4, 2, 'Integracao de Laudos', 'Integracao de laudos com sistemas externos.', 5, 'critical', 99.80, '24x7', 'active'),
  (5, 2, 'Prontuario Eletronico', 'Aplicacao de prontuario eletronico.', 6, 'critical', 99.95, '24x7', 'risk');

INSERT OR IGNORE INTO assets (
  id, tenant_id, zabbix_connection_id, name, type, environment, status, created_by_user_id
)
VALUES
  (1, 1, 1, 'core-edge-01', 'router', 'production', 'active', 1),
  (2, 1, 1, 'vpn-gw-02', 'gateway', 'production', 'active', 1),
  (3, 1, 2, 'billing-web-01', 'linux_server', 'production', 'warning', 3),
  (4, 2, 3, 'api-laudos-01', 'application', 'production', 'active', 5),
  (5, 2, 3, 'pep-app-03', 'application', 'production', 'warning', 5);

INSERT OR IGNORE INTO service_assets (tenant_id, service_id, asset_id)
VALUES
  (1, 1, 1),
  (1, 2, 2),
  (1, 3, 3),
  (2, 4, 4),
  (2, 5, 5);

INSERT OR IGNORE INTO zabbix_bindings (
  tenant_id, asset_id, zabbix_connection_id, host_id, item_id, trigger_id, zabbix_service_id, metric_type
)
VALUES
  (1, 1, 1, '10481', '30001', NULL, NULL, 'availability'),
  (1, 2, 1, '10492', '30022', NULL, NULL, 'throughput'),
  (1, 3, 2, '10520', NULL, '40110', NULL, 'incident'),
  (2, 4, 3, '21031', '50218', NULL, NULL, 'latency'),
  (2, 5, 3, '21062', NULL, '60314', NULL, 'incident');

INSERT OR IGNORE INTO sla_snapshots (
  tenant_id, service_id, period_start, period_end, target_percent, actual_percent, downtime_minutes, incident_count, source
)
VALUES
  (1, 1, '2026-06-01', '2026-06-30', 99.90, 99.76, 104, 4, 'zabbix'),
  (1, 2, '2026-06-01', '2026-06-30', 99.50, 99.93, 18, 1, 'zabbix'),
  (1, 3, '2026-06-01', '2026-06-30', 99.00, 98.42, 682, 7, 'zabbix'),
  (2, 4, '2026-06-01', '2026-06-30', 99.80, 99.88, 26, 2, 'zabbix'),
  (2, 5, '2026-06-01', '2026-06-30', 99.95, 99.91, 39, 3, 'zabbix');

INSERT OR IGNORE INTO itil_records (
  tenant_id, service_id, type, status, severity, title, description, root_cause, change_plan
)
VALUES
  (1, 1, 'problem', 'open', 'high', 'Perda de pacote recorrente', 'Oscilacao recorrente no core edge.', NULL, NULL),
  (1, 3, 'change', 'open', 'critical', 'Correcao emergencial do portal', 'Portal de faturamento fora da meta mensal.', NULL, 'Aplicar patch e validar rollback.'),
  (2, 5, 'incident', 'open', 'high', 'Instabilidade no prontuario', 'Aplicacao abaixo da meta contratual.', NULL, NULL);
