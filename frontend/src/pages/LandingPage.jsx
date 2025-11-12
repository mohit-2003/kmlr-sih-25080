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
      
      {/* ------------------------------------- */}
      {/* 💥 HERO SECTION (HIGH IMPACT) 💥 */}
      {/* ------------------------------------- */}
      <section className="pt-32 pb-24 bg-gradient-to-br from-blue-900 to-indigo-800 text-white shadow-2xl">
        <div className="container mx-auto px-4 text-center max-w-5xl">
          
          {/* AI Badge - Modern Touch */}
          <div className="flex items-center justify-center space-x-2 px-3 py-1 mb-6 mx-auto w-fit rounded-full text-xs font-medium text-green-200 bg-green-900/50 border border-green-700 shadow-lg">
            <span className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>AI-Powered Document Intelligence</span>
          </div>

          {/* New Headline */}
          <h1 className="text-5xl md:text-6xl font-extrabold mb-5 tracking-tight leading-snug">
            Transform Document Chaos Into <span className="text-yellow-300">Clear Intelligence</span>
          </h1>
          
          {/* New Subtitle */}
          <p className="text-xl text-blue-200 mb-10 max-w-3xl mx-auto">
            Your AI-powered platform to eliminate information latency and safeguard compliance across KMRL operations.
          </p>
          
          {/* Call to Action Buttons */}
          <div className="flex justify-center flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <button 
              onClick={handleDashboardClick}
              className="flex items-center justify-center bg-blue-500 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-blue-600 transition shadow-lg w-full sm:w-auto"
            >
              Explore Dashboard
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
            <a 
              href="#solution"
              className="flex items-center justify-center bg-transparent border-2 border-blue-400 text-blue-100 px-10 py-4 rounded-lg font-medium text-lg hover:bg-blue-800/50 transition w-full sm:w-auto"
            >
              Watch Overview
            </a>
          </div>

          {/* Key Metrics - Quantifiable Results */}
          <div className="flex justify-center space-x-4 md:space-x-16 pt-8 border-t border-blue-700/50">
            <MetricCard value="95%" label="Information Latency Reduced" />
            <MetricCard value="24/7" label="Real-time Compliance Monitoring" />
            <MetricCard value="1000+" label="Documents Processed Daily" />
          </div>

        </div>
      </section>

      {/* ------------------------------------- */}
      {/* Problem Statement Section (Problem Cards Improved) */}
      {/* ------------------------------------- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6">The KMRL Document Management Challenge</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Since its first commercial run in 2017, KMRL has grown into a complex, multidisciplinary enterprise 
              that generates and receives thousands of documents daily...
            </p>
          </div>
          
          {/* Problem Cards - Enhanced icons and spacing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500 shadow-sm transition hover:shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-red-800 flex items-center">
                <span className="text-2xl mr-2">⏱️</span> Information Latency
              </h3>
              <p className="text-gray-700">Front-line managers spend hours searching for actionable information in lengthy documents, **delaying critical decisions** on train availability, contractor payments, and staffing.</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500 shadow-sm transition hover:shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-blue-800 flex items-center">
                <span className="text-2xl mr-2">📡</span> Siloed Awareness
              </h3>
              <p className="text-gray-700">Departments work in isolation—Procurement negotiates contracts unaware of Engineering's design changes; HR schedules training unaware of **new safety bulletins** released the previous evening.</p>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500 shadow-sm transition hover:shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-yellow-800 flex items-center">
                <span className="text-2xl mr-2">⚠️</span> Compliance Exposure
              </h3>
              <p className="text-gray-700">Regulatory updates from the Commissioner of Metro Rail Safety are **buried in inboxes**, risking missed deadlines, fines, and audit non-conformities.</p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500 shadow-sm transition hover:shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-purple-800 flex items-center">
                <span className="text-2xl mr-2">🧠</span> Knowledge Attrition
              </h3>
              <p className="text-gray-700">Institutional memory remains locked in static files; **hard-won insights vanish** when key personnel transfer or retire, hindering long-term knowledge retention.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------- */}
      {/* Our Solution Section (Minor refinement) */}
      {/* ------------------------------------- */}
      <section id="solution" className="py-20 bg-gradient-to-br from-blue-50 to-gray-100">
        {/* ... (Content is good, only section ID added) ... */}
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6">Our AI-Powered Solution</h2>
            <p className="text-lg text-gray-700">
              We equip every stakeholder—from station controllers to executive directors—with rapid, trustworthy snapshots 
              of the documents that matter to them, while preserving traceability to the original source.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            {/* How It Works Column */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-blue-500">
              <h3 className="text-xl font-semibold mb-6 text-blue-800">How It Works</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-white font-bold text-lg">1</div>
                  <div>
                    <h4 className="font-semibold mb-1 text-gray-900">Document Ingestion</h4>
                    <p className="text-gray-600 text-sm">Capture documents from email, SharePoint, Maximo exports, WhatsApp PDFs, and scanned copies</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-white font-bold text-lg">2</div>
                  <div>
                    <h4 className="font-semibold mb-1 text-gray-900">AI Processing</h4>
                    <p className="text-gray-600 text-sm">Advanced OCR, GPT summarization, and classification in both English and Malayalam</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-white font-bold text-lg">3</div>
                  <div>
                    <h4 className="font-semibold mb-1 text-gray-900">Smart Distribution</h4>
                    <p className="text-gray-600 text-sm">Automatic routing to relevant departments with priority-based alerts</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Benefits Column (Kept your good content) */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-green-500">
              <h3 className="text-xl font-semibold mb-6 text-green-800">Key Benefits</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-700 font-medium">Faster cross-department coordination</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-700 font-medium">Strengthened regulatory compliance</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-700 font-medium">Preserved institutional knowledge</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-700 font-medium">Reduced manual duplication of effort</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-700 font-medium">Enhanced decision-making speed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------- */}
      {/* Technical Capabilities (Kept your good content) */}
      {/* ------------------------------------- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6">Technical Architecture</h2>
            <p className="text-gray-600">Built with modern AI technologies to handle KMRL's specific document challenges</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* ... (Your existing technical capability cards are good) ... */}
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="font-semibold mb-2">OCR Processing</h3>
              <p className="text-gray-600 text-sm">Open Source AI Models (Tesseract, PaddleOCR, EasyOCR) for text extraction from scans and images</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="font-semibold mb-2">LLM Analysis</h3>
              <p className="text-gray-600 text-sm">Advanced AI summarization, translation, and action item extraction</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold mb-2">Smart Classification</h3>
              <p className="text-gray-600 text-sm">Automatic department routing (HR, Engineering, Finance, etc.) based on content analysis</p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------- */}
      {/* CTA Section (Minor refinement) */}
      {/* ------------------------------------- */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Solve KMRL's Document Challenges?</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
            Experience how our AI-powered platform can transform document management for Kochi Metro Rail Limited.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button 
              onClick={handleDashboardClick}
              className="bg-white text-blue-700 px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-100 transition-colors shadow-xl"
            >
              View Live Demo
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------- */}
      {/* Footer (Kept your good content) */}
      {/* ------------------------------------- */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center text-white font-bold text-xl">KM</div>
              <span className="ml-3 font-semibold text-xl">KMRL InsightVault</span>
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto mb-6">
              A comprehensive solution addressing Kochi Metro Rail Limited's document management challenges through AI-powered processing and analysis.
            </p>
            <div className="border-t border-gray-800 pt-6 text-center text-gray-400">
              <p>&copy; 2024 KMRL Document Intelligence Platform. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;