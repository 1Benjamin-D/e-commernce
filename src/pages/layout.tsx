import "../app/globals.css";

export default function Layout({children}){
    return (
        <main className="h-dvh flex justify-center items-center">
            {children}
        </main>
    )
}