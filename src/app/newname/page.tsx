"use client";

import React, { useState } from "react";
import Utilisateur from "@/components/User";

async function saveChanges(id: any, newName: any) {
  const response = await fetch('/api/updateUser', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id, name: newName })
  });

  if (response.ok) {
    const data = await response.json();
    console.log('Réponse mise à jour:', data);
  } else {
    console.error('Erreur lors de la mise à jour');
  } 
}


export default function NewName() {
  const [newName, setNewName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [saveStatus, setSaveStatus] = useState("idle"); 

  const name = "";

  const handleChange = (event: { target: { value: any } }) => {
    const value = event.target.value;
    if (/^\D*$/.test(value)) {
      setNewName(value);
      setErrorMessage("");
    } else {
      setErrorMessage("Le nom ne peut pas contenir de chiffres.");
    }
  };

  const handleEditClick = async () => {
    if (!/^\D*$/.test(newName)) {
      setErrorMessage("Le nom ne peut pas contenir de chiffres.");
      return;
    }

    try {
      setSaveStatus("saving");
      await saveChanges(name, newName);
      setSaveStatus("success");

      window.location.href = "/accountmanagement";
    } catch (error) {
      setErrorMessage("Erreur lors de la sauvegarde du nom.");
      setSaveStatus("error");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl text-black mb-8">Nouveau Nom</h1>

      {/* Ancien Nom */}

      <div className="flex flex-col h-full w-fit bg-gradient-to-r from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-0.5 rounded-xl">
        <div className="flex flex-col h-full w-full items-center justify-center bg-white space-y-4 p-5 gap-4 rounded-xl">
          <div className="flex items-center w-full gap-4">
            <label className="text-gray-700 text-sm font-bold w-1/3">
              Ancien Nom
            </label>
            <div className="bg-gradient-to-r from-[#FF5863] via-[#FD8F50] to-[#FFC53E] w-2/3 p-0.5 rounded-lg">
              <div className=" py-2 px-3 bg-gray-300 rounded-lg text-center break-words">
                <Utilisateur />
              </div>
            </div>
          </div>
        </div>

        {/* Nouveau Nom */}

        <div className="flex flex-col h-full w-full items-center justify-center bg-white space-y-4 p-5 gap-4 rounded-xl">
          {errorMessage && (
            <p style={{ color: "red", marginTop: "8px" }}>{errorMessage}</p>
          )}
          <div className="flex items-center w-full gap-4">
            <label className="text-gray-700 text-sm font-bold w-1/3">
              Nouveau Nom
            </label>
            <div className="bg-gradient-to-r from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-0.5 rounded-lg">
              <input
                className="w-full py-2 px-3 bg-gray-300 rounded-lg text-center"
                value={newName}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Sauvegarde des données */}

        <div className="flex flex-col h-full w-full items-center justify-center bg-white space-y-4 p-5 gap-4 rounded-xl">
          {saveStatus === "saving" && <p>Enregistrement en cours...</p>}
          {saveStatus === "success" && (
            <p>Le nom a été mis à jour avec succès.</p>
          )}
          {saveStatus === "error" && (
            <p style={{ color: "red" }}>Erreur lors de la mise à jour.</p>
          )}
          <div className="bg-gradient-to-r from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-0.5">
            <button
              onClick={handleEditClick}
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