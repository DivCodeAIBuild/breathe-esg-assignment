# Breathe ESG Tech Assignment

A Django REST + React application for ESG data ingestion, normalization, suspicious detection, and analyst review workflows.

---

## Features

- SAP CSV ingestion
- Utility CSV ingestion
- Travel CSV ingestion
- Emission normalization
- Suspicious activity detection
- Analyst approval/rejection workflow
- Dashboard analytics
- Audit-oriented backend architecture

---

## Tech Stack

### Backend
- Django
- Django REST Framework
- SQLite

### Frontend
- React
- Tailwind CSS
- Axios

---

## Supported Sources

### SAP
Fuel and procurement CSV uploads.

### Utility
Electricity consumption CSV uploads.

### Travel
Corporate travel CSV uploads.

---

## Suspicious Detection Rules

- Negative emission values
- Extremely high values
- Missing units

---

## Analyst Workflow

Analysts can:
- Review uploaded rows
- Approve records
- Reject records
- View suspicious reasons

---

## Setup Instructions

### Backend

```bash
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install django djangorestframework django-cors-headers
python manage.py migrate
python manage.py runserver

## Sample CSV

```csv
category,raw_value,raw_unit
Fuel Consumption,500,Liters
Electricity,-200,kWh
Travel,15000,km


---

# IMPORTANT

Ye:
```md id="d9q2mf"
```csv