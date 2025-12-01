import React, { useState } from "react";
import axios from "axios";
import { Search, Loader2, FileText } from "lucide-react";

import InputWithIcon from "@/components/ui/input-with-icon";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const res = await axios.get(
        "import.meta.env.VITE_SERVER_URL/api/v1/search",
        {
          params: {
            q: query,
            limit: 20,
          },
        }
      );

      setResults(res.data.documents || []);
      setTotal(res.data.results || 0);
    } catch (err) {
      console.error("Search failed:", err);
      setError("Search failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      {/* Search Bar */}
      <Card className="mb-6 p-6">
        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="flex-1">
            <InputWithIcon
              icon={Search}
              placeholder="Search documents..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* Go Button */}
          <Button
            onClick={handleSearch}
            className="w-auto px-6 bg-blue-600 hover:bg-blue-700"
          >
            Go
          </Button>
        </div>
      </Card>

      {/* Loading */}
      {loading && (
        <div className="text-center mt-10">
          <Loader2 size={36} className="animate-spin mx-auto text-blue-600" />
          <p className="text-gray-500 mt-2">Searching…</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center font-semibold">
          {error}
        </div>
      )}

      {/* Results */}
      {!loading && results.length > 0 && (
        <div className="mt-8 space-y-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            {total} results found for “{query}”
          </h2>

          {results.map((doc) => (
            <Card key={doc.id} className="p-6 hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="text-blue-600" size={22} />
                <h3 className="text-lg font-semibold text-gray-900">
                  {doc.file_name}
                </h3>
              </div>

              <p className="text-gray-600 text-sm">
                {doc.short_summary_en || "No summary available"}
              </p>

              <p className="text-xs text-gray-400 mt-2">
                {doc.status} • {doc.createdAt?.slice(0, 10)}
              </p>

              {doc.storage_url && (
                <Button
                  onClick={() => window.open(doc.storage_url, "_blank")}
                  className="mt-4 w-auto px-5 bg-blue-600 hover:bg-blue-700"
                >
                  View Document
                </Button>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* No Results */}
      {!loading && query && results.length === 0 && !error && (
        <div className="text-center mt-10 text-gray-500">No results found.</div>
      )}
    </div>
  );
};

export default SearchPage;
