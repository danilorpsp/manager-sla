"""Cliente minimo para Zabbix API.

Este arquivo nao depende de bibliotecas externas. Ele serve como ponto de partida
para validar conexao, listar hosts e buscar itens quando o backend real for
definido.
"""

from __future__ import annotations

import json
import urllib.request
from dataclasses import dataclass
from typing import Any, Dict, List, Optional


class ZabbixApiError(RuntimeError):
    """Erro retornado pela API do Zabbix."""


@dataclass
class ZabbixClient:
    base_url: str
    token: Optional[str] = None
    timeout: int = 20

    def call(self, method: str, params: Optional[Dict[str, Any]] = None) -> Any:
        payload: Dict[str, Any] = {
            "jsonrpc": "2.0",
            "method": method,
            "params": params or {},
            "id": 1,
        }
        if self.token:
            payload["auth"] = self.token

        request = urllib.request.Request(
            url=self.base_url.rstrip("/") + "/api_jsonrpc.php",
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json-rpc"},
            method="POST",
        )

        with urllib.request.urlopen(request, timeout=self.timeout) as response:
            body = json.loads(response.read().decode("utf-8"))

        if "error" in body:
            error = body["error"]
            raise ZabbixApiError(f"{error.get('code')}: {error.get('message')}")

        return body.get("result")

    def version(self) -> str:
        return str(self.call("apiinfo.version"))

    def login(self, username: str, password: str) -> str:
        token = self.call("user.login", {"username": username, "password": password})
        self.token = str(token)
        return self.token

    def hosts(self) -> List[Dict[str, Any]]:
        return self.call(
            "host.get",
            {
                "output": ["hostid", "host", "name", "status"],
                "selectInterfaces": ["ip", "dns", "useip"],
            },
        )

    def hosts_with_items(self) -> List[Dict[str, Any]]:
        hosts = self.hosts()
        for host in hosts:
            host["items"] = self.items_for_host(str(host["hostid"]))
        return hosts

    def items_for_host(self, host_id: str) -> List[Dict[str, Any]]:
        return self.call(
            "item.get",
            {
                "hostids": host_id,
                "output": ["itemid", "name", "key_", "value_type", "status", "lastvalue"],
                "filter": {"status": "0"},
                "sortfield": "name",
            },
        )
