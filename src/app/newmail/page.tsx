"use client";
import React, { useState } from "react";
import Email from "@/components/Email";

export default function NewEmail() {
  const [newEmail, setNewEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function saveChanges(id: string, newEmail: string) {
    const response = await fetch("/api/updateUser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, email: newEmail }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Réponse mise à jour:", data);
    } else {
      console.error("Erreur lors de la mise à jour");
      setErrorMessage("Erreur lors de la mise à jour");
    }
  }

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSaveClick = async () => {
    if (!isValidEmail(newEmail)) {
      setErrorMessage("Adresse e-mail non valide");
      return;
    }

    try {
      await saveChanges("id-utilisateur", newEmail);
      setErrorMessage("");

      window.location.href = "/accountmanagement";
    } catch (error) {
      setErrorMessage("Erreur lors de la sauvegarde des modifications");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl text-black mb-8">Nouveau Mail</h1>

      {/* Ancien Email */}

      <div className="flex flex-col h-full w-fit bg-gradient-to-r from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-0.5 rounded-xl">
        <div className="flex flex-col h-full w-full items-center justify-center bg-white space-y-4 p-5 gap-4 rounded-xl">
          <div className="flex items-center w-full gap-4">
            <label className="text-gray-700 text-sm font-bold w-1/3">
              Ancien Email
            </label>
            <div className="bg-gradient-to-r from-[#FF5863] via-[#FD8F50] to-[#FFC53E] w-2/3 p-0.5 rounded-lg">
              <div className="py-2 px-3 bg-gray-300 rounded-lg text-center break-words">
                <Email />
              </div>
            </div>
          </div>
        </div>

        {/* Nouveau Email */}

        <div className="flex flex-col h-full w-full items-center justify-center bg-white space-y-4 p-5 gap-4 rounded-xl">
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <div className="flex items-center w-full gap-4">
            <label className="text-gray-700 text-sm font-bold w-1/3">
              Nouveau Email
            </label>

            <div className="bg-gradient-to-r from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-0.5 rounded-lg">
              <input
                className="w-full py-2 px-3 bg-gray-300 rounded-lg text-center"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Sauvegarde des données */}

        <div className="flex flex-col h-full w-full items-center justify-center bg-white space-y-4 p-5 gap-4 rounded-xl">
          <div className="bg-gradient-to-r from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-0.5">
            <button
              onClick={handleSaveClick}
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
