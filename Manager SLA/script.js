const tenants = [
  {
    id: "acme",
    name: "Acme Telecom",
    admins: ["Ana Costa", "Marcos Lima"],
    users: 18,
    services: [
      {
        id: "internet-core",
        name: "Internet Corporativa",
        target: 99.9,
        actual: 99.76,
        downtime: 104,
        incidents: 4,
        window: "24x7",
        owner: "Ana Costa",
        zabbix: "host:core-edge-01 / item:icmpping",
        status: "risk",
        action: "Abrir problema por recorrencia de perda de pacote.",
        history: [99.91, 99.86, 99.72, 99.78, 99.76],
      },
      {
        id: "vpn",
        name: "VPN Cliente",
        target: 99.5,
        actual: 99.93,
        downtime: 18,
        incidents: 1,
        window: "24x7",
        owner: "Rafael Nunes",
        zabbix: "host:vpn-gw-02 / item:net.if.in",
        status: "ok",
        action: "Manter monitoramento e revisar capacidade no fechamento mensal.",
        history: [99.62, 99.71, 99.88, 99.9, 99.93],
      },
      {
        id: "billing",
        name: "Portal de Faturamento",
        target: 99.0,
        actual: 98.42,
        downtime: 682,
        incidents: 7,
        window: "8x5",
        owner: "Bianca Reis",
        zabbix: "host:billing-web-01 / trigger:http_5xx",
        status: "late",
        action: "Criar mudanca emergencial para corrigir indisponibilidade recorrente.",
        history: [99.2, 98.94, 99.1, 98.66, 98.42],
      },
    ],
    assets: [
      { name: "core-edge-01", type: "Router", zabbixServer: "Zabbix NOC", zabbixId: "10481", items: 18, status: "ok" },
      { name: "vpn-gw-02", type: "Gateway", zabbixServer: "Zabbix NOC", zabbixId: "10492", items: 12, status: "ok" },
      { name: "billing-web-01", type: "Linux Server", zabbixServer: "Zabbix Aplicacoes", zabbixId: "10520", items: 31, status: "risk" },
    ],
    chartTemplates: [
      {
        id: "acme-icmp-availability",
        name: "Disponibilidade ICMP",
        chartType: "gauge",
        asset: "core-edge-01",
        hostId: "10481",
        itemId: "30001",
        itemName: "ICMP ping",
        itemKey: "icmpping",
        unit: "%",
        aggregation: "avg",
        warning: 99.5,
        critical: 99.0,
        status: "ok",
      },
      {
        id: "acme-http-errors",
        name: "Erros HTTP 5xx",
        chartType: "timeseries",
        asset: "billing-web-01",
        hostId: "10520",
        itemId: "40102",
        itemName: "HTTP 5xx errors",
        itemKey: "web.errors.5xx",
        unit: "count",
        aggregation: "sum",
        warning: 5,
        critical: 15,
        status: "risk",
      },
    ],
    zabbixServers: [
      {
        id: "acme-noc",
        name: "Zabbix NOC",
        url: "https://zabbix-noc.acme.local/api_jsonrpc.php",
        version: "6.4",
        auth: "API Token",
        environment: "Producao",
        hosts: 128,
        items: 2406,
        lastSync: "Hoje 09:42",
        status: "ok",
        discoveredHosts: [
          {
            hostId: "10481",
            name: "core-edge-01",
            interface: "10.10.0.1",
            status: "ok",
            items: [
              { itemId: "30001", name: "ICMP ping", key: "icmpping", type: "availability" },
              { itemId: "30002", name: "ICMP loss", key: "icmppingloss", type: "packet_loss" },
              { itemId: "30003", name: "Interface WAN traffic", key: "net.if.in[wan0]", type: "throughput" },
            ],
          },
          {
            hostId: "10492",
            name: "vpn-gw-02",
            interface: "10.10.0.20",
            status: "ok",
            items: [
              { itemId: "30022", name: "VPN active sessions", key: "vpn.sessions.active", type: "capacity" },
              { itemId: "30023", name: "Tunnel latency", key: "vpn.tunnel.latency", type: "latency" },
            ],
          },
        ],
      },
      {
        id: "acme-apps",
        name: "Zabbix Aplicacoes",
        url: "https://zabbix-apps.acme.local/api_jsonrpc.php",
        version: "7.0",
        auth: "API Token",
        environment: "Producao",
        hosts: 42,
        items: 914,
        lastSync: "Hoje 09:37",
        status: "risk",
        discoveredHosts: [
          {
            hostId: "10520",
            name: "billing-web-01",
            interface: "10.20.4.11",
            status: "risk",
            items: [
              { itemId: "40101", name: "HTTP service status", key: "net.tcp.service[https]", type: "availability" },
              { itemId: "40102", name: "HTTP 5xx errors", key: "web.errors.5xx", type: "incident" },
              { itemId: "40103", name: "Response time", key: "web.test.time[billing]", type: "latency" },
            ],
          },
        ],
      },
    ],
    usersList: [
      { name: "Ana Costa", provider: "Office 365", role: "Administrador", dashboards: "Todos", status: "ok" },
      { name: "Marcos Lima", provider: "Google", role: "Administrador", dashboards: "Operacional, Executivo", status: "ok" },
      { name: "Paula Melo", provider: "Office 365", role: "Analista", dashboards: "Operacional", status: "ok" },
      { name: "Joao Freitas", provider: "Google", role: "Solicitante", dashboards: "Aguardando liberacao", status: "pending" },
    ],
  },
  {
    id: "prisma",
    name: "Hospital Prisma",
    admins: ["Livia Duarte"],
    users: 9,
    services: [
      {
        id: "laudos",
        name: "Integracao de Laudos",
        target: 99.8,
        actual: 99.88,
        downtime: 26,
        incidents: 2,
        window: "24x7",
        owner: "Livia Duarte",
        zabbix: "host:api-laudos-01 / item:web.test.time",
        status: "ok",
        action: "Fechar incidente apos validacao do fornecedor.",
        history: [99.82, 99.84, 99.79, 99.86, 99.88],
      },
      {
        id: "prontuario",
        name: "Prontuario Eletronico",
        target: 99.95,
        actual: 99.91,
        downtime: 39,
        incidents: 3,
        window: "24x7",
        owner: "Mateus Rocha",
        zabbix: "host:pep-app-03 / trigger:service_unavailable",
        status: "risk",
        action: "Revisar capacidade antes do proximo plantao critico.",
        history: [99.97, 99.96, 99.93, 99.92, 99.91],
      },
    ],
    assets: [
      { name: "api-laudos-01", type: "Application", zabbixServer: "Zabbix Hospitalar", zabbixId: "21031", items: 22, status: "ok" },
      { name: "pep-app-03", type: "Application", zabbixServer: "Zabbix Hospitalar", zabbixId: "21062", items: 28, status: "risk" },
    ],
    chartTemplates: [
      {
        id: "prisma-api-latency",
        name: "Latencia API Laudos",
        chartType: "stat",
        asset: "api-laudos-01",
        hostId: "21031",
        itemId: "50218",
        itemName: "API response time",
        itemKey: "web.test.time[laudos]",
        unit: "ms",
        aggregation: "p95",
        warning: 700,
        critical: 1200,
        status: "ok",
      },
    ],
    zabbixServers: [
      {
        id: "prisma-main",
        name: "Zabbix Hospitalar",
        url: "https://monitor.prisma.local/api_jsonrpc.php",
        version: "6.0 LTS",
        auth: "API Token",
        environment: "Producao",
        hosts: 67,
        items: 1330,
        lastSync: "Hoje 09:51",
        status: "ok",
        discoveredHosts: [
          {
            hostId: "21031",
            name: "api-laudos-01",
            interface: "10.50.1.14",
            status: "ok",
            items: [
              { itemId: "50218", name: "API response time", key: "web.test.time[laudos]", type: "latency" },
              { itemId: "50219", name: "API availability", key: "net.tcp.service[https]", type: "availability" },
            ],
          },
          {
            hostId: "21062",
            name: "pep-app-03",
            interface: "10.50.2.33",
            status: "risk",
            items: [
              { itemId: "60314", name: "Service unavailable trigger", key: "service.unavailable", type: "incident" },
              { itemId: "60315", name: "CPU utilization", key: "system.cpu.util", type: "capacity" },
              { itemId: "60316", name: "Memory available", key: "vm.memory.size[available]", type: "capacity" },
            ],
          },
        ],
      },
    ],
    usersList: [
      { name: "Livia Duarte", provider: "Office 365", role: "Administrador", dashboards: "Todos", status: "ok" },
      { name: "Mateus Rocha", provider: "Google", role: "Analista", dashboards: "Operacional", status: "ok" },
      { name: "Carla Mendes", provider: "Office 365", role: "Gestor", dashboards: "Executivo", status: "ok" },
    ],
  },
];

