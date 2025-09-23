// frontend/src/components/cards/DashboardCard.jsx
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const DashboardCard = ({ title, value, color, icon: Icon, trend }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 text-blue-200',
    green: 'from-green-500 to-green-600 text-green-200',
    purple: 'from-purple-500 to-purple-600 text-purple-200',
    orange: 'from-orange-500 to-orange-600 text-orange-200',
    red: 'from-red-500 to-red-600 text-red-200'
  };

  const isPositiveTrend = trend && trend.startsWith('+');

  return (
    <div className={`bg-gradient-to-r ${colorClasses[color]?.split(' ')[0]} ${colorClasses[color]?.split(' ')[1]} text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className={`text-sm opacity-90 mb-1 ${colorClasses[color]?.split(' ')[2]}`}>
            {title}
          </p>
          <p className="text-3xl font-bold mb-2">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {trend && (
            <div className="flex items-center space-x-1">
              {isPositiveTrend ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">{trend}</span>
            </div>
          )}
        </div>
        <div className="flex-shrink-0">
          <Icon className={`w-8 h-8 ${colorClasses[color]?.split(' ')[2]}`} />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;