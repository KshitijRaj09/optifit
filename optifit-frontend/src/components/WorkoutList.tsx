import { useEffect, useState } from 'react';
import type { Workout } from '../types/workout';
import { API_BASE_URL } from '../api/config';
import { useAuth } from '../context/AuthContext';

interface WorkoutListProps {
    refreshTrigger: number;
}

export default function WorkoutList({ refreshTrigger }: WorkoutListProps) {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();
    const [updater, setUpdater] = useState(0); // Internal state to force re-render on delete

    // Fetch Workouts
    useEffect(() => {
        fetch(`${API_BASE_URL}/workouts`, {
            headers: token ? { 'Authorization': token } : {}
        })
            .then(res => res.json())
            .then(data => {
                setWorkouts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch workouts", err);
                setLoading(false);
            });
    }, [refreshTrigger, token, updater]);

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this workout?')) return;

        try {
            const res = await fetch(`${API_BASE_URL}/workouts/${id}`, {
                method: 'DELETE',
                headers: token ? { 'Authorization': token } : {}
            });
            if (res.ok) {
                setWorkouts(prev => prev.filter(w => w.id !== id));
                setUpdater(u => u + 1); // Trigger re-render to look standard
            } else {
                alert('Failed to delete');
            }
        } catch (error) {
            console.error("Error deleting", error);
        }
    };

    if (loading) return <div className="text-center p-4">Loading workouts...</div>;

    return (
        <div className="space-y-4">
            {workouts.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No workouts found. Time to get moving!</p>
            ) : (
                <ul className="divide-y divide-slate-100">
                    {workouts.map((workout) => (
                        <li key={workout.id} className="py-4 hover:bg-slate-50 transition-colors rounded-lg px-2 group">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-semibold text-slate-800 text-lg">{workout.name}</h4>
                                    <div className="text-sm text-slate-500 mt-1 flex flex-wrap gap-x-4 gap-y-1">
                                        <span className="flex items-center gap-1">
                                            <span className="text-emerald-500">📅</span> {new Date(workout.date).toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <span className="text-emerald-500">⏱️</span> {workout.durationMinutes} min
                                        </span>
                                        {workout.caloriesBurned && (
                                            <span className="flex items-center gap-1 font-medium text-emerald-600 bg-emerald-50 px-2 rounded-full text-xs">
                                                <span>🔥</span> {workout.caloriesBurned} kcal
                                            </span>
                                        )}
                                    </div>
                                    {workout.notes && <p className="text-sm text-slate-400 mt-2 italic border-l-2 border-slate-200 pl-2">"{workout.notes}"</p>}
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleDelete(workout.id!)}
                                        className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all"
                                        title="Delete Workout"
                                        aria-label="Delete Workout"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
