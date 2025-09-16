import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'active' : ''}`} id="sidebar">
      <div className="sidebar-header">
        <h4><i className="fas fa-chart-line me-2"></i>Plan de Negocio</h4>
      </div>
      <div className="nav-section">
        <div className="nav-section-title">Dashboard</div>
        <NavLink to="/app/dashboard" className="nav-link" activeClassName="active">
          <i className="fas fa-tachometer-alt"></i>Resumen General
        </NavLink>
      </div>
      <div className="nav-section">
        <div className="nav-section-title">Análisis Estratégico</div>
        <NavLink to="/app/strategic/problem" className="nav-link" activeClassName="active">
          <i className="fas fa-exclamation-triangle"></i>Problema
        </NavLink>
        <NavLink to="/app/strategic/canvas" className="nav-link" activeClassName="active">
          <i className="fas fa-th-large"></i>Metodología Canvas
        </NavLink>
        {/* Añadir más enlaces según tu estructura */}
      </div>
      {/* Más secciones del sidebar */}
    </div>
  );
};

export default Sidebar;
