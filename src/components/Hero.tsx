import React from 'react';
import { ArrowRight, CheckCircle, Clock, Shield } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Resolve Disputes
              <span className="text-blue-600"> Faster & Fairer</span>
              with AI
            </h1>
            <p className="text-xl text-gray-600 mt-6 leading-relaxed">
              Skip expensive lawyers and lengthy court battles. Our AI-powered platform helps you resolve 
              small-value disputes quickly, affordably, and fairly through intelligent mediation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={onGetStarted}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center justify-center font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Start Your Case
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-gray-400 transition-colors font-semibold">
                See How It Works
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">24hrs</div>
                <div className="text-sm text-gray-600">Avg. Resolution</div>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
              <div className="text-center">
                <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">$49</div>
                <div className="text-sm text-gray-600">Flat Fee</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Case Analysis Complete</span>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">AI Settlement Recommendation</h3>
                  <p className="text-sm text-gray-700">
                    Based on evidence analysis, I recommend a 60-40 split with the freelancer 
                    receiving $2,400 and client refund of $1,600.
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium">
                    Accept Recommendation
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium">
                    Counter Offer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}