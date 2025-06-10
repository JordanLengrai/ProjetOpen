import React, { useState } from 'react';
import { Search, Filter, Package, Truck, CheckCircle, Clock, AlertCircle, Eye, MessageSquare } from 'lucide-react';

interface Order {
  id: string;
  item: string;
  seller: string;
  price: number;
  date: string;
  status: 'En attente' | 'Expédié' | 'Livré' | 'Annulé';
  trackingNumber?: string;
  image: string;
  estimatedDelivery?: string;
}

const OrdersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const [orders] = useState<Order[]>([
    {
      id: 'CMD-001',
      item: 'Nike Air Max 90',
      seller: 'sneakerhead_fr',
      price: 85.00,
      date: '2024-01-15',
      status: 'Livré',
      trackingNumber: 'FR123456789',
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=100',
      estimatedDelivery: '2024-01-18'
    },
    {
      id: 'CMD-002',
      item: 'Ralph Lauren Polo Shirt',
      seller: 'vintage_style',
      price: 25.00,
      date: '2024-01-14',
      status: 'Expédié',
      trackingNumber: 'FR987654321',
      image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=100',
      estimatedDelivery: '2024-01-17'
    },
    {
      id: 'CMD-003',
      item: 'Adidas Hoodie',
      seller: 'streetwear_pro',
      price: 45.00,
      date: '2024-01-13',
      status: 'En attente',
      image: 'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 'CMD-004',
      item: 'Levi\'s 501 Jeans',
      seller: 'denim_lover',
      price: 35.00,
      date: '2024-01-12',
      status: 'Livré',
      trackingNumber: 'FR456789123',
      image: 'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=100',
      estimatedDelivery: '2024-01-15'
    },
    {
      id: 'CMD-005',
      item: 'Converse Chuck Taylor',
      seller: 'classic_shoes',
      price: 40.00,
      date: '2024-01-11',
      status: 'Annulé',
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'En attente':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'Expédié':
        return <Truck className="w-4 h-4 text-blue-500" />;
      case 'Livré':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Annulé':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En attente':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Expédié':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Livré':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Annulé':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-[#101014]/20 text-gray-400 border-gray-500/30';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.seller.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: orders.length,
    'En attente': orders.filter(o => o.status === 'En attente').length,
    'Expédié': orders.filter(o => o.status === 'Expédié').length,
    'Livré': orders.filter(o => o.status === 'Livré').length,
    'Annulé': orders.filter(o => o.status === 'Annulé').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Mes commandes</h1>
        <p className="text-gray-400">Suivez l'état de vos commandes et gérez vos achats.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(statusCounts).map(([status, count]) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`p-4 rounded-xl border transition-all duration-200 ${
              statusFilter === status
                ? 'bg-red-500/20 border-red-500/50 text-red-400'
                : 'bg-[#101014] border-gray-800 text-gray-300 hover:border-gray-700'
            }`}
          >
            <div className="text-2xl font-bold">{count}</div>
            <div className="text-sm capitalize">
              {status === 'all' ? 'Toutes' : status}
            </div>
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher une commande..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#101014] border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
            />
          </div>

          {/* Filter Button */}
          <button className="flex items-center space-x-2 bg-[#101014] border border-gray-800 hover:border-gray-700 px-4 py-2 rounded-lg text-white transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filtrer</span>
          </button>
        </div>

        <div className="text-gray-400 text-sm">
          {filteredOrders.length} commande(s) trouvée(s)
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#101014] border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#181820]">
              <tr>
                <th className="text-left px-6 py-4 text-gray-300 font-medium text-sm uppercase tracking-wide">
                  Commande
                </th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium text-sm uppercase tracking-wide">
                  Article
                </th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium text-sm uppercase tracking-wide">
                  Vendeur
                </th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium text-sm uppercase tracking-wide">
                  Prix
                </th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium text-sm uppercase tracking-wide">
                  Date
                </th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium text-sm uppercase tracking-wide">
                  Statut
                </th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium text-sm uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredOrders.map((order, index) => (
                <tr 
                  key={order.id} 
                  className="hover:bg-[#181820]/50 transition-colors duration-200"
                >
                  <td className="px-6 py-4">
                    <div className="text-white font-medium">{order.id}</div>
                    {order.trackingNumber && (
                      <div className="text-gray-400 text-sm">Suivi: {order.trackingNumber}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={order.image} 
                        alt={order.item}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <div className="text-white font-medium">{order.item}</div>
                        {order.estimatedDelivery && order.status === 'Expédié' && (
                          <div className="text-gray-400 text-sm">
                            Livraison prévue: {new Date(order.estimatedDelivery).toLocaleDateString('fr-FR')}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-300">{order.seller}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white font-semibold">
                      {order.price.toFixed(2)}€
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-300">
                      {new Date(order.date).toLocaleDateString('fr-FR')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span>{order.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-400 hover:text-white p-1 hover:bg-[#181820] rounded transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-white p-1 hover:bg-[#181820] rounded transition-colors">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      {order.trackingNumber && (
                        <button className="text-blue-400 hover:text-blue-300 p-1 hover:bg-[#181820] rounded transition-colors">
                          <Package className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <div className="text-gray-400 text-lg">Aucune commande trouvée</div>
          <div className="text-gray-500 text-sm mt-2">
            {searchTerm ? 'Essayez de modifier votre recherche' : 'Vos commandes apparaîtront ici'}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;