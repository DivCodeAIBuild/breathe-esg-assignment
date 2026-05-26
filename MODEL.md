# MODEL.md

## Overview

The system is designed to ingest ESG-related emissions and activity data from multiple enterprise sources including SAP, utility exports, and corporate travel platforms.

The data model focuses on:

- Multi-source ingestion
- Source-of-truth tracking
- Analyst review workflows
- Suspicious data detection
- Audit-oriented record management
- Flexible normalization support

---

# Core Models

## 1. Organization

Represents a client company onboarded into the platform.

### Fields

- name
- industry

### Why

The assignment requires multi-tenancy support. Each emission record belongs to a specific organization.

---

## 2. DataSource

Represents the source system that produced the data.

### Supported Source Types

- SAP
- UTILITY
- TRAVEL

### Fields

- source_type
- uploaded_at

### Why

Required for source-of-truth tracking and ingestion lineage.

This allows analysts and auditors to identify where each row originated.

---

## 3. EmissionRecord

Represents a normalized ESG activity or emissions row.

### Fields

- organization
- source
- category
- raw_value
- raw_unit
- normalized_value
- normalized_unit
- is_suspicious
- suspicious_reason
- status
- created_at

### Why

This is the primary business entity in the platform.

The model supports:
- normalization
- analyst review
- suspicious data detection
- audit preparation

---

# Normalization Strategy

Incoming data can arrive in inconsistent units and formats.

The system stores:
- raw incoming values
- normalized values

This preserves source fidelity while supporting downstream calculations.

---

# Suspicious Detection

The system automatically flags:
- negative values
- extremely high values
- missing units

This enables analysts to review problematic records before audit sign-off.

---

# Analyst Workflow

Each record supports:
- PENDING
- APPROVED
- REJECTED

statuses.

Analysts can approve or reject records directly from the dashboard.

---

## 4. AuditLog

Tracks important changes to records.

### Fields

- emission_record
- action
- changed_by
- timestamp

### Why

Supports audit traceability and future compliance requirements.

---

# Relationships

Organization
→ many EmissionRecords

DataSource
→ many EmissionRecords

EmissionRecord
→ many AuditLogs

---

# Design Decisions

The schema intentionally avoids over-engineering.

The assignment emphasized:
- realistic ingestion
- understandable design
- defendable decisions

The current structure keeps ingestion logic simple while supporting future extensibility.