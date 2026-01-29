import { useState } from 'react';
import type { UserProfile, Goal, Diet } from '../types/user';

interface OnboardingProps {
    onComplete: (profile: UserProfile) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [goal, setGoal] = useState<Goal>('MAINTAIN');
    const [diet, setDiet] = useState<Diet>('VEG');

    const calculateTarget = (goal: Goal): number => {
        // Simplified Logic for Demo
        switch (goal) {
            case 'LOSE': return 1800;
            case 'MAINTAIN': return 2200;
            case 'GAIN': return 2600;
        }
    };

    const handleFinish = () => {
        const profile: UserProfile = {
            name,
            goal,
            diet,
            targetCalories: calculateTarget(goal),
            isOnboarded: true
        };
        localStorage.setItem('optifit_user', JSON.stringify(profile));
        onComplete(profile);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900 via-slate-900 to-emerald-900 p-6">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 max-w-lg w-full border border-white/20">
                <div className="mb-8">
                    <div className="flex gap-2 justify-center mb-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className={`h-2 w-16 rounded-full transition-all ${step >= i ? 'bg-emerald-500' : 'bg-gray-200'}`} />
                        ))}
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800 text-center">
                        {step === 1 && "Start Your Journey"}
                        {step === 2 && "What's your Goal?"}
                        {step === 3 && "Dietary Preference"}
                    </h2>
                </div>

                {step === 1 && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-2">What should we call you?</label>
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="w-full text-lg p-3 border-2 border-emerald-100 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                                placeholder="e.g. Alex"
                                autoFocus
                            />
                        </div>
                        <button
                            onClick={() => name && setStep(2)}
                            disabled={!name}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next Step →
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4">
                        {[
                            { id: 'LOSE', label: 'Lose Weight', icon: '🔥', desc: 'Burn fat & get lean' },
                            { id: 'MAINTAIN', label: 'Keep Fit', icon: '💪', desc: 'Stay active & healthy' },
                            { id: 'GAIN', label: 'Build Muscle', icon: '🏋️', desc: 'Get stronger & bigger' }
                        ].map((option) => (
                            <button
                                key={option.id}
                                onClick={() => { setGoal(option.id as Goal); setStep(3); }}
                                className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4 hover:scale-[1.02] ${goal === option.id ? 'border-emerald-500 bg-emerald-50' : 'border-slate-100 hover:border-emerald-200'}`}
                            >
                                <span className="text-3xl">{option.icon}</span>
                                <div>
                                    <div className="font-bold text-slate-800">{option.label}</div>
                                    <div className="text-sm text-slate-500">{option.desc}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-3">
                            {[
                                { id: 'VEG', label: 'Vegetarian', icon: '🥦' },
                                { id: 'EGG', label: 'Eggetarian', icon: '🍳' },
                                { id: 'NON_VEG', label: 'Non-Vegetarian', icon: '🍗' }
                            ].map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => setDiet(option.id as Diet)}
                                    className={`p-4 rounded-xl border-2 transition-all flex items-center justify-between ${diet === option.id ? 'border-emerald-500 bg-emerald-50 text-emerald-900' : 'border-slate-100 text-slate-600'}`}
                                >
                                    <span className="font-bold">{option.label}</span>
                                    <span className="text-2xl">{option.icon}</span>
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={handleFinish}
                            className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-xl shadow-xl transition-all hover:scale-[1.02]"
                        >
                            Launch Dashboard 🚀
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
