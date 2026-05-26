# SOURCES.md

# Overview

This document explains the real-world data formats researched for the assignment and the assumptions made while designing ingestion workflows.

---

# 1. SAP Fuel / Procurement Data

## Research Summary

SAP exports are commonly exposed through:
- flat-file CSV exports
- IDocs
- OData services
- BAPIs

For this prototype, flat-file CSV exports were chosen.

### Why

CSV exports are realistic for:
- finance teams
- procurement workflows
- operational reporting
- manual enterprise exports

---

## Sample Format Used

```csv
category,raw_value,raw_unit
Fuel Consumption,500,Liters

---

```bash id="x8m1k4"
