export interface Workout {
    id?: number;
    name: string;
    date: string;
    durationMinutes: number;
    caloriesBurned?: number;
    notes?: string;
}