const defaultAdmin = {
  email: "admin@manager-sla.local",
  password: "Admin@123",
  name: "Administrador Geral",
  role: "platform_admin",
};

const state = {
  tenantId: tenants[0].id,
  selectedServiceId: tenants[0].services[0].id,
  selectedZabbixServerId: tenants[0].zabbixServers[0].id,
  selectedTemplateId: tenants[0].chartTemplates[0].id,
};

const loginScreen = document.querySelector("#login-screen");
const appShell = document.querySelector("#app-shell");
const loginForm = document.querySelector("#login-form");
const loginError = document.querySelector("#login-error");
const tenantSelect = document.querySelector("#tenant-select");
const navItems = document.querySelectorAll(".nav-item");
const views = document.querySelectorAll(".view");
const chart = document.querySelector("#sla-chart");
const ctx = chart.getContext("2d");

const statusLabel = {
  ok: "Saudavel",
  risk: "Em risco",
  late: "Fora do SLA",
  pending: "Pendente",
};

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getTenant() {
  return tenants.find((tenant) => tenant.id === state.tenantId);
}

function getDiscoveredItemsForAsset(assetName) {
  const tenant = getTenant();
  const asset = tenant.assets.find((item) => item.name === assetName);
  if (!asset) return [];

  return (tenant.zabbixServers || [])
    .flatMap((server) => server.discoveredHosts || [])
    .filter((host) => host.hostId === asset.zabbixId || host.name === asset.name)
    .flatMap((host) =>
      host.items.map((item) => ({
        ...item,
        hostId: host.hostId,
        hostName: host.name,
      })),
    );
}

