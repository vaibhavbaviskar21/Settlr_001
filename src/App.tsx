import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import DisputeForm from './components/DisputeForm';
import CaseAnalysis from './components/CaseAnalysis';
import MediationRoom from './components/MediationRoom';
import SettlementAgreement from './components/SettlementAgreement';
import AuthModal from './components/AuthModal';

type AppState = 'home' | 'form' | 'analysis' | 'mediation' | 'agreement' | 'complete';

interface User {
  name: string;
  email: string;
}

function App() {
  const [currentState, setCurrentState] = useState<AppState>('home');
  const [user, setUser] = useState<User | null>(null);
  const [disputeData, setDisputeData] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleGetStarted = () => {
    if (user) {
      setCurrentState('form');
    } else {
      setShowAuthModal(true);
    }
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    if (currentState === 'home') {
      setCurrentState('form');
    }
  };

  const handleDisputeSubmit = (data: any) => {
    setDisputeData(data);
    setCurrentState('analysis');
  };

  const renderCurrentView = () => {
    switch (currentState) {
      case 'home':
        return <Hero onGetStarted={handleGetStarted} />;
      case 'form':
        return (
          <DisputeForm 
            onSubmit={handleDisputeSubmit}
            onBack={() => setCurrentState('home')}
          />
        );
      case 'analysis':
        return (
          <CaseAnalysis 
            disputeData={disputeData}
            onProceedToMediation={() => setCurrentState('mediation')}
          />
        );
      case 'mediation':
        return (
          <MediationRoom 
            disputeData={disputeData}
            onGenerateAgreement={() => setCurrentState('agreement')}
          />
        );
      case 'agreement':
        return (
          <SettlementAgreement 
            disputeData={disputeData}
            onComplete={() => setCurrentState('complete')}
          />
        );
      case 'complete':
        return (
          <div className="max-w-4xl mx-auto px-4 py-16 text-center">
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Case Successfully Resolved!</h2>
              <p className="text-xl text-gray-600 mb-8">
                Congratulations! Your dispute has been resolved through our AI-assisted mediation platform.
              </p>
              <div className="space-y-4 mb-8">
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-green-800 font-semibold">✓ Settlement agreement executed</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800 font-semibold">✓ All parties digitally signed</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-purple-800 font-semibold">✓ Case documentation archived</p>
                </div>
              </div>
              <button
                onClick={() => setCurrentState('home')}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Return Home
              </button>
            </div>
          </div>
        );
      default:
        return <Hero onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={user} 
        onAuthClick={() => setShowAuthModal(true)}
      />
      
      {renderCurrentView()}

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
      />

      {/* Footer */}
      {currentState === 'home' && (
        <footer className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l-3-9m3 9l3-9" />
                    </svg>
                  </div>
                  <span className="text-xl font-bold">ResolveAI</span>
                </div>
                <p className="text-gray-400 max-w-md">
                  Revolutionizing dispute resolution through AI-powered mediation. 
                  Fast, fair, and affordable conflict resolution for the digital age.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Legal</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
              <p>&copy; 2025 ResolveAI. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;