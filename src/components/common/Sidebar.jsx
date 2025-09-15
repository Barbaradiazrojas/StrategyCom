import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <a href="/dashboard">Dashboard</a>
        <a href="/profile">Perfil</a>
        <a href="/settings">Configuración</a>
        <a href="/logout">Cerrar Sesión</a>
      </nav>
    </aside>
  );
};

export default Sidebar;
