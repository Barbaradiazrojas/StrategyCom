import Sidebar from '../../../components/common/Sidebar';
import Header from '../../../components/common/Header';
import './CanvasMethod.css';

const CanvasMethod = () => {
  return (
    <div className="canvas-container">
      <Sidebar />
      <div className="canvas-content">
        <Header title="Metodología Canvas - Plan de Negocio" />

        <div className="content-card">
          <div className="breadcrumb mb-4">
            <a href="#" className="breadcrumb-item">Dashboard</a>
            <span className="breadcrumb-item active">Metodología Canvas</span>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="section-title m-0">Modelo de Negocio Canvas</h1>
            <button className="btn btn-primary">
              <i className="fas fa-plus me-1"></i>Agregar Elemento
            </button>
          </div>

          <div className="canvas-grid">
            <div className="canvas-box" style={{ gridArea: 'socios' }}>
              <div className="canvas-title">Socios Clave</div>
              <small className="text-muted">¿Quiénes son nuestros socios y proveedores clave?</small>
            </div>

            <div className="canvas-box" style={{ gridArea: 'actividades' }}>
              <div className="canvas-title">Actividades Clave</div>
              <small className="text-muted">¿Qué actividades clave requiere nuestra propuesta de valor?</small>
            </div>

            <div className="canvas-box" style={{ gridArea: 'propuesta' }}>
              <div className="canvas-title">Propuesta de Valor</div>
              <small className="text-muted">¿Qué valor entregamos al cliente?</small>
            </div>

            <div className="canvas-box" style={{ gridArea: 'clientes' }}>
              <div className="canvas-title">Segmento de Clientes</div>
              <small className="text-muted">¿Para quién creamos valor?</small>
            </div>

            <div className="canvas-box" style={{ gridArea: 'relacion' }}>
              <div className="canvas-title">Relación con Clientes</div>
              <small className="text-muted">¿Qué tipo de relación establecemos?</small>
            </div>

            <div className="canvas-box" style={{ gridArea: 'recursos' }}>
              <div className="canvas-title">Recursos Clave</div>
              <small className="text-muted">¿Qué recursos clave requiere nuestra propuesta de valor?</small>
            </div>

            <div className="canvas-box" style={{ gridArea: 'canales' }}>
              <div className="canvas-title">Canales</div>
              <small className="text-muted">¿A través de qué canales llegar a nuestros clientes?</small>
            </div>

            <div className="canvas-box" style={{ gridArea: 'costos' }}>
              <div className="canvas-title">Estructura de Costos</div>
              <small className="text-muted">¿Cuáles son los costos más importantes en nuestro modelo de negocio?</small>
            </div>

            <div className="canvas-box" style={{ gridArea: 'ingresos' }}>
              <div className="canvas-title">Fuentes de Ingresos</div>
              <small className="text-muted">¿Por qué valor están dispuestos a pagar nuestros clientes?</small>
            </div>
          </div>

          <div className="btn-group mt-4">
            <button className="btn btn-success me-2">
              <i className="fas fa-save me-1"></i>Guardar Canvas
            </button>
            <button className="btn btn-outline-primary">
              <i className="fas fa-download me-1"></i>Exportar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanvasMethod;
