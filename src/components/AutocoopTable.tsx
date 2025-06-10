import React, { useState } from 'react';
import { Search, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface AutocoopItem {
  id: number;
  name: string;
  type: string;
  price: number;
  originalPrice: number;
  date: string;
  time: string;
  status: 'En attente' | 'Confirmé' | 'Vendu';
  image: string;
}

const AutocoopTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [items] = useState<AutocoopItem[]>([
    {
      id: 1,
      name: "Arc teryx Atom",
      type: "Achat manuel",
      price: 215.00,
      originalPrice: 226.45,
      date: "13/10/2023",
      time: "16:08:43",
      status: "En attente",
      image: "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      id: 2,
      name: "Veste zip Ralph Lauren Vintage / XL",
      type: "Achat manuel",
      price: 20.00,
      originalPrice: 21.70,
      date: "13/10/2023",
      time: "15:08:16",
      status: "En attente",
      image: "https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      id: 3,
      name: "Casaco Impermeável Carhartt",
      type: "Achat automatique",
      price: 40.00,
      originalPrice: 42.70,
      date: "13/10/2023",
      time: "13:26:52",
      status: "En attente",
      image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      id: 4,
      name: "Abrigo Carhartt negro",
      type: "Achat automatique",
      price: 30.00,
      originalPrice: 32.20,
      date: "13/10/2023",
      time: "13:26:53",
      status: "En attente",
      image: "https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      id: 5,
      name: "Manteau carhartt",
      type: "Achat automatique",
      price: 40.00,
      originalPrice: 42.70,
      date: "13/10/2023",
      time: "13:24:37",
      status: "En attente",
      image: "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=100"
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'En attente':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'Confirmé':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Vendu':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En attente':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Confirmé':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Vendu':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Mon autocoop</h1>
        <p className="text-gray-400">Retrouvez ici tous vos articles auto-coop ou en cours d'achat.</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Tapez pour rechercher"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#101014] border border-gray-800 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
        />
      </div>

      {/* Table */}
      <div className="bg-[#101014] border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#181820]">
              <tr>
                <th className="text-left px-6 py-4 text-gray-300 font-medium text-sm uppercase tracking-wide">
                  Nom de l'article
                </th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium text-sm uppercase tracking-wide">
                  Prix
                </th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium text-sm uppercase tracking-wide">
                  Date
                </th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium text-sm uppercase tracking-wide">
                  État
                </th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium text-sm uppercase tracking-wide">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredItems.map((item, index) => (
                <tr 
                  key={item.id} 
                  className="hover:bg-[#181820]/50 transition-colors duration-200 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <div className="text-white font-medium">{item.name}</div>
                        <div className="text-gray-400 text-sm">{item.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white font-semibold">
                      {item.price.toFixed(2)}€ 
                      <span className="text-gray-400 text-sm ml-1">
                        (-{item.originalPrice.toFixed(2)})
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-300">
                      {item.date} {item.time}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(item.status)}`}>
                      {getStatusIcon(item.status)}
                      <span>{item.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-green-400 hover:text-green-300 text-sm font-medium hover:underline transition-colors">
                        Confirmer l'achat
                      </button>
                      <button className="text-red-400 hover:text-red-300 text-sm font-medium hover:underline transition-colors">
                        Détails
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">Aucun article trouvé</div>
          <div className="text-gray-500 text-sm mt-2">Essayez de modifier votre recherche</div>
        </div>
      )}
    </div>
  );
};

export default AutocoopTable;