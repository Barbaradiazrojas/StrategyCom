// frontend/src/components/common/Sidebar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  BarChart3, 
  Target, 
  Zap, 
  Globe, 
  Shield, 
  Link2, 
  TrendingUp,
  Activity,
  Award,
  ChevronLeft,
  ChevronRight,
  FileText,
  Eye,
  Compass,
  Flag,
  Settings,
  DollarSign,
  PieChart,
  Calendar,
  Briefcase
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const menuStructure = [
    {
      category: '',
      items: [
        {
          title: 'Panel principal de control',
          path: '/dashboard',
          icon: Home,
          color: 'text-blue-600'
        }
      ]
    },
    {
      category: 'ANÁLISIS ESTRATÉGICO',
      items: [
        {
          title: 'Problema',
          path: '/problem-analysis',
          icon: BarChart3,
          color: 'text-blue-500'
        },
        {
          title: 'Metodología Canvas',
          path: '/canvas-method',
          icon: Target,
          color: 'text-green-500'
        },
        {
          title: 'PESTEL',
          path: '/pestel-analysis',
          icon: Globe,
          color: 'text-purple-500'
        },
        {
          title: '5 Fuerzas de Porter',
          path: '/porter-forces',
          icon: Shield,
          color: 'text-red-500'
        },
        {
          title: 'Benchmarking',
          path: '/benchmarking',
          icon: Activity,
          color: 'text-yellow-500'
        },
        {
          title: 'Factores Críticos',
          path: '/critical-factors',
          icon: Zap,
          color: 'text-orange-500'
        },
        {
          title: 'Ventaja Competitiva',
          path: '/competitive-advantage',
          icon: Award,
          color: 'text-amber-600'
        }
      ]
    },
    {
      category: 'DIRECCIÓN ESTRATÉGICA',
      items: [
        {
          title: 'Misión, Visión y Valores',
          path: '/mission-vision',
          icon: Eye,
          color: 'text-indigo-500'
        },
        {
          title: 'Objetivos Estratégicos',
          path: '/strategic-objectives',
          icon: Flag,
          color: 'text-pink-500'
        },
        {
          title: 'Estrategia Genérica',
          path: '/generic-strategy',
          icon: Compass,
          color: 'text-cyan-500'
        },
        {
          title: 'Control Estratégico (CMI)',
          path: '/strategic-control',
          icon: Settings,
          color: 'text-slate-500'
        }
      ]
    },
    {
      category: 'PLAN DE MARKETING',
      items: [
        {
          title: 'Objetivos',
          path: '/marketing-objectives',
          icon: Target,
          color: 'text-emerald-500'
        }
      ]
    },
    {
      category: 'OPERACIONES',
      items: [
        {
          title: 'Objetivos Operacionales',
          path: '/operations-objectives',
          icon: Briefcase,
          color: 'text-blue-600'
        },
        {
          title: 'Diagrama de Flujos',
          path: '/flow-diagram',
          icon: Link2,
          color: 'text-teal-600'
        },
        {
          title: 'Carta Gantt',
          path: '/gantt-chart',
          icon: Calendar,
          color: 'text-purple-600'
        },
        {
          title: 'Presupuesto Operaciones',
          path: '/operations-budget',
          icon: DollarSign,
          color: 'text-green-600'
        }
      ]
    },
    {
      category: 'PLAN FINANCIERO',
      items: [
        {
          title: 'Objetivos Financieros',
          path: '/financial-objectives',
          icon: DollarSign,
          color: 'text-emerald-600'
        },
        {
          title: 'Ingresos y Costos',
          path: '/revenue-costs',
          icon: PieChart,
          color: 'text-blue-600'
        },
        {
          title: 'Inversión Inicial',
          path: '/initial-investment',
          icon: Briefcase,
          color: 'text-indigo-600'
        }
      ]
    }
  ];

  const isActive = (path) => location.pathname === path;

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMobile = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Overlay para móvil */}
      {isMobileOpen && (
        <div className="sidebar-overlay active" onClick={closeMobile}></div>
      )}

      <div className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
        {/* Header del Sidebar */}
        <div className="sidebar-header">
          <div className="sidebar-brand">
            {/* Espacio vacío */}
          </div>
          
          {/* Botón de colapsar para desktop */}
          <button
            onClick={toggleCollapse}
            className="collapse-btn desktop-only"
            aria-label={isCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>

          {/* Botón de cerrar para móvil */}
          <button
            onClick={closeMobile}
            className="collapse-btn mobile-only"
            aria-label="Cerrar menú"
          >
            <ChevronLeft size={16} />
          </button>
        </div>

        {/* Navegación */}
        <nav className="sidebar-nav">
          <ul className="nav-list">
            {menuStructure.map((section, sectionIndex) => (
              <li key={section.category} className="nav-section">
                {!isCollapsed && section.category && (
                  <div className="section-header">
                    <span className="section-title">{section.category}</span>
                  </div>
                )}
                
                <ul className="section-items">
                  {section.items.map((item, itemIndex) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    
                    return (
                      <li key={item.path} className="nav-item">
                        <Link
                          to={item.path}
                          className={`nav-link ${active ? 'active' : ''}`}
                          title={isCollapsed ? item.title : ''}
                          onClick={closeMobile}
                        >
                          <Icon size={16} className={`nav-icon ${item.color}`} />
                          
                          {!isCollapsed && (
                            <span className="nav-text">{item.title}</span>
                          )}
                          
                          {active && <div className="active-indicator"></div>}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Botón móvil toggle - fuera del sidebar */}
      <button
        onClick={toggleMobile}
        className="sidebar-mobile-toggle"
        aria-label="Abrir menú"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
    </>
  );
};

export default Sidebar;