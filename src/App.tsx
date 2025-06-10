import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

import { useEffect } from 'react';
import { supabase } from './supabaseClient';

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'dashboard'>('landing');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Ajout : forcer la landing page si user déconnecté
  React.useEffect(() => {
    if (!user) setCurrentPage('landing');
  }, [user]);

  return (
    <div className="min-h-screen bg-black">
      {currentPage === 'landing' ? (
        <LandingPage onNavigate={() => setCurrentPage('dashboard')} user={user} />
      ) : (
        <Dashboard onNavigate={() => setCurrentPage('landing')} user={user} />
      )}
    </div>
  );
}

export default App;