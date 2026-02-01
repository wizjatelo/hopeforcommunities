# Hope for Communities Payment Service

A Django-based payment service implementing M-Pesa Daraja API, M-Pesa Global, and Visa card payments.

## Features

- **Daraja OAuth Authentication**: Secure token generation and caching
- **M-Pesa PayBill STK Push**: Initiate and query payments
- **M-Pesa Global Payments**: Process international card payments
- **Visa Card Payments**: Via M-Pesa Global with 3DS support
- **Webhook Handling**: Secure webhook endpoints for callbacks
- **Token Caching**: Redis-based token caching
- **Database Persistence**: PostgreSQL for transaction storage
- **JWT Authentication**: Secure API endpoints

## Prerequisites

- Python 3.11+
- PostgreSQL 15+
- Redis 7+
- Docker and Docker Compose (optional)

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env