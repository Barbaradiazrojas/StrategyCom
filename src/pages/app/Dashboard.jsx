// frontend/src/pages/app/Dashboard.jsx
import React from 'react';
import { Target, MessageSquare, Users, BarChart3 } from 'lucide-react';
import DashboardCard from '../../components/cards/DashboardCard';
import AnalyticsChart from '../../components/charts/AnalyticsChart';
import { useBusinessPlan } from '../../hooks/useBusinessPlan';
import { useApi } from '../../hooks/useApi';

const Dashboard = () => {
  const { businessPlan, loading } = useBusinessPlan();
  const { get } = useApi();
  const [campaigns, setCampaigns] = React.useState([]);
  const [metrics, setMetrics] = React.useState(null);

  // Cargar datos al montar el componente
  React.useEffect(() => {
    const loadData = async () => {
      try {
        const [campaignsData, metricsData] = await Promise.all([
          get('/strategic'),
          get('/strategic/metrics')
        ]);
        
        setCampaigns(campaignsData.data || []);
        setMetrics(metricsData.data || {});
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
    };

    loadData();
  }, [get]);

  const dashboardMetrics = [
    {
      title: 'Campañas Activas',
      value: metrics?.activeCampaigns || 12,
      color: 'blue',
      icon: Target,
      trend: '+15%'
    },
    {
      title: 'Mensajes Enviados',
      value: metrics?.messagesSent || 847,
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

  if (loading) {
    return <div className="flex justify-center items-center h-64">Cargando...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardMetrics.map((metric, index) => (
          <DashboardCard key={index} {...metric} />
        ))}
      </div>

      {/* Gráficos de análisis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart 
          title="Progreso de Campañas"
          data={campaigns}
          type="progress"
        />
        <AnalyticsChart 
          title="Engagement Mensual"
          data={metrics?.monthlyEngagement}
          type="line"
        />
      </div>

      {/* Campañas recientes */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Campañas Recientes</h3>
        <div className="space-y-3">
          {campaigns?.slice(0, 5).map(campaign => (
            <div key={campaign.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium">{campaign.name}</h4>
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
                <span className="text-sm text-gray-600">{campaign.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;