import { useEffect, useState } from 'react';
import type { Food } from '../types/food';
import { API_BASE_URL } from '../api/config';
import { useAuth } from '../context/AuthContext';

interface FoodListProps {
    refreshTrigger: number;
}

export default function FoodList({ refreshTrigger }: FoodListProps) {
    const [foods, setFoods] = useState<Food[]>([]);
    const { token } = useAuth();
    const [updater, setUpdater] = useState(0);

    useEffect(() => {
        fetch(`${API_BASE_URL}/foods`, {
            headers: token ? { 'Authorization': token } : {}
        })
            .then(res => res.json())
            .then(data => setFoods(data))
            .catch(console.error);
    }, [refreshTrigger, token, updater]);

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this meal?')) return;
        try {
            const res = await fetch(`${API_BASE_URL}/foods/${id}`, {
                method: 'DELETE',
                headers: token ? { 'Authorization': token } : {}
            });
            if (res.ok) {
                setFoods(prev => prev.filter(f => f.id !== id));
                setUpdater(u => u + 1);
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="space-y-4">
            {foods.length === 0 ? (
                <p className="text-slate-400 text-center text-sm">No meals logged yet.</p>
            ) : (
                <ul className="divide-y divide-slate-100">
                    {foods.map((food) => (
                        <li key={food.id} className="py-3 flex justify-between items-center group hover:bg-slate-50 rounded-lg px-2 transition-colors">
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="font-medium text-slate-700 block">{food.name}</span>
                                        <span className="text-xs text-slate-400 block mt-0.5">{new Date(food.date).toLocaleDateString()}</span>
                                    </div>
                                    <span className="font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded-md text-sm">+{food.calories} kcal</span>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDelete(food.id!)}
                                className="ml-4 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1"
                                title="Delete Meal"
                                aria-label="Delete Meal"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
