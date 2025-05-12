import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../../Pages/Main/Home';
import FileUploadAnalyzer from '../FileUploadAnalyzer';

// Placeholder components for other routes
const Factures = () => <div>Page Factures</div>;
const BonsDeCommande = () => <div>Page Bons de commande</div>;
const BonsLivraison = () => <div>Page Bons de livraison</div>;
const Recus = () => <div>Page Reçus</div>;
const PiecesIdentite = () => <div>Page Pièces d'identité</div>;
const PlanComptableOHADA = () => <div>Page Plan comptable OHADA</div>;
const PlanComptableInterne = () => <div>Page Plan comptable interne</div>;
const RapprochementBancaire = () => <div>Page Rapprochement bancaire</div>;
const Rapports = () => <div>Page Rapports</div>;
const Parametres = () => <div>Page Paramètres</div>;

function ContentRouter() {
  return (
    <div className="content-container flex-1 bg-gray-50 overflow-auto">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/documents/factures" element={<FileUploadAnalyzer />} />
        <Route path="/documents/bons-de-commande" element={<FileUploadAnalyzer />} />
        <Route path="/documents/bons-de-livraison" element={<FileUploadAnalyzer />} />
        <Route path="/documents/recus" element={<FileUploadAnalyzer />} />
        <Route path="/documents/pieces-identite" element={<FileUploadAnalyzer />} />
        <Route path="/comptabilite/plan-comptable-ohada" element={<PlanComptableOHADA />} />
        <Route path="/comptabilite/plan-comptable-interne" element={<PlanComptableInterne />} />
        <Route path="/comptabilite/rapprochement-bancaire" element={<RapprochementBancaire />} />
        <Route path="/rapports" element={<Rapports />} />
        <Route path="/parametres" element={<Parametres />} />
      </Routes>
    </div>
  );
}

export default ContentRouter;