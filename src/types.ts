export interface TranscriptTurn {
  speaker: 'agent' | 'customer';
  speakerName: string;
  text: string;
  timestamp: string; // e.g., "00:12"
  sentiment: number; // engagement scale from -5 (very negative/disengaged) to +5 (very positive/highly engaged)
  topic?: string;    // e.g. "Greeting", "Discovery", "Objection Handling", "Pricing", "Closing"
}

export interface SentimentPoint {
  timestamp: string;       // e.g. "00:30"
  agentSentiment: number;  // -5 to +5
  customerSentiment: number; // -5 to +5
  headline: string;       // context of what is happening at this stage in the call
}

export interface CoachingAdvice {
  goods: string[];        // 3 positive behaviors
  opportunities: string[]; // 3 improvement points with concrete replacement suggestions
  summary: string;        // overall 1-2 sentence executive summary
}

export interface CallMetrics {
  talkListenRatio: number; // agent% vs customer% (e.g. 45 for 45% agent, 55% customer)
  interruptionCount: number;
  longestMonologueSec: number; // agent longest continuous speak
  customerSentimentTrend: 'improving' | 'stable' | 'declining';
  overallScore: number;    // 0-100 summary
}

export interface CallAnalysis {
  id: string;
  title: string;
  date: string;
  duration: string; // e.g. "4:12"
  agentName: string;
  customerName: string;
  metrics: CallMetrics;
  transcript: TranscriptTurn[];
  timeline: SentimentPoint[];
  coaching: CoachingAdvice;
  isLive?: boolean;
  isFallback?: boolean;
  fallbackReason?: string;
}
