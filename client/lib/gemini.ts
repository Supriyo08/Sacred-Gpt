import { GoogleGenerativeAI } from '@google/generative-ai';

// Get API key with fallback
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyDHv4yo6TDcQNrVSdUK98Vf1XEdD18ZtyA';

if (!API_KEY) {
  console.error('Gemini API key is missing. Please check your environment variables.');
}

// Initialize with error handling
let genAI: GoogleGenerativeAI | null = null;
try {
  genAI = new GoogleGenerativeAI(API_KEY);
} catch (error) {
  console.error('Failed to initialize Gemini AI:', error);
}

// Get the generative model with error handling
const getModel = () => {
  if (!genAI) {
    throw new Error('Gemini AI not initialized. Please check your API key.');
  }
  return genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
};

export interface TranslationRequest {
  text: string;
  targetLanguage: string;
  sourceLanguage?: string;
}

export interface ReligiousTextRequest {
  religion: 'gita' | 'bible' | 'quran';
  chapter?: string;
  verse?: string;
  language?: string;
}

export interface ChatRequest {
  message: string;
  context?: string;
  religion?: string;
}

export class GeminiService {
  static async translateText({ text, targetLanguage, sourceLanguage = 'auto' }: TranslationRequest): Promise<string> {
    try {
      if (!genAI) {
        throw new Error('Gemini AI not available. Please check your API key.');
      }

      const model = getModel();
      const prompt = `Translate the following religious text from ${sourceLanguage} to ${targetLanguage}. Maintain the spiritual and sacred meaning while making it culturally appropriate for ${targetLanguage} speakers:

"${text}"

Please provide only the translation without additional explanations.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Translation error:', error);
      throw new Error('Failed to translate text. Please try again later.');
    }
  }

  static async getReligiousText({ religion, chapter, verse, language = 'English' }: ReligiousTextRequest): Promise<string> {
    try {
      if (!genAI) {
        throw new Error('Gemini AI not available. Please check your API key.');
      }

      const model = getModel();
      let prompt = '';

      switch (religion) {
        case 'gita':
          prompt = `Please provide ${chapter && verse ? `Chapter ${chapter}, Verse ${verse}` : 'a meaningful passage'} from the Bhagavad Gita in ${language}. Include both the original Sanskrit (if applicable) and the ${language} translation with explanation.`;
          break;
        case 'bible':
          prompt = `Please provide ${chapter && verse ? `${chapter} ${verse}` : 'a meaningful verse'} from the Bible in ${language}. Include the verse reference and provide context or explanation.`;
          break;
        case 'quran':
          prompt = `Please provide ${chapter && verse ? `Surah ${chapter}, Ayah ${verse}` : 'a meaningful ayah'} from the Quran in ${language}. Include both Arabic text (if applicable) and ${language} translation with explanation.`;
          break;
        default:
          throw new Error('Unsupported religion');
      }

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Religious text error:', error);
      throw new Error('Failed to fetch religious text. Please try again later.');
    }
  }

  static async chatWithAI({ message, context, religion }: ChatRequest): Promise<string> {
    try {
      if (!genAI) {
        throw new Error('Gemini AI not available. Please check your API key.');
      }

      const model = getModel();
      const religionContext = religion ? `in the context of ${religion}` : '';
      const prompt = `You are a respectful and knowledgeable AI assistant specializing in religious studies and spirituality. Please answer the following question ${religionContext} with wisdom, respect, and accuracy. Be inclusive of all faiths and avoid any controversial or divisive statements.

${context ? `Context: ${context}` : ''}

Question: ${message}

Please provide a thoughtful, respectful response that helps the user learn and grow spiritually.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Chat error:', error);
      throw new Error('Failed to get AI response. Please try again later.');
    }
  }

  static async getRandomVerse(religion: string, language: string = 'English'): Promise<string> {
    try {
      if (!genAI) {
        throw new Error('Gemini AI not available. Please check your API key.');
      }

      const model = getModel();
      const prompt = `Please provide a random, inspiring verse or passage from the ${religion} in ${language}. Include the reference and a brief explanation of its meaning. Make it uplifting and spiritually enriching.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Random verse error:', error);
      throw new Error('Failed to get random verse. Please try again later.');
    }
  }
}
