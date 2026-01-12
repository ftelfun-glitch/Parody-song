import React from 'react';
import { LyricPair, ParodyResponse } from '../types';
import { Copy, Check, Quote, Activity, Music2 } from 'lucide-react';

interface ResultDisplayProps {
  data: ParodyResponse;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ data }) => {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);
  const [copiedAll, setCopiedAll] = React.useState(false);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyAll = () => {
    const allText = data.lyrics.map(l => l.new).join('\n');
    navigator.clipboard.writeText(allText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const countSyllables = (text: string) => {
    return text.trim().split(/\s+/).length;
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Producer's Commentary */}
      {data.commentary && (
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950/50 border border-indigo-500/30 p-6 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Music2 className="w-24 h-24" />
          </div>
          <Quote className="absolute top-4 left-4 w-6 h-6 text-indigo-400/40" />
          <p className="text-indigo-200 italic text-center px-6 relative z-10 font-medium leading-relaxed">
            "{data.commentary}"
          </p>
          <div className="mt-4 text-center relative z-10">
             <span className="text-[10px] font-bold text-indigo-300 bg-indigo-900/80 px-3 py-1 rounded-full uppercase tracking-widest border border-indigo-500/20">
               Music Producer AI
             </span>
          </div>
        </div>
      )}

      {/* Action Bar */}
      <div className="flex justify-between items-end border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Bản Phối Mới</h2>
          <p className="text-xs text-slate-500 mt-1">Đã kiểm tra luật Bằng/Trắc & đếm âm tiết</p>
        </div>
        <button
          onClick={handleCopyAll}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-bold text-white transition-all shadow-lg shadow-indigo-900/20"
        >
          {copiedAll ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          Copy All
        </button>
      </div>

      {/* Lyrics Cards */}
      <div className="grid gap-6">
        {data.lyrics.map((pair, index) => {
           const originalCount = countSyllables(pair.original);
           const newCount = countSyllables(pair.new);
           const isCountMatch = originalCount === newCount;

           return (
            <div 
              key={index} 
              className="bg-slate-800/40 rounded-xl p-5 border border-slate-700/50 hover:border-indigo-500/30 transition-all duration-300 relative group"
            >
              <div className="absolute top-3 right-3 text-[10px] font-mono text-slate-600">
                #{index + 1}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Original */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-400">🎵 Gốc ({originalCount} chữ)</span>
                  </div>
                  <p className="text-slate-300 font-serif text-lg leading-relaxed opacity-80">
                    {pair.original}
                  </p>
                </div>

                {/* New */}
                <div className="space-y-2 relative">
                  <div className="flex items-center justify-between text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                    <span className={`px-2 py-0.5 rounded ${isCountMatch ? 'bg-indigo-950/50 text-indigo-300' : 'bg-red-900/20 text-red-400'}`}>
                      📝 Mới ({newCount} chữ)
                    </span>
                    <button
                      onClick={() => handleCopy(pair.new, index)}
                      className="text-slate-500 hover:text-white transition-colors"
                    >
                      {copiedIndex === index ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                  <p className="text-indigo-100 font-medium text-xl leading-relaxed">
                    {pair.new}
                  </p>
                </div>
              </div>

              {/* Analysis Footer */}
              <div className="mt-4 pt-3 border-t border-slate-700/30 flex items-start gap-2">
                <div className="mt-0.5 bg-green-900/30 p-1 rounded-full">
                  <Check className="w-3 h-3 text-green-400" />
                </div>
                <div className="text-sm text-slate-400 font-mono">
                  <span className="text-green-500/80 font-bold mr-2">✅ Check dấu:</span>
                  {pair.analysis}
                </div>
              </div>

            </div>
          );
        })}
      </div>
      
      <div className="text-center py-6">
        <p className="text-xs text-slate-600">
           Mẹo: Nếu nhịp điệu chưa khớp, hãy thử đọc chậm lại theo phân tích dấu ở trên.
        </p>
      </div>
    </div>
  );
};

export default ResultDisplay;