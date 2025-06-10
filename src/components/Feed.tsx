import React, { useState, useEffect } from 'react';
import { Star, Clock, MoreHorizontal, Eye, Heart, ChevronDown } from 'lucide-react';
import ProductModal from './ProductModal';

interface Product {
  id: number;
  title: string;
  seller: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice: number;
  timeAgo: string;
  image: string;
  images: string[];
  status: 'Neuf sans étiquette' | 'Neuf avec étiquette' | 'Très bon état' | 'Bon état';
  sold?: boolean;
  views: number;
  likes: number;
  brand: string;
  size: string;
}

const Feed: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Filter states
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [brandSearch, setBrandSearch] = useState('');
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [maskReposts, setMaskReposts] = useState(false);
  const [receiveNotifications, setReceiveNotifications] = useState(false);
  const [sniperActive, setSniperActive] = useState(false);

  useEffect(() => {
    // Simulate loading products
    setTimeout(() => {
      setProducts([
        {
          id: 1,
          title: "ralph lauren crew neck",
          seller: "sp927",
          rating: 5,
          reviews: 26,
          price: 20.00,
          originalPrice: 26.48,
          timeAgo: "il y a 28 secondes",
          image: "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=400",
          images: [
            "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400"
          ],
          status: "Neuf sans étiquette",
          views: 45,
          likes: 12,
          brand: "RALPH LAUREN",
          size: "S / 36 / 8"
        },
        {
          id: 2,
          title: "Blauer Stone island reg...",
          seller: "esad_1905",
          rating: 5,
          reviews: 8,
          price: 54.99,
          originalPrice: 65.06,
          timeAgo: "il y a 1 minute",
          image: "https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=400",
          images: [
            "https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400"
          ],
          status: "Neuf avec étiquette",
          views: 78,
          likes: 23,
          brand: "STONE ISLAND",
          size: "L"
        },
        {
          id: 3,
          title: "Stone island soft shell",
          seller: "jaco699",
          rating: 5,
          reviews: 26,
          price: 40.00,
          originalPrice: 55.00,
          timeAgo: "il y a 2 minutes",
          image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400",
          images: [
            "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=400"
          ],
          status: "Très bon état",
          views: 92,
          likes: 18,
          brand: "STONE ISLAND",
          size: "L"
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Neuf sans étiquette':
        return 'bg-orange-500 text-white';
      case 'Neuf avec étiquette':
        return 'bg-orange-500 text-white';
      case 'Très bon état':
        return 'bg-orange-500 text-white';
      case 'Bon état':
        return 'bg-orange-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const handleStateChange = (state: string) => {
    setSelectedStates(prev => 
      prev.includes(state) 
        ? prev.filter(s => s !== state)
        : [...prev, state]
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-[#101014] border border-gray-800 rounded-xl p-6 animate-pulse">
            <div className="flex space-x-4">
              <div className="w-32 h-32 bg-[#181820] rounded-lg"></div>
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-[#181820] rounded w-3/4"></div>
                <div className="h-3 bg-[#181820] rounded w-1/2"></div>
                <div className="h-6 bg-[#181820] rounded w-1/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-6">
      {/* Sidebar Filters */}
      <div className="w-80 space-y-6">
        {/* Compte acheteur */}
        <div className="bg-[#101014] border border-gray-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">Compte acheteur</h3>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">G</span>
            </div>
            <div>
              <div className="text-white font-medium">gregoireltb</div>
              <div className="text-green-400 text-sm flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                120,00 EUR disponibles
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="bg-[#101014] border border-gray-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">Tags</h3>
          <div className="text-gray-400 text-sm">Aucune valeur disponible</div>
        </div>

        {/* Prix */}
        <div className="bg-[#101014] border border-gray-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">Prix</h3>
          <div className="flex items-center space-x-3">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Minimum"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                className="w-full bg-[#181820] border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
              />
            </div>
            <span className="text-gray-400 self-center">€</span>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Maximum"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                className="w-full bg-[#181820] border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
              />
            </div>
            <span className="text-gray-400 self-center">€</span>
          </div>
        </div>

        {/* Marques */}
        <div className="bg-[#101014] border border-gray-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">Marques</h3>
          <input
            type="text"
            placeholder="Tapez pour chercher"
            value={brandSearch}
            onChange={(e) => setBrandSearch(e.target.value)}
            className="w-full bg-[#181820] border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
          />
        </div>

        {/* État des articles */}
        <div className="bg-[#101014] border border-gray-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">État des articles</h3>
          <div className="space-y-3">
            {['Neuf sans étiquette', 'Neuf avec étiquette', 'Très bon état', 'Bon état', 'Satisfaisant'].map((state) => (
              <label key={state} className="flex items-center space-x-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={selectedStates.includes(state)}
                  onChange={() => handleStateChange(state)}
                  className="rounded border-gray-600 bg-[#181820] text-red-500 focus:ring-red-500 focus:ring-offset-0" 
                />
                <span className="text-gray-300 text-sm">{state}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Options */}
        <div className="bg-[#101014] border border-gray-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">Options</h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-300 text-sm">Masquer les repost</span>
              <button
                onClick={() => setMaskReposts(!maskReposts)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  maskReposts ? 'bg-red-500' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    maskReposts ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-300 text-sm">Réception des notifications</span>
              <button
                onClick={() => setReceiveNotifications(!receiveNotifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  receiveNotifications ? 'bg-red-500' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    receiveNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-300 text-sm">Sniper cet article</span>
              <button
                onClick={() => setSniperActive(!sniperActive)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  sniperActive ? 'bg-red-500' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    sniperActive ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </label>
          </div>
        </div>
      </div>

      {/* Main Feed */}
      <div className="flex-1">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Mon fil d'actualité</h1>
          <p className="text-gray-400">Retrouvez les différents articles selon vos filtres en temps réel.</p>
        </div>

        <div className="space-y-4">
          {products.map((product, index) => (
            <div 
              key={product.id}
              className="bg-[#101014] border border-gray-800 rounded-xl p-6 hover:border-red-500/50 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="flex space-x-4">
                {/* Product Image */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-lg overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(product.status)}`}>
                      {product.status}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="text-gray-400 text-sm mb-1">{product.brand} - {product.size}</div>
                      <h3 className="text-white font-semibold text-lg mb-2">{product.title}</h3>
                      
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-semibold">
                              {product.seller.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="text-gray-400 text-sm">{product.seller}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3 h-3 ${i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} 
                            />
                          ))}
                          <span className="text-gray-400 text-xs">({product.reviews})</span>
                        </div>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-white p-1">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center space-x-4 mb-3">
                    <div className="text-2xl font-bold text-white">
                      {product.price.toFixed(2)} €
                    </div>
                    <div className="text-gray-400 line-through">
                      (= {product.originalPrice.toFixed(2)} €)
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-gray-400 text-sm mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{product.timeAgo}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-3">
                      <button className="bg-[#23232b] hover:bg-[#282832] text-white px-4 py-2 rounded-lg font-medium transition-colors">
                        Détails
                      </button>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                        Acheter
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-gray-400 text-sm">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{product.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{product.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

export default Feed;