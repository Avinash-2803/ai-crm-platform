# 🚀 AI CRM Platform

<p align="center">
  <img src="./screenshots/Login Page.png" width="100%" />
</p>

<p align="center">

![React](https://img.shields.io/badge/Frontend-React-61DAFB)
![Django](https://img.shields.io/badge/Backend-Django-092E20)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791)
![Redis](https://img.shields.io/badge/Cache-Redis-DC382D)
![Celery](https://img.shields.io/badge/Queue-Celery-37814A)
![Docker](https://img.shields.io/badge/Containerized-Docker-2496ED)
![Prometheus](https://img.shields.io/badge/Monitoring-Prometheus-E6522C)
![Grafana](https://img.shields.io/badge/Visualization-Grafana-F46800)
![Gemini AI](https://img.shields.io/badge/AI-Google%20Gemini-4285F4)

</p>

---

# 📌 Overview

AI CRM Platform is an enterprise-grade customer relationship management system built using modern cloud-native technologies.

The platform enables customers to create support tickets, automatically classifies tickets using Google Gemini AI, allows administrators to assign tickets to agents, tracks ticket activity timelines, and provides real-time observability through Prometheus and Grafana.

The system demonstrates:

- AI-powered ticket management
- Enterprise RBAC security
- Distributed task processing
- Caching strategies
- Monitoring & Observability
- Containerized deployment
- Modern React dashboards

---

# ✨ Features

## 🔐 Authentication & Authorization

- JWT Authentication
- Role Based Access Control (RBAC)
- Admin Role
- Agent Role
- Customer Role
- Protected Routes

---

## 🤖 AI Ticket Classification

Google Gemini automatically analyzes:

- Ticket Title
- Ticket Description

And predicts:

### Categories

- Billing
- Technical
- Product
- Delivery
- Account
- General

### Priorities

- Low
- Medium
- High
- Critical

---

## 👨‍💼 Admin Dashboard

- Customer Analytics
- Ticket Analytics
- AI Category Analytics
- Ticket Distribution Charts
- KPI Monitoring
- Agent Assignment
- Ticket Detail View
- Activity Timeline Tracking

---

## 👨‍💻 Agent Dashboard

- Assigned Tickets
- Ticket Status Updates
- Ticket Lifecycle Management
- Resolution Workflow

---

## 👤 Customer Dashboard

- Create Tickets
- Track Ticket Status
- View Assigned Agent
- Monitor Resolution Progress

---

## 📊 Monitoring & Observability

- Prometheus Metrics Collection
- Grafana Dashboards
- API Request Tracking
- Memory Monitoring
- Request Rate Monitoring
- Service Health Monitoring

---

## ⚙️ Infrastructure

- Docker
- Docker Compose
- PostgreSQL
- Redis
- Celery Workers
- Gemini AI Integration

---

# 🏗️ System Architecture

<p align="center">
<img src="./architecture/architecture.svg" width="100%">
</p>

The platform follows a modular architecture where React communicates with Django REST APIs, while Redis, Celery, PostgreSQL, Gemini AI, Prometheus, and Grafana support scalability and observability.

---

# 🤖 AI Ticket Processing Flow

<p align="center">
<img src="./screenshots/AI_Processing svg.png" width="100%">
</p>

### Flow

1. Customer creates ticket
2. Django stores ticket
3. Gemini AI classifies category
4. Gemini AI predicts priority
5. Ticket updated in PostgreSQL
6. Activity recorded
7. Redis cache invalidated
8. Celery notification task triggered
9. Ticket visible across dashboards

---

# 📈 Monitoring & Observability Architecture

Prometheus continuously scrapes metrics exposed by Django services and Grafana visualizes them through operational dashboards.

Supported Metrics:

- Request Count
- Request Rate
- API Latency
- Memory Usage
- Virtual Memory Usage
- Service Availability

---

# 🖥️ Screenshots

## Login Page

<p align="center">
<img src="./screenshots/Login Page.png" width="100%">
</p>

---

## Admin Dashboard

<p align="center">
<img src="./screenshots/Admin DASHBOARD(1).png" width="100%">
</p>

---

## Analytics Dashboard

<p align="center">
<img src="./screenshots/ADmin Dashboard-2.png" width="100%">
</p>

---

## Ticket Management

<p align="center">
<img src="./screenshots/Admin-Dashboard-3 (2).png" width="100%">
</p>

---

## Ticket Details & Activity Timeline

<p align="center">
<img src="./screenshots/Ticket Details.png" width="100%">
</p>

---

## Customer Dashboard

<p align="center">
<img src="./screenshots/customer Dashboard2.png" width="100%">
</p>

---

# 📊 Grafana Dashboards

## API Requests

<p align="center">
<img src="./screenshots/All API Request.png" width="100%">
</p>

---

## Memory Usage

<p align="center">
<img src="./screenshots/Memory Usage.png" width="100%">
</p>

---

## Virtual Memory Usage

<p align="center">
<img src="./screenshots/Virtual Memory usage.png" width="100%">
</p>

---

# 🛠️ Tech Stack

| Layer | Technology |
|---------|------------|
| Frontend | React.js |
| Styling | Tailwind CSS |
| Routing | React Router |
| Charts | Recharts |
| Backend | Django |
| API | Django REST Framework |
| Authentication | JWT |
| Database | PostgreSQL |
| Cache | Redis |
| Background Jobs | Celery |
| AI Engine | Google Gemini |
| Monitoring | Prometheus |
| Visualization | Grafana |
| Containerization | Docker |

---

# 🚀 Local Setup

## Clone Repository

```bash
git clone https://github.com/Avinash-2803/ai-crm-platform.git
```

## Backend

```bash
cd crm-backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt
```

---

## Frontend

```bash
cd crm-frontend

npm install

npm run dev
```

---

## Docker Deployment

```bash
docker compose up --build
```

---

# 📚 API Documentation

Swagger Documentation:

```text
http://localhost:8000/api/docs/
```

---

# 📊 Monitoring

Prometheus:

```text
http://localhost:9090
```

Grafana:

```text
http://localhost:3000
```

---

# 🎯 Key Engineering Concepts Demonstrated

- AI Integration
- REST APIs
- RBAC
- JWT Security
- Database Design
- Background Processing
- Redis Caching
- Observability
- Monitoring
- Dockerized Deployment
- Distributed Systems Fundamentals

---

# 👨‍💻 Author

**Avinash Joshi**

GitHub:
https://github.com/Avinash-2803

---

⭐ If you found this project useful, consider giving it a star.
