import { useState } from 'react';
import { Search, Volume2, User, UserCheck, MessageSquare, Tag, Play } from 'lucide-react';
import { TranscriptTurn } from '../types';

interface TranscriptViewProps {
  transcript: TranscriptTurn[];
}

export default function TranscriptView({ transcript }: TranscriptViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [speakerFilter, setSpeakerFilter] = useState<'all' | 'agent' | 'customer'>('all');

  // Filter list
  const filteredTurns = transcript.filter((turn) => {
    const matchesSpeaker =
      speakerFilter === 'all' ||
      (speakerFilter === 'agent' && turn.speaker === 'agent') ||
      (speakerFilter === 'customer' && turn.speaker === 'customer');

    const matchesSearch =
      turn.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      turn.speakerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (turn.topic && turn.topic.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesSpeaker && matchesSearch;
  });

  // Sentiment chip selector
  const getSentimentStyle = (score: number) => {
    if (score >= 3) {
      return {
        bg: 'bg-emerald-50 border-emerald-100 text-emerald-700',
        badge: 'Highly Receptive',
        dot: 'bg-emerald-500'
      };
    }
    if (score > 0) {
      return {
        bg: 'bg-indigo-50 border-indigo-100 text-indigo-700',
        badge: 'Positive / Cooperative',
        dot: 'bg-indigo-400'
      };
    }
    if (score === 0) {
      return {
        bg: 'bg-slate-50 border-slate-200 text-slate-500',
        badge: 'Neutral',
        dot: 'bg-slate-300'
      };
    }
    if (score >= -2) {
      return {
        bg: 'bg-amber-50 border-amber-100 text-amber-700',
        badge: 'Hesitant / Objection',
        dot: 'bg-amber-400'
      };
    }
    return {
      bg: 'bg-rose-50 border-rose-100 text-rose-700',
      badge: 'Frustrated / High Friction',
      dot: 'bg-rose-500'
    };
  };

  const getTopicColor = (topic?: string) => {
    switch (topic?.toLowerCase()) {
      case 'greeting': return 'bg-slate-100 text-slate-600 border-slate-200';
      case 'discovery': return 'bg-sky-50 text-sky-700 border-sky-100';
      case 'pitching': return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'objection handling': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'pricing': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'closing': return 'bg-blue-50 text-blue-700 border-blue-100';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col h-[600px]">
      
      {/* Title + Controls Row */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between pb-4 border-b border-slate-100 mb-4 flex-shrink-0">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 tracking-tight flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-indigo-500" />
            Diarized Call Transcript
          </h3>
          <p className="text-sm text-slate-500">
            Diarized speaker timeline with sentiment tracking and key discussion topics.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Speaker Toggle Filter */}
          <div className="bg-slate-100 p-0.5 rounded-xl flex items-center text-xs font-semibold text-slate-600">
            <button
              onClick={() => setSpeakerFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${speakerFilter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'}`}
            >
              All
            </button>
            <button
              onClick={() => setSpeakerFilter('agent')}
              className={`px-3 py-1.5 rounded-lg transition-all ${speakerFilter === 'agent' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'}`}
            >
              Rep Only
            </button>
            <button
              onClick={() => setSpeakerFilter('customer')}
              className={`px-3 py-1.5 rounded-lg transition-all ${speakerFilter === 'customer' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'}`}
            >
              Client Only
            </button>
          </div>

          {/* Search bar */}
          <div className="relative flex-1 md:w-56">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search statements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 w-full text-xs font-medium bg-slate-50 border border-slate-200 text-slate-800 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Transcript Scrolling Stage */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
        {filteredTurns.length > 0 ? (
          filteredTurns.map((turn, idx) => {
            const sentimentInfo = getSentimentStyle(turn.sentiment);
            return (
              <div 
                key={idx} 
                className={`group border-l-4 rounded-r-xl p-4 transition-all shadow-sm flex flex-col justify-between ${
                  turn.speaker === 'agent' 
                    ? 'border-l-indigo-500 bg-indigo-50/5 hover:bg-indigo-50/10' 
                    : 'border-l-emerald-500 bg-emerald-50/5 hover:bg-emerald-50/10'
                }`}
              >
                {/* Meta details */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 mb-2.5">
                  <div className="flex items-center gap-2">
                    {turn.speaker === 'agent' ? (
                      <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                        <UserCheck className="w-3.5 h-3.5" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <User className="w-3.5 h-3.5" />
                      </div>
                    )}
                    <span className="text-xs font-bold text-slate-800 tracking-tight">
                      {turn.speakerName}
                    </span>
                    <span className="text-[10px] font-mono font-medium text-slate-400 px-1.5 py-0.5 bg-slate-100 rounded">
                      {turn.timestamp}
                    </span>
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-2.5">
                    {/* Topic Category */}
                    {turn.topic && (
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getTopicColor(turn.topic)}`}>
                        {turn.topic}
                      </span>
                    )}

                    {/* Sentiment Label */}
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border flex items-center gap-1 ${sentimentInfo.bg}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${sentimentInfo.dot}`}></span>
                      {sentimentInfo.badge}
                    </span>
                  </div>
                </div>

                {/* Speech text payload */}
                <p className="text-sm font-medium text-slate-700 leading-relaxed group-hover:text-slate-950 transition-colors">
                  {turn.text}
                </p>
                
                {/* Visual quote accentuation */}
                <div className="flex gap-2 items-center text-[10px] uppercase font-bold text-slate-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-3 h-3 text-slate-400 fill-current" />
                  <span>Playback jump to {turn.timestamp}</span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-slate-50/50 rounded-2xl border border-dashed border-slate-150">
            <div className="bg-slate-100 p-3 rounded-full text-slate-400 mb-3">
              <MessageSquare className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-slate-800">No statements match criteria</p>
            <p className="text-xs text-slate-400 mt-1">Refine keyword search queries or select a different verbal category.</p>
          </div>
        )}
      </div>

    </div>
  );
}
