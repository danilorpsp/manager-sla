"""Camada SQLite inicial do Manager SLA."""

from __future__ import annotations

import sqlite3
from pathlib import Path
from typing import Iterable, Optional


PROJECT_ROOT = Path(__file__).resolve().parents[1]
DATABASE_DIR = PROJECT_ROOT / "database"
DEFAULT_DB_PATH = DATABASE_DIR / "manager_sla.sqlite3"
MIGRATIONS_DIR = DATABASE_DIR / "migrations"
SEEDS_DIR = DATABASE_DIR / "seeds"


def connect(db_path: Optional[Path] = None) -> sqlite3.Connection:
    path = db_path or DEFAULT_DB_PATH
    path.parent.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(path)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA foreign_keys = ON")
    return connection


def sql_files(directory: Path) -> Iterable[Path]:
    return sorted(directory.glob("*.sql"))


def apply_sql_directory(connection: sqlite3.Connection, directory: Path) -> None:
    for file_path in sql_files(directory):
        connection.executescript(file_path.read_text(encoding="utf-8"))


def initialize_database(db_path: Optional[Path] = None, seed: bool = True) -> Path:
    path = db_path or DEFAULT_DB_PATH
    with connect(path) as connection:
        apply_sql_directory(connection, MIGRATIONS_DIR)
        if seed:
            apply_sql_directory(connection, SEEDS_DIR)
        connection.commit()
    return path


def tenant_summary(db_path: Optional[Path] = None) -> list[sqlite3.Row]:
    with connect(db_path) as connection:
        return connection.execute(
            """
            SELECT
              tenants.name AS tenant,
              COUNT(DISTINCT tenant_users.user_id) AS users,
              COUNT(DISTINCT services.id) AS services,
              COUNT(DISTINCT assets.id) AS assets,
              COUNT(DISTINCT zabbix_connections.id) AS zabbix_connections
            FROM tenants
            LEFT JOIN tenant_users ON tenant_users.tenant_id = tenants.id
            LEFT JOIN services ON services.tenant_id = tenants.id
            LEFT JOIN assets ON assets.tenant_id = tenants.id
            LEFT JOIN zabbix_connections ON zabbix_connections.tenant_id = tenants.id
            GROUP BY tenants.id
            ORDER BY tenants.name
            """
        ).fetchall()
