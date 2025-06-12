# Decentralized Construction Safety Compliance Monitoring System

A blockchain-based system for monitoring and enforcing safety compliance in construction projects using Clarity smart contracts.

## Overview

This system provides a decentralized approach to construction safety management with the following key components:

1. **Safety Manager Verification**: Validates and tracks authorized safety managers
2. **Compliance Tracking**: Monitors safety compliance across construction sites
3. **Incident Reporting**: Records and manages safety incidents
4. **Training Verification**: Verifies worker safety training and certifications
5. **Audit Coordination**: Schedules and manages safety audits

## Smart Contracts

### Safety Manager Verification Contract

This contract maintains a registry of authorized safety managers with their credentials and certification status.

Key functions:
- `register-safety-manager`: Add a new safety manager (admin only)
- `deactivate-safety-manager`: Deactivate a safety manager (admin only)
- `is-manager-valid`: Check if a manager is active and certification is not expired
- `get-manager-details`: Retrieve manager details

### Compliance Tracking Contract

This contract tracks safety compliance across different construction sites.

Key functions:
- `register-site`: Register a new construction site (admin only)
- `record-compliance`: Record a compliance check
- `deactivate-site`: Deactivate a site (admin or site manager)
- `get-site-details`: Retrieve site details
- `get-compliance-record`: Retrieve compliance record

### Incident Reporting Contract

This contract manages safety incident reports and their resolution.

Key functions:
- `report-incident`: Report a new incident
- `resolve-incident`: Mark an incident as resolved (safety manager only)
- `get-incident-details`: Retrieve incident details

### Training Verification Contract

This contract verifies safety training certifications for construction workers.

Key functions:
- `add-certification`: Add a new training certification for a worker
- `verify-certification`: Verify a worker's certification (safety manager only)
- `has-valid-certification`: Check if a worker has valid certification
- `get-worker-training`: Retrieve worker training records

### Audit Coordination Contract

This contract coordinates safety audits for construction sites.

Key functions:
- `schedule-audit`: Schedule a new audit (admin or safety manager only)
- `submit-audit-report`: Submit audit report (auditor only)
- `reschedule-audit`: Reschedule an audit (admin or safety manager only)
- `get-audit-details`: Retrieve audit details

## Getting Started

### Prerequisites

- [Clarinet](https://github.com/hirosystems/clarinet) - Clarity development environment
- [Node.js](https://nodejs.org/) - For running tests

### Installation

1. Clone the repository:
