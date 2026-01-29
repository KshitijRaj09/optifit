import { useState, useEffect } from 'react';
import { Target, Utensils, Flame, Calendar } from 'lucide-react';
import { API_BASE_URL } from '../api/config';
import AnalyticsChart from './AnalyticsChart';
import NotificationToast from './NotificationToast';
import type { UserProfile } from '../types/user';

interface Summary {
    totalCaloriesBurned: number;
    totalCaloriesConsumed: number;
    netCalories: number;
}

interface DashboardStatsProps {
    refreshTrigger: number;
    userProfile: UserProfile;
}

export default function DashboardStats({ refreshTrigger, userProfile }: DashboardStatsProps) {
    const [summary, setSummary] = useState<Summary | null>(null);
    const [showAnalytics, setShowAnalytics] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        fetch(`${API_BASE_URL}/dashboard/summary`)
            .then(res => res.json())
            .then(data => setSummary(data))
            .catch(console.error);
    }, [refreshTrigger]);

    if (!summary) return null;

    const remaining = userProfile.targetCalories - summary.totalCaloriesConsumed + summary.totalCaloriesBurned;
    const progress = Math.min((summary.totalCaloriesConsumed / userProfile.targetCalories) * 100, 100);

    // Check progress for alerts
    const checkProgress = () => {
        // Logic: if remaining is largely negative or positive often
        // Simulating "Off Track"
        const isOffTrack = Math.random() > 0.5; // Demo logic
        if (isOffTrack) {
            setToastMessage("You've missed your target for 5 days. Let's adjust your plan!");
            setShowToast(true);
        } else {
            setToastMessage("You're doing great! Consistent progress detected.");
            setShowToast(true);
        }
        setShowAnalytics(true);
    };

    return (
        <div className="space-y-6">
            <NotificationToast
                show={showToast}
                message={toastMessage}
                type={toastMessage.includes("missed") ? "warning" : "success"}
                onClose={() => setShowToast(false)}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-orange-100 rounded-bl-full -mr-4 -mt-4 opacity-50 group-hover:scale-110 transition-transform"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 bg-orange-100 rounded-xl text-orange-600">
                                <Target size={20} />
                            </div>
                            <span className="text-slate-500 font-medium text-sm">Daily Target</span>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-800">{userProfile.targetCalories} <span className="text-sm font-normal text-slate-400">kcal</span></h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100 rounded-bl-full -mr-4 -mt-4 opacity-50 group-hover:scale-110 transition-transform"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 bg-emerald-100 rounded-xl text-emerald-600">
                                <Utensils size={20} />
                            </div>
                            <span className="text-slate-500 font-medium text-sm">Consumed</span>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-800">{summary.totalCaloriesConsumed} <span className="text-sm font-normal text-slate-400">kcal</span></h3>
                        <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                </div>

                <div className={`p-6 rounded-3xl shadow-sm border border-indigo-100 relative overflow-hidden group text-white ${remaining < 0 ? 'bg-rose-500' : 'bg-indigo-600'}`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -ml-10 blur-2xl"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 bg-white/20 rounded-xl text-white">
                                <Flame size={20} />
                            </div>
                            <span className="text-indigo-100 font-medium text-sm">Remaining</span>
                        </div>
                        <h3 className="text-4xl font-bold">{remaining} <span className="text-lg font-normal opacity-80">kcal</span></h3>
                        <p className="text-xs mt-2 opacity-80 flex items-center gap-1">
                            {remaining < 0 ? 'Over budget!' : 'Left to eat today'}
                        </p>
                    </div>
                </div>
            </div>

            <button
                onClick={checkProgress}
                className="w-full py-3 bg-white border border-slate-200 rounded-xl text-slate-600 font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
                <Calendar size={18} />
                View Monthly Analytics & Report
            </button>

            {showAnalytics && userProfile && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <AnalyticsChart userProfile={userProfile} />
                </div>
            )}
        </div>
    );
}
