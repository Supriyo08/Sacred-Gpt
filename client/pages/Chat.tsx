import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GeminiService } from '@/lib/gemini';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  religion?: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Peace be with you! 🙏 I\'m here to help you explore and understand the sacred teachings of the Bhagavad Gita, Bible, and Quran. Ask me anything about these holy texts, their meanings, or how they can guide your spiritual journey.',
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [selectedReligion, setSelectedReligion] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date(),
      religion: selectedReligion !== 'all' ? selectedReligion : undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    try {
      const response = await GeminiService.chatWithAI({
        message: currentMessage,
        religion: selectedReligion !== 'all' ? selectedReligion : undefined
      });

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'I apologize, but I\'m having trouble responding right now. Please try again in a moment.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = [
    { text: "What is the meaning of life according to these texts?", religion: "all" },
    { text: "Explain the concept of dharma in the Gita", religion: "gita" },
    { text: "What does Jesus teach about love and forgiveness?", religion: "bible" },
    { text: "What are the Five Pillars of Islam?", religion: "quran" },
    { text: "How can I find peace in difficult times?", religion: "all" },
    { text: "What is meditation according to these traditions?", religion: "all" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Header */}
      <header className="w-full py-4 px-4 bg-white/80 backdrop-blur-sm border-b border-purple-200/50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">🤖</span>
            </div>
            <h1 className="text-xl font-bold text-purple-600">AI Spiritual Guide</h1>
          </Link>
          
          <select 
            value={selectedReligion}
            onChange={(e) => setSelectedReligion(e.target.value)}
            className="px-3 py-2 rounded-lg border border-purple-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Religions</option>
            <option value="Bhagavad Gita">Bhagavad Gita</option>
            <option value="Bible">Bible</option>
            <option value="Quran">Quran</option>
          </select>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-120px)] flex flex-col">
        {/* Messages Container */}
        <div className="flex-1 bg-white/60 backdrop-blur-sm rounded-2xl border border-purple-200/50 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-3xl px-4 py-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/80 text-slate-700 border border-purple-200/50'
                  }`}
                >
                  <div className="whitespace-pre-wrap leading-relaxed">{message.content}</div>
                  <div className={`text-xs mt-2 ${
                    message.type === 'user' ? 'text-purple-200' : 'text-slate-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                    {message.religion && ` • ${message.religion}`}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/80 text-slate-700 border border-purple-200/50 px-4 py-3 rounded-2xl">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500"></div>
                    <span>AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="p-4 border-t border-purple-200/50 bg-white/40">
            <div className="text-sm text-purple-600 font-medium mb-2">Quick Questions:</div>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMessage(question.text)}
                  className="px-3 py-1 text-xs bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-full transition-colors"
                >
                  {question.text}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-purple-200/50 bg-white/40">
            <div className="flex space-x-3">
              <textarea
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask anything about sacred texts, spirituality, or life guidance..."
                className="flex-1 px-4 py-3 rounded-xl border border-purple-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                rows={2}
              />
              <button
                onClick={sendMessage}
                disabled={!currentMessage.trim() || isLoading}
                className="px-6 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
