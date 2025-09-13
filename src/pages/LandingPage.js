import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-inter">
      {/* Hero Section */}
      <section className="pt-20 pb-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">KMRL Document Intelligence Platform</h1>
            <p className="text-xl text-blue-100 mb-8">AI-powered solution to address Kochi Metro Rail Limited's document management challenges</p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={handleDashboardClick}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-blue-700 transition"
              >
                View Solution
              </button>
              <button 
                onClick={() => navigate("/upload")}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-white hover:text-blue-900 transition"
              >
                Try Demo
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-6 bg-blue-600 opacity-20 rounded-2xl blur-lg"></div>
              <div className="relative bg-white text-gray-900 p-6 rounded-2xl shadow-xl max-w-md">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold">Document Intelligence</h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Multi-format Processing</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '95%'}}></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Bilingual Analysis</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{width: '88%'}}></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">AI Classification</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{width: '92%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6">The KMRL Document Management Challenge</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Since its first commercial run in 2017, KMRL has grown into a complex, multidisciplinary enterprise 
              that generates and receives thousands of documents daily: engineering drawings, maintenance job cards, 
              incident reports, vendor invoices, regulatory directives, safety circulars, HR policies, and board-meeting 
              minutes across multiple formats and languages.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500">
              <h3 className="text-lg font-semibold mb-3 text-red-800">Information Latency</h3>
              <p className="text-red-700">Front-line managers spend hours searching for actionable information in lengthy documents, delaying critical decisions on train availability, contractor payments, and staffing.</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
              <h3 className="text-lg font-semibold mb-3 text-blue-800">Siloed Awareness</h3>
              <p className="text-blue-700">Departments work in isolation - Procurement may negotiate contracts unaware of Engineering's design changes; HR schedules training unaware of new safety bulletins.</p>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500">
              <h3 className="text-lg font-semibold mb-3 text-yellow-800">Compliance Exposure</h3>
              <p className="text-yellow-700">Regulatory updates from Commissioner of Metro Rail Safety and Ministry of Housing & Urban Affairs get buried in inboxes, risking missed deadlines and audit failures.</p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500">
              <h3 className="text-lg font-semibold mb-3 text-purple-800">Knowledge Attrition</h3>
              <p className="text-purple-700">Institutional memory vanishes when key personnel transfer or retire, taking hard-won insights with them despite being documented somewhere in the system.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Solution Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6">Our AI-Powered Solution</h2>
            <p className="text-lg text-gray-700">
              We equip every stakeholder—from station controllers to executive directors—with rapid, trustworthy snapshots 
              of the documents that matter to them, while preserving traceability to the original source.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-800">How It Works</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="font-bold text-blue-700">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Document Ingestion</h4>
                      <p className="text-gray-600 text-sm">Capture documents from email, SharePoint, Maximo exports, WhatsApp PDFs, and scanned copies</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="font-bold text-blue-700">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">AI Processing</h4>
                      <p className="text-gray-600 text-sm">Advanced OCR, GPT summarization, and classification in both English and Malayalam</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="font-bold text-blue-700">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Smart Distribution</h4>
                      <p className="text-gray-600 text-sm">Automatic routing to relevant departments with priority-based alerts</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-800">Key Benefits</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <p className="text-gray-700">Faster cross-department coordination</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <p className="text-gray-700">Strengthened regulatory compliance</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <p className="text-gray-700">Preserved institutional knowledge</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <p className="text-gray-700">Reduced manual duplication of effort</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <p className="text-gray-700">Enhanced decision-making speed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Capabilities */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6">Technical Architecture</h2>
            <p className="text-gray-600">Built with modern AI technologies to handle KMRL's specific document challenges</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
              <h3 className="font-semibold mb-2">GPT Analysis</h3>
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Solve KMRL's Document Challenges?</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
            Experience how our AI-powered platform can transform document management for Kochi Metro Rail Limited
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button 
              onClick={handleDashboardClick}
              className="bg-white text-blue-700 px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-100 transition-colors"
            >
              View Live Demo
            </button>
            <button 
              onClick={() => navigate("/upload")}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-white hover:text-blue-700 transition-colors"
            >
              Try Document Upload
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center text-white font-bold text-xl">KM</div>
              <span className="ml-3 font-semibold text-xl">KMRL Document Intelligence</span>
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