import { useEffect, useState } from "react";

export interface Utilisateur {
    id : number;
    name : string;
    password : string;
    email : string;
    numero_phone : number | null;
}

export default function Phone() {
  const [utilisateur, setUtilisateur] = useState<Utilisateur | null>(null);


  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/getuserbyid`);
      if (response.ok) {
        const data: Utilisateur = await response.json();
        setUtilisateur(data);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {utilisateur && 
        <div key={utilisateur.id}>
          <p>{utilisateur.numero_phone}</p>
        </div>
      }
    </div>
  );
}