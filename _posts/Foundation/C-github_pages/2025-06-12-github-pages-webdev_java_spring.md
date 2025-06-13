---
toc: False
layout: post
title: Java + Spring Boot Setup Guide
description: Learn how to build a backend using Spring Boot with simple database integration.
categories: ['GitHub Pages']
permalink: /web-dev/data-storage/java-spring
type: ccc
---

## 1. Clone the Starter Repository

🔗 [Spring Template Repository](https://github.com/Open-Coding-Society/spring)

```bash
git clone https://github.com/Open-Coding-Society/spring.git
cd spring
./mvnw spring-boot:run
```

## 2. Explore the Codebase

- `Application.java`: app entry point
- `models/`: Java classes for your data
- `controllers/`: handle HTTP routes
- `resources/application.properties`: DB configuration

### 3. Database Options

- Use H2 (in-memory DB) for quick setup
- Switch to PostgreSQL for production

Example H2 config:

```bash
spring.datasource.url=jdbc:h2:mem:testdb
spring.jpa.hibernate.ddl-auto=update
```

## 4. Test Locally

App runs at `http://localhost:8080`.
Test endpoints using Postman or a frontend.

## 5. Next Steps

- Add RESTful endpoints
- Connect to a cloud-hosted PostgreSQL DB
- Deploy to platforms like Heroku, Render, or AWS