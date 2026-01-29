import type { Diet } from '../types/user';

interface SuggestionsProps {
    diet: Diet;
}

const FOOD_DATA = {
    VEG: [
        { name: "Paneer Tikka", cal: 260, protein: "High" },
        { name: "Lentil Soup (Dal)", cal: 150, protein: "Med" },
        { name: "Greek Yogurt", cal: 100, protein: "High" },
        { name: "Quinoa Salad", cal: 220, protein: "Med" },
        { name: "Almonds (Handful)", cal: 160, protein: "Med" }
    ],
    EGG: [
        { name: "Boiled Eggs (2)", cal: 155, protein: "High" },
        { name: "Omelette with Veggies", cal: 250, protein: "High" },
        { name: "Egg Curry", cal: 300, protein: "High" },
        { name: "Paneer Bhurji", cal: 200, protein: "High" }
    ],
    NON_VEG: [
        { name: "Grilled Chicken Breast", cal: 165, protein: "High" },
        { name: "Salmon Fillet", cal: 350, protein: "High" },
        { name: "Chicken Stir Fry", cal: 280, protein: "High" },
        { name: "Tuna Salad", cal: 190, protein: "High" }
    ]
};

export default function Suggestions({ diet }: SuggestionsProps) {
    const suggestions = FOOD_DATA[diet] || FOOD_DATA.VEG;

    return (
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
            <div className="flex items-center gap-3 mb-6">
                <span className="bg-blue-100 p-2 rounded-lg text-blue-600">💡</span>
                <h2 className="text-xl font-bold text-slate-700">Recommended for You ({diet})</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {suggestions.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100">
                        <div>
                            <div className="font-semibold text-slate-800">{item.name}</div>
                            <div className="text-xs text-slate-500 font-medium bg-slate-200 inline-block px-2 py-0.5 rounded-full mt-1">Protein: {item.protein}</div>
                        </div>
                        <div className="text-right">
                            <div className="font-bold text-slate-600">{item.cal}</div>
                            <div className="text-xs text-slate-400">kcal</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
