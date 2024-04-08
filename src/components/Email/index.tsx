import { useEffect, useState } from "react";

export interface Utilisateur {
    id : number;
    name : string;
    password : string;
    email : string;
    numero_phone : number | null;
}

export default function Email() {
  const [utilisateur, setUtilisateur] = useState<Utilisateur | null>(null);
  const email = 'pro@gabinbuignet.xyz'; // TODO : Change value

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/email?email=${email}`);
      if (response.ok) {
        const data: Utilisateur = await response.json();
        setUtilisateur(data);
      }
    }
    fetchData();
  }, [email]);

  return (
    <div>
      {utilisateur && 
        <div key={utilisateur.id}>
          <p>{utilisateur.email}</p>
        </div>
      }
    </div>
  );
}