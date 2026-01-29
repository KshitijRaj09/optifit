import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import QuoteOfDay from './QuoteOfDay';

export default function Login() {
    const { login } = useAuth();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!login(password)) {
            setError('Invalid credentials. Try "pass123" (Guest Access)');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900 text-white relative overflow-hidden">
            {/* Animated Background Blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

            <div className="relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold tracking-tight mb-2">OptiFit</h1>
                    <p className="text-emerald-200">Unlock your potential.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-emerald-100 mb-1">Guest Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/5 border border-emerald-500/30 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-white/30 transition-all"
                            placeholder="Enter 'pass123'"
                        />
                        {error && <p className="text-red-300 text-sm mt-2">{error}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-emerald-500/50 transition-all transform hover:-translate-y-1"
                    >
                        Enter Dashboard
                    </button>

                    <div className="text-xs text-center text-emerald-200/50 mt-4">
                        Guest Access: <strong>guest / pass123</strong>
                    </div>
                </form>

                <div className="mt-8 border-t border-white/10 pt-6">
                    <QuoteOfDay />
                </div>
            </div>
        </div>
    );
}
