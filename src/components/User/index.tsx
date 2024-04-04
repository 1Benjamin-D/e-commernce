import { useEffect, useState } from "react";

export interface Utilisateur {
    id : number
    name : string
    password : string
    email : string
}

export default function Utilisateur() {
  // Déclaration des états pour stocker les données de l'API.
  const [utilisateur, setUtilisateur] = useState<Utilisateur | null>(null);
  const name = "Gabinks"; // TODO : Change value
  // Utilisation de useEffect pour charger les données au montage du composant.
  useEffect(() => {
    async function fetchData() {
      // Récupération des formations depuis l'API et mise à jour de l'état.
      const utilisateur = await fetch(`/api/user?name=${name}`);
      if (utilisateur.ok) {
        const data: Utilisateur = await utilisateur.json();
        setUtilisateur(data);
      }
    }
    fetchData();
    // Le tableau de dépendances vide signifie que l'effet s'exécute une fois au montage du composant.
  }, [name]);

  return (
    <div>
      {utilisateur && /* {utilisateur.map((utilisateur) => ( */
        <div key={utilisateur.id}>
          <p>{utilisateur.name}</p>
        </div>
        }
      {/* ))} */}
    </div>
  );
}
    