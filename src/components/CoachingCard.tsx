import { CheckCircle, AlertCircle, Lightbulb, TrendingUp, HelpCircle, FileText, UserCheck, ShieldClose } from 'lucide-react';
import { CoachingAdvice, CallMetrics } from '../types';

interface CoachingCardProps {
  coaching: CoachingAdvice;
  metrics: CallMetrics;
}

export default function CoachingCard({ coaching, metrics }: CoachingCardProps) {
  // Score label colors based on performance
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    if (score >= 60) return 'text-amber-600 bg-amber-50 border-amber-100';
    return 'text-rose-600 bg-rose-50 border-rose-100';
  };

  return (
    <div className="space-y-6">
      {/* Metrics Banner */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Metric Card 1 */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-400">Rep Score</span>
          <div className="my-2 flex items-baseline gap-1">
            <span className={`text-3xl font-extrabold tracking-tight`}>
              {metrics.overallScore}
            </span>
            <span className="text-xs text-slate-400">/100</span>
          </div>
          <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full inline-block border w-fit ${getScoreColor(metrics.overallScore)}`}>
            {metrics.overallScore >= 80 ? 'Mastery' : metrics.overallScore >= 60 ? 'Competent' : 'Action Needed'}
          </span>
        </div>

        {/* Metric Card 2 */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-400">Talk / Listen Ratio</span>
          <div className="my-2">
            <span className="text-2xl font-extrabold text-slate-800 tracking-tight">
              {metrics.talkListenRatio}% / {100 - metrics.talkListenRatio}%
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden flex">
            <div className="bg-indigo-500 h-full" style={{ width: `${metrics.talkListenRatio}%` }} title={`Agent speaking: ${metrics.talkListenRatio}%`}></div>
            <div className="bg-emerald-500 h-full" style={{ width: `${100 - metrics.talkListenRatio}%` }} title={`Customer speaking: ${100 - metrics.talkListenRatio}%`}></div>
          </div>
        </div>

        {/* Metric Card 3 */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-400">Interruptions</span>
          <div className="my-2">
            <span className="text-3xl font-extrabold text-slate-800 tracking-tight">
              {metrics.interruptionCount}
            </span>
          </div>
          <span className={`text-[10px] font-semibold tracking-wider uppercase inline-block ${metrics.interruptionCount === 0 ? 'text-emerald-600' : metrics.interruptionCount <= 2 ? 'text-slate-500' : 'text-rose-500'}`}>
            {metrics.interruptionCount === 0 ? 'Flawless Flow' : metrics.interruptionCount <= 2 ? 'Acceptable' : 'Overwhelming rep'}
          </span>
        </div>

        {/* Metric Card 4 */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-400">Max Monologue</span>
          <div className="my-2 flex items-baseline gap-0.5">
            <span className="text-3xl font-extrabold text-slate-800 tracking-tight">
              {metrics.longestMonologueSec}
            </span>
            <span className="text-xs text-slate-500">sec</span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium leading-tight">
            {metrics.longestMonologueSec <= 35 ? 'Optimal pitch size' : 'Rep monologuing'}
          </span>
        </div>

        {/* Metric Card 5 */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between col-span-2 md:col-span-1">
          <span className="text-xs font-medium text-slate-400">Customer Sentiment</span>
          <div className="my-2 flex items-center gap-1.5">
            <TrendingUp className={`w-5 h-5 ${metrics.customerSentimentTrend === 'improving' ? 'text-emerald-500' : 'text-amber-500'}`} />
            <span className="text-lg font-bold text-slate-800 capitalize tracking-tight">
              {metrics.customerSentimentTrend}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium leading-none">
            {metrics.customerSentimentTrend === 'improving' ? 'Closing probability high' : 'Maintain focus'}
          </span>
        </div>
      </div>

      {/* Main split sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Core Strengths (What they did well) */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-emerald-50 p-2 rounded-xl text-emerald-600">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900 tracking-tight">
                  Strengths & Active Techniques
                </h3>
                <p className="text-xs text-slate-400">Key actions the salesperson executed with high quality.</p>
              </div>
            </div>

            <div className="space-y-4">
              {coaching.goods.map((point, index) => (
                <div key={index} className="flex gap-3 items-start bg-emerald-50/20 p-3.5 rounded-xl border border-emerald-50/50">
                  <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold text-xs mt-0.5">
                    {index + 1}
                  </span>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Growth Opportunities */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-amber-50 p-2 rounded-xl text-amber-600">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900 tracking-tight">
                  Missed Levers & Opportunities
                </h3>
                <p className="text-xs text-slate-400">Areas for tactical improvement with consultative solutions.</p>
              </div>
            </div>

            <div className="space-y-4">
              {coaching.opportunities.map((point, index) => (
                <div key={index} className="flex gap-3 items-start bg-amber-50/25 p-3.5 rounded-xl border border-amber-50/50">
                  <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-xs mt-0.5">
                    {index + 1}
                  </span>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Summary Narrative */}
      <div className="bg-gradient-to-r from-slate-50 to-indigo-50/20 border border-slate-100 rounded-2xl p-6 shadow-sm">
        <h4 className="text-xs font-semibold uppercase text-indigo-600 tracking-widest mb-2 flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5" />
          Director's Executive Summary
        </h4>
        <p className="text-sm font-medium text-slate-700 leading-relaxed">
          "{coaching.summary}"
        </p>
      </div>

    </div>
  );
}
