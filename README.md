# Programación 3 - E-Commerce Dockerizado

## Descripción

Aplicación web de e-commerce dockerizada con 3 contenedores:

- **frontend**: App React (Vite) servida con Nginx en el puerto 80
- **backend**: API Express + Prisma + TypeScript
- **db**: Base de datos PostgreSQL 15

## Requisitos

- Docker
- Docker Compose

## Cómo levantar

```bash
docker compose up --build
```

Luego abrir en el navegador: **http://localhost**

## Arquitectura

```
┌─────────────────────────────────────────────┐
│                 Puerto 80                    │
│              (único expuesto)                │
├─────────────────────────────────────────────┤
│            NGINX (Frontend)                  │
│   Sirve React App + Proxy reverso /api/     │
├─────────────────────────────────────────────┤
│              Backend (Express)               │
│           Puerto 3000 (interno)              │
├─────────────────────────────────────────────┤
│            PostgreSQL (DB)                   │
│           Puerto 5432 (interno)              │
└─────────────────────────────────────────────┘
```

- El **frontend** (Nginx) es el único contenedor que expone un puerto al host (80).
- Las peticiones a `/api/*` son redirigidas al **backend** vía proxy reverso de Nginx.
- El **backend** y la **base de datos** NO exponen puertos al host, solo se comunican internamente en la red de Docker.

## Usuarios de prueba (seed)

| Email              | Contraseña |
| ------------------ | ---------- |
| juan@example.com   | 1234       |
| maria@example.com  | 1234       |
