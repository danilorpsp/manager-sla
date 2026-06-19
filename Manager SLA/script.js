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
      { name: "core-edge-01", type: "Router", zabbixId: "10481", items: 18, status: "ok" },
      { name: "vpn-gw-02", type: "Gateway", zabbixId: "10492", items: 12, status: "ok" },
      { name: "billing-web-01", type: "Linux Server", zabbixId: "10520", items: 31, status: "risk" },
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
      { name: "api-laudos-01", type: "Application", zabbixId: "21031", items: 22, status: "ok" },
      { name: "pep-app-03", type: "Application", zabbixId: "21062", items: 28, status: "risk" },
    ],
    usersList: [
      { name: "Livia Duarte", provider: "Office 365", role: "Administrador", dashboards: "Todos", status: "ok" },
      { name: "Mateus Rocha", provider: "Google", role: "Analista", dashboards: "Operacional", status: "ok" },
      { name: "Carla Mendes", provider: "Office 365", role: "Gestor", dashboards: "Executivo", status: "ok" },
    ],
  },
];

const state = {
  tenantId: tenants[0].id,
  selectedServiceId: tenants[0].services[0].id,
};

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

function getTenant() {
  return tenants.find((tenant) => tenant.id === state.tenantId);
}

function formatPercent(value) {
  return `${value.toFixed(2)}%`;
}

function statusClass(service) {
  if (service.status === "late") return "late";
  if (service.status === "risk") return "risk";
  return "ok";
}

function initTenantSelect() {
  tenantSelect.innerHTML = tenants
    .map((tenant) => `<option value="${tenant.id}">${tenant.name}</option>`)
    .join("");

  tenantSelect.addEventListener("change", () => {
    state.tenantId = tenantSelect.value;
    state.selectedServiceId = getTenant().services[0]?.id;
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
  const padding = { top: 34, right: 34, bottom: 72, left: 70 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const minValue = Math.min(97.5, ...services.map((service) => service.actual - 0.25));
  const maxValue = 100;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "#dce7e8";
  ctx.lineWidth = 1;
  ctx.fillStyle = "#647276";
  ctx.font = "24px Inter, Arial, sans-serif";
  ctx.fillText("Disponibilidade mensal por servico", padding.left, 28);

  for (let i = 0; i <= 5; i += 1) {
    const y = padding.top + (plotHeight / 5) * i;
    const value = maxValue - ((maxValue - minValue) / 5) * i;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();
    ctx.fillStyle = "#647276";
    ctx.font = "16px Inter, Arial, sans-serif";
    ctx.fillText(`${value.toFixed(1)}%`, 16, y + 5);
  }

  const barGroup = plotWidth / services.length;
  const barWidth = Math.min(92, barGroup * 0.42);

  services.forEach((service, index) => {
    const x = padding.left + barGroup * index + barGroup / 2;
    const actualHeight = ((service.actual - minValue) / (maxValue - minValue)) * plotHeight;
    const targetY =
      padding.top + plotHeight - ((service.target - minValue) / (maxValue - minValue)) * plotHeight;
    const barY = padding.top + plotHeight - actualHeight;

    ctx.strokeStyle = "#e3ad35";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x - barWidth / 1.5, targetY);
    ctx.lineTo(x + barWidth / 1.5, targetY);
    ctx.stroke();

    ctx.fillStyle = service.actual >= service.target ? "#0d766f" : service.status === "late" ? "#b43939" : "#9f6817";
    ctx.fillRect(x - barWidth / 2, barY, barWidth, actualHeight);

    ctx.fillStyle = "#162023";
    ctx.font = "18px Inter, Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(formatPercent(service.actual), x, barY - 12);
    ctx.fillStyle = "#647276";
    ctx.font = "15px Inter, Arial, sans-serif";
    ctx.fillText(service.name, x, height - 32);
  });

  ctx.textAlign = "left";
  ctx.fillStyle = "#e3ad35";
  ctx.fillRect(width - 245, 20, 22, 4);
  ctx.fillStyle = "#647276";
  ctx.font = "15px Inter, Arial, sans-serif";
  ctx.fillText("Meta contratual", width - 214, 27);
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
          <p><strong>Zabbix hostid:</strong> ${asset.zabbixId}</p>
          <p><strong>Itens monitorados:</strong> ${asset.items}</p>
        </article>
      `,
    )
    .join("");
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
  renderUsers();
}

navItems.forEach((item) => {
  item.addEventListener("click", () => showView(item.dataset.view));
});

document.querySelector("#new-service-button").addEventListener("click", () => {
  document.querySelector("#service-dialog").showModal();
});

document.querySelector("#refresh-button").addEventListener("click", () => {
  renderAll();
});

document.querySelector("#period-select").addEventListener("change", renderChart);

initTenantSelect();
renderAll();
