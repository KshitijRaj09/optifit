import { useState } from 'react';
import { API_BASE_URL } from '../api/config';
import { useAuth } from '../context/AuthContext';

interface WorkoutFormProps {
    onWorkoutAdded: () => void;
}

export default function WorkoutForm({ onWorkoutAdded }: WorkoutFormProps) {
    const [name, setName] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [durationMinutes, setDurationMinutes] = useState(30);
    const [caloriesBurned, setCaloriesBurned] = useState(200);
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { token } = useAuth(); // Get token

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const workout = { name, date, durationMinutes, caloriesBurned, notes };

        try {
            const response = await fetch(`${API_BASE_URL}/workouts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': token } : {})
                },
                body: JSON.stringify(workout),
            });

            if (response.ok) {
                // Reset form
                setName('');
                setNotes('');
                onWorkoutAdded(); // Refresh list
            } else {
                alert('Failed to save workout');
            }
        } catch (error) {
            console.error('Error saving workout:', error);
            alert('Error connecting to server');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8 border border-emerald-100">
            <h3 className="text-xl font-bold mb-4 text-emerald-800">Add New Workout</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Workout Name</label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-2 border"
                        placeholder="e.g. Morning Run"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-2 border"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (min)</label>
                    <input
                        type="number"
                        min="1"
                        required
                        value={durationMinutes}
                        onChange={(e) => setDurationMinutes(parseInt(e.target.value))}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-2 border"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Calories Burned</label>
                    <input
                        type="number"
                        min="0"
                        required
                        value={caloriesBurned}
                        onChange={(e) => setCaloriesBurned(parseInt(e.target.value))}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-2 border"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-2 border"
                        rows={2}
                    />
                </div>
            </div>
            <div className="mt-4 flex justify-end">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition disabled:opacity-50"
                >
                    {isSubmitting ? 'Saving...' : 'Log Workout'}
                </button>
            </div>
        </form>
    );
}
