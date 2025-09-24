import React, { useState } from 'react';
import { FileText, Download, Check, Edit3, Calendar, Users, DollarSign } from 'lucide-react';

interface SettlementAgreementProps {
  disputeData: any;
  onComplete: () => void;
}

export default function SettlementAgreement({ disputeData, onComplete }: SettlementAgreementProps) {
  const [signatureStatus, setSignatureStatus] = useState({
    party1: false,
    party2: false
  });
  const [isEditing, setIsEditing] = useState(false);

  const agreementData = {
    caseNumber: `ODR-${Date.now().toString().slice(-6)}`,
    date: new Date().toLocaleDateString(),
    parties: {
      claimant: disputeData.parties.party1.name,
      respondent: disputeData.parties.party2.name
    },
    terms: {
      payment: {
        total: parseInt(disputeData.amount),
        toClaimant: 2400,
        toRespondent: 1600
      },
      timeline: "Payment to be made within 7 business days of agreement execution",
      deliverables: [
        "All source code and project files transfer to client",
        "Mutual release of all claims related to this dispute",
        "Confidentiality regarding dispute details"
      ],
      additionalTerms: [
        "Neither party admits wrongdoing or liability",
        "This agreement resolves all claims between the parties",
        "Any modifications must be in writing and signed by both parties"
      ]
    }
  };

  const handleSignature = (party: 'party1' | 'party2') => {
    setSignatureStatus(prev => ({
      ...prev,
      [party]: !prev[party]
    }));
  };

  const isFullySigned = signatureStatus.party1 && signatureStatus.party2;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <FileText className="h-6 w-6 text-blue-600 mr-3" />
                Settlement Agreement
              </h2>
              <p className="text-gray-600 mt-1">Case #{agreementData.caseNumber}</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                {isEditing ? 'Save Changes' : 'Edit Terms'}
              </button>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </button>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Agreement Header */}
          <div className="text-center mb-8 pb-6 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">SETTLEMENT AGREEMENT</h1>
            <p className="text-gray-600">
              This Settlement Agreement is entered into on {agreementData.date}
            </p>
          </div>

          {/* Parties Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="h-5 w-5 text-purple-600 mr-2" />
              Parties to the Agreement
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="font-semibold text-blue-900 mb-1">Claimant</div>
                <div className="text-blue-800">{agreementData.parties.claimant}</div>
                <div className="text-sm text-blue-600 mt-1">Email: {disputeData.parties.party1.email}</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="font-semibold text-red-900 mb-1">Respondent</div>
                <div className="text-red-800">{agreementData.parties.respondent}</div>
                <div className="text-sm text-red-600 mt-1">Email: {disputeData.parties.party2.email}</div>
              </div>
            </div>
          </div>

          {/* Financial Terms */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <DollarSign className="h-5 w-5 text-green-600 mr-2" />
              Financial Settlement
            </h3>
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <div className="grid md:grid-cols-3 gap-6 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    ${agreementData.terms.payment.total.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total Disputed Amount</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-700">
                    ${agreementData.terms.payment.toClaimant.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">To Claimant (60%)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-700">
                    ${agreementData.terms.payment.toRespondent.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">To Respondent (40%)</div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-green-600 h-4 rounded-l-full" style={{ width: '60%' }}></div>
              </div>
              <p className="text-sm text-gray-700 mt-3 text-center">
                {agreementData.terms.timeline}
              </p>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="h-5 w-5 text-blue-600 mr-2" />
              Terms and Conditions
            </h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Deliverables and Actions</h4>
                <ul className="space-y-2">
                  {agreementData.terms.deliverables.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Additional Terms</h4>
                <ul className="space-y-2">
                  {agreementData.terms.additionalTerms.map((term, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{term}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Signature Section */}
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <Edit3 className="h-5 w-5 text-purple-600 mr-2" />
              Digital Signatures
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-medium text-gray-900 mb-2">
                    {agreementData.parties.claimant}
                  </div>
                  <div className="text-sm text-gray-600 mb-4">Claimant</div>
                  
                  {signatureStatus.party1 ? (
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <Check className="h-6 w-6 text-green-600 mx-auto mb-2" />
                      <div className="text-green-800 font-medium">Signed</div>
                      <div className="text-sm text-green-600">
                        {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleSignature('party1')}
                      className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Sign Agreement
                    </button>
                  )}
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-medium text-gray-900 mb-2">
                    {agreementData.parties.respondent}
                  </div>
                  <div className="text-sm text-gray-600 mb-4">Respondent</div>
                  
                  {signatureStatus.party2 ? (
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <Check className="h-6 w-6 text-green-600 mx-auto mb-2" />
                      <div className="text-green-800 font-medium">Signed</div>
                      <div className="text-sm text-green-600">
                        {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <Calendar className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                      <div className="text-yellow-800 font-medium">Awaiting Signature</div>
                      <div className="text-sm text-yellow-600">
                        Other party will be notified to sign
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {isFullySigned && (
              <div className="mt-8 bg-green-50 p-6 rounded-lg border border-green-200 text-center">
                <Check className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  Agreement Fully Executed!
                </h3>
                <p className="text-green-700 mb-4">
                  Both parties have signed the settlement agreement. The case is now resolved.
                </p>
                <button
                  onClick={onComplete}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  Complete Case
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}