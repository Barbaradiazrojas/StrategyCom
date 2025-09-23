import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Páginas de la aplicación
import Dashboard from './pages/app/Dashboard';
import CanvasMethod from './pages/app/strategic/CanvasMethod';
import ProblemAnalysis from './pages/app/strategic/ProblemAnalysis';
import PestelAnalysis from './pages/app/strategic/PestelAnalysis';
import PorterForces from './pages/app/strategic/PorterForces';
import Benchmarking from './pages/app/strategic/Benchmarking';
import ValueChain from './pages/app/strategic/ValueChain';
import SwotAnalysis from './pages/app/strategic/SwotAnalysis';
import CriticalFactors from './pages/app/strategic/CriticalFactors';
import CompetitiveAdvantage from './pages/app/strategic/CompetitiveAdvantage';
import MissionVision from './pages/app/direction/MissionVision';
import StrategicObjectives from './pages/app/direction/StrategicObjectives';
import GenericStrategy from './pages/app/direction/GenericStrategy';
import BalancedScorecard from './pages/app/direction/BalancedScorecard';
import MarketingObjectives from './pages/app/marketing/MarketingObjectives';
import Segmentation from './pages/app/marketing/Segmentation';
import MarketResearch from './pages/app/marketing/MarketResearch';
import AnsoffMatrix from './pages/app/marketing/AnsoffMatrix';
import Positioning from './pages/app/marketing/Positioning';
import MarketingMix from './pages/app/marketing/MarketingMix';
import DemandForecast from './pages/app/marketing/DemandForecast';
import MarketingBudget from './pages/app/marketing/MarketingBudget';
import HRObjectives from './pages/app/hr/HRObjectives';
import OrganizationalStructure from './pages/app/hr/OrganizationalStructure';
import HRPolicies from './pages/app/hr/HRPolicies';
import OperationsObjectives from './pages/app/operations/OperationsObjectives';
import FlowDiagram from './pages/app/operations/FlowDiagram';
import GanttChart from './pages/app/operations/GanttChart';
import OperationsBudget from './pages/app/operations/OperationsBudget';
import FinancialObjectives from './pages/app/financial/FinancialObjectives';
import RevenueEstimation from './pages/app/financial/RevenueEstimation';
import InitialInvestment from './pages/app/financial/InitialInvestment';
import Depreciation from './pages/app/financial/Depreciation';
import CashFlow from './pages/app/financial/CashFlow';
import WorkingCapital from './pages/app/financial/WorkingCapital';
import CreditAnalysis from './pages/app/financial/CreditAnalysis';
import FinancedFlow from './pages/app/financial/FinancedFlow';
import SensitivityAnalysis from './pages/app/financial/SensitivityAnalysis';
import ScenarioAnalysis from './pages/app/financial/ScenarioAnalysis';
import RiskAnalysis from './pages/app/financial/RiskAnalysis';

// Páginas públicas
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import MilestonesPage from './pages/public/MilestonesPage';
import BlogPage from './pages/public/BlogPage';

// Páginas de autenticación
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/milestones" element={<MilestonesPage />} />
        <Route path="/blog" element={<BlogPage />} />

        {/* Rutas de autenticación */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Rutas de la aplicación */}
        <Route path="/app/dashboard" element={<Dashboard />} />

        {/* Rutas de Análisis Estratégico */}
        <Route path="/app/strategic/problem" element={<ProblemAnalysis />} />
        <Route path="/app/strategic/canvas" element={<CanvasMethod />} />
        <Route path="/app/strategic/pestel" element={<PestelAnalysis />} />
        <Route path="/app/strategic/porter" element={<PorterForces />} />
        <Route path="/app/strategic/benchmarking" element={<Benchmarking />} />
        <Route path="/app/strategic/value-chain" element={<ValueChain />} />
        <Route path="/app/strategic/swot" element={<SwotAnalysis />} />
        <Route path="/app/strategic/critical-factors" element={<CriticalFactors />} />
        <Route path="/app/strategic/competitive-advantage" element={<CompetitiveAdvantage />} />

        {/* Rutas de Dirección Estratégica */}
        <Route path="/app/direction/mission-vision" element={<MissionVision />} />
        <Route path="/app/direction/strategic-objectives" element={<StrategicObjectives />} />
        <Route path="/app/direction/generic-strategy" element={<GenericStrategy />} />
        <Route path="/app/direction/balanced-scorecard" element={<BalancedScorecard />} />

        {/* Rutas de Plan de Marketing */}
        <Route path="/app/marketing/objectives" element={<MarketingObjectives />} />
        <Route path="/app/marketing/segmentation" element={<Segmentation />} />
        <Route path="/app/marketing/market-research" element={<MarketResearch />} />
        <Route path="/app/marketing/ansoff-matrix" element={<AnsoffMatrix />} />
        <Route path="/app/marketing/positioning" element={<Positioning />} />
        <Route path="/app/marketing/marketing-mix" element={<MarketingMix />} />
        <Route path="/app/marketing/demand-forecast" element={<DemandForecast />} />
        <Route path="/app/marketing/marketing-budget" element={<MarketingBudget />} />

        {/* Rutas de Recursos Humanos */}
        <Route path="/app/hr/objectives" element={<HRObjectives />} />
        <Route path="/app/hr/organizational-structure" element={<OrganizationalStructure />} />
        <Route path="/app/hr/policies" element={<HRPolicies />} />

        {/* Rutas de Operaciones */}
        <Route path="/app/operations/objectives" element={<OperationsObjectives />} />
        <Route path="/app/operations/flow-diagram" element={<FlowDiagram />} />
        <Route path="/app/operations/gantt-chart" element={<GanttChart />} />
        <Route path="/app/operations/operations-budget" element={<OperationsBudget />} />

        {/* Rutas de Plan Financiero */}
        <Route path="/app/financial/objectives" element={<FinancialObjectives />} />
        <Route path="/app/financial/revenue-estimation" element={<RevenueEstimation />} />
        <Route path="/app/financial/initial-investment" element={<InitialInvestment />} />
        <Route path="/app/financial/depreciation" element={<Depreciation />} />
        <Route path="/app/financial/cash-flow" element={<CashFlow />} />
        <Route path="/app/financial/working-capital" element={<WorkingCapital />} />
        <Route path="/app/financial/credit-analysis" element={<CreditAnalysis />} />
        <Route path="/app/financial/financed-flow" element={<FinancedFlow />} />
        <Route path="/app/financial/sensitivity-analysis" element={<SensitivityAnalysis />} />
        <Route path="/app/financial/scenario-analysis" element={<ScenarioAnalysis />} />
        <Route path="/app/financial/risk-analysis" element={<RiskAnalysis />} />
      </Routes>
    </Router>
  );
};

export default App;
