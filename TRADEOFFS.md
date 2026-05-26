# TRADEOFFS.md

# Overview

This prototype intentionally prioritizes clarity, realistic ingestion workflows, and analyst review functionality over feature completeness.

Several features were intentionally not implemented due to time constraints and prototype scope.

---

# 1. No Real SAP Integration

The system does not directly integrate with SAP APIs, IDocs, or OData services.

Instead, the prototype uses CSV uploads representing SAP flat-file exports.

### Why

Implementing actual SAP integrations would require:
- SAP credentials
- enterprise middleware
- significantly more infrastructure
- additional authentication flows

For a 4-day prototype, CSV ingestion provided a realistic and defendable compromise.

---

# 2. No OCR / PDF Parsing

Utility bill OCR parsing was intentionally not implemented.

### Why

PDF parsing introduces:
- OCR complexity
- document layout inconsistencies
- extraction reliability issues

Instead, the prototype assumes utility portal CSV exports.

This kept the ingestion pipeline simpler and more reliable.

---

# 3. No Real Emission Factor Calculations

The system currently normalizes values but does not calculate real carbon emissions using official emission factors.

### Why

Accurate ESG calculations require:
- regional emission factor datasets
- fuel-specific conversion libraries
- continuously updated standards

This was considered outside the scope of the assignment.

---

# Additional Notes

The prototype intentionally focused on:
- ingestion architecture
- analyst workflows
- suspicious data review
- audit-oriented structure

rather than attempting to build a fully production-grade ESG platform.