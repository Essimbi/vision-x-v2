import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../../Pages/Main/Home';
import FileUploadAnalyzer from '../FileUploadAnalyzer';
import OhadaComponent from '../OhadaComponent/OhadaComponent';
import PlanComptableInterne from '../PlanComptableInterne/PlanComptableInterne';
import BankReconciliation from '../BankReconciliation/BankReconciliation';
import FactureModule from '../../Pages/Main/Facture/Facture';
import BonCommandeModule from '../../Pages/Main/BonCmd/BonCmd';
import BonLivraisonModule from '../../Pages/Main/BonLivraison/BonLivraison';
import RecuModule from '../../Pages/Main/Recu/RecuModule';

// Placeholder components for other routes
const PlanComptableOHADA = () => <OhadaComponent />;
const PlanComptableInterneFonc = () => <PlanComptableInterne />;
const Rapports = () => <div>Page Rapports</div>;
const Parametres = () => <div>Page Paramètres</div>;

function ContentRouter() {
  return (
    <div className="content-container flex-1 bg-gray-50 overflow-auto">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/documents/factures" element={<FactureModule />} />
        <Route path="/documents/bons-de-commande" element={<BonCommandeModule />} />
        <Route path="/documents/bons-de-livraison" element={<BonLivraisonModule />} />
        <Route path="/documents/recus" element={<RecuModule />} />
        <Route path="/documents/pieces-identite" element={<FileUploadAnalyzer />} />
        <Route path="/comptabilite/plan-comptable-ohada" element={<PlanComptableOHADA />} />
        <Route path="/comptabilite/plan-comptable-interne" element={<PlanComptableInterneFonc />} />
        <Route path="/comptabilite/rapprochement-bancaire" element={<BankReconciliation />} />
        <Route path="/rapports" element={<Rapports />} />
        <Route path="/parametres" element={<Parametres />} />
      </Routes>
    </div>
  );
}

export default ContentRouter;