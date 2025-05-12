import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SideBar = ({ isCollapsed, toggleSidebar }) => {
  const [expandedMenus, setExpandedMenus] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Tableau de bord',
      icon: 'fas fa-home',
      link: '/dashboard'
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: 'fas fa-file-invoice',
      hasSubmenu: true,
      submenu: [
        { id: 'factures', label: 'Factures', icon: 'fas fa-file-invoice-dollar', link: '/dashboard/documents/factures' },
        { id: 'bons-commande', label: 'Bons de commande', icon: 'fas fa-file-alt', link: '/dashboard/documents/bons-de-commande' },
        { id: 'bons-livraison', label: 'Bons de livraison', icon: 'fas fa-truck', link: '/dashboard/documents/bons-de-livraison' },
        { id: 'recus', label: 'Reçus', icon: 'fas fa-receipt', link: '/dashboard/documents/recus' },
        { id: 'pieces-identite', label: "Pièces d'identité", icon: 'fas fa-id-card', link: '/dashboard/documents/pieces-identite' }
      ]
    },
    {
      id: 'comptabilite',
      label: 'Comptabilité',
      icon: 'fas fa-calculator',
      hasSubmenu: true,
      submenu: [
        { id: 'plan-ohada', label: 'Plan comptable OHADA', icon: 'fas fa-book', link: '/dashboard/comptabilite/plan-comptable-ohada' },
        { id: 'plan-interne', label: 'Plan comptable interne', icon: 'fas fa-book-open', link: '/dashboard/comptabilite/plan-comptable-interne' },
        { id: 'rapprochement', label: 'Rapprochement bancaire', icon: 'fas fa-exchange-alt', link: '/dashboard/comptabilite/rapprochement-bancaire' }
      ]
    },
    {
      id: 'rapports',
      label: 'Rapports',
      icon: 'fas fa-chart-line',
      link: '/dashboard/rapports'
    },
    {
      id: 'parametres',
      label: 'Paramètres',
      icon: 'fas fa-cog',
      link: '/dashboard/parametres'
    }
  ];

  // Toggle submenu expansion
  const toggleSubmenu = (menuId) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  // Classes utilitaires
  const activeMenuClass = 'bg-indigo-600 text-white';
  const inactiveMenuClass = 'text-gray-700 hover:bg-indigo-50';
  const expandedMenuClass = 'bg-indigo-100';

  return (
    <div className={`bg-white shadow-md flex flex-col h-screen ${isCollapsed ? 'w-20' : 'w-72'} transition-all duration-300`}>
      {/* Logo et Toggler */}
      <div className="p-4 flex items-center justify-between border-b">
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-10 w-16 rounded-full" />
          {!isCollapsed && <span className="ml-3 font-bold text-3xl text-indigo-600">VisionX</span>}
        </div>
        <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-700">
          <i className="fas fa-bars"></i>
        </button>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b flex items-center">
        <img src="/user.avif" alt="User" className="h-10 w-10 rounded-full" />
        {!isCollapsed && (
          <div className="ml-3">
            <p className="font-medium">John Doe</p>
            <p className="text-xs text-gray-500">Expert Comptable</p>
          </div>
        )}
      </div>

      {/* Menu principal */}
      <div className="flex-1 overflow-y-auto p-2">
        {menuItems.map((item) => (
          <div key={item.id} className="mb-2">
            {/* Menu principal */}
            {item.hasSubmenu ? (
              <button
                onClick={() => toggleSubmenu(item.id)}
                className={`w-full flex items-center p-2 rounded-lg group transition-all duration-200 ${
                  expandedMenus[item.id] ? expandedMenuClass : inactiveMenuClass
                }`}
              >
                <i className={`${item.icon} text-indigo-600`}></i>
                {!isCollapsed && <span className="ml-3">{item.label}</span>}
                {!isCollapsed && (
                  <i
                    className={`fas fa-chevron-down text-xs ml-auto transform transition-transform ${
                      expandedMenus[item.id] ? 'rotate-180' : ''
                    }`}
                  ></i>
                )}
              </button>
            ) : (
              <button
                onClick={() => navigate(item.link)}
                className={`w-full flex items-center p-2 rounded-lg group transition-all duration-200 ${
                  location.pathname === item.link ? activeMenuClass : inactiveMenuClass
                }`}
              >
                <i className={`${item.icon} ${location.pathname === item.link ? 'text-white' : 'text-indigo-600'}`}></i>
                {!isCollapsed && <span className="ml-3">{item.label}</span>}
              </button>
            )}

            {/* Sous-menu */}
            {item.hasSubmenu && expandedMenus[item.id] && !isCollapsed && (
              <div className="ml-8 mt-1 space-y-1">
                {item.submenu.map((subItem) => (
                  <button
                    key={subItem.id}
                    onClick={() => navigate(subItem.link)}
                    className={`w-full flex items-center p-2 text-sm rounded-lg group transition-all duration-200 ${
                      location.pathname === subItem.link ? activeMenuClass : 'text-gray-600 hover:bg-indigo-50'
                    }`}
                  >
                    <i className={`${subItem.icon} ${location.pathname === subItem.link ? 'text-white' : 'text-indigo-400'}`}></i>
                    <span className="ml-3">{subItem.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bouton Réduire */}
      <div className="p-4 border-t">
        <button onClick={toggleSidebar} className="w-full flex items-center p-2 text-gray-700 rounded-lg hover:bg-indigo-50 group">
          <i className={`fas ${isCollapsed ? 'fa-expand' : 'fa-compress'} text-indigo-600`}></i>
          {!isCollapsed && <span className="ml-3">Réduire le menu</span>}
        </button>
      </div>
    </div>
  );
};

export default SideBar;