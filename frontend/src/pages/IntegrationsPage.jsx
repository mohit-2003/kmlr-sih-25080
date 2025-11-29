import React from "react";
import {
  Mail,
  MessageSquare,
  Database,
  Share2,
  PlugZap,
  Cloud,
} from "lucide-react";

const integrations = [
  {
    id: 1,
    name: "Email",
    description:
      "Automatically collect and process documents from company inboxes.",
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
    description: "Fetch and index documents stored in SharePoint libraries.",
    icon: <Share2 className="w-6 h-6 text-indigo-600" />,
    status: "Connected",
  },
  {
    id: 5,
    name: "Cloud Storage",
    description:
      "Connect with Google Drive, OneDrive, or AWS S3 for seamless sync.",
    icon: <Cloud className="w-6 h-6 text-sky-600" />,
    status: "Not Connected",
  },
];

const IntegrationsPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <PlugZap className="text-blue-600" /> Integrations
      </h1>
      <p className="text-gray-600 mb-8">
        Connect your existing tools and platforms to centralize document
        processing.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {integrations.map((integration) => (
          <div
            key={integration.id}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-3 mb-4">
              {integration.icon}
              <h2 className="text-lg font-semibold">{integration.name}</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              {integration.description}
            </p>
            <div className="flex justify-between items-center">
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  integration.status === "Connected"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {integration.status}
              </span>
              <button
                className={`px-4 py-2 text-sm rounded-lg font-medium transition ${
                  integration.status === "Connected"
                    ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {integration.status === "Connected" ? "Manage" : "Connect"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntegrationsPage;
