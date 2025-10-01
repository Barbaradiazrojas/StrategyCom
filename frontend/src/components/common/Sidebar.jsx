// frontend/src/components/common/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, Target, MessageSquare, Users, Calendar, FileText, 
  TrendingUp, Brain, Lightbulb, PieChart, Building, DollarSign,
  ChevronDown, ChevronRight, Compass, Flag
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = React.useState({
    strategic: false,
    direction: false,
    marketing: false,
    operations: false,
    financial: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      type: 'single',
      path: '/dashboard'
    },
    {
      id: 'strategic',
      label: 'Análisis Estratégico',
      icon: Brain,
      type: 'section',
      expanded: expandedSections.strategic,
      items: [
        { id: 'problem-analysis', label: 'Análisis de Problemas', icon: Target, path: '/problem-analysis' },
        { id: 'canvas-method', label: 'Canvas Method', icon: Lightbulb, path: '/canvas-method' },
        { id: 'pestel-analysis', label: 'Análisis PESTEL', icon: TrendingUp, path: '/pestel-analysis' },
        { id: 'porter-forces', label: 'Fuerzas de Porter', icon: Building, path: '/porter-forces' },
        { id: 'critical-factors', label: 'Factores Críticos', icon: Flag, path: '/critical-factors' },
        { id: 'value-chain', label: 'Cadena de Valor', icon: TrendingUp, path: '/value-chain' },
        { id: 'swot-analysis', label: 'Análisis SWOT', icon: Target, path: '/swot-analysis' },
        { id: 'benchmarking', label: 'Benchmarking', icon: PieChart, path: '/benchmarking' },
        { id: 'competitive-advantage', label: 'Ventaja Competitiva', icon: TrendingUp, path: '/competitive-advantage' }
      ]
    },
    {
      id: 'direction',
      label: 'Dirección Estratégica',
      icon: Compass,
      type: 'section',
      expanded: expandedSections.direction,
      items: [
        { id: 'mission-vision', label: 'Misión, Visión y Valores', icon: Flag, path: '/mission-vision' },
        { id: 'strategic-objectives', label: 'Objetivos Estratégicos', icon: Target, path: '/strategic-objectives' },
        { id: 'generic-strategy', label: 'Estrategia Genérica', icon: Lightbulb, path: '/generic-strategy' },
        { id: 'balanced-scorecard', label: 'Cuadro de Mando', icon: BarChart3, path: '/balanced-scorecard' }
      ]
    },
    {
      id: 'marketing',
      label: 'Plan de Marketing',
      icon: MessageSquare,
      type: 'section',
      expanded: expandedSections.marketing,
      items: [
        { id: 'marketing-objectives', label: 'Objetivos de Marketing', icon: Target, path: '/marketing-objectives' },
        { id: 'segmentation', label: 'Segmentación', icon: Users, path: '/segmentation' },
        { id: 'market-research', label: 'Investigación de Mercado', icon: BarChart3, path: '/market-research' },
        { id: 'positioning', label: 'Posicionamiento', icon: TrendingUp, path: '/positioning' },
        { id: 'marketing-mix', label: 'Marketing Mix', icon: MessageSquare, path: '/marketing-mix' },
        { id: 'marketing-budget', label: 'Presupuesto Marketing', icon: DollarSign, path: '/marketing-budget' }
      ]
    },
    {
      id: 'operations',
      label: 'Operaciones',
      icon: Building,
      type: 'section',
      expanded: expandedSections.operations,
      items: [
        { id: 'operations-objectives', label: 'Objetivos Operacionales', icon: Target, path: '/operations-objectives' },
        { id: 'flow-diagram', label: 'Diagrama de Flujo', icon: TrendingUp, path: '/flow-diagram' },
        { id: 'gantt-chart', label: 'Cronograma Gantt', icon: Calendar, path: '/gantt-chart' },
        { id: 'operations-budget', label: 'Presupuesto Operacional', icon: DollarSign, path: '/operations-budget' }
      ]
    },
    {
      id: 'financial',
      label: 'Plan Financiero',
      icon: DollarSign,
      type: 'section',
      expanded: expandedSections.financial,
      items: [
        { id: 'financial-objectives', label: 'Objetivos Financieros', icon: Target, path: '/financial-objectives' },
        { id: 'revenue-estimation', label: 'Estimación de Ingresos', icon: TrendingUp, path: '/revenue-estimation' },
        { id: 'cash-flow', label: 'Flujo de Caja', icon: BarChart3, path: '/cash-flow' },
        { id: 'risk-analysis', label: 'Análisis de Riesgos', icon: PieChart, path: '/risk-analysis' }
      ]
    },
    {
      id: 'reports',
      label: 'Reportes',
      icon: FileText,
      type: 'single',
      path: '/reports'
    }
  ];

  const NavItem = ({ item, isSubItem = false }) => {
    const isActive = location.pathname === item.path;
    const Icon = item.icon;

    return (
      <Link
        to={item.path}
        onClick={() => {
          if (onClose) onClose();
        }}
        className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${
          isActive
            ? 'bg-blue-600 text-white shadow-lg'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
        } ${isSubItem ? 'ml-4 text-sm' : ''}`}
      >
        <Icon size={isSubItem ? 16 : 18} />
        <span className={`${isSubItem ? 'text-sm' : ''}`}>{item.label}</span>
      </Link>
    );
  };

  const SectionHeader = ({ section }) => {
    const Icon = section.icon;
    const ChevronIcon = section.expanded ? ChevronDown : ChevronRight;

    return (
      <button
        onClick={() => toggleSection(section.id)}
        className="w-full flex items-center justify-between px-4 py-3 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Icon size={18} />
          <span className="font-medium">{section.label}</span>
        </div>
        <ChevronIcon size={16} />
      </button>
    );
  };

  return (
    <>
      {/* Overlay para móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 h-full bg-white border-r border-gray-200 w-64 transform transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 lg:static lg:z-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full overflow-y-auto">
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <div key={item.id}>
                {item.type === 'single' ? (
                  <NavItem item={item} />
                ) : (
                  <div className="space-y-1">
                    <SectionHeader section={item} />
                    {item.expanded && (
                      <div className="space-y-1 ml-2">
                        {item.items.map((subItem) => (
                          <NavItem key={subItem.id} item={subItem} isSubItem />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Footer del sidebar */}
          <div className="p-4 border-t border-gray-200 mt-auto">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-800 mb-1">
                ¿Necesitas ayuda?
              </h4>
              <p className="text-xs text-blue-600 mb-2">
                Consulta nuestra documentación
              </p>
              <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors">
                Ver Guías
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;