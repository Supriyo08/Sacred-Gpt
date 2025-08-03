import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GeminiService } from '@/lib/gemini';
import TranslationModal from '@/components/TranslationModal';

export default function Quran() {
  const [currentText, setCurrentText] = useState<string>('');
  const [surah, setSurah] = useState<string>('1');
  const [ayah, setAyah] = useState<string>('1');
  const [language, setLanguage] = useState<string>('English');
  const [isLoading, setIsLoading] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  const languages = [
    'English', 'Arabic', 'Urdu', 'Persian', 'Turkish', 'Malay', 'Indonesian', 'French', 
    'German', 'Spanish', 'Russian', 'Chinese', 'Japanese', 'Hindi', 'Bengali'
  ];

  const surahs = [
    { number: 1, name: 'Al-Fatihah (The Opening)' },
    { number: 2, name: 'Al-Baqarah (The Cow)' },
    { number: 3, name: 'Ali Imran (Family of Imran)' },
    { number: 4, name: 'An-Nisa (The Women)' },
    { number: 5, name: 'Al-Maidah (The Table)' },
    { number: 18, name: 'Al-Kahf (The Cave)' },
    { number: 19, name: 'Maryam (Mary)' },
    { number: 36, name: 'Ya-Sin' },
    { number: 55, name: 'Ar-Rahman (The Beneficent)' },
    { number: 67, name: 'Al-Mulk (The Sovereignty)' },
    { number: 112, name: 'Al-Ikhlas (The Sincerity)' },
    { number: 113, name: 'Al-Falaq (The Dawn)' },
    { number: 114, name: 'An-Nas (Mankind)' }
  ];

  useEffect(() => {
    loadQuranText();
  }, []);

  const loadQuranText = async () => {
    setIsLoading(true);
    try {
      const text = await GeminiService.getReligiousText({
        religion: 'quran',
        chapter: surah,
        verse: ayah,
        language
      });
      setCurrentText(text);
    } catch (error) {
      console.error('Error loading Quran text:', error);
      setCurrentText('Unable to load text at this time. Please try again later.');
    }
    setIsLoading(false);
  };

  const getRandomVerse = async () => {
    setIsLoading(true);
    try {
      const text = await GeminiService.getRandomVerse('Quran', language);
      setCurrentText(text);
    } catch (error) {
      console.error('Error loading random verse:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <header className="w-full py-4 px-4 bg-white/80 backdrop-blur-sm border-b border-emerald-200/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">☪️</span>
            </div>
            <h1 className="text-xl font-bold text-emerald-600">Holy Quran</h1>
          </Link>
          
          <Link to="/chat" className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
            Ask AI
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Controls Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-emerald-200/50 sticky top-8">
              <h3 className="text-lg font-bold text-emerald-800 mb-4">Navigate</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">Language</label>
                  <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-emerald-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {languages.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">Surah</label>
                  <select 
                    value={surah}
                    onChange={(e) => setSurah(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-emerald-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {surahs.map(s => (
                      <option key={s.number} value={s.number}>{s.number}. {s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">Ayah</label>
                  <input 
                    type="number"
                    value={ayah}
                    onChange={(e) => setAyah(e.target.value)}
                    min="1"
                    className="w-full px-3 py-2 rounded-lg border border-emerald-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <button
                  onClick={loadQuranText}
                  disabled={isLoading}
                  className="w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50"
                >
                  Load Ayah
                </button>

                <button
                  onClick={getRandomVerse}
                  disabled={isLoading}
                  className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50"
                >
                  Random Wisdom
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-emerald-200/50 min-h-96">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">☪️</span>
                  <h2 className="text-2xl font-bold text-emerald-800">Surah {surah}, Ayah {ayah}</h2>
                </div>
                <button
                  onClick={() => setShowTranslation(true)}
                  disabled={!currentText || isLoading}
                  className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  <span>Translate</span>
                </button>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
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
                onClick={() => { setSurah('1'); setAyah('1'); }}
                className="p-4 bg-emerald-100 hover:bg-emerald-200 rounded-xl transition-colors text-center"
              >
                <div className="font-semibold text-emerald-800">Al-Fatihah</div>
                <div className="text-sm text-emerald-600">The Opening</div>
              </button>

              <button
                onClick={() => { setSurah('2'); setAyah('255'); }}
                className="p-4 bg-emerald-100 hover:bg-emerald-200 rounded-xl transition-colors text-center"
              >
                <div className="font-semibold text-emerald-800">Ayat al-Kursi</div>
                <div className="text-sm text-emerald-600">Throne Verse</div>
              </button>

              <button
                onClick={() => { setSurah('36'); setAyah('1'); }}
                className="p-4 bg-emerald-100 hover:bg-emerald-200 rounded-xl transition-colors text-center"
              >
                <div className="font-semibold text-emerald-800">Ya-Sin</div>
                <div className="text-sm text-emerald-600">Heart of Quran</div>
              </button>

              <button
                onClick={() => { setSurah('112'); setAyah('1'); }}
                className="p-4 bg-emerald-100 hover:bg-emerald-200 rounded-xl transition-colors text-center"
              >
                <div className="font-semibold text-emerald-800">Al-Ikhlas</div>
                <div className="text-sm text-emerald-600">Sincerity</div>
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
