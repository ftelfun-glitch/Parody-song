import React from 'react';
import { Music, Mic2 } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-6 border-b border-slate-800 bg-slate-900/50 sticky top-0 z-10 backdrop-blur-md">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg shadow-lg shadow-indigo-500/20">
            <Music className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              Parody Pro Studio
            </h1>
            <p className="text-xs text-slate-400 font-medium">Virtual Music Producer</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500">
          <Mic2 className="w-4 h-4" />
          <span>Professional Vocal Matching</span>
        </div>
      </div>
    </header>
  );
};

export default Header;