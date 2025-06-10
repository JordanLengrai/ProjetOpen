import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

interface FilterItem {
  id: number;
  name: string;
  description: string;
  categories: string[];
  brands: string[];
  isActive: boolean;
  isNotified: boolean;
  price: string;
}

interface FilterModalProps {
  filter: FilterItem;
  onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ filter, onClose }) => {
  const [formData, setFormData] = useState({
    name: filter.name,
    categories: filter.id === 0 ? [] : ['Blouses Femmes', 'Blouses manches longues Femmes', 'Blouses ¾ Femmes', 'Chemises Femmes', 'Blouses manches courtes Femmes', 'Autres hauts Femmes', 'Cols roulés Femmes', 'Tops épaules dénudées Femmes'],
    brands: filter.id === 0 ? [] : ['Ganni'],
    sizes: [] as string[],
    colors: [] as string[],
    maskReposts: false,
    receiveNotifications: false,
    sniperActive: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onClose();
  };

  const removeCategory = (categoryToRemove: string) => {
    setFormData({
      ...formData,
      categories: formData.categories.filter(cat => cat !== categoryToRemove)
    });
  };

  const removeBrand = (brandToRemove: string) => {
    setFormData({
      ...formData,
      brands: formData.brands.filter(brand => brand !== brandToRemove)
    });
  };

  const addCategory = (category: string) => {
    if (category && !formData.categories.includes(category)) {
      setFormData({
        ...formData,
        categories: [...formData.categories, category]
      });
    }
  };

  const addBrand = (brand: string) => {
    if (brand && !formData.brands.includes(brand)) {
      setFormData({
        ...formData,
        brands: [...formData.brands, brand]
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-white font-semibold text-xl">
            {filter.id === 0 ? 'Ajouter un filtre' : 'Modifier un filtre'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 hover:bg-[#181820] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Filter Name */}
          <div>
            <label className="block text-white font-medium mb-2">Nom du filtre</label>
            <div className="relative">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#181820] border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors pr-10"
                placeholder="Nom du filtre"
              />
              {formData.name && (
                <button 
                  type="button" 
                  onClick={() => setFormData({ ...formData, name: '' })}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-white font-medium mb-2">Catégories</label>
            <div className="space-y-2 mb-3">
              {formData.categories.map((category, index) => (
                <div key={index} className="flex items-center justify-between bg-[#181820] border border-gray-700 rounded-lg px-3 py-2">
                  <span className="text-white text-sm">{category}</span>
                  <button
                    type="button"
                    onClick={() => removeCategory(category)}
                    className="text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="relative">
              <select 
                className="w-full bg-[#181820] border border-gray-700 rounded-lg px-3 py-2 text-white appearance-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                onChange={(e) => {
                  if (e.target.value) {
                    addCategory(e.target.value);
                    e.target.value = '';
                  }
                }}
              >
                <option value="">Sélectionnez des catégories</option>
                <option value="Blouses Femmes">Blouses Femmes</option>
                <option value="Chemises Femmes">Chemises Femmes</option>
                <option value="Hauts et t-shirts">Hauts et t-shirts</option>
                <option value="Sweats et sweats à capuche">Sweats et sweats à capuche</option>
                <option value="Sacs">Sacs</option>
                <option value="Bottes">Bottes</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>

          {/* Brands */}
          <div>
            <label className="block text-white font-medium mb-2">Marques</label>
            <div className="space-y-2 mb-3">
              {formData.brands.map((brand, index) => (
                <div key={index} className="flex items-center justify-between bg-[#181820] border border-gray-700 rounded-lg px-3 py-2">
                  <span className="text-white text-sm">{brand}</span>
                  <button
                    type="button"
                    onClick={() => removeBrand(brand)}
                    className="text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <input
              type="text"
              placeholder="Recherchez des marques"
              className="w-full bg-[#181820] border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const target = e.target as HTMLInputElement;
                  if (target.value) {
                    addBrand(target.value);
                    target.value = '';
                  }
                }
              }}
            />
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-white font-medium mb-2">Tailles</label>
            <div className="relative">
              <select className="w-full bg-[#181820] border border-gray-700 rounded-lg px-3 py-2 text-white appearance-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors">
                <option>Sélectionnez des tailles</option>
                <option>XS</option>
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
                <option>XXL</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>

          {/* Colors */}
          <div>
            <label className="block text-white font-medium mb-2">Couleurs</label>
            <div className="relative">
              <select className="w-full bg-[#181820] border border-gray-700 rounded-lg px-3 py-2 text-white appearance-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors">
                <option>Sélectionnez des couleurs</option>
                <option>Noir</option>
                <option>Blanc</option>
                <option>Rouge</option>
                <option>Bleu</option>
                <option>Vert</option>
                <option>Jaune</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>

          {/* States */}
          <div>
            <label className="block text-white font-medium mb-3">États</label>
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-gray-300">Masquer les repost</span>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, maskReposts: !formData.maskReposts })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    formData.maskReposts ? 'bg-red-500' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.maskReposts ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </label>
              
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-gray-300">Réception des notifications</span>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, receiveNotifications: !formData.receiveNotifications })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    formData.receiveNotifications ? 'bg-red-500' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.receiveNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </label>
              
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-gray-300">Sniper cet article</span>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, sniperActive: !formData.sniperActive })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    formData.sniperActive ? 'bg-red-500' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.sniperActive ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-colors"
            >
              {filter.id === 0 ? 'Ajouter' : 'Modifier'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-[#181820] hover:bg-[#23232b] text-white py-3 rounded-lg font-medium transition-colors"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterModal;