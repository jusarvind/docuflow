# DocuFlow

> Multi-tenant document processing SaaS — upload documents, extract structured data with AI.

## Overview

DocuFlow is a full-stack multi-tenant SaaS application that allows organisations to upload documents (invoices, contracts, PDFs) and automatically extract structured data using AI. Each tenant's data is fully isolated at the database level. Documents are processed asynchronously in the background, moving from upload through to AI extraction without any manual steps.

---

## Architecture

DocuFlow follows Clean Architecture with four layers. The **Domain** layer sits at the core and contains all entities, enums, and domain events with zero external dependencies. The **Application** layer wraps the domain with CQRS handlers (MediatR), repository interfaces, and DTOs — it defines what the system can do without knowing how. The **Infrastructure** layer implements those interfaces: EF Core repositories talking to PostgreSQL, Hangfire for background jobs, Cloudflare R2 for file storage, Groq API for AI extraction, and MailKit for email. The **API** layer is the thin ASP.NET Core entry point — controllers, JWT authentication middleware, and dependency injection wiring.

When a document is uploaded, the API creates a `Document` entity and an `ExtractionJob`, stores the file in R2, and queues a Hangfire background job. The job moves the document through `Uploaded → Queued → Processing → Completed`, calling PdfPig to extract raw text and then the Groq API to extract structured fields based on a configurable schema. Confidence scores are persisted alongside each field, and a webhook notification is dispatched on completion or failure.

---

## Tech Stack

**Backend**

- .NET 10, ASP.NET Core
- Clean Architecture + CQRS + MediatR
- Entity Framework Core + PostgreSQL
- Hangfire (background jobs)
- JWT authentication + multi-tenancy via EF Core global query filters

**Frontend**

- React 18 + TypeScript + Vite
- Tailwind CSS
- TanStack Query + React Hook Form + Zod

**AI & Processing**

- Groq API (field extraction)
- PdfPig (PDF text extraction)
- Cloudflare R2 (file storage)
- MailKit (SMTP notifications)

**Testing**

- xUnit + WebApplicationFactory integration tests
- Unique in-memory DB per test instance for isolation

---

## Running Locally

### Prerequisites

- .NET 10 SDK
- Node.js 18+
- PostgreSQL
- Docker (optional)

### Backend

```bash
cd src/DocuFlow.Api
dotnet run
```

### Frontend

```bash
cd src/DocuFlow.Web
npm install
npm run dev
```

### Environment Variables

Copy `appsettings.json` and fill in the following:

| Key                                    | Description                                     |
| -------------------------------------- | ----------------------------------------------- |
| `ConnectionStrings__DefaultConnection` | PostgreSQL connection string                    |
| `Jwt__Secret`                          | JWT signing secret (min 32 chars)               |
| `Groq__ApiKey`                         | Groq API key                                    |
| `R2__AccountId`                        | Cloudflare R2 account ID                        |
| `R2__AccessKeyId`                      | Cloudflare R2 access key                        |
| `R2__SecretAccessKey`                  | Cloudflare R2 secret key                        |
| `R2__BucketName`                       | R2 bucket name                                  |
| `Email__SmtpHost`                      | SMTP host                                       |
| `Email__Username`                      | SMTP username                                   |
| `Email__Password`                      | SMTP password                                   |
| `Cors__AllowedOrigins`                 | Frontend URL (e.g. https://docuflow.vercel.app) |

---

## Author

**Arvind Chauhan** — Software Developer, NZ
