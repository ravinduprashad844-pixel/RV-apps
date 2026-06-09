import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { SentimentPoint } from '../types';

interface SentimentGraphProps {
  data: SentimentPoint[];
}

export default function SentimentGraph({ data }: SentimentGraphProps) {
  // Pad values slightly for elegant axis spacing
  const formatYAxis = (val: number) => {
    if (val === 5) return 'Excited';
    if (val === 0) return 'Neutral';
    if (val === -5) return 'Frustrated';
    return val.toString();
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const info = payload[0].payload as SentimentPoint;
      return (
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-lg max-w-sm">
          <p className="text-xs font-semibold text-slate-400 mb-1">Time: {info.timestamp}</p>
          <p className="text-sm font-medium text-slate-800 mb-2 leading-relaxed">
            {info.headline}
          </p>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between gap-4">
              <span className="flex items-center gap-1.5 text-indigo-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                Agent Engagement:
              </span>
              <span className="font-semibold text-slate-900">
                {info.agentSentiment > 0 ? `+${info.agentSentiment}` : info.agentSentiment}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Customer Sentiment:
              </span>
              <span className="font-semibold text-slate-900">
                {info.customerSentiment > 0 ? `+${info.customerSentiment}` : info.customerSentiment}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900 tracking-tight">
          Interaction Engagement Timeline
        </h3>
        <p className="text-sm text-slate-500">
          Chronological mapping of sentiment levels and discussion milestones.
        </p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="agentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.01}/>
              </linearGradient>
              <linearGradient id="customerGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.01}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="timestamp" 
              stroke="#94a3b8" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false}
              dy={10}
            />
            <YAxis 
              domain={[-5, 5]} 
              stroke="#94a3b8" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={formatYAxis}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="top" 
              height={36} 
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: '12px', fontWeight: 500, color: '#475569' }}
            />
            <Area 
              name="Salesperson" 
              type="monotone" 
              dataKey="agentSentiment" 
              stroke="#4f46e5" 
              strokeWidth={2.5}
              fillOpacity={1} 
              fill="url(#agentGradient)" 
            />
            <Area 
              name="Customer" 
              type="monotone" 
              dataKey="customerSentiment" 
              stroke="#10b981" 
              strokeWidth={2.5}
              fillOpacity={1} 
              fill="url(#customerGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
          Upper Slope (+): Enthusiastic Discovery / High Pitch Receptivity
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-rose-400 rounded-full"></span>
          Lower Slope (-): Frustration, Friction, or Active Objections
        </span>
      </div>
    </div>
  );
}
