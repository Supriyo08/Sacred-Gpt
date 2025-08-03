import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GeminiService } from '@/lib/gemini';
import TranslationModal from '@/components/TranslationModal';

export default function Gita() {
  const [currentText, setCurrentText] = useState<string>('');
  const [chapter, setChapter] = useState<string>('1');
  const [verse, setVerse] = useState<string>('1');
  const [language, setLanguage] = useState<string>('English');
  const [isLoading, setIsLoading] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  const languages = [
    'English', 'Hindi', 'Sanskrit', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 
    'Russian', 'Chinese', 'Japanese', 'Korean', 'Tamil', 'Telugu', 'Bengali'
  ];

  const chapters = Array.from({ length: 18 }, (_, i) => i + 1);

  useEffect(() => {
    loadGitaText();
  }, []);

  const loadGitaText = async () => {
    setIsLoading(true);
    try {
      const text = await GeminiService.getReligiousText({
        religion: 'gita',
        chapter,
        verse,
        language
      });
      setCurrentText(text);
    } catch (error) {
      console.error('Error loading Gita text:', error);
      setCurrentText('Unable to load text at this time. Please try again later.');
    }
    setIsLoading(false);
  };

  const getRandomVerse = async () => {
    setIsLoading(true);
    try {
      const text = await GeminiService.getRandomVerse('Bhagavad Gita', language);
      setCurrentText(text);
    } catch (error) {
      console.error('Error loading random verse:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <header className="w-full py-4 px-4 bg-white/80 backdrop-blur-sm border-b border-orange-200/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">🕉️</span>
            </div>
            <h1 className="text-xl font-bold text-orange-600">Bhagavad Gita</h1>
          </Link>
          
          <Link to="/chat" className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
            Ask AI
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Controls Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-orange-200/50 sticky top-8">
              <h3 className="text-lg font-bold text-orange-800 mb-4">Navigate</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-orange-700 mb-2">Language</label>
                  <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-orange-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {languages.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-orange-700 mb-2">Chapter</label>
                  <select 
                    value={chapter}
                    onChange={(e) => setChapter(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-orange-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {chapters.map(ch => (
                      <option key={ch} value={ch}>Chapter {ch}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-orange-700 mb-2">Verse</label>
                  <input 
                    type="number"
                    value={verse}
                    onChange={(e) => setVerse(e.target.value)}
                    min="1"
                    max="78"
                    className="w-full px-3 py-2 rounded-lg border border-orange-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <button
                  onClick={loadGitaText}
                  disabled={isLoading}
                  className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
                >
                  Load Verse
                </button>

                <button
                  onClick={getRandomVerse}
                  disabled={isLoading}
                  className="w-full bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-50"
                >
                  Random Wisdom
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-orange-200/50 min-h-96">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">🕉️</span>
                  <h2 className="text-2xl font-bold text-orange-800">Chapter {chapter}, Verse {verse}</h2>
                </div>
                <button
                  onClick={() => setShowTranslation(true)}
                  disabled={!currentText || isLoading}
                  className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-50 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  <span>Translate</span>
                </button>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                </div>
              ) : (
                <div className="prose prose-lg max-w-none text-slate-700">
                  <div className="whitespace-pre-wrap leading-relaxed">{currentText}</div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => { setChapter('1'); setVerse('1'); }}
                className="p-4 bg-orange-100 hover:bg-orange-200 rounded-xl transition-colors text-center"
              >
                <div className="font-semibold text-orange-800">Start from Beginning</div>
                <div className="text-sm text-orange-600">Chapter 1</div>
              </button>

              <button
                onClick={() => { setChapter('2'); setVerse('47'); }}
                className="p-4 bg-orange-100 hover:bg-orange-200 rounded-xl transition-colors text-center"
              >
                <div className="font-semibold text-orange-800">Famous Verse</div>
                <div className="text-sm text-orange-600">Karma Yoga</div>
              </button>

              <button
                onClick={() => { setChapter('9'); setVerse('22'); }}
                className="p-4 bg-orange-100 hover:bg-orange-200 rounded-xl transition-colors text-center"
              >
                <div className="font-semibold text-orange-800">Divine Promise</div>
                <div className="text-sm text-orange-600">Chapter 9</div>
              </button>

              <button
                onClick={() => { setChapter('18'); setVerse('66'); }}
                className="p-4 bg-orange-100 hover:bg-orange-200 rounded-xl transition-colors text-center"
              >
                <div className="font-semibold text-orange-800">Ultimate Teaching</div>
                <div className="text-sm text-orange-600">Surrender</div>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Translation Modal */}
      <TranslationModal
        isOpen={showTranslation}
        onClose={() => setShowTranslation(false)}
        originalText={currentText}
        sourceLanguage={language}
      />
    </div>
  );
}
