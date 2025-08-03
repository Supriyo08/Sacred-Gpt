import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GeminiService } from '@/lib/gemini';
import TranslationModal from '@/components/TranslationModal';

export default function Bible() {
  const [currentText, setCurrentText] = useState<string>('');
  const [book, setBook] = useState<string>('John');
  const [chapter, setChapter] = useState<string>('3');
  const [verse, setVerse] = useState<string>('16');
  const [language, setLanguage] = useState<string>('English');
  const [isLoading, setIsLoading] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  const languages = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Russian', 
    'Chinese', 'Japanese', 'Korean', 'Hindi', 'Arabic', 'Hebrew', 'Greek'
  ];

  const books = [
    'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth',
    '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', 'Psalms', 'Proverbs', 'Ecclesiastes',
    'Isaiah', 'Jeremiah', 'Ezekiel', 'Daniel', 'Matthew', 'Mark', 'Luke', 'John',
    'Acts', 'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians',
    'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', 'Hebrews', 'James',
    '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude', 'Revelation'
  ];

  useEffect(() => {
    loadBibleText();
  }, []);

  const loadBibleText = async () => {
    setIsLoading(true);
    try {
      const text = await GeminiService.getReligiousText({
        religion: 'bible',
        chapter: `${book} ${chapter}:${verse}`,
        language
      });
      setCurrentText(text);
    } catch (error) {
      console.error('Error loading Bible text:', error);
      setCurrentText('Unable to load text at this time. Please try again later.');
    }
    setIsLoading(false);
  };

  const getRandomVerse = async () => {
    setIsLoading(true);
    try {
      const text = await GeminiService.getRandomVerse('Bible', language);
      setCurrentText(text);
    } catch (error) {
      console.error('Error loading random verse:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="w-full py-4 px-4 bg-white/80 backdrop-blur-sm border-b border-blue-200/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">✝️</span>
            </div>
            <h1 className="text-xl font-bold text-blue-600">Holy Bible</h1>
          </Link>
          
          <Link to="/chat" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Ask AI
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Controls Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-blue-200/50 sticky top-8">
              <h3 className="text-lg font-bold text-blue-800 mb-4">Navigate</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-2">Language</label>
                  <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-blue-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {languages.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-2">Book</label>
                  <select 
                    value={book}
                    onChange={(e) => setBook(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-blue-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {books.map(bk => (
                      <option key={bk} value={bk}>{bk}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-2">Chapter</label>
                  <input 
                    type="number"
                    value={chapter}
                    onChange={(e) => setChapter(e.target.value)}
                    min="1"
                    className="w-full px-3 py-2 rounded-lg border border-blue-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-2">Verse</label>
                  <input 
                    type="number"
                    value={verse}
                    onChange={(e) => setVerse(e.target.value)}
                    min="1"
                    className="w-full px-3 py-2 rounded-lg border border-blue-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  onClick={loadBibleText}
                  disabled={isLoading}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  Load Verse
                </button>

                <button
                  onClick={getRandomVerse}
                  disabled={isLoading}
                  className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition-colors disabled:opacity-50"
                >
                  Random Wisdom
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-blue-200/50 min-h-96">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">✝️</span>
                  <h2 className="text-2xl font-bold text-blue-800">{book} {chapter}:{verse}</h2>
                </div>
                <button
                  onClick={() => setShowTranslation(true)}
                  disabled={!currentText || isLoading}
                  className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors disabled:opacity-50 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  <span>Translate</span>
                </button>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
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
                onClick={() => { setBook('John'); setChapter('3'); setVerse('16'); }}
                className="p-4 bg-blue-100 hover:bg-blue-200 rounded-xl transition-colors text-center"
              >
                <div className="font-semibold text-blue-800">God's Love</div>
                <div className="text-sm text-blue-600">John 3:16</div>
              </button>

              <button
                onClick={() => { setBook('Psalms'); setChapter('23'); setVerse('1'); }}
                className="p-4 bg-blue-100 hover:bg-blue-200 rounded-xl transition-colors text-center"
              >
                <div className="font-semibold text-blue-800">The Lord's Shepherd</div>
                <div className="text-sm text-blue-600">Psalm 23</div>
              </button>

              <button
                onClick={() => { setBook('Matthew'); setChapter('5'); setVerse('3'); }}
                className="p-4 bg-blue-100 hover:bg-blue-200 rounded-xl transition-colors text-center"
              >
                <div className="font-semibold text-blue-800">Beatitudes</div>
                <div className="text-sm text-blue-600">Matthew 5</div>
              </button>

              <button
                onClick={() => { setBook('1 Corinthians'); setChapter('13'); setVerse('4'); }}
                className="p-4 bg-blue-100 hover:bg-blue-200 rounded-xl transition-colors text-center"
              >
                <div className="font-semibold text-blue-800">Love Chapter</div>
                <div className="text-sm text-blue-600">1 Cor 13</div>
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
