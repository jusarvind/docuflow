const AboutPage = () => {
  const stack = [
    {
      label: "Backend",
      items: [
        ".NET 10",
        "Clean Architecture",
        "CQRS + MediatR",
        "Entity Framework Core",
        "PostgreSQL",
        "Hangfire",
      ],
    },
    {
      label: "Frontend",
      items: [
        "React 18",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "TanStack Query",
        "React Hook Form + Zod",
      ],
    },
    {
      label: "AI & Processing",
      items: [
        "Groq API",
        "PdfPig",
        "Background job pipeline",
        "Multi-step status tracking",
        "Webhook notifications",
      ],
    },
    {
      label: "Auth & Testing",
      items: [
        "JWT authentication",
        "Multi-tenancy (EF Core filters)",
        "xUnit + integration tests",
        "WebApplicationFactory",
        "MailKit (SMTP)",
      ],
    },
  ];

  const challenges = [
    {
      title: "EF Core tracking & PostgreSQL concurrency",
      description:
        "AsNoTracking() combined with Attach + Modified caused extracted fields to silently not persist. Compounded by PostgreSQL's xmin row versioning bumping after ExtractionJob updates, causing EF Core to see stale versions on subsequent saves. Fixed by implementing dedicated repository methods using ExecuteUpdateAsync to bypass the change tracker entirely.",
    },
    {
      title: "Multi-tenant data isolation",
      description:
        "Tenant scoping is enforced at the EF Core level via global query filters on every entity rather than at the application layer, making cross-tenant data leakage structurally impossible regardless of how queries are written.",
    },
    {
      title: "Background processing pipeline",
      description:
        "Documents move through Uploaded → Queued → Processing → Completed via Hangfire jobs. Invalid status transitions and concurrency exceptions from multiple SaveChangesAsync calls on tracked entities required careful state machine design and precise sequencing.",
    },
    {
      title: "AI extraction with confidence scoring",
      description:
        "Groq API extracts structured fields from documents based on a configurable schema. PdfPig handles text extraction before passing content to the model. Confidence scores are returned and persisted alongside each extracted field, with webhook notifications dispatched on completion or failure.",
    },
    {
      title: "Integration test isolation",
      description:
        "WebApplicationFactory-based integration tests use a unique in-memory database name per test instance (Guid.NewGuid()) to prevent state bleed between tests, a subtle but critical detail for reliable parallel test runs.",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Hero card */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-sm font-semibold text-gray-900">
            What is DocuFlow?
          </h2>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed text-justify">
          DocuFlow is a multi-tenant document processing SaaS built on .NET 10
          and React. You upload an invoice, a contract, or a spreadsheet and the
          system handles the rest. It extracts structured data using AI entirely
          in the background, with each tenant's data kept completely separate at
          the database level. The project covers the full stack: Clean
          Architecture, CQRS, JWT auth, a React frontend, AI integration,
          webhook notifications, and integration tests.
        </p>
      </div>

      {/* Architecture */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">
          Architecture
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed text-justify mb-5">
          The backend follows Clean Architecture with four layers. Domain sits
          at the core with no external dependencies, just entities, enums, and
          domain events. Application wraps it with CQRS handlers via MediatR and
          repository interfaces, defining what the system does without caring
          about how it is implemented. Infrastructure is where everything is
          wired up: EF Core repositories talking to PostgreSQL, Hangfire for
          background jobs, Cloudflare R2 for file storage, Groq for AI
          extraction, and MailKit for email. The API layer is the thin entry
          point handling controllers, JWT middleware, tenant resolution, and DI
          wiring.
        </p>
      </div>

      {/* Document processing flow */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">
          Document processing flow
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed text-justify mb-5">
          When a file is uploaded the API stores it in Cloudflare R2 and creates
          an ExtractionJob in PostgreSQL. Hangfire picks up the job and walks
          the document through each status stage. Text is extracted based on the
          file type using PdfPig for PDFs, a plain reader for TXT and CSV, and
          EPPlus for Excel. The extracted text is then passed to Groq along with
          the tenant's configured schema. Fields and confidence scores are
          persisted once extraction is complete, and a webhook fires to notify
          the tenant on success or failure.
        </p>
        <img
          src="public\docuflow_pipeline.svg"
          alt="DocuFlow document processing pipeline"
          className="w-full max-w-lg mx-auto block rounded-lg border border-gray-100"
        />
      </div>

      {/* Tech Stack */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Tech Stack</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {stack.map((section) => (
            <div
              key={section.label}
              className="rounded-lg border border-gray-100 bg-slate-50 p-4"
            >
              <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded-md border mb-3 bg-gray-100 text-gray-600 border-gray-200">
                {section.label}
              </span>
              <ul className="space-y-1.5">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-gray-700 flex items-center gap-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-gray-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Engineering Challenges */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">
          Key engineering challenges
        </h2>
        <div className="space-y-0 divide-y divide-gray-100">
          {challenges.map((c, i) => (
            <div key={c.title} className="py-4 first:pt-0 last:pb-0 flex gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center mt-0.5">
                <span className="text-xs font-semibold text-gray-500">
                  {i + 1}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{c.title}</p>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed text-justify">
                  {c.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Built by */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Built by</h2>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-white">AC</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Arvind Chauhan
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Software Developer · NZ
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/jusarvind/docuflow"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 bg-slate-50 border border-gray-200 hover:border-gray-300 px-3 py-1.5 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/arvind-chauhan-8279ba405/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-900 bg-blue-50 border border-blue-200 hover:border-blue-300 px-3 py-1.5 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
