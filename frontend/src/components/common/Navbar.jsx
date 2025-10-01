/* 
ARCHIVO: Navbar.jsx
RUTA: C:\Users\user\Downloads\proyecto1_strategycom\frontend\src\components\common\Navbar.jsx
*/

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  User, 
  LogIn, 
  LogOut, 
  Settings, 
  Target,
  ChevronDown,
  Mail,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const location = useLocation();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);
  const loginModalRef = useRef(null);

  // Detectar scroll para cambiar estilo del navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menús al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (loginModalRef.current && !loginModalRef.current.contains(event.target)) {
        setIsLoginModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Simular carga del usuario (esto vendría de tu contexto de autenticación)
  useEffect(() => {
    // Simular verificación de token guardado
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const navigationItems = [
    { name: 'Inicio', path: '/', exact: true },
    { name: 'Sobre Nosotros', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { 
      name: 'Herramientas', 
      path: '/tools',
      dropdown: [
        // Análisis Estratégico
        { name: 'Análisis del Problema', path: '/problem-analysis', section: 'Análisis Estratégico' },
        { name: 'Business Model Canvas', path: '/canvas-method', section: 'Análisis Estratégico' },
        { name: 'Análisis PESTEL', path: '/pestel-analysis', section: 'Análisis Estratégico' },
        { name: '5 Fuerzas de Porter', path: '/porter-forces', section: 'Análisis Estratégico' },
        { name: 'Factores Críticos', path: '/critical-factors', section: 'Análisis Estratégico' },
        { name: 'Cadena de Valor', path: '/value-chain', section: 'Análisis Estratégico' },
        { name: 'Análisis FODA', path: '/swot-analysis', section: 'Análisis Estratégico' },
        { name: 'Benchmarking', path: '/benchmarking', section: 'Análisis Estratégico' },
        { name: 'Ventajas Competitivas', path: '/competitive-advantage', section: 'Análisis Estratégico' },
        
        // Dirección Estratégica
        { name: 'Misión, Visión y Valores', path: '/mission-vision', section: 'Dirección Estratégica' },
        { name: 'Objetivos Estratégicos', path: '/strategic-objectives', section: 'Dirección Estratégica' },
        { name: 'Estrategia Genérica', path: '/generic-strategy', section: 'Dirección Estratégica' },
        { name: 'Balanced Scorecard (CMI)', path: '/balanced-scorecard', section: 'Dirección Estratégica' }
      ]
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Simulación de login (aquí conectarías con tu API)
    try {
      // Simular llamada API
      if (loginForm.email && loginForm.password) {
        const mockUser = {
          id: 1,
          name: 'Juan Pérez',
          email: loginForm.email,
          avatar: null
        };
        
        // Simular guardado en localStorage
        localStorage.setItem('authToken', 'mock-token-123');
        localStorage.setItem('userData', JSON.stringify(mockUser));
        
        setIsAuthenticated(true);
        setUser(mockUser);
        setIsLoginModalOpen(false);
        setLoginForm({ email: '', password: '' });
        
        // Redirigir al dashboard o área privada
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error en login:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUser(null);
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const isActivePath = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // Agrupar items del dropdown por sección
  const groupedDropdownItems = (items) => {
    const sections = {};
    items.forEach(item => {
      const section = item.section || 'Otras';
      if (!sections[section]) {
        sections[section] = [];
      }
      sections[section].push(item);
    });
    return sections;
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo */}
          <div className="navbar-brand">
            <Link to="/" className="brand-link">
              <Target className="brand-icon" />
              <span className="brand-text">StrategyCom</span>
            </Link>
          </div>

          {/* Navigation Items - Desktop */}
          <div className="navbar-nav desktop-nav">
            {navigationItems.map((item, index) => (
              <div key={index} className="nav-item-container">
                {item.dropdown ? (
                  <div className="nav-dropdown">
                    <button className="nav-link dropdown-toggle">
                      {item.name}
                      <ChevronDown size={16} />
                    </button>
                    <div className="dropdown-menu mega-menu">
                      {Object.entries(groupedDropdownItems(item.dropdown)).map(([section, items]) => (
                        <div key={section} className="dropdown-section">
                          <h4 className="dropdown-section-title">{section}</h4>
                          {items.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              to={subItem.path}
                              className="dropdown-item"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`nav-link ${
                      isActivePath(item.path, item.exact) ? 'active' : ''
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* User Section */}
          <div className="navbar-user">
            {isAuthenticated ? (
              <div className="user-menu" ref={userMenuRef}>
                <button 
                  className="user-button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <div className="user-avatar">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} />
                    ) : (
                      <User size={18} />
                    )}
                  </div>
                  <span className="user-name">{user?.name}</span>
                  <ChevronDown size={16} className={`chevron ${isUserMenuOpen ? 'open' : ''}`} />
                </button>
                
                {isUserMenuOpen && (
                  <div className="user-dropdown">
                    <div className="user-info">
                      <p className="user-email">{user?.email}</p>
                    </div>
                    <div className="dropdown-divider" />
                    <button className="dropdown-item" onClick={() => navigate('/profile')}>
                      <Settings size={16} />
                      Configuración
                    </button>
                    <button className="dropdown-item logout" onClick={handleLogout}>
                      <LogOut size={16} />
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                className="login-button"
                onClick={() => setIsLoginModalOpen(true)}
              >
                <LogIn size={18} />
                Iniciar Sesión
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
          {navigationItems.map((item, index) => (
            <div key={index}>
              {item.dropdown ? (
                <div className="mobile-dropdown">
                  <div className="mobile-dropdown-header">{item.name}</div>
                  {Object.entries(groupedDropdownItems(item.dropdown)).map(([section, items]) => (
                    <div key={section} className="mobile-section">
                      <div className="mobile-section-title">{section}</div>
                      {items.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          className="mobile-nav-link sub-item"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <Link
                  to={item.path}
                  className={`mobile-nav-link ${
                    isActivePath(item.path, item.exact) ? 'active' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
          
          {!isAuthenticated && (
            <button 
              className="mobile-login-button"
              onClick={() => {
                setIsLoginModalOpen(true);
                setIsMenuOpen(false);
              }}
            >
              <LogIn size={18} />
              Iniciar Sesión
            </button>
          )}
        </div>
      </nav>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="modal-overlay">
          <div className="login-modal" ref={loginModalRef}>
            <div className="modal-header">
              <h2>Iniciar Sesión</h2>
              <button 
                className="close-button"
                onClick={() => setIsLoginModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="input-container">
                  <Mail className="input-icon" size={18} />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={loginForm.email}
                    onChange={handleInputChange}
                    placeholder="tu@email.com"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <div className="input-container">
                  <Lock className="input-icon" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={loginForm.password}
                    onChange={handleInputChange}
                    placeholder="Tu contraseña"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="login-submit">
                Ingresar
              </button>

              <div className="modal-footer">
                <p>¿No tienes cuenta? <a href="/register">Regístrate aquí</a></p>
                <p><a href="/forgot-password">¿Olvidaste tu contraseña?</a></p>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;