function formatPercent(value) {
  return `${value.toFixed(2)}%`;
}

function statusClass(service) {
  if (service.status === "late") return "late";
  if (service.status === "risk") return "risk";
  return "ok";
}

function showAuthenticatedApp() {
  loginScreen.hidden = true;
  appShell.hidden = false;
  document.querySelector("#current-user").textContent = defaultAdmin.name;
  renderAll();
}

function showLogin() {
  sessionStorage.removeItem("managerSlaSession");
  appShell.hidden = true;
  loginScreen.hidden = false;
  loginError.textContent = "";
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.querySelector("#login-email").value.trim().toLowerCase();
  const password = document.querySelector("#login-password").value;

  if (email === defaultAdmin.email && password === defaultAdmin.password) {
    sessionStorage.setItem(
      "managerSlaSession",
      JSON.stringify({ email: defaultAdmin.email, role: defaultAdmin.role }),
    );
    showAuthenticatedApp();
    return;
  }

  loginError.textContent = "Usuario ou senha invalidos.";
}

function initTenantSelect() {
  tenantSelect.innerHTML = tenants
    .map((tenant) => `<option value="${tenant.id}">${tenant.name}</option>`)
    .join("");
  document.querySelector("#zabbix-tenant-options").innerHTML = tenants
    .map((tenant) => `<option value="${tenant.id}">${tenant.name}</option>`)
    .join("");

  tenantSelect.addEventListener("change", () => {
    state.tenantId = tenantSelect.value;
    state.selectedServiceId = getTenant().services[0]?.id;
    state.selectedZabbixServerId = getTenant().zabbixServers[0]?.id;
    state.selectedTemplateId = getTenant().chartTemplates[0]?.id;
    renderAll();
  });
}

