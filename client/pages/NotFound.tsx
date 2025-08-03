import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Sacred Symbol */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <div className="text-4xl text-white">🙏</div>
          </div>
        </div>

        {/* Main Message */}
        <div className="mb-12">
          <h1 className="text-6xl font-bold text-slate-800 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-slate-700 mb-6">Path Not Found</h2>
          <p className="text-xl text-slate-600 leading-relaxed mb-8">
            "Even when the path seems unclear, wisdom guides us back to the right way."
          </p>
          <p className="text-slate-500">
            The page you're looking for doesn't exist, but your spiritual journey continues.
          </p>
        </div>

        {/* Navigation Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          <Link 
            to="/" 
            className="p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/50 hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🏠</span>
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">Return Home</h3>
            <p className="text-sm text-slate-600">Start your spiritual journey</p>
          </Link>

          <Link 
            to="/chat" 
            className="p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/50 hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">Ask AI Guide</h3>
            <p className="text-sm text-slate-600">Get spiritual guidance</p>
          </Link>

          <Link 
            to="/gita" 
            className="p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/50 hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🕉️</span>
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">Read Gita</h3>
            <p className="text-sm text-slate-600">Ancient wisdom awaits</p>
          </Link>
        </div>

        {/* Inspirational Quote */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 text-white">
          <blockquote className="text-lg italic mb-4">
            "The journey of a thousand miles begins with a single step."
          </blockquote>
          <cite className="text-slate-300">— Ancient Wisdom</cite>
        </div>
      </div>
    </div>
  );
}
