import React, { useState, useEffect } from 'react';
import { Brain, FileText, Users, DollarSign, Clock, CheckCircle, MessageSquare, Download } from 'lucide-react';

interface CaseAnalysisProps {
  disputeData: any;
  onProceedToMediation: () => void;
}

export default function CaseAnalysis({ disputeData, onProceedToMediation }: CaseAnalysisProps) {
  const [analysisStep, setAnalysisStep] = useState(0);
  const [showRecommendation, setShowRecommendation] = useState(false);

  const analysisSteps = [
    "Analyzing uploaded evidence...",
    "Identifying key dispute points...",
    "Researching similar cases...",
    "Generating settlement recommendations..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setAnalysisStep(prev => {
        if (prev < analysisSteps.length - 1) {
          return prev + 1;
        } else {
          setShowRecommendation(true);
          return prev;
        }
      });
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  const mockAnalysis = {
    keyPoints: [
      "Freelance web development contract worth $4,000",
      "Work completed but client claims quality issues",
      "No formal testing or approval process defined",
      "Client used delivered work for 2 weeks before complaint"
    ],
    parties: {
      claimant: disputeData.parties.party1.name,
      respondent: disputeData.parties.party2.name
    },
    recommendation: {
      summary: "Based on evidence analysis and similar case outcomes, I recommend a 60-40 settlement split.",
      rationale: "The freelancer delivered functional work that was used by the client, indicating substantial completion. However, quality concerns suggest partial responsibility.",
      proposedSolution: {
        claimant: 2400,
        respondent: 1600,
        terms: [
          "Freelancer retains $2,400 (60% of contract value)",
          "Client receives $1,600 refund for quality issues",
          "All source code and assets transfer to client",
          "Mutual non-disclosure and non-disparagement clause"
        ]
      },
      alternativeOptions: [
        "70-30 split favoring freelancer ($2,800 / $1,200)",
        "50-50 split with shared responsibility ($2,000 / $2,000)",
        "Revised scope completion with additional $500 payment"
      ]
    }
  };

  if (!showRecommendation) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Brain className="h-8 w-8 text-blue-600 animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">AI Case Analysis in Progress</h2>
            <p className="text-gray-600 mb-8">
              Our AI is analyzing your case details and evidence to provide intelligent recommendations.
            </p>

            <div className="space-y-4 max-w-md mx-auto">
              {analysisSteps.map((step, index) => (
                <div key={index} className={`flex items-center p-3 rounded-lg ${
                  index <= analysisStep ? 'bg-blue-50 text-blue-800' : 'bg-gray-50 text-gray-500'
                }`}>
                  {index < analysisStep ? (
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                  ) : index === analysisStep ? (
                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-3 flex-shrink-0" />
                  ) : (
                    <Clock className="h-5 w-5 mr-3 flex-shrink-0" />
                  )}
                  <span className="text-sm font-medium">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Case Summary */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="h-5 w-5 text-blue-600 mr-2" />
              Case Summary
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium text-gray-700">Type:</span>
                <span className="ml-2 text-gray-600 capitalize">{disputeData.disputeType} Dispute</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Amount:</span>
                <span className="ml-2 text-gray-600">${parseInt(disputeData.amount).toLocaleString()}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Evidence:</span>
                <span className="ml-2 text-gray-600">{disputeData.evidence.length} files</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="h-5 w-5 text-purple-600 mr-2" />
              Parties
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="font-medium text-blue-900">Claimant</div>
                <div className="text-sm text-blue-700">{mockAnalysis.parties.claimant}</div>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <div className="font-medium text-red-900">Respondent</div>
                <div className="text-sm text-red-700">{mockAnalysis.parties.respondent}</div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Analysis & Recommendation */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Brain className="h-6 w-6 text-blue-600 mr-3" />
                AI Analysis Complete
              </h2>
              <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                High Confidence
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Key Points Identified</h3>
                <ul className="space-y-2">
                  {mockAnalysis.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                  Settlement Recommendation
                </h3>
                <p className="text-gray-700 mb-4">{mockAnalysis.recommendation.summary}</p>
                
                <div className="bg-white p-4 rounded-lg mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-900">Proposed Split</span>
                    <span className="text-2xl font-bold text-green-600">
                      ${mockAnalysis.recommendation.proposedSolution.claimant.toLocaleString()} / ${mockAnalysis.recommendation.proposedSolution.respondent.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div className="bg-blue-600 h-3 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Claimant: 60%</span>
                    <span>Respondent: 40%</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Terms:</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    {mockAnalysis.recommendation.proposedSolution.terms.map((term, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                        {term}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Alternative Options</h3>
                <div className="space-y-2">
                  {mockAnalysis.recommendation.alternativeOptions.map((option, index) => (
                    <div key={index} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                      <span className="text-gray-700">{option}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onProceedToMediation}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center"
                >
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Proceed to Mediation
                </button>
                <button className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:border-gray-400 transition-colors font-semibold flex items-center justify-center">
                  <Download className="h-5 w-5 mr-2" />
                  Download Analysis
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}