import Sidebar from '../../../../components/common/Sidebar';
import Header from '../../../../components/common/Header';
import './CriticalFactors.css';

const CriticalFactors = () => {
  return (
    <div className="critical-factors-container">
      <Sidebar />
      <div className="critical-factors-content">
        <Header title="Factores Críticos - Plan de Negocio" />
        <div className="content-card">
          <h1>Factores Críticos</h1>
          <p>Aquí iría el contenido específico para los factores críticos.</p>
        </div>
      </div>
    </div>
  );
};

export default CriticalFactors;
