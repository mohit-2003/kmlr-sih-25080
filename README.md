# 🧠 **KMRL InsightVault**

**An AI-powered document intelligence and workflow automation platform for Kochi Metro Rail Limited (KMRL).**
It centralizes, reads, summarizes, classifies, and routes organizational documents — helping teams make faster, data-driven decisions.

---

## 🚆 **Overview**

Since its first commercial run in 2017, Kochi Metro Rail Limited (KMRL) has evolved into a complex, multidisciplinary enterprise that generates and receives **thousands of documents daily** — engineering drawings, maintenance reports, invoices, safety circulars, HR policies, and legal files.

These arrive via **emails, SharePoint, Maximo exports, WhatsApp PDFs, scans, and ad-hoc cloud links**, often in **English + Malayalam** with tables, signatures, and images.

Manual document handling causes:

* ⏱️ **Information delays** (slow decisions)
* 🧩 **Siloed awareness** across departments
* ⚠️ **Compliance risks** (missed deadlines)
* 🧠 **Knowledge loss** when staff transfer/retire
* ♻️ **Duplicate effort** (manual summaries/slides)

**KMRL InsightVault** eliminates these problems using **AI, OCR, and automation** to convert unstructured document chaos into actionable insight.

---

## 🎯 **Goals & Outcomes**

**KMRL InsightVault** ensures every stakeholder — from station controller to director — gets **concise, trustworthy summaries** of only the documents relevant to them.

✅ Faster, cross-departmental decision-making
✅ Auto summaries (short + detailed + action items)
✅ Centralized document hub with traceability
✅ Preserved institutional knowledge
✅ Reduced manual effort and human dependency

---

## 🧩 **System Modules**

| #      | Module                                | Description                                                                                        |
| ------ | ------------------------------------- | -------------------------------------------------------------------------------------------------- |
| 1️⃣    | **Document Ingestion**                | Central upload + S3 storage for PDFs, scans, and attachments.                                      |
| 2️⃣    | **Pre-processing (OCR + Language)**   | Extracts text using Tesseract OCR, detects English/Malayalam, translates if needed.                |
| 3️⃣    | **AI Summarization & Classification** | Uses Gemini API to generate short & detailed summaries, extract actions, and auto-tag departments. |
| 4️⃣    | **Job Queue & Worker**                | Background processor that runs OCR and AI tasks asynchronously.                                    |
| 5️⃣    | **Routing & Notifications**           | Auto-routes documents to relevant department dashboards; sends notifications.                      |
| 6️⃣    | **Department Dashboards**             | Frontend module showing inbox, filters, summaries, and PDF viewer for each department.             |
| 7️⃣    | **Knowledge Repository**              | Searchable institutional archive of all documents + summaries.                                     |
| 8️⃣    | **Admin Panel**                       | Manage users, roles, departments, and document tracking.                                           |
| 9️⃣    | **Search Engine**                     | Keyword-based search with optional semantic enhancement.                                           |
| 🔟     | **Authentication & RBAC**             | JWT-based login with Admin/Head/Staff roles.                                                       |
| 1️⃣1️⃣ | **DevOps & Deployment**               | Dockerized stack deployed on AWS EC2 with S3 integration.                                          |
| 1️⃣2️⃣ | **Integration & Testing**             | End-to-end validation, demo dataset, and documentation.                                            |

---

### ✨ **Features — KMRL InsightVault**


#### 📂 Document Management

* Centralized document ingestion (emails, SharePoint, Maximo, WhatsApp, manual upload)
* Drag-and-drop file uploads (PDFs, images, scans)
* AWS S3 integration for secure, scalable file storage
* Metadata capture (filename, uploader, department, upload date)
* File type & size validation
* Support for English, Malayalam, and bilingual documents

#### 🧾 Pre-processing & OCR

* Automatic document type detection (scanned vs digital)
* OCR using **Tesseract** for image and scanned PDFs
* Language detection (English / Malayalam / mixed)
* On-demand Malayalam → English translation
* Text cleaning, normalization, and formatting
* Metadata extraction (sender, date, title)

#### 🤖 AI Summarization & Classification

* AI-powered **summaries** using **Gemini API**

  * Short summary (2–3 lines)
  * Detailed summary (key bullet points)
* Action item extraction (deadlines, approvals, payments)
* Department classification (HR, Safety, Finance, Legal, Engineering, Procurement)
* Multiple department tags per document
* JSON-based structured AI output
* Summary traceability (view AI summary + original doc)

#### ⚙️ Background Processing

* Asynchronous **job queue** for OCR and AI processing
* Job status tracking (pending → running → processed → failed)
* Retry mechanism for failed tasks
* Independent background worker for long tasks
* Real-time job monitoring API

#### 📨 Document Routing & Notifications

* Auto-routing of documents to relevant departments
* Multi-department routing support
* In-app notifications for new documents
* Priority-based tagging (e.g., *High*, *Compliance Required*)
* Real-time notification updates (via polling or socket)
* Routing logs for tracking document flow

#### 🖥️ Department Dashboards

* Role-based dashboard (Admin / Department Head / Staff)
* “Today’s Inbox” – list of assigned documents
* Search bar for quick lookup (by keyword or tag)
* Filters (by department, type, upload date)
* PDF viewer for original document access
* AI-generated summaries and action items displayed side-by-side
* Responsive layout using React + Tailwind + shadcn/ui

