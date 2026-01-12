import React, { useState } from 'react';
import { Sparkles, PenTool } from 'lucide-react';

interface InputFormProps {
  isLoading: boolean;
  onSubmit: (topic: string, lyrics: string) => void;
}

const InputForm: React.FC<InputFormProps> = ({ isLoading, onSubmit }) => {
  const [topic, setTopic] = useState('');
  const [lyrics, setLyrics] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() && lyrics.trim()) {
      onSubmit(topic, lyrics);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-xl">
      <div>
        <label htmlFor="topic" className="block text-sm font-medium text-indigo-300 mb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Chủ đề / Ý tưởng (Topic)
        </label>
        <input
          id="topic"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Ví dụ: Đời sinh viên nghèo, Thất tình trời mưa, Đi làm muộn..."
          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-100 placeholder-slate-500 transition-all outline-none"
          required
        />
      </div>

      <div>
        <label htmlFor="lyrics" className="block text-sm font-medium text-indigo-300 mb-2 flex items-center gap-2">
          <PenTool className="w-4 h-4" />
          Lời bài hát gốc (Original Lyrics)
        </label>
        <textarea
          id="lyrics"
          value={lyrics}
          onChange={(e) => setLyrics(e.target.value)}
          placeholder="Dán lời bài hát gốc vào đây..."
          rows={8}
          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-100 placeholder-slate-500 transition-all outline-none font-mono text-sm leading-relaxed"
          required
        />
        <p className="mt-2 text-xs text-slate-500">
          *Mẹo: Chia câu rõ ràng để AI phân tích nhịp tốt hơn.
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading || !topic || !lyrics}
        className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]
          ${isLoading 
            ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-500/25'
          }`}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Đang Sáng Tác...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Bắt đầu Chế Lời
          </>
        )}
      </button>
    </form>
  );
};

export default InputForm;