"use client";

import Password from "@/components/Password";

export default function newPassword() {
  const handleEditClick = (path: string) => {
    // Modifier l'URL pour rediriger l'utilisateur
    window.location.href = `${path}`;
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl text-black mb-8">Nouveau Password</h1>

      {/* Ancien Password */}

      <div className="flex flex-col h-full w-fit bg-gradient-to-r from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-0.5 rounded-xl">
        <div className="flex flex-col h-full w-full items-center justify-center bg-white space-y-4 p-5 gap-4 rounded-xl">
          <div className="flex items-center w-full gap-4">
            <label className="text-gray-700 text-sm font-bold w-2/3">
              Ancien Password
            </label>
            <div className="bg-gradient-to-r from-[#FF5863] via-[#FD8F50] to-[#FFC53E] w-2/3 p-0.5 rounded-lg">
              <div className=" py-2 px-3 bg-gray-300 rounded-lg text-center break-words">
                <Password />
              </div>
            </div>
          </div>
        </div>

        {/* Nouveau Password */}

        <div className="flex flex-col h-full w-full items-center justify-center bg-white space-y-4 p-5 gap-4 rounded-xl">
          <div className="flex items-center w-full gap-4">
            <label className="text-gray-700 text-sm font-bold w-1/3">
              Nouveau Password
            </label>
            <div className="bg-gradient-to-r from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-0.5 rounded-lg">
              <input type="password" className="w-full py-2 px-3 bg-gray-300 rounded-lg text-center" />
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
