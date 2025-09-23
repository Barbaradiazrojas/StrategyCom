import Sidebar from '../../../../components/common/Sidebar';
import Header from '../../../../components/common/Header';
import './MissionVision.css';

const MissionVision = () => {
  return (
    <div className="mission-vision-container">
      <Sidebar />
      <div className="mission-vision-content">
        <Header title="Misión y Visión - Plan de Negocio" />
        <div className="content-card">
          <h1>Misión y Visión</h1>
          <p>Aquí iría el contenido específico para la misión y visión.</p>
        </div>
      </div>
    </div>
  );
};

export default MissionVision;
