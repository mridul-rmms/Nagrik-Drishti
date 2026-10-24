# Nagrik Drishti

Nagrik Drishti is a hackathon-ready, human-in-the-loop civic grievance intelligence MVP for Bihar. It converts authorised or manually imported public-style complaints into location-aware issue clusters, then gives officers an explainable priority score, routing recommendation, evidence bundle, and lifecycle workflow.

> All seeded posts are synthetic demonstration data. This project does not scrape social platforms, sign in to accounts, or claim access to government ticketing systems.

## What is implemented

- Persistent SQLite database using Node.js native `node:sqlite`.
- Synthetic Bihar-style source-post seeding in Hindi, Hinglish, and English.
- Deterministic, transparent civic-complaint analysis for relevance, category, sentiment, urgency, location, action, and department routing.
- Issue clustering using text, category, time, evidence label, and Haversine-distance similarity.
- Explainable priority calculation using severity, urgency/sentiment, report volume, engagement, and sensitive-location context.
- Officer lifecycle: `Detected → Needs Review → Verified → Assigned → In Progress → Resolved → Closed`, plus `Rejected`.
- Audit events for AI and officer actions.
- Command-centre dashboard, monitoring inbox, cluster workspace, map hotspot view, graph insights, and trend table.
- Unit tests for AI analysis, duplicate detection, priority scoring, and allowed lifecycle transitions.

## Project structure

```text
nagrik-drishti/
├── client/
│   ├── index.html                 # Application shell only
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

## Run locally

Node.js 24 or later is required because this project uses the built-in SQLite module.

```bash
npm start
```

Open [http://127.0.0.1:4173](http://127.0.0.1:4173).

For development with automatic restart:

```bash
npm run dev
```

Run the test suite:

```bash
npm test
```

The first startup creates `data/nagrik-drishti.sqlite` and loads 24 synthetic source posts. The local database is ignored by Git.

## API surface

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/dashboard` | Headline metrics and departmental workload |
| GET | `/api/posts` | Imported source posts |
| POST | `/api/posts` | Analyse and ingest one complaint |
| POST | `/api/posts/import` | Import a JSON array of posts |
| GET | `/api/clusters` | Filterable issue clusters |
| GET | `/api/clusters/:id` | Cluster evidence, posts, and audit trail |
| PATCH | `/api/clusters/:id` | Officer lifecycle, assignment, or routing update |
| GET | `/api/hotspots` | Geographic hotspot data |
| GET | `/api/trends` | Category/time trend data |
| GET | `/api/graph` | Cluster/location/department graph |
| GET | `/api/departments` | Department directory |

## Demo walkthrough

1. Open **Monitoring inbox**.
2. Submit the supplied Hindi pothole complaint near Bhikhna Pahari school.
3. Inspect the category, location, routing, duplicate signal, and priority recommendation.
4. Open the linked cluster from the result.
5. Verify it, assign a field team, start work, then resolve it.
6. Visit **Command centre** or **Insights & graph** to observe updated data.

## Safety and current limitations

- The default analysis engine is a transparent rule-based demo provider, not a trained production NLP or vision model.
- Evidence labels are demo labels until an approved vision provider is configured.
- The map is an illustrative Bihar-oriented hotspot visualisation, not an authoritative asset-ownership map.
- Department routing is a recommendation; officers must confirm the responsible authority.
- Real social-media ingestion, official ticketing integration, role-based authentication, and production object storage are future work requiring formal authorisation and data-governance review.
