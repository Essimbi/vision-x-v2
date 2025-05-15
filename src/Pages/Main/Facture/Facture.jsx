import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import {
  Search,
  Plus,
  Upload,
  X,
  Trash2,
  RotateCcw,
  DownloadCloud,
  FileText
} from 'lucide-react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import FileUploadAnalyzer from '../../../Components/FileUploadAnalyzer';

const fakeInvoices = [
  { id: 1, numero: 'FAC-2025-0001', client: 'SARL ABC', montant: 1250000, statut: 'Payé', date: '2025-05-10' },
  { id: 2, numero: 'FAC-2025-0002', client: 'XYZ Industries', montant: 3450000, statut: 'En attente', date: '2025-05-05' },
  { id: 3, numero: 'FAC-2025-0003', client: 'Global Logistics', montant: 750000, statut: 'Livré', date: '2025-04-28' },
  { id: 4, numero: 'FAC-2025-0004', client: 'DEF Services', montant: 2150000, statut: 'Impayé', date: '2025-05-02' },
  // ... plus de factures pour la pagination
];

const dateFilters = [
  { label: '7 derniers jours', value: 'last7' },
  { label: 'Ce mois', value: 'thisMonth' },
];

function filterByDate(invoices, filter) {
  const now = new Date();
  return invoices.filter(inv => {
    const d = new Date(inv.date);
    if (filter === 'last7') {
      const diff = (now - d) / (1000 * 60 * 60 * 24);
      return diff <= 7;
    }
    if (filter === 'thisMonth') {
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }
    return true;
  });
}

export default function FactureModule() {
  const [invoices, setInvoices] = useState(fakeInvoices);
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('last7');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filtered = filterByDate(invoices, dateFilter)
    .filter(inv =>
      inv.numero.includes(search) ||
      inv.client.toLowerCase().includes(search.toLowerCase())
    );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const changeStatus = (id) => {
    const statuses = ['Payé', 'En attente', 'Impayé', 'Livré'];
    setInvoices(prev => prev.map(inv => {
      if (inv.id === id) {
        const idx = statuses.indexOf(inv.statut);
        return { ...inv, statut: statuses[(idx + 1) % statuses.length] };
      }
      return inv;
    }));
  };

  const handleDelete = (id) => {
    setInvoices(prev => prev.filter(inv => inv.id !== id));
  };

  const handleExportInvoice = (inv) => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([inv]);
    XLSX.utils.book_append_sheet(wb, ws, 'Facture');
    XLSX.writeFile(wb, `${inv.numero}.xlsx`);
  };

  const exportAllExcel = () => {
    const wb = XLSX.utils.book_new();
    const data = filtered.map(({ numero, client, montant, statut, date }) => ({ numero, client, montant, statut, date }));
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Factures');
    XLSX.writeFile(wb, 'factures.xlsx');
  };

  const exportAllPDF = () => {
    const doc = new jsPDF();
    doc.text('Liste des factures', 14, 20);
    doc.autoTable({
      startY: 30,
      head: [['Numéro', 'Client', 'Montant', 'Statut', 'Date']],
      body: filtered.map(inv => [inv.numero, inv.client, inv.montant.toLocaleString(), inv.statut, inv.date])
    });
    doc.save('factures.pdf');
  };

  return (
    <div className="p-6 bg-white min-h-screen space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex gap-2">
          <button onClick={exportAllExcel} className="flex items-center gap-1 bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700">
            <DownloadCloud size={16}/> Export Excel
          </button>
          <button onClick={exportAllPDF} className="flex items-center gap-1 bg-black text-white px-3 py-2 rounded hover:bg-gray-800">
            <FileText size={16}/> Export PDF
          </button>
          <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            <Upload size={16}/> Numériser facture
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative w-full sm:w-1/3">
          <Search className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Recherche..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex gap-2">
          {dateFilters.map(f => (
            <button
              key={f.value}
              onClick={() => { setDateFilter(f.value); setCurrentPage(1); }}
              className={`px-3 py-2 rounded ${dateFilter === f.value ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-auto border border-blue-100 rounded-lg shadow-sm">
        <table className="w-full table-auto text-sm">
          <thead className="bg-blue-50 text-blue-700 font-semibold text-left">
            <tr>
              <th className="p-3">Numéro</th>
              <th className="p-3">Client</th>
              <th className="p-3">Montant</th>
              <th className="p-3">Statut</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length ? paginated.map(inv => (
              <tr key={inv.id} className="hover:bg-gray-50 border-t border-gray-100">
                <td className="p-3 font-medium text-gray-800">{inv.numero}</td>
                <td className="p-3 text-gray-800">{inv.client}</td>
                <td className="p-3 text-gray-800">{inv.montant.toLocaleString()}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    inv.statut === 'Payé' ? 'bg-green-100 text-green-800' :
                    inv.statut === 'En attente' ? 'bg-yellow-100 text-yellow-800' :
                    inv.statut === 'Impayé' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>{inv.statut}</span>
                </td>
                  <td className="p-3 text-center flex justify-center gap-2">
                    <button onClick={() => changeStatus(inv.id)} title="Changer statut" className="text-indigo-600 hover:text-indigo-800">
                      <RotateCcw size={18}/>
                    </button>
                    <button onClick={() => handleExportInvoice(inv)} title="Exporter" className="text-green-600 hover:text-green-800">
                      <DownloadCloud size={18}/>
                    </button>
                    <button onClick={() => handleDelete(inv.id)} title="Supprimer" className="text-red-600 hover:text-red-800">
                      <Trash2 size={18}/>
                    </button>
                  </td>
                </tr>
            )) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">Aucune facture trouvée.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-3 mt-4">
        <button
          onClick={() => setCurrentPage(p => Math.max(p-1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >Prev</button>
        {[...Array(totalPages).keys()].map(i => (
          <button
            key={i+1}
            onClick={() => setCurrentPage(i+1)}
            className={`px-3 py-1 rounded ${currentPage===i+1 ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          >{i+1}</button>
        ))}
        <button
          onClick={() => setCurrentPage(p => Math.min(p+1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >Next</button>
      </div>

      {/* Modal Numérisation */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/20" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-lg font-semibold text-blue-800">Numériser une nouvelle facture</Dialog.Title>
              <button onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20}/>
              </button>
            </div>
            <FileUploadAnalyzer />
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
