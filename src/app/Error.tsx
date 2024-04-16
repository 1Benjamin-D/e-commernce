// Error.tsx
import React from 'react';

const ErrorPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-r from-[#FF5863] via-[#FD8F50] to-[#FFC53E]">
      <div className="text-center p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-[#FF5863]">Erreur</h1>
        <p className="text-lg text-[#FD8F50] mt-2">Page Introuvable</p>
        <p className="mt-4 text-[#FFC53E]">Il semble que nous ne pouvons pas trouver la page que vous cherchez.</p>
        <a href="/" className="mt-6 inline-block rounded px-6 py-3 bg-[#FF5863] text-white hover:bg-[#FD8F50] transition-colors duration-300">
          Retourner à l'accueil
        </a>
      </div>
    </main>
  );
};

export default ErrorPage;
