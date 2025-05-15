import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Search, Download } from "lucide-react";
import { Dialog } from "@headlessui/react";
import { nanoid } from "nanoid";
import * as XLSX from "xlsx";

const fakeData = [
  { id: "1", classe: "Classe 6 - Charges", code: "601", libelle: "Achats matières premières" },
  { id: "2", classe: "Classe 7 - Produits", code: "701", libelle: "Ventes de marchandises" },
  { id: "3", classe: "Classe 1 - Capitaux", code: "101", libelle: "Capital social" },
];

export default function PlanComptableInterne() {
  const [comptes, setComptes] = useState(() => {
    const saved = localStorage.getItem("comptes");
    return saved ? JSON.parse(saved) : fakeData;
  });
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ code: "", libelle: "", classe: "" });

  useEffect(() => {
    localStorage.setItem("comptes", JSON.stringify(comptes));
  }, [comptes]);

  const handleSave = () => {
    if (!form.code.trim() || !form.libelle.trim() || !form.classe.trim()) return;

    if (editing) {
      setComptes((prev) =>
        prev.map((c) => (c.id === editing.id ? { ...editing, ...form } : c))
      );
    } else {
      setComptes((prev) => [...prev, { id: nanoid(), ...form }]);
    }

    setModalOpen(false);
    setForm({ code: "", libelle: "", classe: "" });
    setEditing(null);
  };

  const handleEdit = (compte) => {
    setEditing(compte);
    setForm({ code: compte.code, libelle: compte.libelle, classe: compte.classe });
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setComptes((prev) => prev.filter((c) => c.id !== id));
  };

  const handleExport = () => {
    const data = comptes.map(({ code, libelle, classe }) => ({ Code: code, Libelle: libelle, Classe: classe }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "PlanComptable");
    XLSX.writeFile(workbook, "plan_comptable_interne.xlsx");
  };

  const filtered = comptes.filter(
    (c) =>
      c.code.includes(search) ||
      c.libelle.toLowerCase().includes(search.toLowerCase()) ||
      c.classe.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        {/* <h1 className="text-2xl font-bold text-blue-800">Plan Comptable Interne</h1> */}
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="bg-gray-200 text-blue-800 px-3 py-2 rounded hover:bg-gray-300 flex items-center gap-1"
          >
            <Download size={16} /> Exporter Excel
          </button>
          <button
            onClick={() => {
              setModalOpen(true);
              setEditing(null);
              setForm({ code: "", libelle: "", classe: "" });
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus size={16} /> Ajouter un compte
          </button>
        </div>
      </div>

      <div className="relative mb-4">
        <Search className="absolute top-3 left-3 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="overflow-auto border border-blue-100 rounded-lg shadow-sm">
        <table className="w-full table-auto text-sm">
          <thead className="bg-blue-50 text-blue-700 font-semibold text-left">
            <tr>
              <th className="p-3">Code</th>
              <th className="p-3">Libellé</th>
              <th className="p-3">Classe</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((compte) => (
                <tr
                  key={compte.id}
                  className="hover:bg-blue-50 border-t border-gray-100 text-gray-800"
                >
                  <td className="p-3">{compte.code}</td>
                  <td className="p-3">{compte.libelle}</td>
                  <td className="p-3">{compte.classe}</td>
                  <td className="p-3 flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(compte)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(compte.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-blue-800 py-6">
                  Aucun compte trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/20" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <Dialog.Title className="text-lg font-semibold text-blue-800 mb-4">
              {editing ? "Modifier le compte" : "Ajouter un compte"}
            </Dialog.Title>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Code"
                value={form.code}
                onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
                className="w-full border px-3 py-2 rounded focus:ring focus:ring-blue-200"
              />
              <input
                type="text"
                placeholder="Libellé"
                value={form.libelle}
                onChange={(e) => setForm((f) => ({ ...f, libelle: e.target.value }))}
                className="w-full border px-3 py-2 rounded focus:ring focus:ring-blue-200"
              />
              <input
                type="text"
                placeholder="Classe"
                value={form.classe}
                onChange={(e) => setForm((f) => ({ ...f, classe: e.target.value }))}
                className="w-full border px-3 py-2 rounded focus:ring focus:ring-blue-200"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {editing ? "Mettre à jour" : "Ajouter"}
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
