import { useState, useEffect } from 'react';

const QUOTES = [
    "Sweat is just fat crying.",
    "The only bad workout is the one that didn't happen.",
    "Don't wish for it. Work for it.",
    "Your body can stand almost anything. It's your mind that you have to convince.",
    "Fitness is not about being better than someone else. It's about being better than you were yesterday.",
    "No pain, no gain. Shut up and train.",
    "Discipline is doing what needs to be done, even if you don't want to do it."
];

export default function QuoteOfDay() {
    const [quote, setQuote] = useState('');

    useEffect(() => {
        const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
        setQuote(randomQuote);
    }, []);

    return (
        <div className="text-center py-6 px-4">
            <p className="text-emerald-100 text-lg italic font-light font-serif">"{quote}"</p>
        </div>
    );
}
