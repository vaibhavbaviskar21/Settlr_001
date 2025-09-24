import React, { useState } from 'react';
import { Upload, FileText, DollarSign, Calendar, Users, ArrowLeft, ArrowRight } from 'lucide-react';

interface DisputeFormProps {
  onSubmit: (disputeData: any) => void;
  onBack: () => void;
}

export default function DisputeForm({ onSubmit, onBack }: DisputeFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    disputeType: '',
    title: '',
    description: '',
    amount: '',
    parties: {
      party1: { name: '', email: '', role: 'Claimant' },
      party2: { name: '', email: '', role: 'Respondent' }
    },
    evidence: [] as File[],
    timeline: ''
  });

  const disputeTypes = [
    { value: 'ecommerce', label: 'E-commerce Dispute', icon: '🛒' },
    { value: 'freelance', label: 'Freelance Payment', icon: '💼' },
    { value: 'rental', label: 'Landlord-Tenant', icon: '🏠' },
    { value: 'service', label: 'Service Provider', icon: '🔧' },
    { value: 'other', label: 'Other', icon: '📋' }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setFormData(prev => ({
        ...prev,
        evidence: [...prev.evidence, ...newFiles]
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      evidence: prev.evidence.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      onSubmit(formData);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          What type of dispute is this?
        </label>
        <div className="grid md:grid-cols-2 gap-3">
          {disputeTypes.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, disputeType: type.value }))}
              className={`p-4 border rounded-lg text-left transition-all ${
                formData.disputeType === type.value
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{type.icon}</span>
                <span className="font-medium text-gray-900">{type.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Case Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Brief description of your dispute"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Disputed Amount ($)
        </label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="0.00"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 flex items-center">
            <Users className="h-5 w-5 mr-2 text-blue-600" />
            Claimant (You)
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={formData.parties.party1.name}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                parties: { ...prev.parties, party1: { ...prev.parties.party1, name: e.target.value } }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.parties.party1.email}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                parties: { ...prev.parties, party1: { ...prev.parties.party1, email: e.target.value } }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 flex items-center">
            <Users className="h-5 w-5 mr-2 text-red-600" />
            Respondent (Other Party)
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={formData.parties.party2.name}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                parties: { ...prev.parties, party2: { ...prev.parties.party2, name: e.target.value } }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Other party's full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.parties.party2.email}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                parties: { ...prev.parties, party2: { ...prev.parties.party2, email: e.target.value } }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="other.party@example.com"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Detailed Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Please provide a detailed description of the dispute, including key events and your desired outcome..."
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Upload Supporting Evidence
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 mb-2">
            Drag and drop your files here, or{' '}
            <label className="text-blue-600 cursor-pointer hover:text-blue-700">
              browse
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              />
            </label>
          </p>
          <p className="text-sm text-gray-500">
            PDF, DOC, PNG, JPG up to 10MB each
          </p>
        </div>

        {formData.evidence.length > 0 && (
          <div className="mt-4 space-y-2">
            <h4 className="font-medium text-gray-900">Uploaded Files:</h4>
            {formData.evidence.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-900">{file.name}</span>
                  <span className="text-xs text-gray-500">
                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Timeline of Events (Optional)
        </label>
        <textarea
          value={formData.timeline}
          onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Provide a chronological timeline of events (e.g., Contract signed on Jan 1, Work completed Jan 15, Payment due Jan 30...)"
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg">
        <div className="px-8 py-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Submit New Dispute</h2>
              <p className="text-gray-600 mt-1">Step {step} of 3: {
                step === 1 ? 'Case Details' : 
                step === 2 ? 'Parties & Description' : 
                'Evidence & Timeline'
              }</p>
            </div>
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </button>
          </div>

          <div className="flex mt-6">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  stepNum <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`w-12 h-1 mx-2 ${
                    stepNum < step ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </button>
            )}
            <button
              type="submit"
              className="ml-auto flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
            >
              {step < 3 ? 'Continue' : 'Submit Case'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}