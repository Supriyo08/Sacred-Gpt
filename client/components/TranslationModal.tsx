import { useState } from 'react';
import { GeminiService } from '@/lib/gemini';

interface TranslationModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalText: string;
  sourceLanguage?: string;
}

export default function TranslationModal({ isOpen, onClose, originalText, sourceLanguage = 'auto' }: TranslationModalProps) {
  const [targetLanguage, setTargetLanguage] = useState('Spanish');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const languages = [
    'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Russian', 'Chinese', 
    'Japanese', 'Korean', 'Hindi', 'Arabic', 'Tamil', 'Telugu', 'Bengali', 'Urdu', 
    'Persian', 'Turkish', 'Dutch', 'Swedish', 'Norwegian', 'Polish', 'Hebrew',
    'Thai', 'Vietnamese', 'Indonesian', 'Malay', 'Swahili', 'Amharic'
  ];

  const handleTranslate = async () => {
    if (!originalText.trim()) return;
    
    setIsLoading(true);
    try {
      const result = await GeminiService.translateText({
        text: originalText,
        targetLanguage,
        sourceLanguage
      });
      setTranslatedText(result);
    } catch (error) {
      console.error('Translation error:', error);
      setTranslatedText('Translation failed. Please try again.');
    }
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">Translate Sacred Text</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Language Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Translate to:
            </label>
            <select 
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          {/* Original Text */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-slate-700 mb-2">Original Text:</h3>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 max-h-32 overflow-y-auto">
              <p className="text-slate-600 text-sm leading-relaxed">{originalText}</p>
            </div>
          </div>

          {/* Translation Result */}
          {translatedText && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-slate-700 mb-2">Translation ({targetLanguage}):</h3>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                <p className="text-slate-700 leading-relaxed">{translatedText}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-slate-200 bg-slate-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleTranslate}
            disabled={isLoading}
            className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Translating...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                <span>Translate</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
