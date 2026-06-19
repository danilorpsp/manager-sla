"""Inicializa o banco local do Manager SLA."""

from __future__ import annotations

from database import initialize_database, tenant_summary


def main() -> None:
    db_path = initialize_database(seed=True)
    print(f"Banco criado em: {db_path}")
    print("Resumo por tenant:")
    for row in tenant_summary(db_path):
        print(
            "- {tenant}: {users} usuario(s), {services} servico(s), "
            "{assets} ativo(s), {zabbix_connections} conexao(oes) Zabbix".format(**row)
        )


if __name__ == "__main__":
    main()
