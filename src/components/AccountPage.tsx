import React from 'react';
import { supabase } from '../supabaseClient';

interface AccountPageProps {
  user: any;
  onLogout?: () => void;
}

const AccountPage: React.FC<AccountPageProps> = ({ user, onLogout }) => {
  return (
    <div className="max-w-2xl mx-auto bg-[#101014] border border-gray-800 rounded-2xl p-8 mt-8 shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold text-white mb-6">Paramètres du compte</h2>
      <div className="flex items-center space-x-6 mb-8">
        {user?.user_metadata?.avatar_url ? (
          <img
            src={user.user_metadata.avatar_url}
            alt="Avatar Discord"
            className="w-20 h-20 rounded-full border border-gray-700 shadow object-cover"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
        )}
        <div>
          <div className="text-xl font-semibold text-white mb-1">{user?.user_metadata?.full_name || user.email}</div>
          <div className="text-gray-400 text-sm">{user.email}</div>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-400 text-sm mb-1">Nom d'utilisateur</label>
          <input
            type="text"
            className="w-full bg-[#181820] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
            value={user?.user_metadata?.full_name || ''}
            disabled
          />
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-1">Adresse e-mail</label>
          <input
            type="text"
            className="w-full bg-[#181820] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
            value={user.email}
            disabled
          />
        </div>
      </div>
      <button
        className="mt-8 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition"
        onClick={async () => {
          await supabase.auth.signOut();
          if (typeof onLogout === 'function') onLogout();
        }}
      >
        Se déconnecter
      </button>
    </div>
  );
};

export default AccountPage;
