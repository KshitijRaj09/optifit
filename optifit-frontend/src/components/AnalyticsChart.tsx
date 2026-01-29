import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { UserProfile } from '../types/user';

interface DailyStats {
    date: string;
    consumed: number;
    burned: number;
}

interface AnalyticsChartProps {
    data?: DailyStats[]; // In real implementation, this would come from history API
    userProfile: UserProfile;
}

// Demo Data Generator
const generateDemoData = (target: number) => {
    const data = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const variation = Math.random() * 400 - 200;
        data.push({
            date: d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
            consumed: Math.max(1200, Math.floor(target + variation)),
            burned: Math.floor(Math.random() * 500 + 100)
        });
    }
    return data;
};

export default function AnalyticsChart({ userProfile }: AnalyticsChartProps) {
    const data = generateDemoData(userProfile.targetCalories);

    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200/60 mt-8 h-96">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-700">30-Day Activity</h3>
                <div className="flex gap-4 text-xs font-medium">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-orange-400"></span> Consumed
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Burned
                    </div>
                </div>
            </div>

            <ResponsiveContainer width="100%" height="85%">
                <BarChart data={data} barGap={0} barCategoryGap="20%">
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#94a3b8', fontSize: 10 }}
                        interval={6}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#94a3b8', fontSize: 10 }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            borderRadius: '12px',
                            border: 'none',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                        }}
                    />
                    <Bar dataKey="consumed" fill="#fb923c" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="burned" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
