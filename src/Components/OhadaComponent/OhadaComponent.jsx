import { useState } from 'react';
import { ChevronDown, ChevronRight, Search } from 'lucide-react';

export default function OhadaComponent() {
  const [expandedClasses, setExpandedClasses] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  // Données du plan comptable OHADA
  const comptesOHADA = [
    {
      classe: "CLASSE 1",
      titre: "COMPTES DE RESSOURCES DURABLES",
      comptes: [
        { code: "10", libelle: "Capital" },
        { code: "11", libelle: "Réserves" },
        { code: "12", libelle: "Report à nouveau" },
        { code: "13", libelle: "Résultat net de l'exercice" },
        { code: "14", libelle: "Subventions d'investissement" },
        { code: "15", libelle: "Provisions réglementées et fonds assimilés" },
        { code: "16", libelle: "Emprunts et dettes assimilées" },
        { code: "17", libelle: "Dettes de crédit-bail et contrats assimilés" },
        { code: "18", libelle: "Dettes liées à des participations et comptes de liaison des établissements et sociétés en participation" },
        { code: "19", libelle: "Provisions pour risques et charges" }
      ]
    },
    {
      classe: "CLASSE 2",
      titre: "COMPTES D'ACTIF IMMOBILISÉ",
      comptes: [
        { code: "20", libelle: "Charges immobilisées" },
        { code: "21", libelle: "Immobilisations incorporelles" },
        { code: "22", libelle: "Terrains" },
        { code: "23", libelle: "Bâtiments, installations techniques et agencements" },
        { code: "24", libelle: "Matériel" },
        { code: "25", libelle: "Avances et acomptes versés sur immobilisations" },
        { code: "26", libelle: "Titres de participation" },
        { code: "27", libelle: "Autres immobilisations financières" },
        { code: "28", libelle: "Amortissements" },
        { code: "29", libelle: "Provisions pour dépréciation" }
      ]
    },
    {
      classe: "CLASSE 3",
      titre: "COMPTES DE STOCKS",
      comptes: [
        { code: "31", libelle: "Marchandises" },
        { code: "32", libelle: "Matières premières et fournitures liées" },
        { code: "33", libelle: "Autres approvisionnements" },
        { code: "34", libelle: "Produits en cours" },
        { code: "35", libelle: "Services en cours" },
        { code: "36", libelle: "Produits finis" },
        { code: "37", libelle: "Produits intermédiaires et résiduels" },
        { code: "38", libelle: "Stocks en cours de route, en consignation ou en dépôt" },
        { code: "39", libelle: "Dépréciations des stocks" }
      ]
    },
    {
      classe: "CLASSE 4",
      titre: "COMPTES DE TIERS",
      comptes: [
        { code: "40", libelle: "Fournisseurs et comptes rattachés" },
        { code: "41", libelle: "Clients et comptes rattachés" },
        { code: "42", libelle: "Personnel" },
        { code: "43", libelle: "Organismes sociaux" },
        { code: "44", libelle: "État et collectivités publiques" },
        { code: "45", libelle: "Organismes internationaux" },
        { code: "46", libelle: "Associés et groupe" },
        { code: "47", libelle: "Débiteurs et créditeurs divers" },
        { code: "48", libelle: "Créances et dettes hors activités ordinaires (HAO)" },
        { code: "49", libelle: "Dépréciations et provisions pour risques à court terme" }
      ]
    },
    {
      classe: "CLASSE 5",
      titre: "COMPTES DE TRÉSORERIE",
      comptes: [
        { code: "50", libelle: "Titres de placement" },
        { code: "51", libelle: "Valeurs à encaisser" },
        { code: "52", libelle: "Banques" },
        { code: "53", libelle: "Établissements financiers et assimilés" },
        { code: "54", libelle: "Instruments de trésorerie" },
        { code: "55", libelle: "Caisse" },
        { code: "57", libelle: "Régies d'avances, accréditifs et virements internes" },
        { code: "58", libelle: "Virements internes" },
        { code: "59", libelle: "Dépréciations et provisions pour risques à court terme" }
      ]
    },
    {
      classe: "CLASSE 6",
      titre: "COMPTES DE CHARGES",
      comptes: [
        { code: "60", libelle: "Achats et variations de stocks" },
        { code: "61", libelle: "Transports" },
        { code: "62", libelle: "Services extérieurs A" },
        { code: "63", libelle: "Services extérieurs B" },
        { code: "64", libelle: "Impôts et taxes" },
        { code: "65", libelle: "Autres charges" },
        { code: "66", libelle: "Charges de personnel" },
        { code: "67", libelle: "Frais financiers et charges assimilées" },
        { code: "68", libelle: "Dotations aux amortissements, aux provisions et aux dépréciations" },
        { code: "69", libelle: "Charges hors activités ordinaires (HAO)" }
      ]
    },
    {
      classe: "CLASSE 7",
      titre: "COMPTES DE PRODUITS",
      comptes: [
        { code: "70", libelle: "Ventes" },
        { code: "71", libelle: "Variations de stocks de produits et en-cours" },
        { code: "72", libelle: "Production immobilisée" },
        { code: "73", libelle: "Variations des stocks de produits fabriqués et des en-cours" },
        { code: "74", libelle: "Subventions d'exploitation" },
        { code: "75", libelle: "Autres produits" },
        { code: "76", libelle: "Transferts de charges" },
        { code: "77", libelle: "Revenus financiers et produits assimilés" },
        { code: "78", libelle: "Transferts de charges" },
        { code: "79", libelle: "Reprises de provisions, de dépréciations et autres" }
      ]
    }
  ];

  // Filtrer les comptes en fonction du terme de recherche
  const filteredComptes = searchTerm 
    ? comptesOHADA.map(classe => ({
        ...classe,
        comptes: classe.comptes.filter(compte => 
          compte.code.includes(searchTerm) || 
          compte.libelle.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(classe => classe.comptes.length > 0)
    : comptesOHADA;

  // Fonction pour inverser l'état d'expansion d'une classe
  const toggleClass = (classe) => {
    setExpandedClasses(prev => ({
      ...prev,
      [classe]: !prev[classe]
    }));
  };

  return (
    <div className="bg-white min-h-screen p-6 md:p-10 text-gray-800">
      {/* Barre de recherche */}
      <div className="max-w-xl mx-auto relative mb-10">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-blue-400" />
        </div>
        <input
          type="text"
          className="w-full pl-10 pr-4 py-3 rounded-xl shadow-md border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          placeholder="🔍 Rechercher un code ou un libellé de compte..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Affichage du plan comptable */}
      <div className="space-y-6 max-w-5xl mx-auto">
        {filteredComptes.map((classeItem) => (
          <div key={classeItem.classe} className="rounded-2xl border border-blue-200 shadow hover:shadow-md transition-all duration-300 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-50 to-white p-5 flex items-center justify-between cursor-pointer"
              onClick={() => toggleClass(classeItem.classe)}
            >
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-blue-900">{classeItem.classe}</h2>
                <p className="text-sm text-blue-600">{classeItem.titre}</p>
              </div>
              {expandedClasses[classeItem.classe] ? (
                <ChevronDown className="h-6 w-6 text-blue-800" />
              ) : (
                <ChevronRight className="h-6 w-6 text-blue-800" />
              )}
            </div>

            {expandedClasses[classeItem.classe] && (
              <div className="p-4 animate-fadeIn">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-blue-100 text-blue-800">
                      <th className="px-4 py-2 text-left font-semibold w-1/6 rounded-tl-lg">Code</th>
                      <th className="px-4 py-2 text-left font-semibold rounded-tr-lg">Libellé</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classeItem.comptes.map((compte, index) => (
                      <tr 
                        key={compte.code} 
                        className={`border-b border-blue-100 hover:bg-blue-50 transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-blue-50/20"
                        }`}
                      >
                        <td className="px-4 py-3 text-blue-900 font-medium">{compte.code}</td>
                        <td className="px-4 py-3">{compte.libelle}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Aucun résultat */}
      {filteredComptes.length === 0 && (
        <div className="text-center py-16">
          <p className="text-blue-600 text-lg font-medium">Aucun résultat trouvé pour "{searchTerm}"</p>
        </div>
      )}

      <footer className="mt-16 text-center text-sm text-blue-500">
        Plan Comptable OHADA – Organisation pour l'Harmonisation en Afrique du Droit des Affaires
      </footer>
    </div>
  );
}