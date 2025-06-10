import React, { useEffect, useState } from 'react';
import { 
  Bot, 
  Home, 
  BarChart3, 
  RefreshCw, 
  Filter, 
  Shirt, 
  MessageSquare, 
  HelpCircle, 
  Settings,
  ShoppingBag
} from 'lucide-react';
import LoginButton from './LoginButton';
import { supabase } from '../supabaseClient';

type DashboardView = 'feed' | 'autocoop' | 'filters' | 'stats' | 'orders' | 'messaging' | 'account';

interface SidebarProps {
  activeView: DashboardView;
  setActiveView: (view: DashboardView) => void;
  onNavigate: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, onNavigate }) => {
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

  const menuItems = [
    { icon: Home, label: "Fil d'actualité", key: 'feed' as const },
    { icon: BarChart3, label: 'Mes stats', key: 'stats' as const },
    { icon: RefreshCw, label: 'Mon autocoop', key: 'autocoop' as const },
    { icon: Filter, label: 'Mes filtres', key: 'filters' as const },
  ];

  const crmItems = [
    { icon: Shirt, label: 'Mon dressing', key: 'dressing' as const },
    { icon: ShoppingBag, label: 'Mes commandes', key: 'orders' as const },
    { icon: MessageSquare, label: 'Messagerie', key: 'messaging' as const },
  ];

  const utilItems = [
    { icon: HelpCircle, label: 'Aide', key: 'help' as const },
    { icon: Settings, label: 'Serveur Discord', key: 'discord' as const, link: 'https://discord.gg/keGmnF6P' },
  ];

  const handleUtilItemClick = (item: typeof utilItems[0]) => {
    if (item.link) {
      window.open(item.link, '_blank');
    }
  };

  const handleMenuItemClick = (key: string) => {
    if (key === 'feed' || key === 'autocoop' || key === 'filters' || key === 'stats' || key === 'orders' || key === 'messaging') {
      setActiveView(key);
    }
  };

  return (
    <div className="w-64 bg-[#101014] border-r border-gray-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <button 
          onClick={onNavigate}
          className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
          <img 
                src="/image.png" 
                alt="VinTrack Logo" 
                className="w-8 h-8 object-contain"
              />
          </div>
          <span className="text-xl font-bold text-white">VinTrack</span>
          <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">beta-1.2</span>
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6">
        {/* Bot VinTrack Section */}
        <div className="px-6 mb-6">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
            BOT VINTRACK
          </h3>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleMenuItemClick(item.key)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeView === item.key 
                    ? 'bg-red-500/20 text-red-400 border-r-2 border-red-500' 
                    : 'text-gray-300 hover:bg-[#181820] hover:text-white hover:scale-105'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* CRM VinTrack Section */}
        <div className="px-6 mb-6">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
            CRM VINTRACK
          </h3>
          <nav className="space-y-1">
            {crmItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleMenuItemClick(item.key)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeView === item.key 
                    ? 'bg-red-500/20 text-red-400 border-r-2 border-red-500' 
                    : 'text-gray-300 hover:bg-[#181820] hover:text-white hover:scale-105'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Liens Utiles Section */}
        <div className="px-6">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
            LIENS UTILES
          </h3>
          <nav className="space-y-1">
            {utilItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleUtilItemClick(item)}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-[#181820] hover:text-white hover:scale-105 transition-all duration-200 group"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
                {item.link && (
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  </div>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="p-6 border-t border-gray-800">
        {!user ? (
          <LoginButton />
        ) : (
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-3 mb-2">
              {user.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt="Avatar Discord"
                  className="w-10 h-10 rounded-full border border-gray-700 shadow"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
              )}
              <span className="text-green-400 font-semibold">{user.user_metadata?.full_name || user.email}</span>
            </div>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                if (typeof onNavigate === 'function') onNavigate();
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition"
            >
              Se déconnecter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;