#### 🧠 Knowledge Repository

* Centralized archive of all processed documents
* Searchable by keyword, department, or date
* Advanced semantic search-ready architecture (FAISS/Milvus)
* Persistent institutional memory – past summaries and directives preserved
* Quick access to historical safety circulars, invoices, or HR policies

#### 🔍 Search & Filter

* Keyword-based search (PostgreSQL LIKE queries)
* Multi-field filters (department, uploader, date, tag)
* Partial and case-insensitive search support
* Pagination and sorting options
* Ready for future semantic search (vector embedding-based retrieval)

#### 🔐 Authentication & Role Management

* Secure login with JWT-based authentication
* Password encryption (bcrypt)
* Role-based access control (RBAC):

  * **Admin:** Manage everything
  * **Department Head:** Approve/view documents
  * **Staff:** View assigned documents only
* Protected API routes (JWT middleware)
* Logout & session expiration handling

#### 🧰 Admin Panel

* Manage users (add/edit/delete)
* Manage departments
* Assign roles and permissions
* Monitor document processing status (OCR, AI jobs)
* View list of uploaded documents and summaries

#### 📊 Monitoring & Status Tracking

* Document lifecycle tracking (Uploaded → Processed → Assigned → Viewed)
* Job queue monitoring (success/failure stats)
* System health API (basic backend uptime info)
* Logs for AI & OCR events (stored in database for debugging)

#### 🧱 DevOps & Deployment

* Dockerized setup for backend and database
* `docker-compose.yml` for one-command local run
* AWS EC2 deployment ready
* S3 integration for production file storage
* Environment variable configuration (.env)
* PostgreSQL database migration scripts
* Local setup guide for team testing

#### 🧪 Integration & Testing

* End-to-end flow testing (`Upload → OCR → AI → Dashboard`)
* API testing with Postman collection
* Unit tests for core API endpoints
* Demo dataset with 5 sample PDFs (Engineering, Safety, HR, Finance, Legal)
* Detailed runbook for professor/demo review


#### 📈 Future Enhancements (Do It Later)

* Semantic search using **FAISS** or **Milvus**
* Auto workflow approvals and escalation system
* Email/SMS notifications for high-priority docs
* On-premise LLM (LLaMA / Mistral) integration
* Analytics dashboards (e.g., department load, compliance rate)
* Real-time updates via WebSocket
* ElasticSearch integration for fuzzy search
* Policy change detection between document versions
* AI chatbot: “Ask your documents” feature (RAG-based)
* Multi-language UI (English + Malayalam)

---

## ⚙️ **Tech Stack**

| Layer              | Technology                                                          | Description                                   |
| ------------------ | ------------------------------------------------------------------- | --------------------------------------------- |
| **Frontend**       | React + Vite + Tailwind CSS + shadcn/ui + lucide-react | Modern dashboard UI with clean UX             |
| **Backend**        | Express.js (Node.js)                                                | REST APIs, middleware, JWT, and routing       |
| **Database**       | PostgreSQL                                                          | Metadata and summary storage                  |
| **Storage**        | AWS S3                                                              | Document storage                              |
| **OCR Engine**     | Tesseract                                                           | Local text extraction (English + Malayalam)   |
| **LLM / AI Layer** | Gemini API                                                          | Summarization, classification, and extraction |
| **Queue System**   | Node worker + Job table                                             | Asynchronous OCR/AI processing                |
| **Auth**           | JWT + bcrypt                                                        | Secure access & role-based routes             |
| **Deployment**     | Docker + AWS EC2                                                    | Production-ready containerized deployment     |

---

## 🚀 **Setup Instructions**

### 🔧 Prerequisites

* Node.js ≥ 18
* PostgreSQL ≥ 15
* Docker (optional, for deployment)
* AWS Account (for S3 access)
* Gemini API key

---

### ⚙️ Environment Variables

Create a `.env` file:

```bash
PORT=8080
DATABASE_URL=postgresql://user:password@localhost:5432/kmrl
JWT_SECRET=super-secret-key
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=xxxx
AWS_SECRET_ACCESS_KEY=xxxx
S3_BUCKET_NAME=kmrl-insightvault
GEMINI_API_KEY=xxxx
OCR_LANG=eng+mal
```

---

### 🧠 Installation Steps

```bash
# 1. Clone the repository
git clone https://github.com/mohit-2003/KMLR-SIH-25080
cd backend

# 2. Install dependencies
npm install

# 3. Setup PostgreSQL database
npx prisma migrate dev   # or sequelize db:migrate

# 4. Start backend
npm run dev

# 5. Run frontend
cd client
npm install
npm run dev
```

---

## 🧾 **Future Enhancements**

* Semantic search using FAISS or Milvus
* Workflow approvals and version control
* Auto-notifications via email and SMS
* Real-time updates using WebSocket
* Fine-tuned on-prem LLM (LLaMA/Mistral)
* Analytics dashboard for compliance tracking

---

## 📜 **License**

MIT License © 2025
Developed by Team **KMRL InsightVault**

---

## 🌐 **Project Links**

* 📘 Problem Statement: *PS - 25080*
* 🧩 Documentation & Architecture: *coming soon*
* 🧠 Demo Video (if applicable): *coming soon*

## Contact
For support or queries, reach out at mohitk.mca25@cs.du.ac.in
