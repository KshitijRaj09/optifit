export type Goal = 'LOSE' | 'MAINTAIN' | 'GAIN';
export type Diet = 'VEG' | 'NON_VEG' | 'EGG';

export interface UserProfile {
    name: string;
    goal: Goal;
    diet: Diet;
    targetCalories: number;
    isOnboarded: boolean;
}
