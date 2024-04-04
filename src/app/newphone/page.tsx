"use client";

export default function NewEmail() {
  const handleEditClick = (path: string) => {
    // Modifier l'URL pour rediriger l'utilisateur
    window.location.href = `${path}`;
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl text-black mb-8">Nouveau Nom</h1>

      {/* Ancien Phone */}

      <div className="flex flex-col h-full w-fit bg-gradient-to-r from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-0.5 rounded-xl">
        <div className="flex flex-col h-full w-full items-center justify-center bg-white space-y-4 p-5 gap-4 rounded-xl">
          <div className="flex items-center w-full gap-4">
            <label className="text-gray-700 text-sm font-bold w-1/3">
              Ancien Numero
            </label>
            <div className="bg-gradient-to-r from-[#FF5863] via-[#FD8F50] to-[#FFC53E] w-2/3 p-0.5 rounded-lg">
              <p className="py-2 px-3 bg-gray-300 rounded-lg text-center break-words w-60 ">
                Voila
              </p>
            </div>
          </div>
        </div>

        {/* Nouveau Phone */}

        <div className="flex flex-col h-full w-full items-center justify-center bg-white space-y-4 p-5 gap-4 rounded-xl">
          <div className="flex items-center w-full gap-4">
            <label className="text-gray-700 text-sm font-bold w-1/3">
              Nouveau Numero
            </label>
            <div className="bg-gradient-to-r from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-0.5 rounded-lg">
              <input className="w-full py-2 px-3 bg-gray-300 rounded-lg text-center" />
            </div>
          </div>
        </div>

        {/* Sauvegarde des données */}

        <div className="flex flex-col h-full w-full items-center justify-center bg-white space-y-4 p-5 gap-4 rounded-xl">
          <div className="bg-gradient-to-r from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-0.5">
            <button
              onClick={() => handleEditClick("/accountmanagement")}
              className="bg-white space-y-4 p-2 gap-4"
            >
              Sauvegarder les modifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
