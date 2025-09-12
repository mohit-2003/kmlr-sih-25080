import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate("/upload");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-inter">
      {/* Hero Section */}
      <section className="pt-20 pb-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">KMRL Document Intelligence Platform</h1>
            <p className="text-xl text-blue-100 mb-8">AI-powered document processing to streamline operations, ensure compliance, and enhance decision-making across Kochi Metro Rail Limited.</p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={handleDashboardClick}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-blue-700 transition"
              >
                Access Dashboard
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-6 bg-blue-600 opacity-20 rounded-2xl blur-lg"></div>
              <div className="relative bg-white text-gray-900 p-6 rounded-2xl shadow-xl max-w-md">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold">Document Processing</h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Document Analysis</span>
                    <span className="font-semibold">94%</span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '94%'}}></div>
                  </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Multi-language Processing</span>
                    <span className="font-semibold">89%</span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{width: '89%'}}></div>
                  </div>
                </div>
                <div className="mt-6 flex justify-center">
                  <div className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
                    Processing 5,200+ documents daily
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">The Document Management Challenge</h2>
            <p className="text-gray-600">KMRL generates and receives thousands of critical documents daily across multiple formats and languages</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-600">
              <h3 className="text-lg font-semibold mb-3">Information Latency</h3>
              <p className="text-gray-600">Managers spend hours searching for actionable information in lengthy documents</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-purple-600">
              <h3 className="text-lg font-semibold mb-3">Siloed Awareness</h3>
              <p className="text-gray-600">Critical information remains confined within departments, hindering coordination</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-red-600">
              <h3 className="text-lg font-semibold mb-3">Compliance Exposure</h3>
              <p className="text-gray-600">Regulatory updates get buried in inboxes, risking missed deadlines</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-green-600">
              <h3 className="text-lg font-semibold mb-3">Knowledge Attrition</h3>
              <p className="text-gray-600">Institutional memory vanishes when key personnel transfer or retire</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Intelligent Document Processing</h2>
            <p className="text-gray-600">Our AI-powered platform extracts, summarizes, and routes critical information across departments</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-md transition-transform duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center text-white mb-6">
                <i className="fas fa-file-alt text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Multi-format Processing</h3>
              <p className="text-gray-600">Process engineering drawings, maintenance cards, invoices, regulatory documents, and more from various sources including email, Maximo, SharePoint, and scanned copies.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-md transition-transform duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center text-white mb-6">
                <i className="fas fa-language text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Bilingual Analysis</h3>
              <p className="text-gray-600">Advanced NLP capabilities to process documents in English, Malayalam, and bilingual hybrids with embedded tables, photos, and signatures.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-md transition-transform duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center text-white mb-6">
                <i className="fas fa-bell text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Alerting</h3>
              <p className="text-gray-600">Automated routing of critical information to relevant stakeholders with priority-based alerting for time-sensitive documents like safety bulletins and regulatory updates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Streamlined Document Workflow</h2>
            <p className="text-gray-600">From document ingestion to actionable insights</p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-8 items-center">
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -inset-6 bg-blue-600 opacity-10 rounded-2xl blur-lg"></div>
                <div className="relative bg-blue-50 p-8 rounded-2xl shadow-lg">
                  <div className="flex items-start mb-6">
                    <div className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold mr-4">1</div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Document Ingestion</h3>
                      <p className="text-gray-600">Seamlessly capture documents from multiple sources: email attachments, SharePoint, Maximo exports, WhatsApp PDFs, and scanned hard copies.</p>
                    </div>
                  </div>
                  <div className="flex items-start mb-6">
                    <div className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold mr-4">2</div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">AI Processing</h3>
                      <p className="text-gray-600">Our advanced algorithms classify, extract key information, summarize content, and identify critical action items in both English and Malayalam.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold mr-4">3</div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Smart Distribution</h3>
                      <p className="text-gray-600">Relevant information is automatically routed to appropriate departments and personnel with appropriate priority levels and deadlines.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/1006/1006555.png" 
                alt="Document workflow illustration" 
                className="w-full max-w-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Department Benefits */}
      <section className="py-16 bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Department-Specific Solutions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-blue-700 bg-opacity-30 p-6 rounded-xl backdrop-filter backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <i className="fas fa-tools mr-2"></i> Engineering
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-300 mt-1 mr-2"></i>
                  <span>Instant alerts for design changes and maintenance requirements</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-300 mt-1 mr-2"></i>
                  <span>Automated processing of technical drawings and job cards</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-blue-700 bg-opacity-30 p-6 rounded-xl backdrop-filter backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <i className="fas fa-file-invoice-dollar mr-2"></i> Finance
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-300 mt-1 mr-2"></i>
                  <span>Automated invoice processing and payment tracking</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-300 mt-1 mr-2"></i>
                  <span>Contract compliance monitoring</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-blue-700 bg-opacity-30 p-6 rounded-xl backdrop-filter backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <i className="fas fa-shield-alt mr-2"></i> Safety & Compliance
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-300 mt-1 mr-2"></i>
                  <span>Priority alerts for regulatory updates</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-300 mt-1 mr-2"></i>
                  <span>Automated compliance deadline tracking</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform KMRL's Document Management?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">Join us in building a more efficient, compliant, and coordinated Kochi Metro Rail Limited.</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={handleDashboardClick}
              className="bg-blue-700 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-blue-800 transition"
            >
              Access Platform
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center text-white font-bold text-xl">KM</div>
                <span className="ml-3 font-semibold text-xl">KMRL Intelligence</span>
              </div>
              <p className="text-gray-400">Advanced document processing solutions for Kochi Metro Rail Limited.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Departments</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Engineering</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Operations</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Finance</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Safety & Compliance</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">User Guides</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Training Materials</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">API Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Support Portal</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-400 mb-2">Kochi Metro Rail Limited</p>
              <p className="text-gray-400">Cochin, Kerala 682016</p>
              <p className="text-gray-400 mt-2">document.intel@kmrl.co.in</p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400">
            <p>&copy; 2023 Kochi Metro Rail Limited. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;