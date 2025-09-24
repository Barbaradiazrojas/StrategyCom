import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <h1>StrategyCom</h1>
      </div>
      <nav className="header-nav">
        <a href="/">Inicio</a>
        <a href="/dashboard">Dashboard</a>
        <a href="/login">Iniciar Sesión</a>
      </nav>
    </header>
  );
};

export default Header;
