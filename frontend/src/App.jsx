// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Componentes comunes
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';

// Páginas públicas
import HomePage from './pages/public/HomePage';

// Páginas de la aplicación
import Dashboard from './pages/app/Dashboard';

// Páginas de análisis estratégico
import ProblemAnalysis from './pages/app/strategic/ProblemAnalysis';
import CanvasMethod from './pages/app/strategic/CanvasMethod';
import PestelAnalysis from './pages/app/strategic/PestelAnalysis';
import PorterForces from './pages/app/strategic/PorterForces';
import ValueChain from './pages/app/strategic/ValueChain';
import SwotAnalysis from './pages/app/strategic/SwotAnalysis';
import Benchmarking from './pages/app/strategic/Benchmarking';
import CriticalFactors from './pages/app/strategic/CriticalFactors';
import CompetitiveAdvantage from './pages/app/strategic/CompetitiveAdvantage';

// Componente Layout para páginas de la app
const AppLayout = ({ children }) => {
  return (
    <div className="app-layout flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Contenido principal */}
      <div className="app-content flex-1">
        {children}
      </div>
    </div>
  );
};

// Componente Layout para páginas públicas
const PublicLayout = ({ children }) => {
  return (
    <div className="public-layout">
      {children}
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar global - aparece en todas las páginas */}
        <Navbar />
        
        {/* Contenido principal con padding-top para el navbar fijo */}
        <main className="main-content">
          <Routes>
            {/* PÁGINA PÚBLICA - HomePage SIN SIDEBAR */}
            <Route path="/" element={
              <PublicLayout>
                <HomePage />
              </PublicLayout>
            } />
            
            {/* Otras páginas públicas - Sin Sidebar */}
            <Route path="/about" element={
              <PublicLayout>
                <div className="page-container">
                  <div className="coming-soon">
                    <h1>Sobre Nosotros</h1>
                    <p>Esta página estará disponible próximamente.</p>
                    <Link to="/" className="back-home">Volver al Inicio</Link>
                  </div>
                </div>
              </PublicLayout>
            } />
            
            <Route path="/blog" element={
              <PublicLayout>
                <div className="page-container">
                  <div className="coming-soon">
                    <h1>Blog</h1>
                    <p>Nuestro blog estará disponible próximamente.</p>
                    <Link to="/" className="back-home">Volver al Inicio</Link>
                  </div>
                </div>
              </PublicLayout>
            } />

            {/* PÁGINAS DE LA APLICACIÓN - CON SIDEBAR */}
            <Route path="/dashboard" element={
              <AppLayout>
                <Dashboard />
              </AppLayout>
            } />
            
            {/* Rutas de análisis estratégico - Con Sidebar */}
            <Route path="/problem-analysis" element={
              <AppLayout>
                <ProblemAnalysis />
              </AppLayout>
            } />
            
            <Route path="/canvas-method" element={
              <AppLayout>
                <CanvasMethod />
              </AppLayout>
            } />
            
            <Route path="/pestel-analysis" element={
              <AppLayout>
                <PestelAnalysis />
              </AppLayout>
            } />
            
            <Route path="/porter-forces" element={
              <AppLayout>
                <PorterForces />
              </AppLayout>
            } />
            
            <Route path="/critical-factors" element={
              <AppLayout>
                <CriticalFactors />
              </AppLayout>
            } />
            
            <Route path="/value-chain" element={
              <AppLayout>
                <ValueChain />
              </AppLayout>
            } />
            
            <Route path="/swot-analysis" element={
              <AppLayout>
                <SwotAnalysis />
              </AppLayout>
            } />
            
            <Route path="/benchmarking" element={
              <AppLayout>
                <Benchmarking />
              </AppLayout>
            } />
            
            <Route path="/competitive-advantage" element={
              <AppLayout>
                <CompetitiveAdvantage />
              </AppLayout>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;