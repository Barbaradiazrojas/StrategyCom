import Sidebar from '../../../../components/common/Sidebar';
import Header from '../../../../components/common/Header';
import './SwotAnalysis.css';

const SwotAnalysis = () => {
  return (
    <div className="swot-analysis-container">
      <Sidebar />
      <div className="swot-analysis-content">
        <Header title="Análisis FODA - Plan de Negocio" />
        <div className="content-card">
          <h1>Análisis FODA</h1>
          <p>Aquí iría el contenido específico para el análisis FODA.</p>
        </div>
      </div>
    </div>
  );
};

export default SwotAnalysis;
