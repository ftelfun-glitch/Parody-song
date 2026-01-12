import React, { useState } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';
import { generateParodyLyrics } from './services/geminiService';
import { ParodyResponse, LoadingState } from './types';
import { AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [result, setResult] = useState<ParodyResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (topic: string, lyrics: string) => {
    setLoadingState(LoadingState.GENERATING);
    setError(null);
    setResult(null);

    try {
      const data = await generateParodyLyrics(topic, lyrics);
      setResult(data);
      setLoadingState(LoadingState.SUCCESS);
    } catch (err) {
      console.error(err);
      setError("Rất tiếc, hệ thống đang bận hoặc gặp lỗi khi kết nối với AI. Vui lòng thử lại sau.");
      setLoadingState(LoadingState.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-[#111827] to-[#0f172a]">
      <Header />
      
      <main className="container mx-auto px-4 py-8 lg:py-12 max-w-4xl">
        <div className="space-y-12">
          
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              Sáng tạo lời nhạc <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
                Chuẩn từng nốt nhạc
              </span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Nhập chủ đề và lời gốc, AI sẽ viết lại lời mới đảm bảo đúng số chữ, đúng vần và đặc biệt là đúng luật Bằng/Trắc để bạn hát không bị "ngượng".
            </p>
          </div>

          <InputForm 
            isLoading={loadingState === LoadingState.GENERATING} 
            onSubmit={handleGenerate} 
          />

          {loadingState === LoadingState.ERROR && (
            <div className="bg-red-900/20 border border-red-500/50 text-red-200 p-4 rounded-xl flex items-center gap-3 animate-in fade-in">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {result && loadingState === LoadingState.SUCCESS && (
            <ResultDisplay data={result} />
          )}
        </div>
      </main>

      <footer className="py-8 text-center text-slate-600 text-sm border-t border-slate-800/50 mt-12 bg-slate-900/50">
        <p>© {new Date().getFullYear()} Parody Pro. Powered by Gemini AI.</p>
      </footer>
    </div>
  );
};

export default App;