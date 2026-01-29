import { useState } from 'react';
import { API_BASE_URL } from '../api/config';
import { useAuth } from '../context/AuthContext';

interface FoodFormProps {
    onFoodAdded: () => void;
}

export default function FoodForm({ onFoodAdded }: FoodFormProps) {
    const [name, setName] = useState('');
    const [calories, setCalories] = useState(500);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { token } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const food = { name, calories, date };

        try {
            const response = await fetch(`${API_BASE_URL}/foods`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': token } : {})
                },
                body: JSON.stringify(food),
            });

            if (response.ok) {
                setName('');
                onFoodAdded();
            } else {
                alert('Failed to save food');
            }
        } catch (error) {
            console.error(error);
            alert('Error connecting to server');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8 border border-orange-100">
            <h3 className="text-xl font-bold mb-4 text-orange-800">Add Nutrition (Intake)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Food Name</label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2 border"
                        placeholder="e.g. Chicken Salad"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Calories</label>
                    <input
                        type="number"
                        min="0"
                        required
                        value={calories}
                        onChange={(e) => setCalories(parseInt(e.target.value))}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2 border"
                    />
                </div>
                <div className="md:col-span-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition disabled:opacity-50"
                    >
                        {isSubmitting ? 'Saving...' : 'Log Meal'}
                    </button>
                </div>
            </div>
        </form>
    );
}
