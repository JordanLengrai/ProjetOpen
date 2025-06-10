import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Feed from './Feed';
import AutocoopTable from './AutocoopTable';
import FiltersPage from './FiltersPage';
import StatsPage from './StatsPage';
import OrdersPage from './OrdersPage';
import MessagingPage from './MessagingPage';
import AccountPage from './AccountPage';
import { Bell, User, ChevronDown } from 'lucide-react';

interface DashboardProps {
  onNavigate: () => void;
  user: any;
}

type DashboardView = 'feed' | 'autocoop' | 'filters' | 'stats' | 'orders' | 'messaging' | 'account';

const Dashboard: React.FC<DashboardProps> = ({ onNavigate, user }) => {
  const [activeView, setActiveView] = useState<DashboardView>('feed');
  const [autocoopActive, setAutocoopActive] = useState(true);

  const renderContent = () => {
    switch (activeView) {
      case 'feed':
        return <Feed />;
      case 'autocoop':
        return <AutocoopTable />;
      case 'filters':
        return <FiltersPage />;
      case 'stats':
        return <StatsPage />;
      case 'orders':
        return <OrdersPage />;
      case 'messaging':
        return <MessagingPage />;
      case 'account':
        return <AccountPage user={user} onLogout={onNavigate} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar activeView={activeView} setActiveView={setActiveView} onNavigate={onNavigate} />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-[#101014] border-b border-gray-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
                autocoopActive 
                  ? 'bg-red-500/20 border-red-500/30' 
                  : 'bg-gray-500/20 border-gray-500/30'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  autocoopActive 
                    ? 'bg-red-500' 
                    : 'bg-gray-500'
                }`}></div>
                <span className={`font-medium text-sm ${
                  autocoopActive ? 'text-red-400' : 'text-gray-400'
                }`}>
                  Autocoop {autocoopActive ? 'actif' : 'inactif'}
                </span>
                <button 
                  onClick={() => setAutocoopActive(!autocoopActive)}
                  className={`text-sm underline hover:no-underline transition-colors ${
                    autocoopActive ? 'text-red-400 hover:text-red-300' : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  Cliquez pour {autocoopActive ? 'désactiver' : 'activer'}
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </button>
              
              <div className="flex items-center space-x-3 bg-[#181820] hover:bg-[#23232b] transition-colors px-4 py-2 rounded-lg cursor-pointer"
                onClick={() => setActiveView('account')}>
                {user?.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt="Avatar Discord"
                    className="w-8 h-8 rounded-full border border-gray-700 shadow object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className="text-left">
                  <div className="text-white font-medium text-sm">{user?.user_metadata?.full_name || 'Utilisateur'}</div>
                  <div className="text-gray-400 text-xs">Utilisateur</div>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-black">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;