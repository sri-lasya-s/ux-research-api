# UX Research Study API

A contract-first REST API for managing UX research studies, built with TypeScript, Express, and OpenAPI 3.1.0.

## Live URLs
- **API Documentation (Swagger UI):** https://ux-research-api.azurewebsites.net/docs
- **Client Application:** https://ux-research-api.azurewebsites.net/client
- **OpenAPI YAML:** https://ux-research-api.azurewebsites.net/openapi.yaml
- **OpenAPI JSON:** https://ux-research-api.azurewebsites.net/openapi.json

## Tech Stack
- **Language:** TypeScript / Node.js
- **Framework:** Express
- **Spec Router:** openapi-backend
- **Database:** Supabase (PostgreSQL)
- **Client Generator:** Hey API (openapi-ts)
- **Deployment:** Azure App Service

## Project Structure
ux-research-api/
├── openapi.yaml              ← OpenAPI 3.1.0 specification (source of truth)
├── client/
│   └── index.html            ← Client web application
├── src/
│   ├── server.ts             ← Express app + openapi-backend wiring
│   ├── supabase.ts           ← Supabase client configuration
│   ├── sdk-client.ts         ← Generated SDK exports
│   ├── client-api.ts         ← Express routes using generated SDK
│   ├── types/
│   │   └── study.ts          ← TypeScript interfaces mirroring YAML schemas
│   ├── store/
│   │   └── studies.ts        ← Data access layer (Supabase)
│   ├── handlers/             ← One handler per operationId
│   │   ├── StudyService_list.ts
│   │   ├── StudyService_create.ts
│   │   ├── StudyService_get.ts
│   │   ├── StudyService_update.ts
│   │   ├── StudyService_delete.ts
│   │   └── StudyService_summary.ts
│   └── generated-client/     ← Auto-generated SDK from openapi.yaml

## OperationId Mapping
| OperationId | Method | Path | Handler |
|---|---|---|---|
| StudyService_list | GET | / | handlers/StudyService_list.ts |
| StudyService_create | POST | / | handlers/StudyService_create.ts |
| StudyService_get | GET | /{id} | handlers/StudyService_get.ts |
| StudyService_update | PATCH | /{id} | handlers/StudyService_update.ts |
| StudyService_delete | DELETE | /{id} | handlers/StudyService_delete.ts |
| StudyService_summary | GET | /summary | handlers/StudyService_summary.ts |

## Database Schema
Database: PostgreSQL (Supabase)
Table: `studies`

| Column | Type | Constraints |
|---|---|---|
| id | UUID | PRIMARY KEY, auto-generated |
| title | TEXT | NOT NULL |
| studyType | TEXT | NOT NULL, CHECK IN ('Usability', 'Interview', 'Survey', 'A/B Test') |
| status | TEXT | NOT NULL, CHECK IN ('Planned', 'Active', 'Completed') |
| researcherName | TEXT | NOT NULL |
| durationMinutes | INTEGER | NOT NULL |
| notes | TEXT | optional |

## Setup Instructions

### Prerequisites
- Node.js 20+
- A Supabase account

### 1. Clone the repository
```bash
git clone https://github.com/sri-lasya-s/ux-research-api.git
cd ux-research-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
cp .env.example .env
Fill in your Supabase credentials in `.env`:
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key

### 4. Set up the database
Run this SQL in your Supabase SQL Editor:
```sql
CREATE TABLE studies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  "studyType" TEXT NOT NULL CHECK ("studyType" IN ('Usability', 'Interview', 'Survey', 'A/B Test')),
  status TEXT NOT NULL CHECK (status IN ('Planned', 'Active', 'Completed')),
  "researcherName" TEXT NOT NULL,
  "durationMinutes" INTEGER NOT NULL,
  notes TEXT
);
```

### 5. Run the server
```bash
npm run dev
```

Server runs at `http://localhost:3000`
Swagger UI at `http://localhost:3000/docs`
Client at `http://localhost:3000/client`

## Client Generation Command
The client SDK was generated using Hey API:
```bash
npx @hey-api/openapi-ts -i openapi.yaml -o src/generated-client -c @hey-api/client-fetch
```

## Environment Variables
See `.env.example` for required variables:
SUPABASE_URL=
SUPABASE_KEY=

Reflection
Why I chose UX Research Studies as my domain:
I chose UX Research Studies because it is something i wanted to build for myself. Every research team needs a way to organize and track their studies, participants, and findings. It has enough fields to make the API interesting and enums for study type and status, numeric fields for duration and without being overly complex for a first contract-first project.
Why I chose TypeScript, Express, and Supabase:
I chose TypeScript and Express because the tutorial gave me a solid foundation and I wanted to understand the contract-first pattern deeply rather than fighting a new language at the same time. For the database I chose Supabase because it provides a free hosted PostgreSQL instance that is easy to connect to from a Node.js application. It gave me a real cloud database with a visual dashboard which made it easy to verify that data was actually persisting across server restarts.
What I learned about contract-first development:
The most important lesson was that writing the YAML specification first forces you to think clearly about your API design before writing a single line of code. When I wrote the openapi.yaml first I had to make real decisions upfront — what fields are required, what the enum values should be, what the response schemas look like. This made the implementation much smoother because the contract was already decided. I also discovered the power of operationIds — they became the bridge between the spec and the code, with openapi-backend automatically routing requests to the right handler by name.
Specific challenges I faced:
Azure deployment was the biggest challenge. My student subscription had regional restrictions that blocked several deployment attempts. I solved this by using GitHub Actions for CI/CD deployment, which also taught me about proper deployment pipelines. Another challenge was TypeScript type errors from the Supabase library which required adding skipLibCheck to tsconfig.json. CORS middleware ordering in Express also caused issues until I registered the /client-api routes before the openapi-backend catch-all handler.
How spec-driven compares to code-first:
In code-first development you write the implementation and generate documentation afterward — the documentation is always playing catch-up. In contract-first the specification is the single source of truth from day one. The same openapi.yaml file drove my server routing, automatic request validation, Swagger UI documentation, and even the generated client SDK. One file, multiple consumers and that is the core value of contract-first development.