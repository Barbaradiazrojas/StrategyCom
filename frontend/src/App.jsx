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

// ==================== ANÁLISIS ESTRATÉGICO ====================
import ProblemAnalysis from './pages/app/strategic/ProblemAnalysis';
import CanvasMethod from './pages/app/strategic/CanvasMethod';
import PestelAnalysis from './pages/app/strategic/PestelAnalysis';
import PorterForces from './pages/app/strategic/PorterForces';
import ValueChain from './pages/app/strategic/ValueChain';
import SwotAnalysis from './pages/app/strategic/SwotAnalysis';
import Benchmarking from './pages/app/strategic/Benchmarking';
import CriticalFactors from './pages/app/strategic/CriticalFactors';
import CompetitiveAdvantage from './pages/app/strategic/CompetitiveAdvantage';

// ==================== DIRECCIÓN ESTRATÉGICA ====================
import MissionVision from './pages/app/direction/MissionVission';
import StrategicObjectives from './pages/app/direction/StrategicObjectives';
import GenericStrategy from './pages/app/direction/GenericStrategy';
import BalancedScorecard from './pages/app/direction/BalancedScorecard';

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
            {/* ================================================ */}
            {/*           PÁGINAS PÚBLICAS - SIN SIDEBAR         */}
            {/* ================================================ */}
            
            <Route path="/" element={
              <PublicLayout>
                <HomePage />
              </PublicLayout>
            } />
            
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

            {/* ================================================ */}
            {/*                    DASHBOARD                     */}
            {/* ================================================ */}
            
            <Route path="/dashboard" element={
              <AppLayout>
                <Dashboard />
              </AppLayout>
            } />
            
            {/* ================================================ */}
            {/*              ANÁLISIS ESTRATÉGICO                */}
            {/* ================================================ */}
            
            {/* Análisis del Problema */}
            <Route path="/problem-analysis" element={
              <AppLayout>
                <ProblemAnalysis />
              </AppLayout>
            } />
            
            {/* Business Model Canvas */}
            <Route path="/canvas-method" element={
              <AppLayout>
                <CanvasMethod />
              </AppLayout>
            } />
            
            {/* Análisis PESTEL */}
            <Route path="/pestel-analysis" element={
              <AppLayout>
                <PestelAnalysis />
              </AppLayout>
            } />
            
            {/* 5 Fuerzas de Porter */}
            <Route path="/porter-forces" element={
              <AppLayout>
                <PorterForces />
              </AppLayout>
            } />
            
            {/* Factores Críticos de Éxito */}
            <Route path="/critical-factors" element={
              <AppLayout>
                <CriticalFactors />
              </AppLayout>
            } />
            
            {/* Cadena de Valor */}
            <Route path="/value-chain" element={
              <AppLayout>
                <ValueChain />
              </AppLayout>
            } />
            
            {/* Análisis FODA/SWOT */}
            <Route path="/swot-analysis" element={
              <AppLayout>
                <SwotAnalysis />
              </AppLayout>
            } />
            
            {/* Benchmarking */}
            <Route path="/benchmarking" element={
              <AppLayout>
                <Benchmarking />
              </AppLayout>
            } />
            
            {/* Ventaja Competitiva */}
            <Route path="/competitive-advantage" element={
              <AppLayout>
                <CompetitiveAdvantage />
              </AppLayout>
            } />

            {/* ================================================ */}
            {/*             DIRECCIÓN ESTRATÉGICA                */}
            {/* ================================================ */}
            
            {/* Misión, Visión y Valores */}
            <Route path="/mission-vision" element={
              <AppLayout>
                <MissionVision />
              </AppLayout>
            } />
            
            {/* Objetivos Estratégicos con método SMART */}
            <Route path="/strategic-objectives" element={
              <AppLayout>
                <StrategicObjectives />
              </AppLayout>
            } />
            
            {/* Estrategia Genérica (Porter) */}
            <Route path="/generic-strategy" element={
              <AppLayout>
                <GenericStrategy />
              </AppLayout>
            } />
            
            {/* Balanced Scorecard (CMI) */}
            <Route path="/balanced-scorecard" element={
              <AppLayout>
                <BalancedScorecard />
              </AppLayout>
            } />

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;