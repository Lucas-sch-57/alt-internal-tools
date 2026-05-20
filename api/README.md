# Internal Tools API

## Technologies

- Runtime: Node.JS
- Language: Typescript
- Framework: AdonisJS
- Base de données: MySQL
- ORM: Lucid ORM
- Validation: VineJS
- Documentation: Swagger / OpenAPI
- Package Manager: pnpm
- Port API: 3306

# Quick Start

```bash
docker-compose --profile mysql up -d
```

## Install dependencies

```bash
pnpm install
```

## Configure environment

```bash
cp .env.example .env
```

## Generate Adonis Schemas

```bash
node ace schema:generate
```

## Server start

```bash
pnpm dev
```

## API Access

- API base URL: `http://localhost:3333`
- API Documentation: `http://localhost:3333/docs`
- OpenAPI JSON: `http://localhost:3333/swagger`

---

# Environment Variables

```env

TZ=UTC
PORT=3333
HOST=localhost
NODE_ENV=development
DB_HOST=localhost
MYSQL_ROOT_PASSWORD=root123secure
MYSQL_DATABASE=internal_tools
MYSQL_USER=dev
MYSQL_PASSWORD=dev123
MYSQL_PORT=3306
PHPMYADMIN_PORT=8080
```

# Available Endpoints

## Tools

| Method | Endpoint       | Description             |
| ------ | -------------- | ----------------------- |
| GET    | /api/tools     | List tools with filters |
| GET    | /api/tools/:id | Get single tool         |
| POST   | /api/tools     | Create tool             |
| PUT    | /api/tools/:id | Update tool             |

---

## Analytics

| Method | Endpoint                       | Description                  |
| ------ | ------------------------------ | ---------------------------- |
| GET    | /api/analytics/departments     | Department costs analytics   |
| GET    | /api/analytics/categories      | Category budget analytics    |
| GET    | /api/analytics/low-usage-tools | Underutilized tools analysis |
| GET    | /api/analytics/expensive-tools | Expensive tools analysis     |
| GET    | /api/analytics/vendors         | Vendor summary analytics     |

---

# Validation & Error Handling

- VineJS validation
- Proper HTTP status codes
- Custom Exception Handler

---

# Project Architecture

```
app/
├── controllers/
├── services/
├── models/
├── validators/
├── exceptions/
└── middleware/

config/
database/
start/
```

---

# Testing

```bash
node ace test
```
