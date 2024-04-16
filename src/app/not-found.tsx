export default function erreur() {
    return (
      <>
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            {/* Utilisation du dégradé pour le texte de l'erreur 404 */}
            <p className="text-base font-semibold" style={{ background: "linear-gradient(to right, #FF5863, #FD8F50, #FFC53E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              404
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl" style={{ color: "#FF5863" }}>Page non trouvée</h1>
            <p className="mt-6 text-base leading-7" style={{ color: "#FD8F50" }}>Désolé, nous n’avons pas trouvé la page que vous recherchez.</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm"
                style={{ background: "linear-gradient(to right, #FF5863, #FD8F50, #FFC53E)" }}
                onMouseEnter={e => e.currentTarget.style.background = "linear-gradient(to right, #FD8F50, #FFC53E, #FF5863)"}
                onMouseLeave={e => e.currentTarget.style.background = "linear-gradient(to right, #FF5863, #FD8F50, #FFC53E)"}
              >
                Go e-commernce
              </a>
            </div>
          </div>
        </main>
      </>
    )
  }
  