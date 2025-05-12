import React, { useState } from 'react';
import ContentRouter from '../ContentRouter';
import { useLocation } from 'react-router-dom';
import Sidebar from '../SideBar';

const Main = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex h-screen">
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      
      <div className={`flex flex-col transition-all duration-300 ${isCollapsed ? 'ml-20' : ''} flex-1`}>
        {/* Header */}
        <header className="bg-white p-4 border-b border-gray-200 flex items-center justify-between">
          <h1 className="text-lg font-medium">
            {location.pathname === '/dashboard' ? 'Tableau de bord' : 
             location.pathname === '/dashboard/documents/factures' ? 'Factures' :
             location.pathname === '/dashboard/documents/bons-de-commande' ? 'Bons de commande' :
             location.pathname === '/dashboard/documents/bons-de-livraison' ? 'Bons de livraison' :
             location.pathname === '/dashboard/documents/recus' ? 'Reçus' :
             location.pathname === '/dashboard/documents/pieces-identite' ? "Pièces d'identité" :
             location.pathname === '/dashboard/comptabilite/plan-comptable-ohada' ? 'Plan comptable OHADA' :
             location.pathname === '/dashboard/comptabilite/plan-comptable-interne' ? 'Plan comptable interne' :
             location.pathname === '/dashboard/comptabilite/rapprochement-bancaire' ? 'Rapprochement bancaire' :
             location.pathname === '/dashboard/rapports' ? 'Rapports' :
             location.pathname === '/dashboard/parametres' ? 'Paramètres' : 'Page'}
          </h1>
          
          <div className="flex items-center">
            {/* Notifications */}
            <button className="p-2 text-gray-500 relative mr-4">
              {/* Cloche */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Email */}
            <button className="p-2 text-gray-500 relative mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
            </button>

            {/* User profile */}
            <div className="flex items-center cursor-pointer">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-2">
                <span className="text-xs text-gray-500">JD</span>
              </div>
              <span className="mr-1">John Doe</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </header>

        {/* Content principal */}
        <ContentRouter />
      </div>
    </div>
  );
};

export default Main;
