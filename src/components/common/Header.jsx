// frontend/src/components/common/Header.jsx
import React, { useState } from 'react';
import { MessageSquare, Settings, Bell, Search, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Header = ({ onMenuToggle, isSidebarOpen }) => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, message: 'Nueva campaña creada exitosamente', time: '5 min', type: 'success' },
    { id: 2, message: 'Aprobación pendiente en mensaje X', time: '15 min', type: 'warning' },
    { id: 3, message: 'Métricas semanales disponibles', time: '1 hora', type: 'info' }
  ];

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo y botón de menú */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuToggle}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors lg:hidden"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <MessageSquare size={24} />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 hidden sm:block">
                STrategyCom
              </h1>
            </div>
          </div>

          {/* Barra de búsqueda */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar campañas, mensajes..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Acciones del usuario */}
          <div className="flex items-center space-x-4">
            {/* Notificaciones */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative"
              >
                <Bell size={20} />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>

              {/* Dropdown de notificaciones */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold">Notificaciones</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                        <div className="flex justify-between items-start">
                          <p className="text-sm text-gray-800">{notification.message}</p>
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 text-center">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Ver todas las notificaciones
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Configuraciones */}
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Settings size={20} />
            </button>

            {/* Menú de usuario */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <span className="hidden sm:block text-sm font-medium text-gray-700">
                  {user?.name || 'Usuario'}
                </span>
              </button>

              {/* Dropdown del usuario */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <div className="py-2">
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                      <User size={16} />
                      <span>Mi Perfil</span>
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                      <Settings size={16} />
                      <span>Configuración</span>
                    </button>
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                    >
                      <LogOut size={16} />
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay para cerrar menús */}
      {(showUserMenu || showNotifications) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowUserMenu(false);
            setShowNotifications(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;