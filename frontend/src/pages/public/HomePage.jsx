/* 
ARCHIVO: HomePage.jsx
RUTA: C:\Users\user\Downloads\proyecto1_strategycom\frontend\src\pages\public\HomePage.jsx
*/

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle, 
  Target, 
  TrendingUp, 
  Users, 
  BarChart3, 
  Lightbulb, 
  Shield, 
  Zap,
  Play,
  Star,
  ChevronDown,
  Award,
  Globe,
  Briefcase
} from 'lucide-react';
import './HomePage.css';

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: Target,
      title: "Análisis Estratégico Integral",
      description: "Canvas, PESTEL, Porter, FODA y más herramientas en una plataforma unificada",
      color: "blue"
    },
    {
      icon: BarChart3,
      title: "Datos Financieros Reales",
      description: "Factores críticos con datos reales de industrias para decisiones informadas",
      color: "green"
    },
    {
      icon: TrendingUp,
      title: "Ventajas Competitivas",
      description: "Identifica y desarrolla ventajas sustentables basadas en análisis profundo",
      color: "purple"
    },
    {
      icon: Users,
      title: "Para Emprendedores",
      description: "Diseñado específicamente para startups y pequeñas empresas en crecimiento",
      color: "orange"
    },
    {
      icon: Lightbulb,
      title: "Metodología Probada",
      description: "Basado en frameworks académicos y mejores prácticas empresariales",
      color: "red"
    },
    {
      icon: Shield,
      title: "Plan de Acción Claro",
      description: "Convierte el análisis en estrategias concretas y pasos implementables",
      color: "indigo"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Define el Problema",
      description: "Identifica claramente el problema que tu emprendimiento busca resolver"
    },
    {
      number: "02", 
      title: "Analiza el Entorno",
      description: "Usa PESTEL y Porter para entender el mercado y la competencia"
    },
    {
      number: "03",
      title: "Identifica Factores Críticos",
      description: "Descubre qué elementos son clave para el éxito en tu industria"
    },
    {
      number: "04",
      title: "Desarrolla Ventajas",
      description: "Crea ventajas competitivas sustentables basadas en tu análisis"
    }
  ];

  const testimonials = [
    {
      name: "María González",
      role: "Fundadora, TechStart",
      content: "StrategyCom me ayudó a estructurar mi idea de negocio de manera profesional. Las herramientas son intuitivas y los resultados, increíbles.",
      rating: 5
    },
    {
      name: "Carlos Mendoza", 
      role: "CEO, GreenSolutions",
      content: "La integración de todas las metodologías en una plataforma me ahorró semanas de trabajo. Recomendado 100%.",
      rating: 5
    },
    {
      name: "Ana Rodríguez",
      role: "Emprendedora, FoodTech",
      content: "Los datos financieros reales me dieron la confianza necesaria para presentar mi plan a inversores.",
      rating: 5
    }
  ];

  const stats = [
    { number: "500+", label: "Emprendedores" },
    { number: "50+", label: "Industrias" },
    { number: "9", label: "Metodologías" },
    { number: "95%", label: "Satisfacción" }
  ];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-gradient"></div>
          <div className="hero-pattern"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-text">Plataforma #1 para Emprendedores</span>
            <Award size={16} />
          </div>
          
          <h1 className={`hero-title ${isVisible ? 'animate-in' : ''}`}>
            Transforma tu Idea en un
            <span className="title-highlight"> Plan Estratégico</span>
            <br />Profesional
          </h1>
          
          <p className={`hero-subtitle ${isVisible ? 'animate-in' : ''}`}>
            La plataforma integral que combina las mejores metodologías de análisis estratégico 
            para convertir tu emprendimiento en un negocio exitoso y sustentable.
          </p>
          
          <div className={`hero-actions ${isVisible ? 'animate-in' : ''}`}>
            <Link to="/problem-analysis" className="cta-primary">
              Comenzar Ahora
              <ArrowRight size={20} />
            </Link>
            
            <button className="cta-secondary">
              <Play size={18} />
              Ver Demo
            </button>
          </div>
          
          <div className="hero-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="scroll-indicator">
          <ChevronDown size={24} />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Todo lo que necesitas para 
              <span className="text-gradient"> Triunfar</span>
            </h2>
            <p className="section-subtitle">
              Herramientas profesionales diseñadas específicamente para emprendedores ambiciosos
            </p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className={`feature-card ${feature.color}`}>
                <div className="feature-icon">
                  <feature.icon size={24} />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <div className="feature-glow"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Cómo Funciona
              <span className="text-gradient"> StrategyCom</span>
            </h2>
            <p className="section-subtitle">
              Un proceso simple y estructurado para desarrollar tu estrategia empresarial
            </p>
          </div>
          
          <div className="steps-container">
            {steps.map((step, index) => (
              <div key={index} className="step-item">
                <div className="step-number">{step.number}</div>
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
                {index < steps.length - 1 && <div className="step-connector"></div>}
              </div>
            ))}
          </div>
          
          <div className="process-cta">
            <Link to="/problem-analysis" className="cta-primary">
              Iniciar Proceso Estratégico
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <div className="benefits-content">
            <div className="benefits-text">
              <h2 className="benefits-title">
                ¿Por qué elegir
                <span className="text-gradient"> StrategyCom?</span>
              </h2>
              
              <div className="benefits-list">
                <div className="benefit-item">
                  <CheckCircle className="benefit-check" />
                  <div>
                    <h4>Metodología Académica Probada</h4>
                    <p>Basado en frameworks reconocidos mundialmente</p>
                  </div>
                </div>
                
                <div className="benefit-item">
                  <CheckCircle className="benefit-check" />
                  <div>
                    <h4>Datos Financieros Reales</h4>
                    <p>Información actual de más de 50 industrias</p>
                  </div>
                </div>
                
                <div className="benefit-item">
                  <CheckCircle className="benefit-check" />
                  <div>
                    <h4>Interfaz Intuitiva y Moderna</h4>
                    <p>Diseño centrado en la experiencia del usuario</p>
                  </div>
                </div>
                
                <div className="benefit-item">
                  <CheckCircle className="benefit-check" />
                  <div>
                    <h4>Resultados Implementables</h4>
                    <p>No solo análisis, sino planes de acción concretos</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="benefits-visual">
              <div className="visual-card main-card">
                <div className="card-header">
                  <Briefcase size={24} />
                  <span>Tu Plan Estratégico</span>
                </div>
                <div className="card-progress">
                  <div className="progress-item completed">
                    <CheckCircle size={16} />
                    <span>Análisis del Problema</span>
                  </div>
                  <div className="progress-item completed">
                    <CheckCircle size={16} />
                    <span>Canvas Method</span>
                  </div>
                  <div className="progress-item active">
                    <div className="progress-dot active"></div>
                    <span>Análisis PESTEL</span>
                  </div>
                  <div className="progress-item">
                    <div className="progress-dot"></div>
                    <span>5 Fuerzas Porter</span>
                  </div>
                </div>
              </div>
              
              <div className="visual-card stats-card">
                <Globe size={20} />
                <span className="stats-number">85%</span>
                <span className="stats-label">Éxito Empresarial</span>
              </div>
              
              <div className="visual-card trend-card">
                <TrendingUp size={20} />
                <div className="trend-line"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Lo que dicen nuestros
              <span className="text-gradient"> Emprendedores</span>
            </h2>
          </div>
          
          <div className="testimonial-container">
            <div className="testimonial-content">
              <div className="testimonial-stars">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>
              
              <blockquote className="testimonial-quote">
                "{testimonials[activeTestimonial].content}"
              </blockquote>
              
              <div className="testimonial-author">
                <div className="author-info">
                  <h4 className="author-name">{testimonials[activeTestimonial].name}</h4>
                  <p className="author-role">{testimonials[activeTestimonial].role}</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-navigation">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  className={`nav-dot ${activeTestimonial === index ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-background">
          <div className="cta-gradient"></div>
          <div className="cta-pattern"></div>
        </div>
        
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">
              ¿Listo para transformar tu idea en realidad?
            </h2>
            <p className="cta-subtitle">
              Únete a cientos de emprendedores que ya están construyendo el futuro con StrategyCom
            </p>
            
            <div className="cta-actions">
              <Link to="/problem-analysis" className="cta-primary large">
                Empezar Gratis Ahora
                <ArrowRight size={24} />
              </Link>
              
              <Link to="/about" className="cta-secondary">
                Conocer Más del Proyecto
              </Link>
            </div>
            
            <p className="cta-note">
              Sin tarjeta de crédito • Acceso inmediato • Soporte incluido
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;