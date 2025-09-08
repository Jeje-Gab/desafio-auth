import { ReactNode } from "react";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div style={{minHeight:"100dvh", display:"flex", flexDirection:"column"}}>
      <Navbar />
      <main className="container page" style={{flex:1}}>
        {children}
      </main>
      <footer className="navbar">
        <div className="container navbar-inner" style={{height:56, justifyContent:"center"}}>
          <span className="sub">feito com 💚</span>
        </div>
      </footer>
    </div>
  );
}
