"use client";

import React, { useState } from "react";
import Phone from "@/components/Phone";

async function saveChanges(id: any, newPhone: string) {
  try {
    const response = await fetch('/api/updatePhone', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id, phone: newPhone })
    });

    if (!response.ok) {
      throw new Error('Failed to update phone number.');
    }
  
    const data = await response.json();
    console.log('Réponse mise à jour:', data);
    return data;
  } catch (error) {
    console.error("Error during phone update: ", error);
    throw error;
  }
}

export default function NewPhone() {
  const [newPhone, setNewPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [saveStatus, setSaveStatus] = useState("");

  const handleChange = (event: { target: { value: string; }; }) => {
    const value = event.target.value.replace(/[^0-9]/g, ''); 
    setNewPhone(value);
    if (value.length === 10 && !/^\d{10}$/.test(value)) {
      setErrorMessage("Le numéro doit contenir exactement 10 chiffres.");
    } else {
      setErrorMessage("");
    }
  };

  const handleEditClick = async () => {
    if (newPhone.length !== 10 || !/^\d{10}$/.test(newPhone)) {
      setErrorMessage("Le numéro doit contenir exactement 10 chiffres.");
      return;
    }

    try {
      setSaveStatus("saving");
      await saveChanges(9, newPhone); 
      setSaveStatus("success");
      window.location.href = "/accountmanagement";
    } catch (error) {
      setErrorMessage("Erreur lors de la sauvegarde des modifications.");
      setSaveStatus("error");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl text-black mb-8">Nouveau Numéro de Téléphone</h1>

      {/* Ancien Phone */}
      <div className="flex flex-col h-full w-fit bg-gradient-to-r from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-0.5 rounded-xl">
        <div className="flex flex-col h-full w-full items-center justify-center bg-white space-y-4 p-5 gap-4 rounded-xl">
          <div className="flex items-center w-full gap-4">
            <label className="text-gray-700 text-sm font-bold w-1/3">Ancien Numéro</label>
            <div className="bg-gradient-to-r from-[#FF5863] via-[#FD8F50] to-[#FFC53E] w-2/3 p-0.5 rounded-lg">
              <div className="py-2 px-3 bg-gray-300 rounded-lg text-center break-words">
                <Phone />
              </div>
            </div>
          </div>
        </div>

        {/* Nouveau Phone */}
        <div className="flex flex-col h-full w-full items-center justify-center bg-white space-y-4 p-5 gap-4 rounded-xl">
          <div className="flex items-center w-full gap-4">
            <label className="text-gray-700 text-sm font-bold w-1/3">Nouveau Numéro</label>
            <div className="bg-gradient-to-r from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-0.5 rounded-lg">
              <input
                type="text"
                className="w-full py-2 px-3 bg-gray-300 rounded-lg text-center"
                value={newPhone}
                onChange={handleChange}
                placeholder="Entrez le nouveau numéro"
              />
            </div>
          </div>
          {errorMessage && (
            <p style={{ color: "red" }}>{errorMessage}</p>
          )}
        </div>

        {/* Sauvegarde des données */}
        <div className="flex flex-col h-full w-full items-center justify-center bg-white space-y-4 p-5 gap-4 rounded-xl">
          <div className="bg-gradient-to-r from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-0.5">
            <button
              onClick={handleEditClick}
              className="bg-white space-y-4 p-2 gap-4"
            >
              Sauvegarder les modifications
            </button>
          </div>
          {saveStatus === "saving" && <p>Enregistrement en cours...</p>}
          {saveStatus === "success" && <p>Le numéro a été mis à jour avec succès.</p>}
          {saveStatus === "error" && <p style={{ color: "red" }}>Erreur lors de la mise à jour.</p>}
        </div>
      </div>
    </div>
  );
}
