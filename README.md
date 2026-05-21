# Async Task Processing API

A production-style backend system built using Node.js, TypeScript, PostgreSQL, Redis, BullMQ, Docker, and AWS EC2.

The project demonstrates asynchronous task processing architecture using Redis queues and worker services.

---

# Live Deployment

```txt
http://13.51.177.61:5000
```

---

# Features

* JWT Authentication
* Protected Routes
* PostgreSQL Database
* Redis Queue System
* BullMQ Background Workers
* Dockerized Architecture
* AWS EC2 Deployment
* Async Task Processing
* REST APIs
* Prisma ORM

---

# Architecture

```txt
Client
   ↓
Express API
   ↓
Redis Queue (BullMQ)
   ↓
Worker Service
   ↓
PostgreSQL
```

---

# Tech Stack

| Category             | Technologies           |
| -------------------- | ---------------------- |
| Backend              | Node.js, Express.js    |
| Language             | TypeScript             |
| Database             | PostgreSQL             |
| ORM                  | Prisma                 |
| Queue System         | BullMQ                 |
| Cache / Queue Broker | Redis                  |
| Authentication       | JWT, bcrypt            |
| Containerization     | Docker, Docker Compose |
| Cloud                | AWS EC2                |

---

# Project Structure

```txt
async-task-api/
│
├── prisma/
│   └── schema.prisma
│
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── workers/
│   ├── prisma.ts
│   └── index.ts
│
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```

---

# API Endpoints

## Authentication

### Signup

```http
POST /auth/signup
```

Request Body:

```json
{
  "email": "test@test.com",
  "password": "123456"
}
```

---

### Login

```http
POST /auth/login
```

Request Body:

```json
{
  "email": "test@test.com",
  "password": "123456"
}
```

Response:

```json
{
  "token": "JWT_TOKEN"
}
```

---

## Tasks

### Create Task

```http
POST /tasks
```

Headers:

```txt
Authorization: Bearer JWT_TOKEN
```

Request Body:

```json
{
  "text": "This is an async processing task"
}
```

---

### Get Tasks

```http
GET /tasks
```

Headers:

```txt
Authorization: Bearer JWT_TOKEN
```

---

# Async Processing Flow

```txt
1. User creates task
2. API stores task in PostgreSQL
3. Task pushed into Redis queue
4. Worker consumes job
5. Worker processes task
6. Result stored in PostgreSQL
7. User fetches processed result
```

---

# Docker Services

The project runs with four containers:

```txt
- backend_api
- backend_worker
- postgres_db
- redis_db
```

---

# Environment Variables

Create a `.env` file using your own credentials and secrets:

```env
DATABASE_URL="your_postgresql_connection_url"
JWT_SECRET="your_jwt_secret"
REDIS_HOST="your_redis_host"
REDIS_PORT="your_redis_port"
```

Example values should not be committed for security reasons.

---

# Local Development Setup

## Clone Repository

```bash
git clone https://github.com/ayannafees/async-task-api.git
cd async-task-api
```

---

## Install Dependencies

```bash
npm install
```

---

## Start Docker Services

```bash
docker compose up --build
```

---

## Run Prisma

```bash
npx prisma db push
```

---

# AWS Deployment

The application is deployed on AWS EC2 using Docker Compose.

Deployment includes:

* API container
* Worker container
* PostgreSQL container
* Redis container

---

# Key Learnings

This project demonstrates:

* Backend API development
* Authentication systems
* Async architecture
* Queue-based processing
* Worker services
* Docker networking
* Cloud deployment
* Database design
* Scalable backend patterns

---

# Future Improvements

* Frontend dashboard
* File upload support
* WebSocket live updates
* Rate limiting
* Redis caching
* Nginx reverse proxy
* HTTPS support
* CI/CD pipeline

---

# Author

Ayan Nafees
