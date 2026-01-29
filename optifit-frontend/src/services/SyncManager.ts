import { API_BASE_URL } from '../api/config';
import type { Workout } from '../types/workout';
import type { Food } from '../types/food';

const STORAGE_KEYS = {
    WORKOUTS: 'optifit_workouts_backup',
    FOODS: 'optifit_foods_backup',
    LAST_SYNC: 'optifit_last_sync'
};

export const SyncManager = {
    saveLocal: (workouts: Workout[], foods: Food[]) => {
        localStorage.setItem(STORAGE_KEYS.WORKOUTS, JSON.stringify(workouts));
        localStorage.setItem(STORAGE_KEYS.FOODS, JSON.stringify(foods));
        localStorage.setItem(STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
    },

    getLocal: () => {
        const w = localStorage.getItem(STORAGE_KEYS.WORKOUTS);
        const f = localStorage.getItem(STORAGE_KEYS.FOODS);
        return {
            workouts: w ? JSON.parse(w) : [],
            foods: f ? JSON.parse(f) : []
        };
    },

    restoreToBackend: async (token?: string | null) => {
        const data = SyncManager.getLocal();
        if (data.workouts.length === 0 && data.foods.length === 0) return;

        try {
            console.log("Attempting to restore data to backend...", data);
            const headers: any = { 'Content-Type': 'application/json' };
            if (token) headers['Authorization'] = token;

            await fetch(`${API_BASE_URL}/dashboard/restore`, {
                method: 'POST',
                headers,
                body: JSON.stringify(data)
            });
            console.log("Data restored successfully.");
        } catch (e) {
            console.error("Failed to restore data", e);
        }
    }
};
