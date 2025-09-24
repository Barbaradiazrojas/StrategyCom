import Sidebar from '../../../../components/common/Sidebar';
import Header from '../../../../components/common/Header';
import './CompetitiveAdvantage.css';

const CompetitiveAdvantage = () => {
  return (
    <div className="competitive-advantage-container">
      <Sidebar />
      <div className="competitive-advantage-content">
        <Header title="Ventaja Competitiva - Plan de Negocio" />
        <div className="content-card">
          <h1>Ventaja Competitiva</h1>
          <p>Aquí iría el contenido específico para la ventaja competitiva.</p>
        </div>
      </div>
    </div>
  );
};

export default CompetitiveAdvantage;
