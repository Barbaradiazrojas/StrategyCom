<div className="app-container">
  <Sidebar />
  <div className="main-content">
    <div className="topbar">
      <h5 id="page-title">Dashboard - Plan de Negocio</h5>
      <div>
        <button className="btn btn-primary me-2">
          <i className="fas fa-save me-1"></i>Guardar
        </button>
        <button className="btn btn-outline-primary">
          <i className="fas fa-download me-1"></i>Exportar PDF
        </button>
      </div>
    </div>
    <div className="content-area">
      <div className="section-header">
        <h1 className="section-title">Dashboard General</h1>
        <span className="badge bg-success">75% Completado</span>
      </div>
      <div className="dashboard-cards">
        <DashboardCard
          icon="fas fa-chart-line"
          title="Análisis Estratégico"
          subtitle="8 de 9 secciones completadas"
          progress={89}
          color="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        />
        {/* Más tarjetas */}
      </div>
      <div className="row">
        <div className="col-md-8">
          <div className="content-card">
            <h5 className="mb-3">Próximas Tareas</h5>
            <div className="list-group list-group-flush">
              <div className="list-group-item">
                <div>
                  <h6 className="mb-1">Completar Control Estratégico (CMI)</h6>
                  <p className="mb-1 text-muted">Definir indicadores y metas del Cuadro de Mando Integral</p>
                </div>
                <span className="badge bg-primary rounded-pill">Pendiente</span>
              </div>
              {/* Más elementos de la lista */}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="content-card">
            <h5 className="mb-3">Progreso General</h5>
            <div className="text-center">
              <div className="progress-circle">
                <svg viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#e2e8f0" strokeWidth="10"></circle>
                  <circle cx="60" cy="60" r="50" fill="none" stroke="var(--primary-color)" strokeWidth="10" strokeDasharray="314" strokeDashoffset="78.5" transform="rotate(-90 60 60)"></circle>
                </svg>
                <div className="progress-circle-text">
                  <div>75%</div>
                  <div>completado</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
