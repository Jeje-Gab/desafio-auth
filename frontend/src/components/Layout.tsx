import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-brand-50 via-white to-brand-100 text-slate-800">
      {/* Navbar */}
      <header className="sticky top-0 z-10 border-b border-brand-100/70 bg-white/70 backdrop-blur">
        <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link to="/profile" className="font-bold text-brand-700 hover:text-brand-600">
            AuthApp
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className={`px-3 py-1.5 rounded-md text-sm ${pathname === "/login" ? "bg-brand-100 text-brand-800" : "hover:text-brand-700"}`}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className={`px-3 py-1.5 rounded-md text-sm ${pathname === "/signup" ? "bg-brand-100 text-brand-800" : "hover:text-brand-700"}`}
            >
              Cadastro
            </Link>
            <Link
              to="/profile"
              className={`px-3 py-1.5 rounded-md text-sm ${pathname === "/profile" ? "bg-brand-100 text-brand-800" : "hover:text-brand-700"}`}
            >
              Perfil
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-8">
        {children}
      </main>

      <footer className="border-t border-brand-100/70 bg-white/60 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4 text-sm text-slate-500">
          feito com 💚 em verde-água
        </div>
      </footer>
    </div>
  );
}