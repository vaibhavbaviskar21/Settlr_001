import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, FileText, Lightbulb, Clock, CheckCircle } from 'lucide-react';

interface MediationRoomProps {
  disputeData: any;
  onGenerateAgreement: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'ai' | 'other_party';
  content: string;
  timestamp: Date;
  type: 'message' | 'suggestion' | 'system';
}

export default function MediationRoom({ disputeData, onGenerateAgreement }: MediationRoomProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      content: `Welcome to mediation! I'm here to help facilitate a fair resolution. Based on my analysis, I've identified the key issues and have some suggestions to help both parties reach an agreement.`,
      timestamp: new Date(),
      type: 'system'
    },
    {
      id: '2',
      sender: 'ai',
      content: `The core issue seems to be around work quality expectations vs. delivered results. Both parties have valid concerns. I recommend focusing on finding a middle ground that acknowledges the work done while addressing quality concerns.`,
      timestamp: new Date(),
      type: 'suggestion'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [otherPartyStatus, setOtherPartyStatus] = useState<'offline' | 'online' | 'typing'>('online');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: newMessage,
      timestamp: new Date(),
      type: 'message'
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "That's a reasonable point. How do you think the other party might respond to this proposal?",
        "I understand your perspective. Have you considered the other party's constraints in this situation?",
        "That could work well. Let me suggest some specific terms that might address both parties' concerns.",
        "Good thinking. This approach could lead to a win-win solution."
      ];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date(),
        type: 'message'
      };
      
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);

    // Simulate other party message occasionally
    if (Math.random() > 0.6) {
      setTimeout(() => {
        const otherPartyMessage: Message = {
          id: (Date.now() + 2).toString(),
          sender: 'other_party',
          content: "I'm willing to consider that option. Can we discuss the payment timeline?",
          timestamp: new Date(),
          type: 'message'
        };
        
        setMessages(prev => [...prev, otherPartyMessage]);
      }, 3000);
    }
  };

  const aiSuggestions = [
    "Suggest a trial period for the work quality",
    "Propose milestone-based payments",
    "Recommend mutual feedback exchange",
    "Offer professional mediation services"
  ];

  const quickResponses = [
    "I agree with that approach",
    "Let me think about this",
    "Can you clarify the terms?",
    "That seems fair to me"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="h-5 w-5 text-blue-600 mr-2" />
              Session Info
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium text-gray-900">24 min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Messages:</span>
                <span className="font-medium text-gray-900">{messages.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                  <span className="font-medium text-green-700">Active</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="h-5 w-5 text-yellow-600 mr-2" />
              AI Suggestions
            </h3>
            <div className="space-y-2">
              {aiSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="w-full text-left p-3 text-sm bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors border border-yellow-200"
                  onClick={() => setNewMessage(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Progress</h3>
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                <span className="text-gray-700">Issues identified</span>
              </div>
              <div className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                <span className="text-gray-700">Initial proposals shared</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2" />
                <span className="text-gray-700">Negotiating terms</span>
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <div className="w-4 h-4 border-2 border-gray-300 rounded-full mr-2" />
                <span>Agreement finalization</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-lg h-[700px] flex flex-col">
            {/* Chat Header */}
            <div className="border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Mediation Room</h2>
                  <p className="text-sm text-gray-600">
                    {disputeData.title} - ${parseInt(disputeData.amount).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-sm">
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      otherPartyStatus === 'online' ? 'bg-green-500' : 
                      otherPartyStatus === 'typing' ? 'bg-yellow-500' : 'bg-gray-400'
                    }`}></div>
                    <span className="text-gray-600">
                      {otherPartyStatus === 'online' ? 'Other party online' : 
                       otherPartyStatus === 'typing' ? 'Other party typing...' : 'Other party offline'}
                    </span>
                  </div>
                  <button
                    onClick={onGenerateAgreement}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Agreement
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex items-start space-x-3 ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'ai' ? 'bg-blue-100 text-blue-600' :
                    message.sender === 'user' ? 'bg-green-100 text-green-600' : 
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {message.sender === 'ai' ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </div>
                  <div className={`max-w-md p-4 rounded-lg ${
                    message.sender === 'user' ? 'bg-blue-600 text-white' :
                    message.sender === 'ai' ? 'bg-gray-100 text-gray-900' :
                    'bg-purple-100 text-purple-900'
                  } ${
                    message.type === 'suggestion' ? 'border-2 border-yellow-200' : ''
                  }`}>
                    {message.type === 'suggestion' && (
                      <div className="flex items-center mb-2 text-yellow-700">
                        <Lightbulb className="h-4 w-4 mr-1" />
                        <span className="text-xs font-medium">AI Suggestion</span>
                      </div>
                    )}
                    <p className={`text-sm ${message.sender === 'user' ? 'text-white' : 'text-gray-800'}`}>
                      {message.content}
                    </p>
                    <p className={`text-xs mt-2 ${
                      message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Responses */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {quickResponses.map((response, index) => (
                  <button
                    key={index}
                    onClick={() => setNewMessage(response)}
                    className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
                  >
                    {response}
                  </button>
                ))}
              </div>

              {/* Message Input */}
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}