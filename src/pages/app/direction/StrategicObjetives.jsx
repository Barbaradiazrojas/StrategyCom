import Sidebar from '../../../../components/common/Sidebar';
import Header from '../../../../components/common/Header';
import './StrategicObjectives.css';

const StrategicObjectives = () => {
  return (
    <div className="strategic-objectives-container">
      <Sidebar />
      <div className="strategic-objectives-content">
        <Header title="Objetivos Estratégicos - Plan de Negocio" />
        <div className="content-card">
          <h1>Objetivos Estratégicos</h1>
          <p>Aquí iría el contenido específico para los objetivos estratégicos.</p>
        </div>
      </div>
    </div>
  );
};

export default StrategicObjectives;
