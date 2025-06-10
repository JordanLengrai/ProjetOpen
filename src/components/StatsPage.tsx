import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Eye, Calendar, BarChart3, PieChart } from 'lucide-react';

const StatsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const stats = {
    totalEarnings: 2847.50,
    totalPurchases: 156,
    totalViews: 12450,
    conversionRate: 8.2,
    avgPrice: 18.25,
    topCategories: [
      { name: 'Vêtements', value: 45, color: 'bg-red-500' },
      { name: 'Chaussures', value: 30, color: 'bg-orange-500' },
      { name: 'Accessoires', value: 25, color: 'bg-yellow-500' }
    ],
    recentSales: [
      { date: '2024-01-15', item: 'Nike Air Max', price: 85.00, profit: 35.00 },
      { date: '2024-01-14', item: 'Ralph Lauren Polo', price: 25.00, profit: 15.00 },
      { date: '2024-01-13', item: 'Adidas Hoodie', price: 45.00, profit: 20.00 },
      { date: '2024-01-12', item: 'Levi\'s Jeans', price: 35.00, profit: 18.00 },
      { date: '2024-01-11', item: 'Converse Sneakers', price: 40.00, profit: 22.00 }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Mes statistiques</h1>
          <p className="text-gray-400">Suivez vos performances et analysez vos résultats.</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-[#101014] border border-gray-800 rounded-lg px-4 py-2 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
          >
            <option value="7d">7 derniers jours</option>
            <option value="30d">30 derniers jours</option>
            <option value="90d">3 derniers mois</option>
            <option value="1y">Cette année</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#101014] border border-gray-800 rounded-xl p-6 hover:border-red-500/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
            <div className="flex items-center text-green-400 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              +12.5%
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {stats.totalEarnings.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
          </div>
          <div className="text-gray-400 text-sm">Gains totaux</div>
        </div>

        <div className="bg-[#101014] border border-gray-800 rounded-xl p-6 hover:border-red-500/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex items-center text-green-400 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              +8.3%
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{stats.totalPurchases}</div>
          <div className="text-gray-400 text-sm">Achats réalisés</div>
        </div>

        <div className="bg-[#101014] border border-gray-800 rounded-xl p-6 hover:border-red-500/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-purple-400" />
            </div>
            <div className="flex items-center text-red-400 text-sm">
              <TrendingDown className="w-4 h-4 mr-1" />
              -2.1%
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{stats.totalViews.toLocaleString()}</div>
          <div className="text-gray-400 text-sm">Vues totales</div>
        </div>

        <div className="bg-[#101014] border border-gray-800 rounded-xl p-6 hover:border-red-500/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-orange-400" />
            </div>
            <div className="flex items-center text-green-400 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              +5.7%
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{stats.conversionRate}%</div>
          <div className="text-gray-400 text-sm">Taux de conversion</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-[#101014] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold text-lg">Évolution des gains</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-end justify-between space-x-2">
            {[65, 45, 80, 55, 90, 70, 85].map((height, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-red-500 to-red-400 rounded-t"
                  style={{ height: `${height}%` }}
                ></div>
                <div className="text-gray-400 text-xs mt-2">
                  {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'][index]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories Chart */}
        <div className="bg-[#101014] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold text-lg">Répartition par catégorie</h3>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {stats.topCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                  <span className="text-white">{category.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-[#181820] rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${category.color}`}
                      style={{ width: `${category.value}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-400 text-sm w-8">{category.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Sales */}
      <div className="bg-[#101014] border border-gray-800 rounded-xl p-6">
        <h3 className="text-white font-semibold text-lg mb-6">Ventes récentes</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-3 text-gray-400 font-medium">Date</th>
                <th className="text-left py-3 text-gray-400 font-medium">Article</th>
                <th className="text-left py-3 text-gray-400 font-medium">Prix de vente</th>
                <th className="text-left py-3 text-gray-400 font-medium">Bénéfice</th>
                <th className="text-left py-3 text-gray-400 font-medium">Marge</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentSales.map((sale, index) => (
                <tr key={index} className="border-b border-gray-800/50 hover:bg-[#181820]/30 transition-colors">
                  <td className="py-4 text-gray-300">
                    {new Date(sale.date).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="py-4 text-white font-medium">{sale.item}</td>
                  <td className="py-4 text-white">
                    {sale.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                  </td>
                  <td className="py-4 text-green-400 font-medium">
                    +{sale.profit.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                  </td>
                  <td className="py-4">
                    <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-sm">
                      {((sale.profit / sale.price) * 100).toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;