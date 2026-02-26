const AboutPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">About</h1>
        <p className="text-gray-600 text-sm mt-1">
          What DocuFlow is and how it was built
        </p>
      </div>

      {/* What is DocuFlow */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">
          What is DocuFlow?
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          DocuFlow is a multi-tenant document processing SaaS application. Users
          can upload documents — invoices, PDFs, spreadsheets — and have
          structured data automatically extracted using AI. Each organisation's
          data is fully isolated, and documents move through a background
          processing pipeline from upload to extraction without any manual
          intervention.
        </p>
      </div>

      {/* Tech Stack */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Tech Stack</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              label: "Backend",
              items: [
                ".NET 8",
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
                "PdfPig (PDF extraction)",
                "Background job pipeline",
                "Multi-step status tracking",
              ],
            },
            {
              label: "Auth & Infrastructure",
              items: [
                "JWT authentication",
                "Multi-tenancy (EF Core filters)",
                "Docker + PostgreSQL",
                "MailKit (SMTP)",
              ],
            },
          ].map((section) => (
            <div key={section.label} className="bg-slate-50 rounded-lg p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                {section.label}
              </p>
              <ul className="space-y-1.5">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-gray-700 flex items-center gap-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Key Engineering Challenges */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">
          Key Engineering Challenges
        </h2>
        <div className="space-y-4">
          {[
            {
              title: "EF Core change tracking",
              description:
                "AsNoTracking() combined with Attach + Modified caused extracted fields to silently not persist. Fixed by implementing dedicated repository methods that work with the tracked context directly.",
            },
            {
              title: "Multi-tenant data isolation",
              description:
                "Tenant scoping is enforced at the EF Core level via global query filters on every entity — not at the application layer — making cross-tenant data leakage structurally impossible.",
            },
            {
              title: "Background processing pipeline",
              description:
                "Documents move through Uploaded → Queued → Processing → Completed via Hangfire jobs. Invalid status transitions and EF Core concurrency exceptions from multiple SaveChangesAsync calls required careful sequencing.",
            },
            {
              title: "AI extraction",
              description:
                "Groq API extracts structured fields from documents. PdfPig handles PDF text extraction before passing content to the model. Confidence scores are returned and persisted alongside each extracted field.",
            },
          ].map((challenge) => (
            <div
              key={challenge.title}
              className="border-l-2 border-blue-500 pl-4"
            >
              <p className="text-sm font-semibold text-gray-900">
                {challenge.title}
              </p>
              <p className="text-sm text-gray-700 mt-0.5 leading-relaxed">
                {challenge.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Built by */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Built by</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">Arvind Chauhan</p>
            <p className="text-sm text-gray-600 mt-0.5">
              .NET & React developer based in Auckland, NZ
            </p>
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
              View on GitHub
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
