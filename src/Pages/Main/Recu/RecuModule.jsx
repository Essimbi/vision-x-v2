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

const fakeReceipts = [
  { id: 1, numero: 'RC-2025-0001', payeur: 'Client A', montant: 500000, statut: 'Payé', date: '2025-05-09' },
  { id: 2, numero: 'RC-2025-0002', payeur: 'Client B', montant: 750000, statut: 'En attente', date: '2025-05-06' },
  { id: 3, numero: 'RC-2025-0003', payeur: 'Client C', montant: 300000, statut: 'Annulé', date: '2025-04-27' },
  { id: 4, numero: 'RC-2025-0004', payeur: 'Client D', montant: 950000, statut: 'Payé', date: '2025-05-03' },
  // ... pour pagination
];

const dateFilters = [
  { label: '7 derniers jours', value: 'last7' },
  { label: 'Ce mois', value: 'thisMonth' },
];

function filterByDate(items, filter) {
  const now = new Date();
  return items.filter(item => {
    const d = new Date(item.date);
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

export default function RecuModule() {
  const [receipts, setReceipts] = useState(fakeReceipts);
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('last7');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filtered = filterByDate(receipts, dateFilter)
    .filter(r =>
      r.numero.includes(search) ||
      r.payeur.toLowerCase().includes(search.toLowerCase())
    );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const statuses = ['Payé', 'En attente', 'Annulé'];
  const changeStatus = id => {
    setReceipts(prev => prev.map(r => {
      if (r.id === id) {
        const idx = statuses.indexOf(r.statut);
        return { ...r, statut: statuses[(idx + 1) % statuses.length] };
      }
      return r;
    }));
  };

  const handleDelete = id => {
    setReceipts(prev => prev.filter(r => r.id !== id));
  };

  const handleExport = r => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([r]);
    XLSX.utils.book_append_sheet(wb, ws, 'Reçu');
    XLSX.writeFile(wb, `${r.numero}.xlsx`);
  };

  const exportAllExcel = () => {
    const wb = XLSX.utils.book_new();
    const data = filtered.map(({ numero, payeur, montant, statut, date }) => ({ numero, payeur, montant, statut, date }));
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Reçus');
    XLSX.writeFile(wb, 'reçus.xlsx');
  };

  const exportAllPDF = () => {
    const doc = new jsPDF();
    doc.text('Liste des reçus', 14, 20);
    doc.autoTable({
      startY: 30,
      head: [['Numéro', 'Payeur', 'Montant', 'Statut', 'Date']],
      body: filtered.map(r => [r.numero, r.payeur, r.montant.toLocaleString(), r.statut, r.date])
    });
    doc.save('reçus.pdf');
  };

  return (
    <div className="p-6 bg-white min-h-screen space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex gap-2">
          <button onClick={exportAllExcel} className="flex items-center gap-1 bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700">
            <DownloadCloud size={16} /> Export Excel
          </button>
          <button onClick={exportAllPDF} className="flex items-center gap-1 bg-black text-white px-3 py-2 rounded hover:bg-gray-800">
            <FileText size={16} /> Export PDF
          </button>
          <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            <Upload size={16} /> Numériser reçu
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
            <button key={f.value} onClick={() => { setDateFilter(f.value); setCurrentPage(1); }}
              className={`px-3 py-2 rounded ${dateFilter === f.value ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >{f.label}</button>
          ))}
        </div>
      </div>

      <div className="overflow-auto border border-blue-100 rounded-lg shadow-sm">
        <table className="w-full table-auto text-sm">
          <thead className="bg-blue-50 text-blue-700 font-semibold text-left">
            <tr>
              <th className="p-3">Numéro</th>
              <th className="p-3">Payeur</th>
              <th className="p-3">Montant</th>
              <th className="p-3">Statut</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length ? paginated.map(r => (
              <tr key={r.id} className="hover:bg-gray-50 border-t border-gray-100">
                <td className="p-3 font-medium text-gray-800">{r.numero}</td>
                <td className="p-3 text-gray-800">{r.payeur}</td>
                <td className="p-3 text-gray-800">{r.montant.toLocaleString()}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    r.statut === 'Payé' ? 'bg-green-100 text-green-800' :
                    r.statut === 'En attente' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>{r.statut}</span>
                </td>
                  <td className="p-3 text-center flex justify-center gap-2">
                    <button onClick={() => changeStatus(r.id)} title="Changer statut" className="text-indigo-600 hover:text-indigo-800">
                      <RotateCcw size={18} />
                    </button>
                    <button onClick={() => handleExport(r)} title="Exporter" className="text-green-600 hover:text-green-800">
                      <DownloadCloud size={18} />
                    </button>
                    <button onClick={() => handleDelete(r.id)} title="Supprimer" className="text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
            )) : (
              <tr><td colSpan="5" className="text-center py-6 text-gray-500">Aucun reçu trouvé.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center space-x-3 mt-4">
        <button onClick={() => setCurrentPage(p => Math.max(p-1,1))} disabled={currentPage===1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Prev</button>
        {[...Array(totalPages).keys()].map(i => (
          <button key={i+1} onClick={() => setCurrentPage(i+1)}
            className={`px-3 py-1 rounded ${currentPage===i+1?'bg-blue-600 text-white':'bg-gray-100 hover:bg-gray-200'}`}>{i+1}</button>
        ))}
        <button onClick={() => setCurrentPage(p => Math.min(p+1,totalPages))} disabled={currentPage===totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Next</button>
      </div>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/20" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-lg font-semibold text-blue-800">Numériser un reçu</Dialog.Title>
              <button onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <FileUploadAnalyzer />
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
