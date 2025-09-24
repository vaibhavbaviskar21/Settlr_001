import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  FileText,
  FolderOpen,
  Plus,
  Lightbulb
} from 'lucide-react';

/* ─── Types ─────────────────────────────────────── */
interface MediationRoomProps {
  disputeData: { title: string; amount: number };
  onGenerateAgreement: () => void;
}
interface Message {
  id: string;
  sender: 'user' | 'ai' | 'other_party';
  content: string;
  timestamp: Date;
  type: 'message' | 'suggestion' | 'system';
}
interface EvidenceItem {
  id: string;
  name: string;
  by: 'you' | 'other';
  uploadedAt: string;
}

/* ─── Component ─────────────────────────────────── */
export default function MediationRoom({
  disputeData,
  onGenerateAgreement
}: MediationRoomProps) {
  /* Chat ---------------------------------------------------- */
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  /* Sidebar ------------------------------------------------- */
  const [activeTab, setActiveTab] =
    useState<'chat' | 'you' | 'other'>('chat');
  const [participants, setParticipants] = useState([
    'Mediator',
    'Other party',
    'You'
  ]);
  const [evidence, setEvidence] = useState<EvidenceItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* Scrolling ---------------------------------------------- */
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(
    () => endRef.current?.scrollIntoView({ behavior: 'smooth' }),
    [messages]
  );

  /* AI suggestions ----------------------------------------- */
  const aiSuggestions = [
    'Suggest a trial period for the work quality',
    'Propose milestone-based payments',
    'Recommend mutual feedback exchange',
    'Offer professional mediation services'
  ];

  /* Handlers ------------------------------------------------ */
  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages((m) => [
      ...m,
      {
        id: Date.now().toString(),
        sender: 'user',
        content: newMessage,
        timestamp: new Date(),
        type: 'message'
      }
    ]);
    setNewMessage('');
  };

  const openFilePicker = () => fileInputRef.current?.click();

  const filesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const items: EvidenceItem[] = Array.from(e.target.files).map(
      (file) => ({
        id: `${Date.now()}-${file.name}`,
        name: file.name,
        by: 'you',
        uploadedAt: new Date().toLocaleTimeString()
      })
    );
    setEvidence((p) => [...p, ...items]);
    e.target.value = ''; // allow same file again
  };

  const addParticipant = () =>
    setParticipants((p) => [...p, `Participant ${p.length + 1}`]);

  /* ─── JSX ------------------------------------------------- */
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid lg:grid-cols-4 gap-6">
        {/* ────── Sidebar ────── */}
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg h-[700px] flex flex-col">
            {[
              { id: 'chat', label: 'Chat' },
              { id: 'you', label: 'Your Evidence' },
              { id: 'other', label: 'Other Evidence' }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setActiveTab(btn.id as any)}
                className={`w-full text-left px-4 py-3 border-b border-gray-200 text-sm font-medium ${
                  activeTab === btn.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {btn.label}
              </button>
            ))}

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {activeTab === 'chat' &&
                participants.map((name) => (
                  <div
                    key={name}
                    className="flex justify-between items-center px-3 py-2 bg-gray-100 rounded text-sm"
                  >
                    <span>{name}</span>
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                  </div>
                ))}

              {activeTab !== 'chat' &&
                evidence
                  .filter((e) =>
                    activeTab === 'you' ? e.by === 'you' : e.by === 'other'
                  )
                  .map((e) => (
                    <div
                      key={e.id}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded text-sm"
                    >
                      <a
                        href="#"
                        onClick={(ev) => ev.preventDefault()}
                        className="flex items-center text-blue-600 hover:underline"
                        title="Preview / download evidence"
                      >
                        <FolderOpen className="w-4 h-4 mr-2" />
                        {e.name}
                      </a>
                      <span className="text-xs text-gray-500">
                        {e.uploadedAt}
                      </span>
                    </div>
                  ))}

              {activeTab === 'you' && (
                <>
                  <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={filesSelected}
                    className="hidden"
                  />
                  <button
                    onClick={openFilePicker}
                    className="w-full mt-2 bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700 flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Evidence
                  </button>
                </>
              )}
            </div>

            {/* Footer button */}
            <button
              onClick={addParticipant}
              className="w-full text-sm py-3 border-t border-gray-200 flex items-center justify-center hover:bg-gray-50"
            >
              <Plus className="w-4 h-4 mr-1" />
              New Participant
            </button>
          </div>
        </aside>

        {/* ────── Chat window ────── */}
        <section className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-lg h-[700px] flex flex-col">
            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-4 flex justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Mediation Room
                </h2>
                <p className="text-sm text-gray-600">
                  {disputeData.title} – $
                  {disputeData.amount.toLocaleString()}
                </p>
              </div>
              <button
                onClick={onGenerateAgreement}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center text-sm"
              >
                <FileText className="w-4 h-4 mr-2" />
                Generate Agreement
              </button>
            </div>

            {/* AI suggestions */}
            <div className="bg-yellow-50 border border-yellow-300 rounded-md m-6 p-4">
              <h3 className="font-semibold text-yellow-700 mb-2 flex items-center">
                <Lightbulb className="h-5 w-5 mr-2" />
                AI Suggestions
              </h3>
              <div className="flex flex-wrap gap-2">
                {aiSuggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setNewMessage(s)}
                    className="bg-yellow-100 text-yellow-900 px-3 py-1 rounded text-sm hover:bg-yellow-200"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex items-start space-x-3 ${
                    m.sender === 'user'
                      ? 'flex-row-reverse space-x-reverse'
                      : ''
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      m.sender === 'ai'
                        ? 'bg-blue-100 text-blue-600'
                        : m.sender === 'user'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-purple-100 text-purple-600'
                    }`}
                  >
                    {m.sender === 'ai' ? (
                      <Bot className="h-4 w-4" />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                  </div>

                  <div
                    className={`max-w-md p-4 rounded-lg ${
                      m.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : m.sender === 'ai'
                        ? 'bg-gray-100 text-gray-900'
                        : 'bg-purple-100 text-purple-900'
                    }`}
                  >
                    <p className="text-sm">{m.content}</p>
                    <p
                      className={`text-xs mt-2 ${
                        m.sender === 'user'
                          ? 'text-blue-200'
                          : 'text-gray-500'
                      }`}
                    >
                      {m.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 p-4 flex space-x-3">
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message…"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 flex items-center"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
