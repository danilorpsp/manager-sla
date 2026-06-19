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
  id, name, base_url, auth_type, encrypted_secret, environment, version, status, last_sync_at
)
VALUES
  (1, 'Zabbix NOC', 'https://zabbix-noc.acme.local/api_jsonrpc.php', 'api_token', 'demo-encrypted-secret', 'production', '6.4', 'active', CURRENT_TIMESTAMP),
  (2, 'Zabbix Aplicacoes', 'https://zabbix-apps.acme.local/api_jsonrpc.php', 'api_token', 'demo-encrypted-secret', 'production', '7.0', 'warning', CURRENT_TIMESTAMP),
  (3, 'Zabbix Hospitalar', 'https://monitor.prisma.local/api_jsonrpc.php', 'api_token', 'demo-encrypted-secret', 'production', '6.0 LTS', 'active', CURRENT_TIMESTAMP);

INSERT OR IGNORE INTO tenant_zabbix_access (
  tenant_id, zabbix_connection_id, status, granted_by_user_id, granted_at
)
VALUES
  (1, 1, 'active', 8, CURRENT_TIMESTAMP),
  (1, 2, 'active', 8, CURRENT_TIMESTAMP),
  (2, 1, 'active', 8, CURRENT_TIMESTAMP),
  (2, 3, 'active', 8, CURRENT_TIMESTAMP);

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

INSERT OR IGNORE INTO zabbix_discovered_hosts (
  id, zabbix_connection_id, host_id, host_name, interface_ip, status
)
VALUES
  (1, 1, '10481', 'core-edge-01', '10.10.0.1', 'active'),
  (2, 1, '10492', 'vpn-gw-02', '10.10.0.20', 'active'),
  (3, 2, '10520', 'billing-web-01', '10.20.4.11', 'warning'),
  (4, 3, '21031', 'api-laudos-01', '10.50.1.14', 'active'),
  (5, 3, '21062', 'pep-app-03', '10.50.2.33', 'warning');

INSERT OR IGNORE INTO zabbix_discovered_items (
  zabbix_connection_id, discovered_host_id, item_id, name, key_, value_type, metric_type, status
)
VALUES
  (1, 1, '30001', 'ICMP ping', 'icmpping', 'numeric_unsigned', 'availability', 'active'),
  (1, 1, '30002', 'ICMP loss', 'icmppingloss', 'numeric_float', 'packet_loss', 'active'),
  (1, 1, '30003', 'Interface WAN traffic', 'net.if.in[wan0]', 'numeric_unsigned', 'throughput', 'active'),
  (1, 2, '30022', 'VPN active sessions', 'vpn.sessions.active', 'numeric_unsigned', 'capacity', 'active'),
  (1, 2, '30023', 'Tunnel latency', 'vpn.tunnel.latency', 'numeric_float', 'latency', 'active'),
  (2, 3, '40101', 'HTTP service status', 'net.tcp.service[https]', 'numeric_unsigned', 'availability', 'active'),
  (2, 3, '40102', 'HTTP 5xx errors', 'web.errors.5xx', 'numeric_unsigned', 'incident', 'active'),
  (2, 3, '40103', 'Response time', 'web.test.time[billing]', 'numeric_float', 'latency', 'active'),
  (3, 4, '50218', 'API response time', 'web.test.time[laudos]', 'numeric_float', 'latency', 'active'),
  (3, 4, '50219', 'API availability', 'net.tcp.service[https]', 'numeric_unsigned', 'availability', 'active'),
  (3, 5, '60314', 'Service unavailable trigger', 'service.unavailable', 'numeric_unsigned', 'incident', 'active'),
  (3, 5, '60315', 'CPU utilization', 'system.cpu.util', 'numeric_float', 'capacity', 'active'),
  (3, 5, '60316', 'Memory available', 'vm.memory.size[available]', 'numeric_unsigned', 'capacity', 'active');

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

INSERT OR IGNORE INTO graph_templates (
  id, tenant_id, name, chart_type, description, unit, aggregation, warning_threshold, critical_threshold, status
)
VALUES
  (1, 1, 'Disponibilidade ICMP', 'gauge', 'Gauge de disponibilidade por ping ICMP.', '%', 'avg', 99.50, 99.00, 'active'),
  (2, 1, 'Erros HTTP 5xx', 'timeseries', 'Serie temporal de erros HTTP 5xx.', 'count', 'sum', 5, 15, 'active'),
  (3, 2, 'Latencia API Laudos', 'stat', 'Painel stat para latencia p95 da API.', 'ms', 'p95', 700, 1200, 'active');

INSERT OR IGNORE INTO asset_graph_templates (
  tenant_id, asset_id, graph_template_id, zabbix_connection_id, host_id, item_id, item_key, panel_title, status
)
VALUES
  (1, 1, 1, 1, '10481', '30001', 'icmpping', 'Disponibilidade ICMP - core-edge-01', 'active'),
  (1, 3, 2, 2, '10520', '40102', 'web.errors.5xx', 'Erros HTTP 5xx - billing-web-01', 'active'),
  (2, 4, 3, 3, '21031', '50218', 'web.test.time[laudos]', 'Latencia API Laudos - api-laudos-01', 'active');

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
