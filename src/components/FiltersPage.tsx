import React, { useState } from 'react';
import { Search, Filter, ChevronDown, Plus, Eye, Copy, Trash2, MoreHorizontal, X } from 'lucide-react';
import FilterModal from './FilterModal';

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

const FiltersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FilterItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterItem[]>([
    {
      id: 1,
      name: "ganni femme",
      description: "Cliquer pour désactiver",
      categories: ["Blouses", "+7"],
      brands: ["Ganni"],
      isActive: true,
      isNotified: true,
      price: "< 20 €"
    },
    {
      id: 2,
      name: "tee shirt golden goose",
      description: "Cliquer pour désactiver",
      categories: ["Hauts et t-shirts", "+1"],
      brands: ["Golden Goose"],
      isActive: true,
      isNotified: false,
      price: "< 20 €"
    },
    {
      id: 3,
      name: "surprise",
      description: "Cliquer pour désactiver",
      categories: ["Sweats et sweats à capuche"],
      brands: ["Surprise"],
      isActive: true,
      isNotified: true,
      price: "< 30 €"
    },
    {
      id: 4,
      name: "sac coach femme",
      description: "Cliquer pour désactiver",
      categories: ["Sacs"],
      brands: ["Coach"],
      isActive: true,
      isNotified: true,
      price: "< 35 €"
    },
    {
      id: 5,
      name: "chaussure isabel marant",
      description: "Cliquer pour désactiver",
      categories: ["Bottes", "+2"],
      brands: ["Isabel Marant Étoile", "+1"],
      isActive: true,
      isNotified: true,
      price: "< 100 €"
    }
  ]);

  const filteredFilters = filters.filter(filter =>
    filter.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFilterActive = (id: number) => {
    setFilters(filters.map(filter => 
      filter.id === id ? { ...filter, isActive: !filter.isActive } : filter
    ));
  };

  const toggleFilterNotified = (id: number) => {
    setFilters(filters.map(filter => 
      filter.id === id ? { ...filter, isNotified: !filter.isNotified } : filter
    ));
  };

  const openEditModal = (filter: FilterItem) => {
    setSelectedFilter(filter);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setSelectedFilter({
      id: 0,
      name: "",
      description: "",
      categories: [],
      brands: [],
      isActive: true,
      isNotified: true,
      price: ""
    });
    setIsAddModalOpen(true);
  };

  const closeModal = () => {
    setSelectedFilter(null);
    setIsModalOpen(false);
    setIsAddModalOpen(false);
  };

  const deleteFilter = (id: number) => {
    setFilters(filters.filter(filter => filter.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Mes filtres</h1>
        <p className="text-gray-400">Retrouvez l'ensemble de vos filtres. Créez, modifiez et supprimez vos filtres au sein de notre plateforme.</p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tapez pour rechercher"
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

          {/* Actions Dropdown */}
          <div className="relative">
            <button className="flex items-center space-x-2 bg-[#101014] border border-gray-800 hover:border-gray-700 px-4 py-2 rounded-lg text-white transition-colors">
              <span>Actions</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-gray-400 text-sm">TOTAL: {filters.length}</span>
          <button 
            onClick={openAddModal}
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter un filtre</span>
          </button>
        </div>
      </div>

      {/* Filters Table */}
      <div className="bg-[#101014] border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#181820]">
              <tr>
                <th className="text-left px-6 py-4 text-gray-300 font-medium text-sm uppercase tracking-wide">
                  <input type="checkbox" className="rounded border-gray-600 bg-[#181820] text-red-500" />
                </th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium text-sm uppercase tracking-wide">
                  Nom
                </th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium text-sm uppercase tracking-wide">
                  Tags
                </th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium text-sm uppercase tracking-wide">
                  Catégories
                </th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium text-sm uppercase tracking-wide">
                  Marques
                </th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium text-sm uppercase tracking-wide">
                  Sniper
                </th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium text-sm uppercase tracking-wide">
                  Notif.
                </th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium text-sm uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredFilters.map((filter, index) => (
                <tr 
                  key={filter.id} 
                  className="hover:bg-[#181820]/50 transition-colors duration-200"
                >
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded border-gray-600 bg-[#181820] text-red-500" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-1 h-8 bg-red-500 rounded-full"></div>
                      <div>
                        <div className="text-white font-medium">{filter.name}</div>
                        <div className="text-gray-400 text-sm">{filter.price}</div>
                        <div className="text-gray-500 text-xs">{filter.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-gray-400 hover:text-white text-sm">
                      <Plus className="w-4 h-4" />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {filter.categories.map((category, idx) => (
                        <span key={idx} className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs">
                          {category}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {filter.brands.map((brand, idx) => (
                        <span key={idx} className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs">
                          {brand}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleFilterActive(filter.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        filter.isActive ? 'bg-red-500' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          filter.isActive ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleFilterNotified(filter.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        filter.isNotified ? 'bg-red-500' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          filter.isNotified ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-400 hover:text-white p-1">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-white p-1">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => openEditModal(filter)}
                        className="text-gray-400 hover:text-white p-1"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteFilter(filter.id)}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredFilters.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">Aucun filtre trouvé</div>
          <div className="text-gray-500 text-sm mt-2">Essayez de modifier votre recherche</div>
        </div>
      )}

      {/* Filter Modal for Edit */}
      {isModalOpen && selectedFilter && (
        <FilterModal filter={selectedFilter} onClose={closeModal} />
      )}

      {/* Add Filter Modal */}
      {isAddModalOpen && selectedFilter && (
        <FilterModal filter={selectedFilter} onClose={closeModal} />
      )}
    </div>
  );
};

export default FiltersPage;