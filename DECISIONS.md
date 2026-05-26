# DECISIONS.md

# Overview

This document explains the key implementation decisions made during the assignment and the tradeoffs considered.

The assignment intentionally left several ambiguities open, so the implementation focused on building a realistic but manageable prototype within the given timeline.

---

# 1. Why CSV Uploads Were Chosen

The assignment allowed flexibility in ingestion mechanisms.

CSV uploads were chosen because:
- enterprise exports commonly use CSV
- SAP flat-file exports are realistic
- utility portal exports are often CSV-based
- CSV ingestion is simple to demonstrate in a prototype

This approach kept the ingestion workflow realistic without introducing unnecessary infrastructure complexity.

---

# 2. SAP Scope Chosen

Real SAP ecosystems are extremely large and inconsistent.

The implementation intentionally handled:
- flat-file CSV exports
- fuel/procurement activity rows
- inconsistent numeric values
- unit normalization support

The prototype did not implement:
- IDoc parsing
- OData integrations
- BAPI integrations

These were considered outside the scope of a 4-day prototype.

---

# 3. Utility Data Assumption

The utility ingestion flow assumes facilities teams export electricity usage data from utility portals as CSV files.

This was chosen because:
- portal CSV exports are common
- PDF bill parsing introduces OCR complexity
- APIs are not consistently available across utilities

---

# 4. Travel Data Assumption

The travel ingestion flow assumes CSV exports from platforms such as Concur or Navan.

The prototype focuses on:
- travel category ingestion
- normalized distances
- suspicious activity review

The system does not currently calculate actual emission factors.

---

# 5. Why Django + React

The assignment specifically requested Django REST and React.

Django REST Framework was chosen because:
- rapid API development
- strong admin tooling
- built-in ORM
- fast prototyping

React was chosen because:
- dynamic dashboards
- easy API integration
- flexible component architecture

---

# 6. Suspicious Detection Logic

The prototype automatically flags:
- negative values
- extremely large values
- missing units

The goal was to simulate analyst-review workflows before audit approval.

---

# 7. Why SQLite Was Used

SQLite was chosen to reduce setup complexity for the prototype.

In production, PostgreSQL would likely be preferred for:
- scalability
- concurrency
- enterprise deployment

---

# 8. Analyst Workflow

The dashboard supports:
- PENDING
- APPROVED
- REJECTED

statuses.

This models a simplified review process before audit sign-off.

---

# 9. What Would Be Asked To The PM

If more time were available, the following clarifications would be requested:

- expected normalization standards
- emission factor requirements
- utility provider integrations
- SAP export standards
- authentication requirements
- audit retention requirements
- expected scale of ingestion