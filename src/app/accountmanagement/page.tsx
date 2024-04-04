"use client";

import Utilisateur from "@/components/User";

export default function Management() {
  // Fonction pour gérer la redirection
  const handleEditClick = (path: string) => {
    // Modifier l'URL pour rediriger l'utilisateur
    window.location.href = `${path}`;
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-4 min-h-screen bg-white">
      <h1 className="text-3xl text-black mb-8">Mon Profil</h1>
      <div className="flex flex-col h-full w-fit bg-gradient-to-r from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-0.5 rounded-xl">
        <div className="flex flex-col h-full w-full items-center justify-center bg-white space-y-4 p-5 gap-4 rounded-xl">
          {/* Nom */}

          <div className="flex items-center w-full gap-4">
            <label className="text-gray-700 text-sm font-bold w-1/3">Nom</label>
            <div className="bg-gradient-to-r from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-0.5 rounded-lg">
              <p className="bg-gray-300 rounded-lg py-2 px-3 text-center break-words w-60">
              <Utilisateur />
              </p>
            </div>
            <button onClick={() => handleEditClick("/newname")}>
              Modifier
            </button>
          </div>

          {/* Email */}

          <div className="flex items-center w-full gap-4">
            <label className="text-gray-700 text-sm font-bold w-1/3">
              Email
            </label>
            <div className="bg-gradient-to-r from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-0.5 rounded-lg">
              <p className="bg-gray-300 rounded-lg py-2 px-3 text-center break-words w-60 ">
                Email
              </p>
            </div>
            <button onClick={() => handleEditClick("/newmail")}>
              Modifier
            </button>
          </div>

          {/* Numéro de téléphone */}

          <div className="flex items-center w-full gap-4">
            <label className="text-gray-700 text-sm font-bold w-1/3">
              Numéro de téléphone
            </label>
            <div className="bg-gradient-to-r from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-0.5 rounded-lg">
              <p className="bg-gray-300 rounded-lg py-2 px-3 text-center break-words w-60 ">
                Numéro
              </p>
            </div>
            <button onClick={() => handleEditClick("/newphone")}>
              Modifier
            </button>
          </div>

          {/* Numéro client */}

          <div className="flex items-center w-full gap-4">
            <label className="text-gray-700 text-sm font-bold w-1/3">
              Numéro client
            </label>
            <div className="bg-gradient-to-r from-[#FF5863] via-[#FD8F50] to-[#FFC53E] w-2/3 p-0.5 rounded-lg">
              <p className="bg-gray-300 rounded-lg py-2 px-3 text-center w-80">
                Voila le numéro
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}