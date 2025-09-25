// frontend/src/components/common/Sidebar.jsx
import React from 'react';
import { 
  BarChart3, Target, MessageSquare, Users, Calendar, FileText, 
  TrendingUp, Brain, Lightbulb, PieChart, Building, DollarSign,
  ChevronDown, ChevronRight
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  const [expandedSections, setExpandedSections] = React.useState({
    strategic: false,
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
      type: 'single'
    },
    {
      id: 'strategic',
      label: 'Análisis Estratégico',
      icon: Brain,
      type: 'section',
      expanded: expandedSections.strategic,
      items: [
        { id: 'problem-analysis', label: 'Análisis de Problemas', icon: Target },
        { id: 'canvas-method', label: 'Canvas Method', icon: Lightbulb },
        { id: 'pestel-analysis', label: 'Análisis PESTEL', icon: TrendingUp },
        { id: 'porter-forces', label: 'Fuerzas de Porter', icon: Building },
        { id: 'benchmarking', label: 'Benchmarking', icon: PieChart },
        { id: 'swot-analysis', label: 'Análisis SWOT', icon: Target }
      ]
    },
    {
      id: 'marketing',
      label: 'Plan de Marketing',
      icon: MessageSquare,
      type: 'section',
      expanded: expandedSections.marketing,
      items: [
        { id: 'marketing-objectives', label: 'Objetivos de Marketing', icon: Target },
        { id: 'segmentation', label: 'Segmentación', icon: Users },
        { id: 'market-research', label: 'Investigación de Mercado', icon: BarChart3 },
        { id: 'positioning', label: 'Posicionamiento', icon: TrendingUp },
        { id: 'marketing-mix', label: 'Marketing Mix', icon: MessageSquare },
        { id: 'marketing-budget', label: 'Presupuesto Marketing', icon: DollarSign }
      ]
    },
    {
      id: 'operations',
      label: 'Operaciones',
      icon: Building,
      type: 'section',
      expanded: expandedSections.operations,
      items: [
        { id: 'operations-objectives', label: 'Objetivos Operacionales', icon: Target },
        { id: 'flow-diagram', label: 'Diagrama de Flujo', icon: TrendingUp },
        { id: 'gantt-chart', label: 'Cronograma Gantt', icon: Calendar },
        { id: 'operations-budget', label: 'Presupuesto Operacional', icon: DollarSign }
      ]
    },
    {
      id: 'financial',
      label: 'Plan Financiero',
      icon: DollarSign,
      type: 'section',
      expanded: expandedSections.financial,
      items: [
        { id: 'financial-objectives', label: 'Objetivos Financieros', icon: Target },
        { id: 'revenue-estimation', label: 'Estimación de Ingresos', icon: TrendingUp },
        { id: 'cash-flow', label: 'Flujo de Caja', icon: BarChart3 },
        { id: 'risk-analysis', label: 'Análisis de Riesgos', icon: PieChart }
      ]
    },
    {
      id: 'reports',
      label: 'Reportes',
      icon: FileText,
      type: 'single'
    }
  ];

  const NavItem = ({ item, isSubItem = false }) => {
    const isActive = activeTab === item.id;
    const Icon = item.icon;

    return (
      <button
        onClick={() => {
          setActiveTab(item.id);
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
      </button>
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