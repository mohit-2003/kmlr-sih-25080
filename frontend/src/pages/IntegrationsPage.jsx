import React, { useState } from "react";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import {
  Mail,
  MessageSquare,
  Database,
  Share2,
  PlugZap,
  Cloud,
} from "lucide-react";

// --------------------------
// INTEGRATION LIST
// --------------------------
const integrations = [
  {
    id: 1,
    name: "Email",
    description: "Automatically collect and process documents from inboxes.",
    icon: <Mail className="w-6 h-6 text-blue-600" />,
    status: "Not Connected",
  },
  {
    id: 2,
    name: "WhatsApp Business API",
    description: "Ingest documents and messages directly from WhatsApp.",
    icon: <MessageSquare className="w-6 h-6 text-green-600" />,
    status: "Not Connected",
  },
  {
    id: 3,
    name: "IBM Maximo",
    description: "Sync work orders and compliance docs with Maximo.",
    icon: <Database className="w-6 h-6 text-purple-600" />,
    status: "Not Connected",
  },
  {
    id: 4,
    name: "Microsoft SharePoint",
    description: "Fetch and index documents from SharePoint libraries.",
    icon: <Share2 className="w-6 h-6 text-indigo-600" />,
    status: "Connected",
  },
  {
    id: 5,
    name: "Cloud Storage",
    description: "Connect Google Drive, OneDrive, or AWS S3.",
    icon: <Cloud className="w-6 h-6 text-sky-600" />,
    status: "Not Connected",
  },
];

// --------------------------
// FORMS FOR EACH INTEGRATION
// --------------------------
const integrationForms = {
  Email: [
    { label: "IMAP Server", name: "imapServer", type: "text", placeholder: "imap.gmail.com" },
    { label: "SMTP Server", name: "smtpServer", type: "text", placeholder: "smtp.gmail.com" },
    { label: "Email Address", name: "email", type: "email", placeholder: "example@company.com" },
    { label: "Password / App Key", name: "password", type: "password", placeholder: "********" },
  ],

  "WhatsApp Business API": [
    { label: "API Key", name: "apiKey", type: "text", placeholder: "Your WhatsApp API key" },
    { label: "Business Number", name: "number", type: "text", placeholder: "+91XXXXXXXXXX" },
    { label: "Webhook URL", name: "webhook", type: "text", placeholder: "https://yourserver/webhook" },
  ],

  "IBM Maximo": [
    { label: "Maximo URL", name: "url", type: "text", placeholder: "https://maximo.company.com/api" },
    { label: "Username", name: "username", type: "text", placeholder: "maximo_user" },
    { label: "Password", name: "password", type: "password", placeholder: "********" },
  ],

  "Microsoft SharePoint": [
    { label: "Tenant ID", name: "tenantId", type: "text", placeholder: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" },
    { label: "Client ID", name: "clientId", type: "text", placeholder: "SharePoint App Client ID" },
    { label: "Client Secret", name: "clientSecret", type: "password", placeholder: "********" },
    { label: "Site URL", name: "siteUrl", type: "text", placeholder: "https://company.sharepoint.com/sites/project" },
  ],

  "Cloud Storage": [
    { label: "Provider", name: "provider", type: "select", options: ["Google Drive", "OneDrive", "AWS S3"] },
    { label: "Access Key", name: "accessKey", type: "text", placeholder: "Enter access key" },
    { label: "Secret Key", name: "secretKey", type: "password", placeholder: "********" },
    { label: "Bucket / Folder", name: "bucket", type: "text", placeholder: "bucket-name or folder path" },
  ],
};

// --------------------------
// MODAL COMPONENT
// --------------------------
const IntegrationModal = ({ open, onClose, integration, onSave }) => {
  const [formData, setFormData] = useState({});

  if (!open || !integration) return null;

  const fields = integrationForms[integration.name];

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Settings Saved For:", integration.name, formData);
    onSave(integration, formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-4">
      <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-xl">
        
        <h2 className="text-2xl font-bold mb-2">Configure {integration.name}</h2>
        <p className="text-gray-600 mb-6">Enter the details below.</p>

        <div className="space-y-4">
          {fields.map((field, idx) => (
            <div key={idx}>
              <label className="block mb-1 font-medium">{field.label}</label>

              {field.type === "select" ? (
                <select
                  className="w-full border px-4 py-2 rounded-lg"
                  onChange={(e) => handleChange(field.name, e.target.value)}
                >
                  <option>Select provider</option>
                  {field.options.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full border px-4 py-2 rounded-lg"
                  onChange={(e) => handleChange(field.name, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

// --------------------------
// MAIN PAGE
// --------------------------
const IntegrationsPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeIntegration, setActiveIntegration] = useState(null);

  const handleOpen = (integration) => {
    setActiveIntegration(integration);
    setModalOpen(true);
  };

  const handleSave = (integration, data) => {
    console.log("Saved:", integration.name, data);
    // TODO: Send to backend
  };

  return (
    <div className="space-y-6">
      
      {/* PAGE HEADER */}
      <Card className="p-8">
        <h1 className="text-3xl font-bold flex items-center gap-2 mb-2">
          <PlugZap className="text-blue-600" /> Integrations
        </h1>
        <p className="text-gray-600">Connect external tools & automate workflows.</p>
      </Card>

      {/* GRID */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {integrations.map((item) => (
          <Card key={item.id} className="p-6">
            <div className="flex items-center gap-3 mb-4">
              {item.icon}
              <h2 className="text-lg font-semibold">{item.name}</h2>
            </div>

            <p className="text-sm text-gray-600 mb-4">{item.description}</p>

            <div className="flex justify-between items-center">
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  item.status === "Connected"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {item.status}
              </span>

              <Button
                onClick={() => handleOpen(item)}
                className="w-auto px-4 py-2 text-sm"
              >
                {item.status === "Connected" ? "Manage" : "Connect"}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* MODAL */}
      <IntegrationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        integration={activeIntegration}
        onSave={handleSave}
      />
    </div>
  );
};

export default IntegrationsPage;
