import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GeminiService } from '@/lib/gemini';

export default function Index() {
  const [dailyVerse, setDailyVerse] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languages = [
    'English', 'Hindi', 'Arabic', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 
    'Russian', 'Chinese', 'Japanese', 'Korean', 'Tamil', 'Telugu', 'Bengali', 'Urdu', 
    'Persian', 'Turkish', 'Dutch', 'Swedish'
  ];

  const getDailyVerse = async (religion: string) => {
    setIsLoading(true);
    try {
      const verse = await GeminiService.getRandomVerse(religion, selectedLanguage);
      setDailyVerse(verse);
    } catch (error) {
      console.error('Error fetching daily verse:', error);
      setDailyVerse('Unable to load verse at this time. Please try again later.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-indigo-50">
      {/* Header */}
      <header className="w-full py-6 px-4 bg-white/80 backdrop-blur-sm border-b border-slate-200/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">📿</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Sacred Texts GPT
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <select 
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-3 py-2 rounded-lg border border-slate-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
            Explore Sacred
            <span className="block bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Wisdom
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Discover the timeless teachings of the Bhagavad Gita, Bible, and Quran. 
            Read, learn, and grow spiritually with AI-powered insights in any language.
          </p>
        </div>

        {/* Sacred Texts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Bhagavad Gita */}
          <Link to="/gita" className="group">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-400 p-8 h-72 flex flex-col justify-between transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-all duration-300"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                  <span className="text-3xl">🕉️</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Bhagavad Gita</h3>
                <p className="text-white/90 text-sm">
                  The eternal dialogue between Prince Arjuna and Lord Krishna on the battlefield of Kurukshetra.
                </p>
              </div>
              <div className="relative z-10">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    getDailyVerse('Bhagavad Gita');
                  }}
                  className="text-white/80 hover:text-white text-sm font-medium flex items-center space-x-1"
                >
                  <span>Daily Verse</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </Link>

          {/* Bible */}
          <Link to="/bible" className="group">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 p-8 h-72 flex flex-col justify-between transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-all duration-300"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                  <span className="text-3xl">✝️</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Holy Bible</h3>
                <p className="text-white/90 text-sm">
                  The sacred scriptures containing God's word, teachings of Jesus Christ, and divine wisdom.
                </p>
              </div>
              <div className="relative z-10">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    getDailyVerse('Bible');
                  }}
                  className="text-white/80 hover:text-white text-sm font-medium flex items-center space-x-1"
                >
                  <span>Daily Verse</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </Link>

          {/* Quran */}
          <Link to="/quran" className="group">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-8 h-72 flex flex-col justify-between transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-all duration-300"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                  <span className="text-3xl">☪️</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Holy Quran</h3>
                <p className="text-white/90 text-sm">
                  The final revelation from Allah to humanity through Prophet Muhammad (PBUH).
                </p>
              </div>
              <div className="relative z-10">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    getDailyVerse('Quran');
                  }}
                  className="text-white/80 hover:text-white text-sm font-medium flex items-center space-x-1"
                >
                  <span>Daily Verse</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </Link>
        </div>

        {/* Daily Verse Section */}
        {dailyVerse && (
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-slate-200/50 shadow-lg">
            <h3 className="text-2xl font-bold text-slate-800 mb-4 text-center">Today's Spiritual Wisdom</h3>
            <div className="prose prose-lg max-w-none text-slate-700">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
                </div>
              ) : (
                <div className="whitespace-pre-wrap">{dailyVerse}</div>
              )}
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 rounded-xl bg-white/40 backdrop-blur-sm border border-slate-200/30">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Multi-Language</h3>
            <p className="text-slate-600 text-sm">Read scriptures in over 20 languages with accurate translations.</p>
          </div>

          <div className="text-center p-6 rounded-xl bg-white/40 backdrop-blur-sm border border-slate-200/30">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">AI Assistant</h3>
            <p className="text-slate-600 text-sm">Ask questions and get intelligent insights about any verse or teaching.</p>
          </div>

          <div className="text-center p-6 rounded-xl bg-white/40 backdrop-blur-sm border border-slate-200/30">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Study Mode</h3>
            <p className="text-slate-600 text-sm">Deep dive into specific chapters, verses, and their meanings.</p>
          </div>

          <div className="text-center p-6 rounded-xl bg-white/40 backdrop-blur-sm border border-slate-200/30">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Daily Wisdom</h3>
            <p className="text-slate-600 text-sm">Receive inspiring verses and teachings for spiritual growth.</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">Begin Your Spiritual Journey</h3>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Access ancient wisdom in modern times. Learn, reflect, and grow with the guidance of sacred texts and AI-powered insights.
          </p>
          <Link to="/chat" className="inline-flex items-center space-x-2 bg-white text-slate-900 px-8 py-4 rounded-xl font-semibold hover:bg-slate-100 transition-colors duration-200 shadow-lg">
            <span>Start Learning with AI</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </main>
    </div>
  );
}
