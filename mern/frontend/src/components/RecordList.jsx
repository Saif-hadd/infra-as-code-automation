import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Record = (props) => (
  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.record.name}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.record.position}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.record.level}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      <div className="flex gap-2">
        <Link
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
          to={`/edit/${props.record.id}`} // Changé _id en id
        >
          Edit
        </Link>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
          type="button"
          onClick={() => {
            props.deleteRecord(props.record.id); // Changé _id en id
          }}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(""); // Ajouter un état pour les erreurs

  // Récupérer les enregistrements depuis la base de données
  useEffect(() => {
    async function getRecords() {
      try {
        const response = await fetch(`http://172.190.186.162:5555/record`); // Corrigé l'URL et supprimé le / final
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.statusText}`);
        }
        const records = await response.json();
        setRecords(records);
        setError("");
      } catch (error) {
        console.error("Erreur lors de la récupération des enregistrements :", error.message);
        setError("Impossible de récupérer les enregistrements.");
      }
    }
    getRecords();
  }, []); // Supprimé records.length pour éviter des appels répétés inutiles

  // Supprimer un enregistrement
  async function deleteRecord(id) {
    try {
      const response = await fetch(`http://172.190.186.162:5555/record/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.statusText}`);
      }
      const newRecords = records.filter((el) => el.id !== id); // Changé _id en id
      setRecords(newRecords);
      setError("");
    } catch (error) {
      console.error("Erreur lors de la suppression :", error.message);
      setError("Impossible de supprimer l'enregistrement.");
    }
  }

  // Afficher les enregistrements dans un tableau
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record.id)} // Changé _id en id
          key={record.id} // Changé _id en id
        />
      );
    });
  }

  return (
    <>
      <h3 className="text-lg font-semibold p-4">Employee Records</h3>
      {error && <p className="text-red-500 p-4">{error}</p>}
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Position
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Level
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {recordList()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}