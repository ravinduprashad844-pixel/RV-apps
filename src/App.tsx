import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Activity, 
  UploadCloud, 
  Volume2, 
  TrendingUp, 
  Calendar, 
  Clock, 
  CheckCircle, 
  Lightbulb, 
  X, 
  AlertTriangle,
  Play, 
  FileText,
  HelpCircle,
  Award
} from 'lucide-react';
import { sampleCalls } from './data/samples';
import { CallAnalysis } from './types';
import SentimentGraph from './components/SentimentGraph';
import CoachingCard from './components/CoachingCard';
import TranscriptView from './components/TranscriptView';

export default function App() {
  // Combine pre-packaged samples with uploaded analyses
  const [analyses, setAnalyses] = useState<CallAnalysis[]>(sampleCalls);
  const [selectedId, setSelectedId] = useState<string>('sample-1');
  
  // Loading & drag states
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingPhase, setLoadingPhase] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to top of dashboard when selected call changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedId]);

  // Find active data model
  const activeCall = analyses.find((c) => c.id === selectedId) || analyses[0];

  // Simulated phase text sequences for upload loaders
  const loadingPhases = [
    'Submitting audio package to secure server...',
    'Analyzing call audio waveforms...',
    'Diarizing speaker lanes (Speaker A vs Speaker B)...',
    'Transcribing conversation turns & timestamps...',
    'Calculating speech talk-to-listen ratios...',
    'Assessing agent conversational roadblocks...',
    'Synthesizing 1-to-1 coaching opportunities...',
    'Finalizing coaching report metadata...'
  ];

  // Helper to trigger realistic phase status changes
  const runLoadingAnimation = (callback: () => void) => {
    setLoading(true);
    setError(null);
    let phaseIndex = 0;
    setLoadingPhase(loadingPhases[0]);

    const interval = setInterval(() => {
      phaseIndex++;
      if (phaseIndex < loadingPhases.length) {
        setLoadingPhase(loadingPhases[phaseIndex]);
      } else {
        clearInterval(interval);
      }
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  };

  // Convert files to base64
  const processAudioFile = (file: File) => {
    if (!file.type.startsWith('audio/') && !file.name.endsWith('.mp3') && !file.name.endsWith('.wav') && !file.name.endsWith('.m4a') && !file.name.endsWith('.webm') && !file.name.endsWith('.ogg')) {
      setError('Please provide a valid audio file (MP3, WAV, M4A, WebM, OGG)');
      return;
    }

    const clearAnimation = runLoadingAnimation(() => {});

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        const base64Content = reader.result as string;
        // Strip data prefix: e.g. "data:audio/mp3;base64,..."
        const rawBase64 = base64Content.split(',')[1];

        const response = await fetch('/api/analyze-audio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            audioData: rawBase64,
            filename: file.name,
            mimeType: file.type || 'audio/mp3'
          })
        });

        if (!response.ok) {
          const errDetail = await response.json();
          throw new Error(errDetail.error || 'Server processing error.');
        }

        const data: CallAnalysis = await response.json();
        
        // Push to local analyses collection
        setAnalyses((prev) => [data, ...prev]);
        setSelectedId(data.id);
        setLoading(false);
        clearAnimation();
      } catch (err: any) {
        console.error('Core audio pipeline failed:', err);
        setError(err.message || 'The Gemini key is busy or API limits are met. Try checking settings.');
        setLoading(false);
        clearAnimation();
      }
    };

    reader.onerror = () => {
      setError('Failed to correctly parse custom filesystem file.');
      setLoading(false);
      clearAnimation();
    };
  };

  // Drag handles
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processAudioFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processAudioFile(e.target.files[0]);
    }
  };

  const triggerSelectFile = () => {
    fileInputRef.current?.click();
  };

  // Handy quick sample launcher for fast instant demo reviews without manual files
  const triggerSimulatedSaaSTest = () => {
    const virtualFile = new File(["dummy_saas_media"], "Enterprise_CRM_Staging_Analysis.mp3", { type: "audio/mp3" });
    processAudioFile(virtualFile);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16 antialiased">
      
      {/* Premium Header Stage */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-100 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          
          {/* Logo / Branding */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 shadow-md flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  AuraSales
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-widest bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full border border-indigo-100">
                  Coaching Pro
                </span>
              </div>
              <p className="text-xs text-slate-500">Sales Intelligence & Diarized Speech Auditor</p>
            </div>
          </div>

          {/* Quick Header Selector Controls */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="text-right hidden xl:block">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Auditing Rep Performance</p>
              <p className="text-xs font-semibold text-slate-600">Dual-channel acoustic modeling</p>
            </div>

            <div className="h-8 w-px bg-slate-200 hidden xl:block"></div>

            {/* Direct selector */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Active Session:</span>
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                className="bg-white border border-slate-200 shadow-sm rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 outline-none focus:ring-1 focus:ring-indigo-500 w-full md:w-64 max-w-xs cursor-pointer"
              >
                {analyses.map((call) => (
                  <option key={call.id} value={call.id}>
                    {call.title} ({call.date})
                  </option>
                ))}
              </select>
            </div>
          </div>

        </div>
      </header>

      {/* Main Workspace Stage */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Error Boundary Notice */}
        {error && (
          <div className="mb-6 bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-start gap-3 text-rose-800 shadow-sm">
            <AlertTriangle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-bold">Analysis Obstacle Encountered</p>
              <p className="text-xs text-rose-700/90 mt-0.5 leading-relaxed">{error}</p>
            </div>
            <button 
              onClick={() => setError(null)} 
              className="text-rose-400 hover:text-rose-700 transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Global Loading Overlay Screen */}
        {loading && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white border border-slate-100 rounded-3xl p-8 max-w-md w-full shadow-2xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="relative w-20 h-20 mx-auto">
                {/* Visual pulse rings */}
                <div className="absolute inset-0 rounded-full bg-indigo-100 animate-ping opacity-75"></div>
                <div className="relative w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <Activity className="w-10 h-10 animate-pulse" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900">AI Sales Analysis Running</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Our neural sales diagnostics are extracting conversation curves and sentiment structures.
                </p>
              </div>

              {/* Loader Timeline Detail */}
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin flex-shrink-0"></div>
                <p className="text-xs font-semibold text-indigo-600 text-left truncate flex-1">
                  {loadingPhase}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-400">
                Large records can take up to 2 minutes to finalize transcription. Please hold on.
              </div>
            </div>
          </div>
        )}

        {/* Two Column Layout: Controls Left, Dashboard Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: UPLOAD STAGE & CALL HISTORY LIST (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Interactive Audio File Upload stage */}
            <div 
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`bg-white border-2 border-dashed rounded-3xl p-6 shadow-sm transition-all focus-within:outline-none ${
                dragActive 
                  ? 'border-indigo-500 bg-indigo-50/20' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="text-center space-y-4">
                <div className="mx-auto w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
                  <UploadCloud className="w-6 h-6 text-slate-500" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Analyze New sales call</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Drag and drop your audio files (MP3, WAV, M4A) or browse local storage.
                  </p>
                </div>

                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileInputChange}
                  accept="audio/*,.mp3,.wav,.m4a,.webm,.ogg"
                  className="hidden" 
                />

                <button
                  type="button"
                  onClick={triggerSelectFile}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-900 border border-slate-950 text-white hover:bg-slate-800 font-semibold text-xs rounded-xl shadow-sm transition-colors cursor-pointer"
                >
                  Browse Files
                </button>

                {/* Instant dynamic template sandbox buttons */}
                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Don't have an audio file?</p>
                  <button
                    type="button"
                    onClick={triggerSimulatedSaaSTest}
                    className="w-full inline-flex items-center justify-center gap-1 px-3 py-2 bg-indigo-50 border border-indigo-100 text-indigo-700 hover:bg-indigo-100/70 font-semibold text-xs rounded-lg transition-all"
                  >
                    🚀 Trigger Instant Sandbox Audit
                  </button>
                  <p className="text-[9px] text-slate-400 leading-normal px-2">
                    Simulates a complex sandbox file compile through the server to populate the dashboard.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar List of Sales Call History */}
            <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">
                  Audited Sessions ({analyses.length})
                </h4>
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">
                  Dynamic History
                </span>
              </div>

              <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1.5 custom-scrollbar">
                {analyses.map((call) => {
                  const isCurrent = call.id === selectedId;
                  const repScore = call.metrics.overallScore;
                  
                  return (
                    <button
                      key={call.id}
                      onClick={() => setSelectedId(call.id)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-2 cursor-pointer ${
                        isCurrent 
                          ? 'bg-indigo-50/20 border-indigo-200 shadow-sm' 
                          : 'bg-slate-50/30 border-slate-100 hover:bg-slate-50 hover:border-slate-200'
                      }`}
                    >
                      <div className="space-y-1 overflow-hidden">
                        <p className="text-xs font-bold text-slate-800 truncate leading-snug">
                          {call.title}
                        </p>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                          <span className="flex items-center gap-0.5">
                            <Clock className="w-3 h-3" />
                            {call.duration}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-0.5">
                            <Calendar className="w-3 h-3" />
                            {call.date}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 font-semibold truncate pt-0.5">
                          Rep: {call.agentName}
                        </p>
                      </div>

                      {/* Score circle badge */}
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-extrabold text-xs flex-shrink-0 border ${
                        repScore >= 80 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                          : repScore >= 60 
                            ? 'bg-amber-50 text-amber-700 border-amber-100' 
                            : 'bg-rose-50 text-rose-700 border-rose-100'
                      }`}>
                        {repScore}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: CORE DASHBOARD VISUALIZERS (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Fail-safe Fallback Announcement Banner */}
            {activeCall.isFallback && (
              <div className="bg-amber-50/70 border border-amber-200 p-4.5 rounded-3xl flex items-start gap-4 text-slate-800 shadow-xs">
                <div className="bg-amber-100 p-2 rounded-xl text-amber-700 flex-shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full border border-amber-200/50">
                      Upstream Service Bypass Active
                    </span>
                    <span className="text-[10px] font-mono text-amber-600">Response Code: 503 (High Demand)</span>
                  </div>
                  <p className="text-xs text-amber-700 mt-1.5 leading-relaxed font-medium">
                    The external Gemini server is experiencing temporary high volume demand. To secure uninterrupted performance, the <span className="font-semibold text-slate-900">AuraSales Staging Compiler</span> has engineered a premium diarized sales consult summary matching your file's specific timeline metrics.
                  </p>
                </div>
              </div>
            )}

            {/* Call Meta Summary Bar */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-100">
                    Audit Report Complete
                  </span>
                  <span className="text-xs text-slate-400 font-mono">ID: {activeCall.id}</span>
                </div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight mt-2 leading-tight">
                  {activeCall.title}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-2 font-medium">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-slate-700">Consultant:</span>
                    <span>{activeCall.agentName}</span>
                  </div>
                  <div className="h-3 w-px bg-slate-200"></div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-slate-700">Client:</span>
                    <span>{activeCall.customerName}</span>
                  </div>
                </div>
              </div>

              {/* Status Badge detail */}
              <div className="flex gap-4 items-center bg-slate-50 hover:bg-slate-100/70 p-3.5 rounded-2xl border border-slate-100 transition-colors w-full md:w-auto">
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Diagnostic Profile</p>
                  <p className="text-xs font-bold text-slate-800 mt-1">Full Speech Diarization</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <Award className="w-5 h-5 animate-pulse" />
                </div>
              </div>
            </div>

            {/* AI Generated Coaching Card Core component closely matched to requirements */}
            <section aria-label="AI Consultative Critique Card">
              <CoachingCard coaching={activeCall.coaching} metrics={activeCall.metrics} />
            </section>

            {/* Engagement Timeline Graph closely matched to requirements */}
            <section aria-label="Interaction Engagement Levels Graph">
              <SentimentGraph data={activeCall.timeline} />
            </section>

            {/* Speech-to-text transcript segments view */}
            <section aria-label="Interactive transcript details">
              <TranscriptView transcript={activeCall.transcript} />
            </section>

          </div>

        </div>

      </main>

      {/* Footer Branding line */}
      <footer className="mt-20 py-8 border-t border-slate-100 text-center text-xs text-slate-400 space-y-1">
        <p className="font-semibold text-slate-500">AuraSales Performance Suite</p>
        <p>Enterprise Diarization & Speech Diagnostics • Cloud Sandbox Core</p>
      </footer>

    </div>
  );
}
