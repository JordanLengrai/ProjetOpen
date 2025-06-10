import React, { useEffect, useState } from 'react';
import { ArrowRight, Star, Zap, TrendingUp, Shield, Menu, X } from 'lucide-react';
import LoginButton from './LoginButton';
import { supabase } from '../supabaseClient';

interface LandingPageProps {
  onNavigate: () => void;
  user?: any;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, user }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentEarning, setCurrentEarning] = useState(2500);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Animation du compteur d'earnings toutes les 5 secondes
    const interval = setInterval(() => {
      setCurrentEarning(prev => {
        const change = Math.floor(Math.random() * 100) + 50; // Augmentation entre 50 et 150
        return prev + change;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden relative">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-transparent to-red-900/5"></div>
      
      {/* Navigation */}
      <nav className="relative z-50 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className={`flex items-center space-x-3 transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
              <img 
                src="/image.png" 
                alt="VinTrack Logo" 
                className="w-8 h-8 object-contain"
              />
            </div>
            <span className="text-2xl font-bold text-white">VinTrack</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center space-x-8 transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
            <button 
              onClick={() => scrollToSection('product')}
              className="text-gray-300 hover:text-red-400 transition-colors duration-300 font-medium"
            >
              Produit
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="text-gray-300 hover:text-red-400 transition-colors duration-300 font-medium"
            >
              Prix
            </button>
            <button 
              onClick={() => scrollToSection('reviews')}
              className="text-gray-300 hover:text-red-400 transition-colors duration-300 font-medium"
            >
              Avis
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2 hover:bg-[#181820] rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          
          {/* Utilisateur connecté : Avatar + nom + dropdown */}
          {user ? (
            <div className="hidden md:flex items-center space-x-3 relative group">
              <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                {user.user_metadata?.avatar_url ? (
                  <img src={user.user_metadata.avatar_url} alt="avatar" className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <span className="text-white font-bold text-xl uppercase">{user.user_metadata?.full_name?.[0] || user.email?.[0]}</span>
                )}
              </div>
              <div className="flex flex-col text-left">
                <span className="font-bold text-white leading-none">{user.user_metadata?.full_name || user.email}</span>
                <span className="text-gray-400 text-sm leading-none">Utilisateur</span>
              </div>
              <svg className="w-5 h-5 text-gray-400 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              {/* Dropdown */}
              <div className="absolute right-0 top-14 bg-[#181820] border border-gray-700 rounded-lg shadow-lg py-2 px-4 min-w-[180px] opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto z-50">
                <button
                  onClick={async () => { await supabase.auth.signOut(); }}
                  className="block w-full text-left text-red-500 hover:text-red-400 font-medium py-2"
                >
                  Se déconnecter
                </button>
                <button
                  onClick={onNavigate}
                  className="block w-full text-left text-white hover:text-red-400 font-medium py-2"
                >
                  Ouvrir l'app
                </button>
              </div>
            </div>
          ) : (
            <button 
              onClick={onNavigate}
              className={`hidden md:block bg-[#181820] hover:bg-[#23232b] text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 transform border border-gray-700 hover:border-gray-600 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'} delay-300`}
            >
              Ouvrir l'app
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800">
            <div className="px-6 py-4 space-y-4">
              <button 
                onClick={() => scrollToSection('product')}
                className="block w-full text-left text-gray-300 hover:text-red-400 transition-colors duration-300 font-medium py-2"
              >
                Produit
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="block w-full text-left text-gray-300 hover:text-red-400 transition-colors duration-300 font-medium py-2"
              >
                Prix
              </button>
              <button 
                onClick={() => scrollToSection('reviews')}
                className="block w-full text-left text-gray-300 hover:text-red-400 transition-colors duration-300 font-medium py-2"
              >
                Avis
              </button>
              {!user ? (
  <LoginButton />
) : (
  <button 
    onClick={onNavigate}
    className="w-full bg-[#181820] hover:bg-[#23232b] text-white px-6 py-3 rounded-xl font-medium transition-all duration-300"
  >
    Ouvrir l'app
  </button>
)}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div id="product" className="relative px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Main content */}
          <div className="text-center mb-16">
            <h1 className={`text-5xl md:text-7xl font-bold text-white mb-6 transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              L'Apex du <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Resell</span>
            </h1>
            
            <p className={`text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              Votre partenaire idéal pour exploser<br />
              votre business d'achat-revente Vinted.
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-20 transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="group bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 transform hover:shadow-2xl hover:shadow-red-500/25"
              >
                Découvrir
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              {!user ? (
                <LoginButton />
              ) : (
                <button 
                  onClick={onNavigate}
                  className="bg-[#181820] hover:bg-[#23232b] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 transform border border-gray-700 hover:border-gray-600"
                >
                  Ouvrir l'app
                </button>
              )}
            </div>
          </div>

          {/* Main Layout with iPhone and Cards */}
          <div className="relative flex justify-center items-center min-h-[600px]">
            {/* Left side cards */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 space-y-6 z-10">
              {/* Ce mois-ci card */}
              <div className={`transition-all duration-1000 delay-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
                <div className="bg-gradient-to-r from-green-400 to-green-500 p-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 transform min-w-[200px]">
                  <div className="flex items-center space-x-2 text-black mb-2">
                    <TrendingUp className="w-5 h-5" />
                    <span className="font-semibold">Ce mois-ci</span>
                  </div>
                  <div className="text-3xl font-bold text-black">
                    +{currentEarning.toLocaleString()}€
                  </div>
                </div>
              </div>

              {/* Feature cards */}
              <div className={`space-y-4 transition-all duration-1000 delay-1200 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
                <div className="bg-[#181820]/90 backdrop-blur-sm border border-gray-700 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform">
                  <div className="flex items-center space-x-3 text-white">
                    <Star className="w-5 h-5 text-red-400" />
                    <span className="font-medium">Autobuy instantané</span>
                  </div>
                </div>
                
                <div className="bg-[#181820]/90 backdrop-blur-sm border border-gray-700 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform">
                  <div className="flex items-center space-x-3 text-white">
                    <Shield className="w-5 h-5 text-red-400" />
                    <span className="font-medium">Trust score</span>
                  </div>
                </div>
                
                <div className="bg-[#181820]/90 backdrop-blur-sm border border-gray-700 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform">
                  <div className="flex items-center space-x-3 text-white">
                    <Zap className="w-5 h-5 text-red-400" />
                    <div>
                      <div className="font-medium text-sm">Bientôt</div>
                      <div className="text-xs text-gray-400">Republication automatique des annonces</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Central iPhone Mockup */}
            <div className={`relative z-20 transition-all duration-1000 delay-600 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
              <div className="relative">
                {/* iPhone Frame */}
                <div className="w-80 h-[650px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-3 shadow-2xl border border-gray-700">
                  {/* Screen */}
                  <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
                    {/* Status bar */}
                    <div className="flex justify-between items-center px-6 py-3 text-white text-sm">
                      <span className="font-medium">9:41</span>
                      <div className="flex items-center space-x-1">
                        <div className="flex space-x-1">
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                        </div>
                        <div className="w-6 h-3 border border-white rounded-sm">
                          <div className="w-4 h-2 bg-white rounded-sm m-0.5"></div>
                        </div>
                      </div>
                    </div>

                    {/* App content - Feed style */}
                    <div className="px-4 space-y-3 overflow-y-auto h-full pb-20">
                      {/* Nike Product Card */}
                      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-3 shadow-lg">
                        <div className="flex space-x-3">
                          {/* Product Image */}
                          <div className="relative">
                            <img 
                              src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop" 
                              alt="Nike Sneakers"
                              className="w-14 h-14 rounded-lg object-cover"
                            />
                            <div className="absolute -top-1 -left-1">
                              <span className="bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
                                Neuf sans étiquette
                              </span>
                            </div>
                          </div>

                          {/* Product Info */}
                          <div className="flex-1">
                            <div className="text-white font-semibold text-xs mb-1">Nike Air Max - S</div>
                            <div className="flex items-center mb-1">
                              <span className="text-gray-400 text-xs mr-2">sneakerhead</span>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="w-2 h-2 text-yellow-400 fill-current" />
                                ))}
                                <span className="text-gray-400 text-xs ml-1">(12)</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2 mb-1">
                              <div className="text-white font-bold text-sm">28€</div>
                              <div className="text-gray-400 line-through text-xs">(100€)</div>
                              <div className="bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded text-xs font-medium">
                                -72%
                              </div>
                            </div>
                            
                            <div className="text-gray-400 text-xs mb-2">il y a 2 minutes</div>
                            
                            <div className="flex space-x-2">
                              <button className="bg-red-600 hover:bg-red-700 text-white px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-300">
                                Détails
                              </button>
                              <button className="bg-[#181820] hover:bg-[#23232b] text-white px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-300">
                                Vendu
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Dior Product Card */}
                      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-3 shadow-lg">
                        <div className="flex space-x-3">
                          {/* Product Image */}
                          <div className="relative">
                            <img 
                              src="https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop" 
                              alt="Designer Bag"
                              className="w-14 h-14 rounded-lg object-cover"
                            />
                            <div className="absolute -top-1 -left-1">
                              <span className="bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
                                Neuf avec étiquette
                              </span>
                            </div>
                          </div>

                          {/* Product Info */}
                          <div className="flex-1">
                            <div className="text-white font-semibold text-xs mb-1">Dior - Sac à main</div>
                            <div className="flex items-center mb-1">
                              <span className="text-gray-400 text-xs mr-2">luxuryfashion</span>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="w-2 h-2 text-yellow-400 fill-current" />
                                ))}
                                <span className="text-gray-400 text-xs ml-1">(3)</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2 mb-1">
                              <div className="text-white font-bold text-sm">32€</div>
                              <div className="text-gray-400 line-through text-xs">(135€)</div>
                              <div className="bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded text-xs font-medium">
                                -76%
                              </div>
                            </div>
                            
                            <div className="text-gray-400 text-xs mb-2">il y a 1 minute</div>
                            
                            <div className="flex space-x-2">
                              <button className="bg-red-600 hover:bg-red-700 text-white px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-300">
                                Détails
                              </button>
                              <button className="bg-[#181820] hover:bg-[#23232b] text-white px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-300">
                                Vendu
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Ralph Lauren Product Card */}
                      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-3 shadow-lg">
                        <div className="flex space-x-3">
                          {/* Product Image */}
                          <div className="relative">
                            <img 
                              src="https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop" 
                              alt="Ralph Lauren Sweater"
                              className="w-14 h-14 rounded-lg object-cover"
                            />
                            <div className="absolute -top-1 -left-1">
                              <span className="bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
                                Très bon état
                              </span>
                            </div>
                          </div>

                          {/* Product Info */}
                          <div className="flex-1">
                            <div className="text-white font-semibold text-xs mb-1">Ralph Lauren - Pull</div>
                            <div className="flex items-center mb-1">
                              <span className="text-gray-400 text-xs mr-2">vintagestyle</span>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="w-2 h-2 text-yellow-400 fill-current" />
                                ))}
                                <span className="text-gray-400 text-xs ml-1">(8)</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2 mb-1">
                              <div className="text-white font-bold text-sm">15€</div>
                              <div className="text-gray-400 line-through text-xs">(65€)</div>
                              <div className="bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded text-xs font-medium">
                                -77%
                              </div>
                            </div>
                            
                            <div className="text-gray-400 text-xs mb-2">il y a 5 minutes</div>
                            
                            <div className="flex space-x-2">
                              <button className="bg-red-600 hover:bg-red-700 text-white px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-300">
                                Détails
                              </button>
                              <button className="bg-[#181820] hover:bg-[#23232b] text-white px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-300">
                                Vendu
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side cards */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 space-y-4 z-10">
              {/* Notification cards */}
              <div className={`space-y-4 transition-all duration-1000 delay-1400 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform min-w-[280px]">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                      <span className="text-lg">👟</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-black">Nouvel article trouvé</div>
                      <div className="text-xs text-gray-800">Jogging Nike</div>
                    </div>
                    <span className="text-xs bg-black/20 px-2 py-1 rounded text-black font-medium">maintenant</span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-pink-400 to-red-500 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                      <span className="text-lg">👕</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-black">Nouvel article trouvé</div>
                      <div className="text-xs text-gray-800">Chemise Ralph Lauren</div>
                    </div>
                    <span className="text-xs bg-black/20 px-2 py-1 rounded text-black font-medium">maintenant</span>
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className={`transition-all duration-1000 delay-1600 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
                <button 
                  onClick={onNavigate}
                  className="group bg-[#181820]/90 backdrop-blur-sm border border-gray-700 hover:border-red-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 transform hover:shadow-lg"
                >
                  Mes annonces
                  <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="relative px-6 py-20 bg-gray-900/50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Choisissez le plan qui correspond à vos besoins
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16 items-stretch">
            {/* Plan Free */}
            <div className="bg-gradient-to-br from-red-700 to-red-900 rounded-2xl p-8 text-white relative transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">VinTrack</h3>
                <h4 className="text-lg font-semibold mb-4">Free Plan</h4>
                <div className="text-5xl font-bold mb-2">FREE</div>
                <div className="text-sm opacity-80">🔒 Invite to unlock</div>
              </div>
              
              <ul className="space-y-3 text-sm mb-8">
                <li className="flex items-start">
                  <span className="text-red-300 mr-3 mt-0.5">✗</span>
                  <span>Access to AUTOCOP ⚡</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-300 mr-3 mt-0.5">✓</span>
                  <span>Access to the fastest AUTOBUY on the market 🚀</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-300 mr-3 mt-0.5">✓</span>
                  <span>+15 guides (legit check, general tips, beginner guide etc..)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-300 mr-3 mt-0.5">✗</span>
                  <span>+50 ultra fast sneakers, random resell and Shopify monitors</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-300 mr-3 mt-0.5">✗</span>
                  <span>Random resell guides (alcohol, watches,etc..)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-300 mr-3 mt-0.5">✗</span>
                  <span>Weekly profitable niches analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-300 mr-3 mt-0.5">✓</span>
                  <span>A strong, close-knit community, with ongoing support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-300 mr-3 mt-0.5">✓</span>
                  <span>24/7 active staff</span>
                </li>
              </ul>
              
              <button className="w-full bg-red-800/50 hover:bg-red-800/70 text-white py-3 rounded-xl font-medium transition-all duration-300">
                Commencer Gratuitement
              </button>
            </div>
            
            {/* Plan AutoBuy */}
            <div className="bg-gradient-to-br from-red-700 to-red-900 rounded-2xl p-8 text-white relative transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                POPULAIRE
              </div>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">VinTrack</h3>
                <h4 className="text-lg font-semibold mb-4">AutoBuy 🚀</h4>
                <div className="text-5xl font-bold mb-2">£24.99</div>
                <div className="text-sm opacity-80">/month</div>
              </div>
              
              <ul className="space-y-3 text-sm mb-8">
                <li className="flex items-start">
                  <span className="text-red-300 mr-3 mt-0.5">✗</span>
                  <span>Access to AUTOCOP ⚡</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-300 mr-3 mt-0.5">✓</span>
                  <span>Access to the fastest AUTOBUY on the market 🚀</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-300 mr-3 mt-0.5">✓</span>
                  <span>+15 guides (legit check, general tips, beginner guide etc..)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-300 mr-3 mt-0.5">✓</span>
                  <span>+50 ultra fast sneakers, random resell and Shopify monitors</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-300 mr-3 mt-0.5">✓</span>
                  <span>Random resell guides (alcohol, watches,etc..)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-300 mr-3 mt-0.5">✓</span>
                  <span>Weekly profitable niches analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-300 mr-3 mt-0.5">✓</span>
                  <span>A strong, close-knit community, with ongoing support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-300 mr-3 mt-0.5">✓</span>
                  <span>24/7 active staff</span>
                </li>
              </ul>
              
              <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 rounded-xl font-bold transition-all duration-300">
                Choisir AutoBuy
              </button>
            </div>

            {/* Plan AutoCop - Populaire */}
            <div className="bg-gradient-to-br from-red-700 to-red-900 rounded-2xl p-8 text-white relative transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
             
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">VinTrack</h3>
                <h4 className="text-lg font-semibold mb-4">AutoCop ⚡</h4>
                <div className="text-5xl font-bold mb-2">£34.99</div>
                <div className="text-sm opacity-80">/month</div>
              </div>
              
              <ul className="space-y-3 text-sm mb-8">
                <li className="flex items-start">
                  <span className="text-green-300 mr-3 mt-0.5">✓</span>
                  <span>Access to AUTOCOP ⚡</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-300 mr-3 mt-0.5">✓</span>
                  <span>Access to the fastest AUTOBUY on the market 🚀</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-300 mr-3 mt-0.5">✓</span>
                  <span>+15 guides (legit check, general tips, beginner guide etc..)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-300 mr-3 mt-0.5">✓</span>
                  <span>+50 ultra fast sneakers, random resell and Shopify monitors</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-300 mr-3 mt-0.5">✓</span>
                  <span>Random resell guides (alcohol, watches,etc..)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-300 mr-3 mt-0.5">✓</span>
                  <span>Weekly profitable niches analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-300 mr-3 mt-0.5">✓</span>
                  <span>A strong, close-knit community, with ongoing support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-300 mr-3 mt-0.5">✓</span>
                  <span>24/7 active staff</span>
                </li>
              </ul>

              <button className="w-full bg-red-800/50 hover:bg-red-800/70 text-white py-3 rounded-xl font-medium transition-all duration-300">
              
                Choisir AutoCop
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div id="reviews" className="relative px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
            Ce que disent nos <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">utilisateurs</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                name: "Alexandre M.", 
                text: "VinTrack a révolutionné mon business ! +3000€ en 2 mois grâce à l'autobuy.", 
                rating: 5,
                avatar: "A",
                role: "Revendeur Pro"
              },
              { 
                name: "Sophie L.", 
                text: "L'autobuy est incroyable, je trouve des pépites en permanence. Interface très intuitive.", 
                rating: 5,
                avatar: "S",
                role: "Débutante"
              },
              { 
                name: "Thomas R.", 
                text: "Interface intuitive et résultats au rendez-vous. Le support Discord est top !", 
                rating: 5,
                avatar: "T",
                role: "Expert Vinted"
              }
            ].map((review, index) => (
              <div key={index} className="bg-[#181820]/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-red-500/50 transition-all duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{review.text}"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">{review.avatar}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">{review.name}</div>
                    <div className="text-gray-400 text-sm">{review.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="relative px-6 py-20 bg-gradient-to-r from-red-500/10 to-red-600/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Prêt à <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">dominer</span> Vinted ?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Rejoignez des milliers d'utilisateurs qui font déjà confiance à VinTrack
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => scrollToSection('pricing')}
              className="group bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 transform hover:shadow-2xl hover:shadow-red-500/25"
            >
              Commencer maintenant
              <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button 
              onClick={onNavigate}
              className="bg-[#181820] hover:bg-[#23232b] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 transform border border-gray-700 hover:border-gray-600"
            >
              Essayer gratuitement
            </button>
          </div>
        </div>
      </div>

      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-10 opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-red-500/15 to-red-600/15 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-red-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;