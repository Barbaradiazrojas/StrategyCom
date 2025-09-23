import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import ProblemAnalysis from './pages/app/strategic/ProblemAnalysis';

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
                <a 
                  href="http://localhost:5000/health" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    background: '#10B981', 
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
            </div>
          } />
          <Route path="/problem-analysis" element={<ProblemAnalysis />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
