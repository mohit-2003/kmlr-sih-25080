import React, { useState } from "react";
import { Search, Brain, Tag, Building2, Calendar } from "lucide-react";

const SearchPage = () => {
  const [query, setQuery] = useState("");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Brain className="text-blue-600" />
        Search Knowledge Repository
      </h1>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Ask me anything... e.g. 'Show HR policies updated in 2025'"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border rounded-xl pl-10 pr-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Examples / Helper */}
      {!query && (
        <div className="grid md:grid-cols-2 gap-4">
          {/* Example 1 */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow hover:shadow-md transition">
            <div className="flex items-center gap-2 mb-2 text-blue-600 font-semibold">
              <Building2 size={18} /> Department Search
            </div>
            <p className="text-gray-600 text-sm">
              <em>“Show all Finance documents pending approval”</em>
            </p>
          </div>

          {/* Example 2 */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow hover:shadow-md transition">
            <div className="flex items-center gap-2 mb-2 text-green-600 font-semibold">
              <Tag size={18} /> Tag Search
            </div>
            <p className="text-gray-600 text-sm">
              <em>“Find #compliance or #audit reports from last quarter”</em>
            </p>
          </div>

          {/* Example 3 */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow hover:shadow-md transition">
            <div className="flex items-center gap-2 mb-2 text-purple-600 font-semibold">
              <Calendar size={18} /> Date-based Search
            </div>
            <p className="text-gray-600 text-sm">
              <em>“Documents uploaded in August 2025”</em>
            </p>
          </div>

          {/* Example 4 */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow hover:shadow-md transition">
            <div className="flex items-center gap-2 mb-2 text-pink-600 font-semibold">
              <Brain size={18} /> AI Smart Query
            </div>
            <p className="text-gray-600 text-sm">
              <em>“Summarize all vendor contracts expiring this month”</em>
            </p>
          </div>
        </div>
      )}

      {/* Empty state when query entered */}
      {query && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-xl p-10 text-center mt-6 shadow-inner">
          <Brain size={36} className="mx-auto mb-3 text-blue-600" />
          <p className="text-gray-700 text-lg">
            Searching with AI for: <br />
            <span className="font-semibold text-blue-700">“{query}”</span>
          </p>
          <p className="text-gray-500 text-sm mt-2">
            (This is a demo — results will appear here)
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