function renderMetrics() {
  const tenant = getTenant();
  const services = tenant.services;
  const average = services.reduce((sum, service) => sum + service.actual, 0) / services.length;
  const risk = services.filter((service) => service.actual < service.target).length;
  const incidents = services.reduce((sum, service) => sum + service.incidents, 0);

  document.querySelector("#tenant-summary").textContent =
    `${tenant.admins.length} admin(s), ${tenant.users} usuario(s), ${services.length} servico(s).`;
  document.querySelector("#metric-sla").textContent = formatPercent(average);
  document.querySelector("#metric-risk").textContent = risk;
  document.querySelector("#metric-incidents").textContent = incidents;
  document.querySelector("#metric-assets").textContent = tenant.assets.length;
}

function renderChart() {
  const tenant = getTenant();
  const services = tenant.services;
  const width = chart.width;
  const height = chart.height;
  const cx = Math.round(width * 0.37);
  const cy = Math.round(height * 0.54);
  const centerRadius = 70;
  const ringGap = 24;
  const ringWidth = 16;
  const maxRadius = Math.min(190, Math.floor(Math.min(width * 0.42, height * 0.46)));
  const breachedServices = services.filter((service) => service.actual < service.target);

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "#162023";
  ctx.font = "700 26px Inter, Arial, sans-serif";
  ctx.fillText("Radar radial de SLA", 38, 42);

  ctx.fillStyle = "#647276";
  ctx.font = "16px Inter, Arial, sans-serif";
  ctx.fillText("Centro: servicos fora da meta. Aneis: disponibilidade por servico.", 38, 68);

  ctx.strokeStyle = "#e8eff0";
  ctx.lineWidth = 1;
  [25, 50, 75, 100].forEach((value) => {
    const radius = centerRadius + ((maxRadius - centerRadius) * value) / 100;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();
  });

  const centerGradient = ctx.createRadialGradient(cx, cy, 12, cx, cy, centerRadius);
  centerGradient.addColorStop(0, "#d84a4a");
  centerGradient.addColorStop(1, "#982d2d");
  ctx.fillStyle = centerGradient;
  ctx.beginPath();
  ctx.arc(cx, cy, centerRadius - 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.font = "800 42px Inter, Arial, sans-serif";
  ctx.fillText(String(breachedServices.length), cx, cy - 6);
  ctx.font = "800 15px Inter, Arial, sans-serif";
  ctx.fillText("SLA vencido", cx, cy + 24);
  ctx.font = "13px Inter, Arial, sans-serif";
  ctx.fillText("ou abaixo da meta", cx, cy + 43);

  const startAngle = -Math.PI / 2;

  services.forEach((service, index) => {
    const radius = centerRadius + ringGap + index * (ringWidth + ringGap);
    const safeRadius = Math.min(radius, maxRadius);
    const progress = Math.max(0, Math.min(service.actual / 100, 1));
    const targetAngle = startAngle + Math.PI * 2 * (service.target / 100);
    const endAngle = startAngle + Math.PI * 2 * progress;
    const color =
      service.actual >= service.target ? "#0d766f" : service.status === "late" ? "#b43939" : "#b7791f";

    ctx.lineCap = "round";
    ctx.lineWidth = ringWidth;
    ctx.strokeStyle = "#edf4f2";
    ctx.beginPath();
    ctx.arc(cx, cy, safeRadius, startAngle, startAngle + Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(cx, cy, safeRadius, startAngle, endAngle);
    ctx.stroke();

    const markerX = cx + Math.cos(targetAngle) * safeRadius;
    const markerY = cy + Math.sin(targetAngle) * safeRadius;
    ctx.fillStyle = "#e3ad35";
    ctx.beginPath();
    ctx.arc(markerX, markerY, 5, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.textAlign = "left";
  ctx.lineCap = "butt";
  const legendX = Math.round(width * 0.66);
  let legendY = 112;

  ctx.fillStyle = "#162023";
  ctx.font = "800 22px Inter, Arial, sans-serif";
  ctx.fillText("Servicos monitorados", legendX, legendY - 34);

  services.forEach((service, index) => {
    const color =
      service.actual >= service.target ? "#0d766f" : service.status === "late" ? "#b43939" : "#b7791f";
    const statusText = service.actual >= service.target ? "Dentro da meta" : "Abaixo da meta";

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(legendX + 9, legendY - 6, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#162023";
    ctx.font = "800 17px Inter, Arial, sans-serif";
    ctx.fillText(service.name, legendX + 28, legendY);
    ctx.fillStyle = "#647276";
    ctx.font = "14px Inter, Arial, sans-serif";
    ctx.fillText(`${formatPercent(service.actual)} atual · meta ${formatPercent(service.target)} · ${statusText}`, legendX + 28, legendY + 22);
    legendY += 62;
  });

  ctx.fillStyle = "#e3ad35";
  ctx.beginPath();
  ctx.arc(legendX + 9, legendY + 2, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#647276";
  ctx.font = "14px Inter, Arial, sans-serif";
  ctx.fillText("Marcador dourado indica a meta contratual no anel.", legendX + 28, legendY + 7);
}

function renderServiceDetails() {
  const tenant = getTenant();
  const service = tenant.services.find((item) => item.id === state.selectedServiceId) || tenant.services[0];
  if (!service) return;

  document.querySelector("#service-title").textContent = service.name;
  document.querySelector("#service-description").textContent =
    `${formatPercent(service.actual)} de disponibilidade, ${service.downtime} minutos de indisponibilidade no periodo.`;
  document.querySelector("#service-target").textContent = formatPercent(service.target);
  document.querySelector("#service-zabbix").textContent = service.zabbix;
  document.querySelector("#service-owner").textContent = service.owner;
  document.querySelector("#service-action").textContent = service.action;
}

function renderServicesTable() {
  const tenant = getTenant();
  document.querySelector("#services-table").innerHTML = tenant.services
    .map(
      (service) => `
        <tr data-service-id="${service.id}">
          <td><strong>${service.name}</strong></td>
          <td>${formatPercent(service.target)}</td>
          <td>${formatPercent(service.actual)}</td>
          <td>${service.window}</td>
          <td>${service.owner}</td>
          <td><span class="pill ${statusClass(service)}">${statusLabel[service.status]}</span></td>
        </tr>
      `,
    )
    .join("");

  document.querySelectorAll("#services-table tr").forEach((row) => {
    row.classList.toggle("is-selected", row.dataset.serviceId === state.selectedServiceId);
    row.addEventListener("click", () => {
      state.selectedServiceId = row.dataset.serviceId;
      renderServiceDetails();
      renderServicesTable();
      showView("dashboard");
    });
  });
}

function renderAssets() {
  const tenant = getTenant();
  document.querySelector("#assets-grid").innerHTML = tenant.assets
    .map(
      (asset) => `
        <article class="asset-card">
          <span class="pill ${asset.status === "ok" ? "ok" : "risk"}">${statusLabel[asset.status]}</span>
          <h3>${asset.name}</h3>
          <p><strong>Tipo:</strong> ${asset.type}</p>
          <p><strong>Servidor:</strong> ${asset.zabbixServer}</p>
          <p><strong>Zabbix hostid:</strong> ${asset.zabbixId}</p>
          <p><strong>Itens monitorados:</strong> ${asset.items}</p>
        </article>
      `,
    )
    .join("");
}

function renderZabbixServers() {
  const tenant = getTenant();
  const servers = tenant.zabbixServers || [];
  const activeServers = servers.filter((server) => server.status === "ok").length;
  const hostCount = servers.reduce((sum, server) => sum + server.hosts, 0);
  const lastSync = servers[0]?.lastSync || "-";

  document.querySelector("#zabbix-active-count").textContent = activeServers;
  document.querySelector("#zabbix-host-count").textContent = hostCount;
  document.querySelector("#zabbix-last-sync").textContent = lastSync;
  document.querySelector("#zabbix-grid").innerHTML = servers
    .map(
      (server) => `
        <article class="asset-card connection-card">
          <div class="connection-card-header">
            <span class="pill ${server.status === "ok" ? "ok" : "risk"}">${statusLabel[server.status]}</span>
            <span>${server.environment}</span>
          </div>
          <h3>${server.name}</h3>
          <p><strong>URL:</strong> <span class="mono-value">${server.url}</span></p>
          <p><strong>Versao:</strong> ${server.version}</p>
          <p><strong>Autenticacao:</strong> ${server.auth}</p>
          <p><strong>Hosts:</strong> ${server.hosts}</p>
          <p><strong>Itens:</strong> ${server.items}</p>
          <p><strong>Ultima sync:</strong> ${server.lastSync}</p>
          <button class="secondary-button compact-button" type="button" data-zabbix-server="${server.id}">Ver ativos e itens</button>
        </article>
      `,
    )
    .join("");

  document.querySelectorAll("[data-zabbix-server]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedZabbixServerId = button.dataset.zabbixServer;
      renderZabbixDiscovery();
    });
  });
}

function renderZabbixDiscovery() {
  const tenant = getTenant();
  const servers = tenant.zabbixServers || [];
  const select = document.querySelector("#zabbix-server-select");
  const selectedServer =
    servers.find((server) => server.id === state.selectedZabbixServerId) || servers[0];

  select.innerHTML = servers
    .map((server) => `<option value="${server.id}">${server.name}</option>`)
    .join("");

  if (!selectedServer) {
    document.querySelector("#discovery-summary").textContent = "Nenhum servidor cadastrado";
    document.querySelector("#discovery-table").innerHTML = "";
    return;
  }

  state.selectedZabbixServerId = selectedServer.id;
  select.value = selectedServer.id;

  const hosts = selectedServer.discoveredHosts || [];
  const itemCount = hosts.reduce((sum, host) => sum + host.items.length, 0);
  document.querySelector("#discovery-summary").textContent =
    `${hosts.length} ativo(s), ${itemCount} item(ns) disponiveis em ${selectedServer.name}`;

  document.querySelector("#discovery-table").innerHTML = hosts
    .map(
      (host) => `
        <tr>
          <td><strong>${host.name}</strong></td>
          <td>${host.hostId}</td>
          <td>${host.interface}</td>
          <td>
            <div class="item-list">
              ${host.items
                .map(
                  (item) => `
                    <span title="${item.key}">
                      ${item.name}
                      <small>${item.key}</small>
                    </span>
                  `,
                )
                .join("")}
            </div>
          </td>
          <td><span class="pill ${host.status === "ok" ? "ok" : "risk"}">${statusLabel[host.status]}</span></td>
        </tr>
      `,
    )
    .join("");
}

function populateTemplateForm() {
  const tenant = getTenant();
  const assetSelect = document.querySelector("#template-asset");
  const itemSelect = document.querySelector("#template-item");
  const currentAsset = assetSelect.value;

  assetSelect.innerHTML = tenant.assets
    .map((asset) => `<option value="${asset.name}">${asset.name} · ${asset.zabbixServer}</option>`)
    .join("");

  if (currentAsset && tenant.assets.some((asset) => asset.name === currentAsset)) {
    assetSelect.value = currentAsset;
  }

  const selectedAsset = assetSelect.value || tenant.assets[0]?.name;
  const items = getDiscoveredItemsForAsset(selectedAsset);
  itemSelect.innerHTML = items
    .map((item) => `<option value="${item.itemId}">${item.name} · ${item.key}</option>`)
    .join("");
}

function renderTemplates() {
  const tenant = getTenant();
  const templates = tenant.chartTemplates || [];
  const selectedTemplate =
    templates.find((template) => template.id === state.selectedTemplateId) || templates[0];

  document.querySelector("#templates-grid").innerHTML = templates
    .map(
      (template) => `
        <article class="asset-card template-card ${template.id === selectedTemplate?.id ? "is-selected" : ""}" data-template-id="${template.id}">
          <div class="connection-card-header">
            <span class="pill ${template.status === "ok" ? "ok" : "risk"}">${statusLabel[template.status]}</span>
            <span>${template.chartType}</span>
          </div>
          <h3>${template.name}</h3>
          <div class="mini-panel ${template.chartType}">
            <span>${template.aggregation.toUpperCase()}</span>
            <strong>${template.warning}${template.unit}</strong>
            <small>${template.asset}</small>
          </div>
          <p><strong>Item:</strong> <span class="mono-value">${template.itemKey}</span></p>
          <p><strong>Limites:</strong> amarelo ${template.warning}${template.unit}, vermelho ${template.critical}${template.unit}</p>
        </article>
      `,
    )
    .join("");

  document.querySelector("#templates-table").innerHTML = templates
    .map(
      (template) => `
        <tr data-template-id="${template.id}">
          <td><strong>${template.name}</strong></td>
          <td>${template.chartType}</td>
          <td>${template.asset}</td>
          <td><span class="mono-value">${template.itemKey}</span></td>
          <td>${template.unit}</td>
          <td><span class="pill ${template.status === "ok" ? "ok" : "risk"}">${statusLabel[template.status]}</span></td>
        </tr>
      `,
    )
    .join("");

  document.querySelectorAll("[data-template-id]").forEach((element) => {
    element.addEventListener("click", () => {
      state.selectedTemplateId = element.dataset.templateId;
      renderTemplates();
    });
  });

  renderTemplatePreview(selectedTemplate);
}

function renderTemplatePreview(template) {
  if (!template) return;

  document.querySelector("#template-preview-title").textContent = template.name;
  document.querySelector("#template-preview-asset").textContent = template.asset;
  document.querySelector("#template-preview-item").textContent = `${template.itemName} · ${template.itemKey}`;
  document.querySelector("#template-preview-thresholds").textContent =
    `Amarelo ${template.warning}${template.unit}, vermelho ${template.critical}${template.unit}`;

  document.querySelector("#template-preview-panel").innerHTML = `
    <span>${template.chartType.toUpperCase()} · ${template.aggregation.toUpperCase()}</span>
    <strong>${template.warning}${template.unit}</strong>
    <small>${template.asset}</small>
  `;
}

function handleTemplateSubmit(event) {
  event.preventDefault();
  const tenant = getTenant();
  const assetName = document.querySelector("#template-asset").value;
  const itemId = document.querySelector("#template-item").value;
  const item = getDiscoveredItemsForAsset(assetName).find((candidate) => candidate.itemId === itemId);
  const name = document.querySelector("#template-name").value.trim();

  if (!name || !item) return;

  const template = {
    id: `${tenant.id}-${slugify(name)}-${Date.now()}`,
    name,
    chartType: document.querySelector("#template-chart-type").value,
    asset: assetName,
    hostId: item.hostId,
    itemId: item.itemId,
    itemName: item.name,
    itemKey: item.key,
    unit: document.querySelector("#template-unit").value,
    aggregation: document.querySelector("#template-aggregation").value,
    warning: Number(document.querySelector("#template-warning").value || 0),
    critical: Number(document.querySelector("#template-critical").value || 0),
    status: "ok",
  };

  tenant.chartTemplates.unshift(template);
  state.selectedTemplateId = template.id;
  document.querySelector("#template-form").reset();
  document.querySelector("#template-dialog").close();
  renderTemplates();
  showView("templates");
}

function handleZabbixSubmit(event) {
  event.preventDefault();
  const tenant = getTenant();
  const name = document.querySelector("#zabbix-name").value.trim();
  const url = document.querySelector("#zabbix-url").value.trim();
  const auth = document.querySelector("#zabbix-auth").value;
  const environment = document.querySelector("#zabbix-environment").value;

  if (!name || !url) return;

  const id = `${tenant.id}-${slugify(name)}`;
  const existing = tenant.zabbixServers.some((server) => server.id === id);
  const server = {
    id: existing ? `${id}-${Date.now()}` : id,
    name,
    url,
    version: "Aguardando teste",
    auth,
    environment,
    hosts: 2,
    items: 5,
    lastSync: "Agora",
    status: "ok",
    discoveredHosts: [
      {
        hostId: "novo-001",
        name: "srv-app-01",
        interface: "192.168.10.21",
        status: "ok",
        items: [
          { itemId: "item-001", name: "Disponibilidade ICMP", key: "icmpping", type: "availability" },
          { itemId: "item-002", name: "Uso de CPU", key: "system.cpu.util", type: "capacity" },
          { itemId: "item-003", name: "Tempo de resposta HTTP", key: "web.test.time", type: "latency" },
        ],
      },
      {
        hostId: "novo-002",
        name: "db-prod-01",
        interface: "192.168.10.31",
        status: "ok",
        items: [
          { itemId: "item-004", name: "Conexoes ativas", key: "db.connections.active", type: "capacity" },
          { itemId: "item-005", name: "Espaco em disco", key: "vfs.fs.size[/,pfree]", type: "capacity" },
        ],
      },
    ],
  };

  tenant.zabbixServers.unshift(server);
  state.selectedZabbixServerId = server.id;
  document.querySelector("#zabbix-form").reset();
  document.querySelector("#zabbix-dialog").close();
  renderAll();
  showView("zabbix");
}

function renderUsers() {
  const tenant = getTenant();
  document.querySelector("#users-table").innerHTML = tenant.usersList
    .map(
      (user) => `
        <tr>
          <td><strong>${user.name}</strong></td>
          <td>${user.provider}</td>
          <td>${user.role}</td>
          <td>${user.dashboards}</td>
          <td><span class="pill ${user.status}">${statusLabel[user.status]}</span></td>
        </tr>
      `,
    )
    .join("");
}

function showView(viewName) {
  views.forEach((view) => view.classList.toggle("is-visible", view.id === `view-${viewName}`));
  navItems.forEach((item) => item.classList.toggle("is-active", item.dataset.view === viewName));

  const titles = {
    dashboard: "Dashboard operacional",
    services: "SLAs por servico",
    assets: "Ativos Zabbix",
    zabbix: "Servidores Zabbix",
    templates: "Templates de grafico",
    users: "Usuarios e permissoes",
    itil: "Fluxo ITIL",
  };
  document.querySelector("#page-title").textContent = titles[viewName];
}

function renderAll() {
  tenantSelect.value = state.tenantId;
  renderMetrics();
  renderChart();
  renderServiceDetails();
  renderServicesTable();
  renderAssets();
  renderZabbixServers();
  renderZabbixDiscovery();
  renderTemplates();
  renderUsers();
}

navItems.forEach((item) => {
  item.addEventListener("click", () => showView(item.dataset.view));
});

document.querySelector("#new-service-button").addEventListener("click", () => {
  document.querySelector("#service-dialog").showModal();
});

document.querySelector("#new-zabbix-button").addEventListener("click", () => {
  document.querySelector("#zabbix-tenant-options").value = state.tenantId;
  document.querySelector("#zabbix-dialog").showModal();
});

document.querySelector("#zabbix-form").addEventListener("submit", handleZabbixSubmit);

document.querySelector("#new-template-button").addEventListener("click", () => {
  populateTemplateForm();
  document.querySelector("#template-dialog").showModal();
});

document.querySelector("#template-asset").addEventListener("change", populateTemplateForm);
document.querySelector("#template-form").addEventListener("submit", handleTemplateSubmit);

document.querySelector("#zabbix-server-select").addEventListener("change", (event) => {
  state.selectedZabbixServerId = event.target.value;
  renderZabbixDiscovery();
});

document.querySelector("#discover-zabbix-button").addEventListener("click", renderZabbixDiscovery);

document.querySelector("#refresh-button").addEventListener("click", () => {
  renderAll();
});

document.querySelector("#period-select").addEventListener("change", renderChart);

loginForm.addEventListener("submit", handleLogin);
document.querySelector("#logout-button").addEventListener("click", showLogin);

initTenantSelect();

if (sessionStorage.getItem("managerSlaSession")) {
  showAuthenticatedApp();
} else {
  showLogin();
}
