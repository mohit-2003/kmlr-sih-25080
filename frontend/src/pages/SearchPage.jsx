// src/pages/SearchPage.jsx
/**
  SearchPage Overview
 
  This page provides full-text search functionality for documents.
  Users can:
   - Enter queries and search across document metadata, OCR text, summaries, etc.
   - View paginated/top-20 search results
   - See quick document previews through the DocumentCard component
 
  The page also stores the last search state (query + results + total count)
  in sessionStorage so that when a user navigates away and returns, their
  previous results are restored automatically.
 
  Key features:
   - Real-time search input with Enter key support
   - Persistent search state across navigation
   - Loading, error, no-results, and results states
 
  This page acts as the primary document discovery interface in the app.
 */


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";

import InputWithIcon from "@/components/ui/input-with-icon";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import DocumentCard from "@/components/DocumentCard";

// Key used to persist search state in session storage
const SEARCH_KEY = "searchState";

const SearchPage = () => {
  // Query input
  const [query, setQuery] = useState("");
  // Search results
  const [results, setResults] = useState([]);
  // Number of results returned
  const [total, setTotal] = useState(0);
  
  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ---------------------------------------------------
     Restore previous search 
     This runs every time the user returns to this page.
     Ensures the user sees the same results as before.
     --------------------------------------------------- */
  useEffect(() => {
    const saved = sessionStorage.getItem(SEARCH_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setQuery(parsed.query);
      setResults(parsed.results);
      setTotal(parsed.total);
    }
  }, []);

  /* ---------------------------------------------------
     Execute a new search
     - Validates empty query
     - Makes API request
     - Saves search state (so "Back" preserves results), Prakhar
     --------------------------------------------------- */
  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/search`,
        { params: { q: query, limit: 20 } }
      );

      const docs = res.data.documents || [];

      setResults(docs);
      setTotal(res.data.results || 0);

      // Save search state so BACK returns the results
      sessionStorage.setItem(
        SEARCH_KEY,
        JSON.stringify({
          query,
          results: docs,
          total: res.data.results || 0,
        })
      );
    } catch (err) {
      console.error("Search failed:", err);
      setError("Search failed. Try again.");
    } finally {
      setLoading(false);
    }
  };


  /**
    Return JSX Structure Overview
   
    1. Search Bar
       - Input with search icon + Go button
       - Handles Enter key
   
    2. Loading Indicator
       - Appears while waiting for API response
   
    3. Error Display
       - Friendly error box when search fails
   
    4. Results Section
       - Shows a list of DocumentCard components
       - Includes result count and the query
   
    5. No Results State
       - If query is entered but results array is empty
   
    The layout centers everything and keeps it contained
    within a max-width for readability.
   */
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Search Bar */}
      <Card className="mb-6 p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex-1">
            <InputWithIcon
              icon={Search}
              placeholder="Search documents..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
            />
          </div>

          <Button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6"
          >
            Go
          </Button>
        </div>
      </Card>

      {/* Loading */}
      {loading && (
        <div className="text-center mt-10 text-gray-600">Searching…</div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center font-semibold">
          {error}
        </div>
      )}

      {/* Results */}
      {!loading && results.length > 0 && (
        <div className="mt-6 space-y-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            {total} results found for “{query}”
          </h2>

          {results.map((doc) => (
            <DocumentCard key={doc.id} doc={doc} />
          ))}
        </div>
      )}

      {/* No Results */}
      {!loading && query && results.length === 0 && !error && (
        <div className="text-center mt-10 text-gray-500">
          No results found.
        </div>
      )}
    </div>
  );
};

export default SearchPage;
