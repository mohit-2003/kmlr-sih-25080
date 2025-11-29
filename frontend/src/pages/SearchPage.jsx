import React, { useState } from "react";
import axios from "axios";
// CLEANUP: Removed unused icon imports (Tag, Building2, Calendar) to reduce bundle size.
// FIX: Added Loader2 icon for showing loading state in the UI.
import { Search, Brain, Loader2 } from "lucide-react";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  // NEW STATE: Added states for results, total count, loading flag, and error message.
  // These states enable better user feedback and structured rendering during search operations.
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    // FIX: Prevent empty searches from triggering API calls.
    if (!query.trim()) return;

        
    // UI RESET: Reset loading, error and results before firing new request.
    // This ensures old results aren't shown while a new search is in progress.
    setLoading(true);
    setError("");
    setResults([]);

    // FIX: Using axios params for cleaner query string generation.
    // This ensures proper URL encoding and avoids manual string concatenation.
    try {
      const res = await axios.get("http://localhost:5000/api/v1/search", {
        params: {
          q: query,
          limit: 20,
        },
      });
      // SAFETY: Added fallback empty array to prevent UI crashes
      // if backend returns undefined or malformed payload.
      setResults(res.data.documents || []);

      
    // SAFETY: Backend returns `results` instead of `total`, so fallback to 0.
      setTotal(res.data.results || 0);
      // FIX: Added error logging for debugging and user-friendly error message.
      // Prevents the UI from silently failing when backend errors occur.
    } catch (err) {
      console.error("Search failed:", err);
      setError("Search failed. Try again.");
    } finally {
      // CLEANUP: Turn off loading state after request completes.
      setLoading(false);
    }
  };

  return (
    <div className="w-full">

      {/* Search Bar */}
      <div className="flex items-center gap-3 mb-6 w-full">

        {/* Search icon inside input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />

          <input
            type="text"
            placeholder="Type something..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border rounded-xl pl-10 pr-4 py-3 shadow-sm outline-none"
          />
        </div>

        {/* Go Button */}
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Go
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center mt-6">
          <Loader2 size={32} className="animate-spin mx-auto text-blue-600" />
          <p className="text-gray-500 mt-2">Searching…</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-red-600 text-center mt-4 font-semibold">
          {error}
        </div>
      )}

      {/* Results */}
      {!loading && results.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">
            {total} results found for “{query}”
          </h2>

          <div className="space-y-4">
            {results.map((doc) => (
              <div
                key={doc.id}
                className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                {/* File Name */}
                <h3 className="text-lg font-semibold">{doc.file_name}</h3>

                {/* Summary */}
                <p className="text-gray-600 text-sm mt-2">
                  {doc.short_summary_en || "No summary available"}
                </p>

                {/* Meta */}
                <p className="text-xs text-gray-400 mt-2">
                  {doc.status} • {doc.createdAt?.slice(0, 10)}
                </p>

                {/* View Document */}
                {doc.storage_url && (
                  <button
                    onClick={() => window.open(doc.storage_url, "_blank")}
                    className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    View Document
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {!loading && query && results.length === 0 && !error && (
        <div className="text-center mt-8 text-gray-500">
          No results found.
        </div>
      )}

    </div>
  );
};

export default SearchPage;
