import './DashboardCard.css';

const DashboardCard = ({ icon, title, subtitle, progress, color }) => {
  return (
    <div className="dashboard-card">
      <div className="card-icon" style={{ background: color }}>
        <i className={icon}></i>
      </div>
      <div className="card-title">{title}</div>
      <div className="card-subtitle">{subtitle}</div>
      <div className="progress-indicator">
        <div className="progress">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <small className="text-muted mt-1">{progress}% completado</small>
      </div>
    </div>
  );
};

export default DashboardCard;
