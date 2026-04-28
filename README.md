# UX Research Study API

A contract-first REST API built with TypeScript, Express, and openapi-backend.  
Domain: UX Research Studies — manage usability tests, interviews, surveys, and more.

## Quick Start

```bash
npm install
npm run dev
```

Then open: http://localhost:3000/docs

## Project Structure

```
ux-research-api/
├── studyopenapi.yaml        ← OpenAPI 3.1.0 spec (source of truth)
├── src/
│   ├── server.ts            ← Express app + operationId wiring
│   ├── types/study.ts       ← TypeScript interfaces
│   ├── store/studies.ts     ← In-memory store with seed data
│   └── handlers/index.ts   ← One handler per operationId
```

## operationId → Handler Mapping

| operationId            | Method | Path      |
|------------------------|--------|-----------|
| StudyService_list      | GET    | /         |
| StudyService_create    | POST   | /         |
| StudyService_get       | GET    | /{id}     |
| StudyService_update    | PATCH  | /{id}     |
| StudyService_delete    | DELETE | /{id}     |
| StudyService_summary   | GET    | /summary  |

## API Endpoints

| Route          | Purpose                          |
|----------------|----------------------------------|
| /docs          | Swagger UI interactive docs      |
| /openapi.yaml  | Raw YAML spec                    |
| /openapi.json  | JSON spec                        |

## Reflection

*(300–500 words — fill this in before submitting)*

I chose the UX Research Studies domain because...

For the technology stack, I chose TypeScript with Node.js and openapi-backend because...

The contract-first approach taught me...

Specific challenges I faced included...

Compared to writing code first, the spec-driven approach...
