import { useState, useEffect } from 'react';
import WorkoutList from './components/WorkoutList';
import WorkoutForm from './components/WorkoutForm';
import FoodForm from './components/FoodForm';
import FoodList from './components/FoodList';
import DashboardStats from './components/DashboardStats';
import Login from './components/Login';
import Onboarding from './components/Onboarding';
import Suggestions from './components/Suggestions';
import { useAuth, AuthProvider } from './context/AuthContext';
import type { UserProfile } from './types/user';
import './index.css';

function AppContent() {
  const { isAuthenticated, logout } = useAuth();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Attempt to restore data if backend is empty
    import('./services/SyncManager').then(({ SyncManager }) => {
      SyncManager.restoreToBackend();
    });
  }, []);

  useEffect(() => {
    const savedCallback = localStorage.getItem('optifit_user');
    if (savedCallback) {
      setUserProfile(JSON.parse(savedCallback));
    }
  }, []);

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
  };

  if (!isAuthenticated) return <Login />;
  if (!userProfile) return <Onboarding onComplete={handleOnboardingComplete} />;

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans text-slate-800">
      {/* Glass Header */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-white/20 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-emerald-500 to-teal-500 p-2 rounded-xl text-white shadow-lg shadow-emerald-500/20">
              <span className="text-xl font-bold">O</span>
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-slate-800">OptiFit</h1>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-slate-500 text-sm hidden sm:block font-medium">Hi, <span className="text-emerald-600">{userProfile.name}</span></span>
            <button
              onClick={() => { logout(); setUserProfile(null); }}
              className="text-slate-400 hover:text-slate-600 text-sm font-medium transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Smart Dashboard */}
        <section className="mb-12">
          <div className="flex items-end justify-between mb-8 px-2">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-800">Today's Progress</h2>
              <p className="text-slate-400 font-medium mt-1">Track calories, hit goals.</p>
            </div>
            <div className="text-right hidden md:block">
              <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">Current Goal</div>
              <div className="font-bold text-emerald-600">{userProfile.goal.replace('_', ' ')}</div>
            </div>
          </div>
          <DashboardStats refreshTrigger={refreshTrigger} userProfile={userProfile} />
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Content (Left 2 Columns) */}
          <div className="xl:col-span-2 space-y-8">
            {/* Workout Section */}
            <section className="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="bg-slate-50/50 p-6 border-b border-slate-100 flex items-center justify-between backdrop-blur-sm">
                <h2 className="text-xl font-bold text-slate-700 flex items-center gap-3">
                  <span className="bg-emerald-100 p-2 rounded-lg text-emerald-600">🏃</span> Daily Workouts
                </h2>
              </div>
              <div className="p-8">
                <WorkoutForm onWorkoutAdded={handleRefresh} />
                <div className="mt-8">
                  <h3 className="text-xs font-bold mb-4 text-slate-400 uppercase tracking-widest">History</h3>
                  <WorkoutList refreshTrigger={refreshTrigger} />
                </div>
              </div>
            </section>

            {/* Nutrition Section */}
            <section className="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="bg-slate-50/50 p-6 border-b border-slate-100 flex items-center justify-between backdrop-blur-sm">
                <h2 className="text-xl font-bold text-slate-700 flex items-center gap-3">
                  <span className="bg-orange-100 p-2 rounded-lg text-orange-600">🥗</span> Meal Log
                </h2>
              </div>
              <div className="p-8">
                <FoodForm onFoodAdded={handleRefresh} />
                <div className="mt-8">
                  <h3 className="text-xs font-bold mb-4 text-slate-400 uppercase tracking-widest">History</h3>
                  <FoodList refreshTrigger={refreshTrigger} />
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar (Right Column) */}
          <div className="xl:col-span-1">
            <div className="sticky top-24 space-y-6">
              <Suggestions diet={userProfile.diet} />

              <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200">
                <h3 className="font-bold text-xl mb-2">Pro Tip 🚀</h3>
                <p className="text-indigo-100 text-sm leading-relaxed">
                  Consistency helps {userProfile.goal === 'LOSE' ? 'burn fat' : 'build muscle'} faster than intensity. Log every meal, even the cheat ones!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-20 border-t border-slate-200 py-10 bg-white">
        <div className="max-w-md mx-auto text-center">
          <h4 className="text-lg font-bold text-slate-800 mb-2">OptiFit</h4>
          <div className="flex justify-center gap-6 mb-8 text-sm font-medium">
            <a href="https://github.com/KshitijRaj09" target="_blank" className="text-emerald-600 hover:text-emerald-700 transition-colors">Developer</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
