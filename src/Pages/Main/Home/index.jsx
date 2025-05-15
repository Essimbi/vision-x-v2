import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';

const Home = () => {
  const [timeRangeCharts, setTimeRangeCharts] = useState('7 derniers jours');
  const [timeRangeDistribution, setTimeRangeDistribution] = useState('Ce mois');

  const COLORS = ['#6366F1', '#22C55E', '#F97316', '#EF4444'];

  const documentTraitesParJour = [
    { date: 'Lun', nombre: 150 },
    { date: 'Mar', nombre: 200 },
    { date: 'Mer', nombre: 180 },
    { date: 'Jeu', nombre: 220 },
    { date: 'Ven', nombre: 170 },
    { date: 'Sam', nombre: 100 },
    { date: 'Dim', nombre: 128 },
  ];

  const repartitionParType = [
    { type: 'Facture', value: 45 },
    { type: 'Bon de commande', value: 25 },
    { type: 'Bon de livraison', value: 20 },
    { type: 'Reçu', value: 10 },
  ];



  // Sample data for recent documents
  const recentDocuments = [
    { type: 'Facture', numero: 'FAC-2023-00125', client: 'SARL ABC Technologies', montant: '1,250,000 FCFA', statut: 'Payé' },
    { type: 'Bon de commande', numero: 'BC-2023-00478', client: 'XYZ Industries', montant: '3,450,000 FCFA', statut: 'En attente' },
    { type: 'Bon de livraison', numero: 'BL-2023-00321', client: 'Global Logistics', montant: '750,000 FCFA', statut: 'Livré' },
    { type: 'Reçu', numero: 'RC-2023-00987', client: 'Client Divers', montant: '125,000 FCFA', statut: 'Payé' },
    { type: 'Facture', numero: 'FAC-2023-00126', client: 'SARL DEF Services', montant: '2,150,000 FCFA', statut: 'Impayé' }
  ];

  // Sample data for recent activity
  const recentActivity = [
    { 
      user: 'Marie Dupont', 
      action: 'A traité la facture FAC-2023-00125', 
      time: 'il y a 15 minutes', 
      avatar: 'MD' 
    },
    { 
      user: 'Jean Martin', 
      action: 'A ajouté un nouveau client: SARL GHI Solutions', 
      time: 'il y a 1 heure', 
      avatar: 'JM' 
    },
    { 
      user: 'Système', 
      action: 'Nouvelle facture importée automatiquement: FAC-2023-00126', 
      time: 'il y a 2 heures', 
      avatar: 'S' 
    },
    { 
      user: 'Pierre Lambert', 
      action: 'A validé le rapprochement bancaire du 15/06/2023', 
      time: 'il y a 3 heures', 
      avatar: 'PL' 
    },
    { 
      user: 'Système', 
      action: 'Rapport mensuel généré automatiquement', 
      time: 'il y a 5 heures', 
      avatar: 'S' 
    }
  ];

  useEffect(() => {
    AOS.init({
      duration: 1500, 
      once: true, 
      disable: 'mobile' // Désactive les animations sur mobile pour de meilleures performances
    });
  }, []);

  // Status icon mapping
  const getStatusIcon = (statut) => {
    switch(statut) {
      case 'Payé':
        return <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Payé</div>;
      case 'En attente':
        return <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">En attente</div>;
      case 'Livré':
        return <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Livré</div>;
      case 'Impayé':
        return <div className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Impayé</div>;
      default:
        return <div className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">{statut}</div>;
    }
  };

  // Document type icon mapping
  const getDocumentIcon = (type) => {
    switch(type) {
      case 'Facture':
        return (
          <div className="w-5 h-5 mr-2 flex items-center justify-center bg-blue-100 text-blue-600 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'Bon de commande':
        return (
          <div className="w-5 h-5 mr-2 flex items-center justify-center bg-blue-100 text-blue-600 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
          </div>
        );
      case 'Bon de livraison':
        return (
          <div className="w-5 h-5 mr-2 flex items-center justify-center bg-purple-100 text-purple-600 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7h4a1 1 0 011 1v6h-2.05a2.5 2.5 0 01-4.9 0H12V8a1 1 0 011-1z" />
            </svg>
          </div>
        );
      case 'Reçu':
        return (
          <div className="w-5 h-5 mr-2 flex items-center justify-center bg-red-100 text-red-600 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 9H10a3 3 0 013 3v1a1 1 0 102 0v-1a5 5 0 00-5-5H8.414l1.293-1.293z" clipRule="evenodd" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-5 h-5 mr-2 flex items-center justify-center bg-gray-100 text-gray-600 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="p-3 md:p-6 h-full overflow-auto">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6">
        {/* Documents Traités */}
        <div
          className="bg-white rounded-lg shadow p-4 md:p-6 flex justify-between items-center transition-transform transform hover:scale-105 hover:shadow-lg"
          data-aos="fade-up"
        >
          <div>
            <h6 className="text-xs md:text-sm text-gray-500 mb-1">Documents traités</h6>
            <div className="flex items-baseline">
              <span className="text-xl md:text-2xl font-semibold">1,248</span>
              <span className="ml-2 text-xs text-green-500">+12% ce jour</span>
            </div>
          </div>
          <div className="w-8 h-8 md:w-10 md:h-10 bg-indigo-100 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 md:h-5 md:w-5 text-indigo-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Montant Total */}
        <div
          className="bg-white rounded-lg shadow p-4 md:p-6 flex justify-between items-center transition-transform transform hover:scale-105 hover:shadow-lg"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div>
            <h6 className="text-xs md:text-sm text-gray-500 mb-1">Montant total</h6>
            <div className="flex items-baseline">
              <span className="text-xl md:text-2xl font-semibold">12,450,000</span>
              <span className="ml-2 text-xs text-red-500">-5%</span>
            </div>
          </div>
          <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 md:h-5 md:w-5 text-green-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Taux de Reconnaissance */}
        <div
          className="bg-white rounded-lg shadow p-4 md:p-6 flex justify-between items-center transition-transform transform hover:scale-105 hover:shadow-lg"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <div>
            <h6 className="text-xs md:text-sm text-gray-500 mb-1">Taux de reconnaissance</h6>
            <div className="flex items-baseline">
              <span className="text-xl md:text-2xl font-semibold">98.7%</span>
              <span className="ml-2 text-xs text-green-500">+1.2%</span>
            </div>
          </div>
          <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 md:h-5 md:w-5 text-purple-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
            </svg>
          </div>
        </div>

        {/* Documents en Attente */}
        <div
          className="bg-white rounded-lg shadow p-4 md:p-6 flex justify-between items-center transition-transform transform hover:scale-105 hover:shadow-lg"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <div>
            <h6 className="text-xs md:text-sm text-gray-500 mb-1">Documents en attente</h6>
            <div className="flex items-baseline">
              <span className="text-xl md:text-2xl font-semibold">24</span>
              <span className="ml-2 text-xs text-red-500">+5</span>
            </div>
          </div>
          <div className="w-8 h-8 md:w-10 md:h-10 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 md:h-5 md:w-5 text-yellow-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Documents traités par jour */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6 transition-transform transform hover:scale-105 hover:shadow-lg" data-aos="fade-up">
          <h6 className="text-xs md:text-sm text-gray-500 mb-3">Documents traités (7 derniers jours)</h6>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={documentTraitesParJour}>
              <XAxis dataKey="date" fontSize={10} />
              <YAxis fontSize={10} />
              <Tooltip />
              <Line type="monotone" dataKey="nombre" stroke="#6366F1" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Répartition par type de document */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6 transition-transform transform hover:scale-105 hover:shadow-lg" data-aos="fade-up" data-aos-delay="200">
          <h6 className="text-xs md:text-sm text-gray-500 mb-3">Répartition par type de document</h6>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={repartitionParType}
                dataKey="value"
                nameKey="type"
                cx="50%"
                cy="50%"
                outerRadius={60}
                labelLine={false}
                label={({ type, percent }) => `${type} (${(percent * 100).toFixed(0)}%)`}
              >
                {repartitionParType.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Documents and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Documents */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 md:p-6">
            <h4 className="text-gray-700 font-medium mb-4">Documents récents</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-3 md:px-6 py-3">Type</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-3 md:px-6 py-3">Numéro</th>
                  <th className="hidden md:table-cell text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-3 md:px-6 py-3">Client</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-3 md:px-6 py-3">Montant</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-3 md:px-6 py-3">Statut</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentDocuments.map((doc, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-3 md:px-6 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        {getDocumentIcon(doc.type)}
                        <span className="text-sm text-gray-900 hidden sm:inline">{doc.type}</span>
                      </div>
                    </td>
                    <td className="px-3 md:px-6 py-3 whitespace-nowrap text-xs md:text-sm text-gray-900">{doc.numero}</td>
                    <td className="hidden md:table-cell px-3 md:px-6 py-3 whitespace-nowrap text-xs md:text-sm text-gray-900">{doc.client}</td>
                    <td className="px-3 md:px-6 py-3 whitespace-nowrap text-xs md:text-sm text-gray-900">
                      {doc.montant.replace(' FCFA', '')}
                      <span className="text-xs hidden sm:inline"> FCFA</span>
                    </td>
                    <td className="px-3 md:px-6 py-3 whitespace-nowrap">{getStatusIcon(doc.statut)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="py-2 px-4 flex justify-center md:justify-end">
            <button className="text-indigo-600 text-sm hover:text-indigo-800">
              Voir tous les documents
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 md:p-6">
            <h4 className="text-gray-700 font-medium mb-4">Activité récente</h4>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs text-gray-500">
                      {activity.avatar}
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                    <p className="text-xs md:text-sm text-gray-500">{activity.action}</p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="py-2 px-4 flex justify-center md:justify-end">
            <button className="text-indigo-600 text-sm hover:text-indigo-800">
              Voir toutes les activités
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;