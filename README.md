# Nagrik Drishti

**A human-in-the-loop civic grievance intelligence platform for Bihar.**

Nagrik Drishti turns authorised or manually imported public-style complaints into location-aware issue clusters. For each cluster, officers get an explainable priority score, a department routing recommendation, an evidence bundle, and a full lifecycle workflow.

> **Note:** All seeded posts are synthetic demonstration data. This project does not scrape social platforms, sign in to accounts, or claim access to any government ticketing system.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
- [Demo Walkthrough](#demo-walkthrough)
- [Limitations](#limitations)

## Features

**Analysis and clustering**
- Synthetic Bihar-style complaints in Hindi, Hinglish, and English.
- Transparent, rule-based analysis of relevance, category, sentiment, urgency, location, action, and department routing.
- Issue clustering based on text, category, time, evidence label, and Haversine-distance similarity.

**Prioritisation and workflow**
- Explainable priority score built from severity, urgency/sentiment, report volume, engagement, and sensitive-location context.
- Officer lifecycle: `Detected → Needs Review → Verified → Assigned → In Progress → Resolved → Closed`, with `Rejected` as an alternative outcome.
- Audit events for every AI and officer action.

**Interface**
- Command centre dashboard, monitoring inbox, cluster workspace, map hotspot view, graph insights, and trend table.

**Quality**
- Unit tests covering AI analysis, duplicate detection, priority scoring, and allowed lifecycle transitions.

## Tech Stack

- **Runtime:** Node.js 24+
- **Database:** SQLite via the built-in `node:sqlite` module
- **Testing:** Node.js built-in test runner

## Project Structure

```text
nagrik-drishti/
├── client/
│   ├── index.html                 # Application shell
│   ├── styles/                    # Tokens, layout, and components
│   └── scripts/
│       ├── api.js                 # API client
│       ├── store.js               # Shared client state
│       ├── components/            # Table, map, drawer, formatting, toast
│       └── views/                 # Dashboard, monitoring, clusters, insights
├── server/
│   ├── app.js                     # HTTP bootstrap
│   ├── domain/                    # Classification, geo, duplicate, priority, lifecycle
│   ├── database/                  # Schema, seed data, repository layer
│   ├── services/                  # Ingestion, clustering, dashboard, workflow
│   └── http/                      # Request parsing, API routing, static server
├── tests/                         # Node test-runner tests
└── package.json
```

## Getting Started

### Prerequisites

Node.js **24 or later** (required for the built-in SQLite module).

### Run the app

```bash
npm start
```

Then open [http://127.0.0.1:4173](http://127.0.0.1:4173).

On first startup, the app creates `data/nagrik-drishti.sqlite` and loads 24 synthetic source posts. The local database is Git-ignored.

### Development mode

Runs with automatic restart on file changes:

```bash
npm run dev
```

### Run tests

```bash
npm test
```

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/dashboard` | Headline metrics and departmental workload |
| GET | `/api/posts` | List imported source posts |
| POST | `/api/posts` | Analyse and ingest a single complaint |
| POST | `/api/posts/import` | Import a JSON array of posts |
| GET | `/api/clusters` | List issue clusters (filterable) |
| GET | `/api/clusters/:id` | Cluster evidence, posts, and audit trail |
| PATCH | `/api/clusters/:id` | Update lifecycle, assignment, or routing |
| GET | `/api/hotspots` | Geographic hotspot data |
| GET | `/api/trends` | Category and time trend data |
| GET | `/api/graph` | Cluster, location, and department graph |
| GET | `/api/departments` | Department directory |

## Demo Walkthrough

1. Open **Monitoring inbox**.
2. Submit the supplied Hindi pothole complaint near Bhikhna Pahari school.
3. Review the detected category, location, routing, duplicate signal, and priority recommendation.
4. Open the linked cluster from the result.
5. Verify the cluster, assign a field team, start work, then resolve it.
6. Open **Command centre** or **Insights & graph** to see the updated data.

## Limitations

- The analysis engine is a transparent rule-based demo, not a trained production NLP or vision model.
- Evidence labels are demo labels until an approved vision provider is configured.
- The map is an illustrative Bihar-oriented hotspot visualisation, not an authoritative asset-ownership map.
- Department routing is only a recommendation; officers must confirm the responsible authority.
- Real social-media ingestion, official ticketing integration, role-based authentication, and production object storage are future work. They require formal authorisation and a data-governance review.
