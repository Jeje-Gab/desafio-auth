import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [isAuthed, setIsAuthed] = useState<boolean>(!!localStorage.getItem("accessToken"));

  // Mantém o estado em sincronia (entre abas ou após login/logout)
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "accessToken") setIsAuthed(!!localStorage.getItem("accessToken"));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function logout() {
    localStorage.removeItem("accessToken");
    setIsAuthed(false);
    navigate("/login");
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to={isAuthed ? "/profile" : "/login"} className="brand">AuthApp</NavLink>

        <nav className="nav">
          {!isAuthed && (
            <>
              <NavLink to="/login"  className={({isActive}) => `nav-link ${isActive ? "active":""}`}>Login</NavLink>
              <NavLink to="/signup" className={({isActive}) => `nav-link ${isActive ? "active":""}`}>Cadastro</NavLink>
            </>
          )}

          {isAuthed && (
            <>
              <NavLink to="/profile" className={({isActive}) => `nav-link ${isActive ? "active":""}`}>Perfil</NavLink>
              <button className="btn btn-ghost" onClick={logout}>Sair</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
