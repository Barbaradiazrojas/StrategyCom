import React from "react";
import "./Footer.css"; // Asegúrate de crear un archivo CSS para los estilos

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} StrategyCom. Todos los derechos reservados.</p>
        <div className="footer-links">
          <a href="/privacy">Política de Privacidad</a>
          <a href="/terms">Términos de Servicio</a>
          <a href="/contact">Contáctanos</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
