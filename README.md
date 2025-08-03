Sacred Texts AI Guide
Welcome to the Sacred Texts AI Guide, a comprehensive platform that enables you to explore, learn, and reflect on sacred scriptures from various religions through AI-powered insights and translations. This project combines spiritually enriching content with modern technology to foster understanding and growth.

Features
Read and navigate sacred texts such as the Bhagavad Gita, Bible, and Quran.
Multi-language support with accurate translations.
AI chatbot for answering questions and providing explanations.
Dynamic, user-friendly UI components.
News, features, and inspirational quotes.
Cross-platform accessibility.
Technologies Used
React
Vite
Next.js
Tailwind CSS
Radix UI components
Gemini AI (Google Generative AI)
Various UI libraries (@radix-ui/react, lucide-react, etc.)
Serverless functions (Netlify/Vercel)
API Integration
The backend server is built with Express and exposes endpoints for fetching religious texts, translations, and chat interactions. It integrates with Google Gemini AI for dynamic content generation.

How to Run Locally
Clone the repository.
Install dependencies:
bash
npm install
Run the development server:
bash
npm run dev
Access the app at http://localhost:3000.
Pages Overview
Home Page (Index.tsx)
Highlights sacred texts and features.
Shows daily spiritual wisdom.
Navigates to Gita, Bible, Quran pages.
Quick links to specific chapters/verses.
Gita Page (Gita.tsx)
Read selected chapters and verses from Bhagavad Gita.
Choose language, chapter, and verse.
Random wisdom feature.
AI translation and insight.
Bible Page (Bible.tsx)
Read scriptures with chapter and verse selection.
View daily Bible wisdom.
Multi-language support.
AI insights and translations.
Quran Page (Quran.tsx)
Navigate Surahs and Ayahs.
Access daily Quranic wisdom.
Chat Page (Chat.tsx)
Interactive AI chatbot offering spiritual guidance.
Supports multiple religions.
Quick question buttons for instant inquiries.
Not Found Page (NotFound.tsx)
Custom 404 page with spiritual theme.
Links to home, chat, and texts.
Inspirational quotes.
Custom Components & UI Elements
Buttons, Cards, Modals, Sliders, and more from the UI library.
Themed with Tailwind CSS and accessible practices.
Responsive design for mobile and desktop.
Contributing
Feel free to contribute or suggest improvements. Review the codebase and follow best practices for React and TypeScript developmen
