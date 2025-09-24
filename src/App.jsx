import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import ProblemAnalysis from './pages/app/strategic/ProblemAnalysis';
import CanvasMethod from './pages/app/strategic/CanvasMethod';
import PestelAnalysis from './pages/app/strategic/PestelAnalysis';
import PorterForces from './pages/app/strategic/PorterForces';
import ValueChain from './pages/app/strategic/ValueChain';
import Benchmarking from './pages/app/strategic/Benchmarking';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <div style={{ padding: '40px', textAlign: 'center' }}>
              <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>StrategyCom</h1>
              <p style={{ fontSize: '1.2rem', marginBottom: '30px', color: '#666' }}>
                Plataforma de Análisis Estratégico para Emprendedores
              </p>
              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link 
                  to="/problem-analysis" 
                  style={{ 
                    background: '#3B82F6', 
                    color: 'white', 
                    padding: '12px 24px', 
                    textDecoration: 'none', 
                    borderRadius: '8px',
                    fontSize: '1.1rem'
                  }}
                >
                  📊 Análisis del Problema
                </Link>
                <Link 
                  to="/canvas-method" 
                  style={{ 
                    background: '#10B981', 
                    color: 'white', 
                    padding: '12px 24px', 
                    textDecoration: 'none', 
                    borderRadius: '8px',
                    fontSize: '1.1rem'
                  }}
                >
                  🎯 Método Canvas
                </Link>
                <Link 
                  to="/pestel-analysis" 
                  style={{ 
                    background: '#8B5CF6', 
                    color: 'white', 
                    padding: '12px 24px', 
                    textDecoration: 'none', 
                    borderRadius: '8px',
                    fontSize: '1.1rem'
                  }}
                >
                  🌍 Análisis PESTEL
                </Link>
                <Link 
                  to="/porter-forces" 
                  style={{ 
                    background: '#DC2626', 
                    color: 'white', 
                    padding: '12px 24px', 
                    textDecoration: 'none', 
                    borderRadius: '8px',
                    fontSize: '1.1rem'
                  }}
                >
                  ⚔️ 5 Fuerzas de Porter
                </Link>
                <Link 
                  to="/value-chain" 
                  style={{ 
                    background: '#059669', 
                    color: 'white', 
                    padding: '12px 24px', 
                    textDecoration: 'none', 
                    borderRadius: '8px',
                    fontSize: '1.1rem'
                  }}
                >
                  🔗 Cadena de Valor
                </Link>
                <Link 
                  to="/benchmarking" 
                  style={{ 
                    background: '#F59E0B', 
                    color: 'white', 
                    padding: '12px 24px', 
                    textDecoration: 'none', 
                    borderRadius: '8px',
                    fontSize: '1.1rem'
                  }}
                >
                  📈 Benchmarking
                </Link>
                <a 
                  href="http://localhost:5000/health" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    background: '#6B7280', 
                    color: 'white', 
                    padding: '12px 24px', 
                    textDecoration: 'none', 
                    borderRadius: '8px',
                    fontSize: '1.1rem'
                  }}
                >
                  🔗 Verificar Backend
                </a>
              </div>
              
              {/* Sección de información adicional */}
              <div style={{ 
                marginTop: '50px', 
                padding: '30px', 
                background: '#f8fafc', 
                borderRadius: '12px',
                maxWidth: '1200px',
                margin: '50px auto 0'
              }}>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', color: '#374151' }}>
                  Metodologías Disponibles
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                  <div style={{ 
                    background: 'white', 
                    padding: '20px', 
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}>
                    <h3 style={{ color: '#3B82F6', marginBottom: '10px' }}>📊 Análisis del Problema</h3>
                    <p style={{ color: '#6B7280', fontSize: '0.95rem' }}>
                      Identifica y define claramente el problema que tu emprendimiento busca resolver
                    </p>
                  </div>
                  <div style={{ 
                    background: 'white', 
                    padding: '20px', 
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}>
                    <h3 style={{ color: '#10B981', marginBottom: '10px' }}>🎯 Business Model Canvas</h3>
                    <p style={{ color: '#6B7280', fontSize: '0.95rem' }}>
                      Visualiza y diseña tu modelo de negocio de forma integral en 9 bloques clave
                    </p>
                  </div>
                  <div style={{ 
                    background: 'white', 
                    padding: '20px', 
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}>
                    <h3 style={{ color: '#8B5CF6', marginBottom: '10px' }}>🌍 Análisis PESTEL</h3>
                    <p style={{ color: '#6B7280', fontSize: '0.95rem' }}>
                      Evalúa los factores del entorno: Político, Económico, Social, Tecnológico, Ecológico y Legal
                    </p>
                  </div>
                  <div style={{ 
                    background: 'white', 
                    padding: '20px', 
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}>
                    <h3 style={{ color: '#DC2626', marginBottom: '10px' }}>⚔️ 5 Fuerzas de Porter</h3>
                    <p style={{ color: '#6B7280', fontSize: '0.95rem' }}>
                      Analiza la competitividad y atractividad de tu industria mediante 5 fuerzas clave
                    </p>
                  </div>
                  <div style={{ 
                    background: 'white', 
                    padding: '20px', 
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}>
                    <h3 style={{ color: '#059669', marginBottom: '10px' }}>🔗 Cadena de Valor</h3>
                    <p style={{ color: '#6B7280', fontSize: '0.95rem' }}>
                      Analiza las actividades internas de tu empresa para identificar ventajas competitivas
                    </p>
                  </div>
                  <div style={{ 
                    background: 'white', 
                    padding: '20px', 
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}>
                    <h3 style={{ color: '#F59E0B', marginBottom: '10px' }}>📈 Benchmarking</h3>
                    <p style={{ color: '#6B7280', fontSize: '0.95rem' }}>
                      Compara y evalúa tu empresa contra competidores y mejores prácticas de la industria
                    </p>
                  </div>
                </div>
              </div>

              {/* Flujo de metodologías */}
              <div style={{ 
                marginTop: '40px', 
                padding: '25px', 
                background: 'linear-gradient(135deg, #667eea20 0%, #764ba220 100%)', 
                borderRadius: '12px',
                maxWidth: '1200px',
                margin: '40px auto 0'
              }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '15px', color: '#374151' }}>
                  Flujo Recomendado
                </h3>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  gap: '12px',
                  flexWrap: 'wrap'
                }}>
                  <span style={{ 
                    background: '#3B82F6', 
                    color: 'white', 
                    padding: '8px 16px', 
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    1. Problema
                  </span>
                  <span style={{ color: '#6B7280', fontSize: '1.2rem' }}>→</span>
                  <span style={{ 
                    background: '#10B981', 
                    color: 'white', 
                    padding: '8px 16px', 
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    2. Canvas
                  </span>
                  <span style={{ color: '#6B7280', fontSize: '1.2rem' }}>→</span>
                  <span style={{ 
                    background: '#8B5CF6', 
                    color: 'white', 
                    padding: '8px 16px', 
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    3. PESTEL
                  </span>
                  <span style={{ color: '#6B7280', fontSize: '1.2rem' }}>→</span>
                  <span style={{ 
                    background: '#DC2626', 
                    color: 'white', 
                    padding: '8px 16px', 
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    4. Porter
                  </span>
                  <span style={{ color: '#6B7280', fontSize: '1.2rem' }}>→</span>
                  <span style={{ 
                    background: '#059669', 
                    color: 'white', 
                    padding: '8px 16px', 
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    5. Cadena de Valor
                  </span>
                  <span style={{ color: '#6B7280', fontSize: '1.2rem' }}>→</span>
                  <span style={{ 
                    background: '#F59E0B', 
                    color: 'white', 
                    padding: '8px 16px', 
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    6. Benchmarking
                  </span>
                </div>
                <p style={{ 
                  fontSize: '0.85rem', 
                  color: '#6B7280', 
                  marginTop: '15px',
                  lineHeight: '1.5',
                  textAlign: 'center'
                }}>
                  Define el problema → Diseña tu modelo de negocio → Analiza el entorno → Evalúa la competitividad → 
                  Examina actividades internas → Compara con la competencia
                </p>
              </div>

              {/* Información adicional sobre la Cadena de Valor */}
              <div style={{ 
                marginTop: '30px', 
                padding: '20px', 
                background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)', 
                borderRadius: '12px',
                maxWidth: '1000px',
                margin: '30px auto 0',
                border: '1px solid #a7f3d0'
              }}>
                <h4 style={{ 
                  fontSize: '1.2rem', 
                  marginBottom: '12px', 
                  color: '#065f46',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}>
                  🔗 ¿Por qué usar la Cadena de Valor?
                </h4>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                  gap: '15px',
                  marginTop: '15px'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>⚡</div>
                    <p style={{ color: '#047857', fontSize: '0.9rem', margin: 0, fontWeight: '600' }}>
                      Identifica Eficiencias
                    </p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>💰</div>
                    <p style={{ color: '#047857', fontSize: '0.9rem', margin: 0, fontWeight: '600' }}>
                      Optimiza Costos
                    </p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🎯</div>
                    <p style={{ color: '#047857', fontSize: '0.9rem', margin: 0, fontWeight: '600' }}>
                      Ventaja Competitiva
                    </p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📊</div>
                    <p style={{ color: '#047857', fontSize: '0.9rem', margin: 0, fontWeight: '600' }}>
                      Análisis Interno
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer con información del proyecto */}
              <div style={{ 
                marginTop: '40px', 
                padding: '20px',
                borderTop: '1px solid #e5e7eb',
                color: '#6B7280',
                fontSize: '0.9rem'
              }}>
                <p>🚀 Proyecto de Título - Full Stack Development</p>
                <p>Tecnologías: React • Node.js • Express • PostgreSQL</p>
                <p style={{ fontSize: '0.8rem', marginTop: '10px' }}>
                  ✨ Ahora con análisis completo de Cadena de Valor
                </p>
              </div>
            </div>
          } />
          <Route path="/problem-analysis" element={<ProblemAnalysis />} />
          <Route path="/canvas-method" element={<CanvasMethod />} />
          <Route path="/pestel-analysis" element={<PestelAnalysis />} />
          <Route path="/porter-forces" element={<PorterForces />} />
          <Route path="/value-chain" element={<ValueChain />} />
          <Route path="/benchmarking" element={<Benchmarking />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;