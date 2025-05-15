import { useEffect, useState } from "react";
import { Search, CheckCircle, XCircle } from "lucide-react";

// Composants auxiliaires
function TransactionRow({ tx, onMatch, matched, type }) {
  return (
    <tr className={`hover:bg-gray-50 transition-colors ${matched ? "bg-green-50" : ""}`}>
      <td className="p-2 text-sm text-gray-800">{tx.date}</td>
      <td className="p-2 text-sm text-gray-800">{tx.description}</td>
      <td className="p-2 text-sm text-gray-800 text-right">{tx.amount.toFixed(2)}</td>
      <td className="p-2 text-center">
        {!matched && (
          <button
            onClick={() => onMatch(tx.id)}
            className="text-blue-600 hover:text-blue-800"
            title={`Associer cette transaction ${type}`}>
            <CheckCircle size={18} />
          </button>
        )}
        {matched && <XCircle size={18} className="text-gray-400" />}
      </td>
    </tr>
  );
}

export default function BankReconciliation() {
  // Données fictives
  const fakeBankTx = [
    { id: "b1", date: "2025-05-01", description: "Virement client A", amount: 1200.0 },
    { id: "b2", date: "2025-05-03", description: "Prélèvement EDF", amount: -150.5 },
    { id: "b3", date: "2025-05-05", description: "Frais bancaires", amount: -10.0 }
  ];
  const fakeLedgerTx = [
    { id: "l1", date: "2025-05-01", description: "Facture A réglée", amount: 1200.0 },
    { id: "l2", date: "2025-05-03", description: "Facture EDF", amount: -150.5 },
    { id: "l3", date: "2025-05-04", description: "Achat mobilier", amount: -500.0 }
  ];

  // États
  const [bankTx, setBankTx] = useState(fakeBankTx);
  const [ledgerTx, setLedgerTx] = useState(fakeLedgerTx);
  const [search, setSearch] = useState("");
  const [matches, setMatches] = useState({}); // key: bankTx id, value: ledgerTx id

  // Filtrer selon la recherche
  const filteredBank = bankTx.filter(
    (tx) => tx.description.toLowerCase().includes(search.toLowerCase())
  );
  const filteredLedger = ledgerTx.filter(
    (tx) => tx.description.toLowerCase().includes(search.toLowerCase())
  );

  // Associer une transaction bancaire à une ligne de journal
  const handleMatch = (bankId, ledgerId) => {
    setMatches((prev) => ({ ...prev, [bankId]: ledgerId }));
  };

  // Mémoriser les ID des journaux associés pour éviter rematches
  const matchedLedgerIds = Object.values(matches);

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* <h1 className="text-2xl font-bold text-blue-800 mb-4">Rapprochement Bancaire</h1> */}

      <div className="relative mb-4 max-w-md">
        <Search className="absolute top-3 left-3 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transactions bancaires */}
        <div className="border border-blue-100 rounded-lg shadow-sm overflow-auto">
          <h2 className="bg-blue-50 p-3 font-semibold text-blue-800">Relevé Bancaire</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Libellé</th>
                <th className="p-2 text-right">Montant</th>
                <th className="p-2 text-center">Associer</th>
              </tr>
            </thead>
            <tbody>
              {filteredBank.map((tx) => (
                <TransactionRow
                  key={tx.id}
                  tx={tx}
                  type="bancaire"
                  matched={matches[tx.id] != null}
                  onMatch={(id) => {
                    // cherche le plus proche montant correspondant
                    const candidate = ledgerTx.find(
                      (l) => l.amount === tx.amount && !matchedLedgerIds.includes(l.id)
                    );
                    if (candidate) handleMatch(id, candidate.id);
                  }}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Écritures en livres */}
        <div className="border border-blue-100 rounded-lg shadow-sm overflow-auto">
          <h2 className="bg-blue-50 p-3 font-semibold text-blue-800">Écritures en Livres</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Libellé</th>
                <th className="p-2 text-right">Montant</th>
                <th className="p-2 text-center">Associer</th>
              </tr>
            </thead>
            <tbody>
              {filteredLedger.map((tx) => (
                <TransactionRow
                  key={tx.id}
                  tx={tx}
                  type="livre"
                  matched={Object.keys(matches).find((b) => matches[b] === tx.id) != null}
                  onMatch={(ledgerId) => {
                    // associer manuellement via bouton depuis écriture
                    const candidateBank = bankTx.find(
                      (b) => b.amount === tx.amount && !matches[b.id]
                    );
                    if (candidateBank) handleMatch(candidateBank.id, ledgerId);
                  }}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
