// frontend/src/pages/app/Dashboard.jsx
import React from 'react';
import { Target, MessageSquare, Users, BarChart3, TrendingUp, Activity } from 'lucide-react';

const Dashboard = () => {
  // Datos temporales - más adelante se conectarán a hooks reales
  const dashboardMetrics = [
    {
      title: 'Campañas Activas',
      value: 12,
      color: 'blue',
      icon: Target,
      trend: '+15%'
    },
    {
      title: 'Mensajes Enviados',
      value: 847,
      color: 'green',
      icon: MessageSquare,
      trend: '+23%'
    },
    {
      title: 'Audiencia Total',
      value: '45.2K',
      color: 'purple',
      icon: Users,
      trend: '+8%'
    },
    {
      title: 'Engagement Rate',
      value: '87%',
      color: 'orange',
      icon: BarChart3,
      trend: '+12%'
    }
  ];

  // Datos temporales para campañas
  const campaigns = [
    {
      id: 1,
      name: 'Campaña de Lanzamiento Q4',
      audience: '12.5K usuarios',
      status: 'Activa',
      progress: 85
    },
    {
      id: 2,
      name: 'Estrategia de Retención',
      audience: '8.3K usuarios',
      status: 'Planificación',
      progress: 45
    },
    {
      id: 3,
      name: 'Marketing Digital 2024',
      audience: '15.7K usuarios',
      status: 'Activa',
      progress: 92
    },
    {
      id: 4,
      name: 'Expansión de Mercado',
      audience: '9.1K usuarios',
      status: 'Pausada',
      progress: 60
    },
    {
      id: 5,
      name: 'Análisis Competitivo',
      audience: '6.8K usuarios',
      status: 'Activa',
      progress: 38
    }
  ];

  // Componente temporal para métricas (reemplaza DashboardCard)
  const MetricCard = ({ title, value, color, icon: Icon, trend }) => {
    const colorClasses = {
      blue: 'border-blue-200 bg-blue-50',
      green: 'border-green-200 bg-green-50',
      purple: 'border-purple-200 bg-purple-50',
      orange: 'border-orange-200 bg-orange-50'
    };

    const iconColors = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      purple: 'text-purple-600',
      orange: 'text-orange-600'
    };

    const trendColors = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      purple: 'text-purple-600',
      orange: 'text-orange-600'
    };

    return (
      <div className={`bg-white rounded-xl shadow-lg p-6 border-2 ${colorClasses[color]} transition-all duration-300 hover:shadow-xl`}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
            <div className="flex items-center">
              <TrendingUp size={16} className={`mr-1 ${trendColors[color]}`} />
              <span className={`text-sm font-semibold ${trendColors[color]}`}>
                {trend}
              </span>
            </div>
          </div>
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon size={24} className={iconColors[color]} />
          </div>
        </div>
      </div>
    );
  };

  // Componente temporal para gráficos (reemplaza AnalyticsChart)
  const SimpleChart = ({ title, type }) => {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200">
          <div className="text-center">
            <Activity size={48} className="text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 font-medium">Gráfico {type}</p>
            <p className="text-sm text-gray-400">Próximamente disponible</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Encabezado del Dashboard */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Principal</h1>
            <p className="text-gray-600">Resumen ejecutivo de tus análisis estratégicos</p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Última actualización</p>
              <p className="text-lg font-semibold text-gray-900">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardMetrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Gráficos de análisis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SimpleChart 
          title="Progreso de Metodologías"
          type="progreso"
        />
        <SimpleChart 
          title="Análisis Temporal"
          type="líneas"
        />
      </div>

      {/* Metodologías disponibles */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Metodologías de Análisis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Análisis del Problema', status: 'Completado', progress: 100, color: 'green' },
            { name: 'Business Model Canvas', status: 'En progreso', progress: 75, color: 'blue' },
            { name: 'Análisis PESTEL', status: 'En progreso', progress: 60, color: 'yellow' },
            { name: '5 Fuerzas de Porter', status: 'Pendiente', progress: 25, color: 'gray' },
            { name: 'Factores Críticos', status: 'Pendiente', progress: 0, color: 'gray' },
            { name: 'Cadena de Valor', status: 'Pendiente', progress: 0, color: 'gray' },
          ].map((methodology, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-gray-900 mb-2">{methodology.name}</h4>
              <div className="flex items-center justify-between mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  methodology.status === 'Completado' 
                    ? 'bg-green-100 text-green-800' 
                    : methodology.status === 'En progreso'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {methodology.status}
                </span>
                <span className="text-sm text-gray-600">{methodology.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    methodology.color === 'green' ? 'bg-green-500' :
                    methodology.color === 'blue' ? 'bg-blue-500' :
                    methodology.color === 'yellow' ? 'bg-yellow-500' : 'bg-gray-400'
                  }`}
                  style={{ width: `${methodology.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Campañas recientes */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Proyectos Estratégicos</h3>
        <div className="space-y-3">
          {campaigns.slice(0, 5).map(campaign => (
            <div key={campaign.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                <p className="text-sm text-gray-600">Audiencia: {campaign.audience}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  campaign.status === 'Activa' 
                    ? 'bg-green-100 text-green-800' 
                    : campaign.status === 'Planificación'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {campaign.status}
                </span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${campaign.progress}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 min-w-[3rem] text-right">{campaign.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mensaje informativo */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Target className="h-5 w-5 text-blue-400 mt-0.5" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Dashboard en Desarrollo</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                Este dashboard muestra datos de ejemplo. Los componentes DashboardCard, AnalyticsChart 
                y los hooks useBusinessPlan/useCampaigns se implementarán próximamente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;