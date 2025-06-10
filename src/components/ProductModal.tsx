import React from 'react';
import { X, Star, Clock, Eye, Heart } from 'lucide-react';

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
  status: string;
  views: number;
  likes: number;
  brand: string;
  size: string;
}

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Neuf sans étiquette':
      case 'Neuf avec étiquette':
      case 'Très bon état':
      case 'Bon état':
        return 'bg-orange-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#101014] border border-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div>
            <div className="text-gray-400 text-sm">{product.brand} - {product.size}</div>
            <h2 className="text-white font-semibold text-xl">{product.title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 hover:bg-[#181820] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Images Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <img 
                src={product.images[0]} 
                alt={product.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="absolute top-3 left-3">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(product.status)}`}>
                  {product.status}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {product.images.slice(1, 3).map((image, index) => (
                <img 
                  key={index}
                  src={image} 
                  alt={`${product.title} ${index + 2}`}
                  className="w-full h-[120px] object-cover rounded-lg"
                />
              ))}
            </div>
          </div>

          {/* Seller Info */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">
                {product.seller.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <div className="text-white font-medium">{product.seller}</div>
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

          {/* Price */}
          <div className="mb-4">
            <div className="text-3xl font-bold text-white mb-2">
              {product.price.toFixed(2)} €
            </div>
            <div className="text-gray-400">
              (= {product.originalPrice.toFixed(2)} €)
            </div>
          </div>

          {/* Time and Stats */}
          <div className="flex items-center justify-between text-gray-400 text-sm mb-6">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{product.timeAgo}</span>
            </div>
            <div className="flex items-center space-x-4">
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

          {/* Status */}
          <div className="mb-6">
            <div className="text-white font-medium mb-2">{product.status}</div>
          </div>

          {/* Filter Info */}
          <div className="mb-6">
            <div className="text-white font-medium mb-2">Filtres correspondants</div>
            <div className="text-gray-400 text-sm">evhan filtre</div>
            <button className="text-green-400 text-sm hover:underline">voir le filtre</button>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <button className="flex-1 bg-[#181820] hover:bg-[#23232b] text-white py-3 rounded-lg font-medium transition-colors">
              Voir sur vinted
            </button>
            <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors">
              Acheter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;