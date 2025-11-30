import React from "react";
import { useNavigate } from "react-router-dom";

// Component for displaying key metrics (reusable)
const MetricCard = ({ value, label }) => (
  <div className="text-center p-4">
    <p className="text-4xl font-extrabold text-white">{value}</p>
    <p className="mt-2 text-sm text-blue-200">{label}</p>
  </div>
);

const LandingPage = () => {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-inter">

      {/* ----------------------------- */}
      {/* HERO SECTION */}
      {/* ----------------------------- */}
      <section className="pt-32 pb-24 bg-gradient-to-br from-blue-900 to-indigo-800 text-white shadow-2xl">
        <div className="container mx-auto px-4 text-center max-w-5xl">

          {/* AI Badge */}
          <div className="flex items-center justify-center space-x-2 px-3 py-1 mb-6 mx-auto w-fit rounded-full text-xs font-medium text-green-200 bg-green-900/50 border border-green-700 shadow-lg cursor-pointer">
            <span className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>AI-Powered Document Intelligence</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl font-extrabold mb-5 tracking-tight leading-snug">
            Transform Document Chaos Into{" "}
            <span className="text-yellow-300">Clear Intelligence</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-blue-200 mb-10 max-w-3xl mx-auto">
            Your AI-powered platform to eliminate information latency and safeguard compliance across KMRL operations.
          </p>

          {/* CTA Buttons */}
          <div className="flex justify-center flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <button
              onClick={handleDashboardClick}
              className="flex items-center justify-center bg-blue-500 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-blue-600 transition shadow-lg w-full sm:w-auto cursor-pointer"
            >
              Explore Dashboard
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>

            <a
              href="#solution"
              className="flex items-center justify-center bg-transparent border-2 border-blue-400 text-blue-100 px-10 py-4 rounded-lg font-medium text-lg hover:bg-blue-800/50 transition w-full sm:w-auto cursor-pointer"
            >
              Overview
            </a>
          </div>

          {/* Key Metrics */}
          <div className="flex justify-center space-x-4 md:space-x-16 pt-8 border-t border-blue-700/50">
            <MetricCard value="95%" label="Information Latency Reduced" />
            <MetricCard value="24/7" label="Real-time Compliance Monitoring" />
            <MetricCard value="1000+" label="Documents Processed Daily" />
          </div>

        </div>
      </section>

      {/* ----------------------------- */}
      {/* PROBLEM STATEMENT SECTION */}
      {/* ----------------------------- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6">
              The KMRL Document Management Challenge
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Since its first commercial run in 2017, KMRL has grown into a complex, multidisciplinary enterprise
              that generates and receives thousands of documents daily...
            </p>
          </div>

          {/* Problem Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-3 text-red-800 flex items-center">
                <span className="text-2xl mr-2">⏱️</span> Information Latency
              </h3>
              <p className="text-gray-700">
                Front-line managers spend hours searching for actionable information in lengthy documents, delaying critical decisions.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-3 text-blue-800 flex items-center">
                <span className="text-2xl mr-2">📡</span> Siloed Awareness
              </h3>
              <p className="text-gray-700">
                Departments work in isolation—Procurement negotiates contracts unaware of Engineering's design changes.
              </p>
            </div>

            <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-3 text-yellow-800 flex items-center">
                <span className="text-2xl mr-2">⚠️</span> Compliance Exposure
              </h3>
              <p className="text-gray-700">
                Regulatory updates are buried in inboxes, risking missed deadlines and audit non-conformities.
              </p>
            </div>

            <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-3 text-purple-800 flex items-center">
                <span className="text-2xl mr-2">🧠</span> Knowledge Attrition
              </h3>
              <p className="text-gray-700">
                Institutional memory remains locked in static files; insights vanish when key personnel retire.
              </p>
            </div>
          </div>
        </div>
      </section>
            {/* ----------------------------- */}
      {/* OUR SOLUTION SECTION */}
      {/* ----------------------------- */}
      <section id="solution" className="py-20 bg-gradient-to-br from-blue-50 to-gray-100">
        <div className="container mx-auto px-4">

          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6">
              Our AI-Powered Solution
            </h2>
            <p className="text-lg text-gray-700">
              We equip every stakeholder—from station controllers to executive directors—
              with rapid, trustworthy snapshots of documents while maintaining complete traceability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">

            {/* How It Works */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-blue-500">
              <h3 className="text-xl font-semibold mb-6 text-blue-800">How It Works</h3>

              <div className="space-y-6">

                {/* Step 1 */}
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-4 text-white font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Document Ingestion</h4>
                    <p className="text-gray-600 text-sm">
                      Capture documents from email, SharePoint, Maximo exports, WhatsApp PDFs, and scanned copies.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-4 text-white font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">AI Processing</h4>
                    <p className="text-gray-600 text-sm">
                      OCR + LLM summarization, priority extraction, and classification in English & Malayalam.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-4 text-white font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Smart Distribution</h4>
                    <p className="text-gray-600 text-sm">
                      Automatic routing to relevant departments with priority-based alerts.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Key Benefits */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-green-500">
              <h3 className="text-xl font-semibold mb-6 text-green-800">Key Benefits</h3>

              <div className="space-y-4">
                {[
                  "Faster cross-department coordination",
                  "Strengthened regulatory compliance",
                  "Preserved institutional knowledge",
                  "Reduced manual duplication of effort",
                  "Enhanced decision-making speed",
                ].map((point, idx) => (
                  <div key={idx} className="flex items-start">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-green-600 font-bold text-sm">✓</span>
                    </div>
                    <p className="text-gray-700 font-medium">{point}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------------------- */}
      {/* TECHNICAL CAPABILITIES */}
      {/* ----------------------------- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6">Technical Architecture</h2>
            <p className="text-gray-600">
              Built with modern AI technologies to handle KMRL's specific document challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

            {/* OCR */}
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="font-semibold mb-2">OCR Processing</h3>
              <p className="text-gray-600 text-sm">
                Open Source Tesseract-based OCR for high-accuracy text extraction.
              </p>
            </div>

            {/* LLM */}
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="font-semibold mb-2">LLM Analysis</h3>
              <p className="text-gray-600 text-sm">
                Advanced LLM summarization, translation, and action item extraction.
              </p>
            </div>

            {/* Classification */}
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold mb-2">Smart Classification</h3>
              <p className="text-gray-600 text-sm">
                Automatic department routing (HR, Engineering, Finance, etc.) using AI classifiers.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------------------- */}
      {/* LIVE DEMO SECTION WITH VIDEO */}
      {/* ----------------------------- */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">

          <h2 className="text-3xl font-bold mb-6">Live Demo</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
            Watch how InsightVault transforms unstructured documents into actionable intelligence.
          </p>

          {/* Video Embed */}
          <div className="flex justify-center mb-12">
            <iframe
              width="860"
              height="415"
              src="https://www.youtube.com/embed/AoT89anX-dc"
              title="KMRL InsightVault Demo"
              className="rounded-xl shadow-lg border-4 border-white/20"
              allowFullScreen
            ></iframe>
          </div>

          <button
            onClick={handleDashboardClick}
            className="bg-white text-blue-700 px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-100 transition shadow-xl cursor-pointer"
          >
            Open Dashboard
          </button>

        </div>
      </section>
      {/* ----------------------------- */}
      {/* FOOTER (UPDATED 2025 + NAME) */}
      {/* ----------------------------- */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">

          <div className="text-center">

            {/* LOGO CLICKABLE → HOME */}
            <div
              className="flex items-center justify-center mb-6 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center text-white font-bold text-xl">
                KM
              </div>
              <span className="ml-3 font-semibold text-xl">
                KMRL Insight Vault
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-400 max-w-2xl mx-auto mb-6">
              A comprehensive solution addressing Kochi Metro Rail Limited's document challenges
              through AI-powered processing, OCR, and intelligent routing.
            </p>

            <div className="border-t border-gray-800 pt-6 text-center text-gray-400">
              <p>&copy; 2025 KMRL Insight Vault. All Rights Reserved.</p>
            </div>

          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;

