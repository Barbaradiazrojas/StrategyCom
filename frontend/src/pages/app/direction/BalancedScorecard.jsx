// frontend/src/pages/app/direction/BalancedScorecard.jsx
import React, { useState } from 'react';
import { Save, Edit2, CheckCircle, PieChart, Plus, Trash2 } from 'lucide-react';
import './BalancedScorecard.css';

const BalancedScorecard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [perspectives, setPerspectives] = useState([
    {
      id: 1,
      name: 'Financiera',
      color: '#10b981',
      objectives: [
        {
          id: 1,
          strategicObjective: 'ROI',
          indicator: '',
          goal: '',
          initiative: '',
          responsible: 'Gte Finanzas'
        },
        {
          id: 2,
          strategicObjective: 'PAYBACK',
          indicator: '',
          goal: '',
          initiative: '',
          responsible: 'Gte Ventas'
        }
      ]
    },
    {
      id: 2,
      name: 'Clientes',
      color: '#3b82f6',
      objectives: [
        {
          id: 1,
          strategicObjective: 'Encuesta NPS',
          indicator: '',
          goal: '',
          initiative: '',
          responsible: 'Atención al cliente'
        },
        {
          id: 2,
          strategicObjective: 'Número de Ventas semanales, mensuales y anuales',
          indicator: '',
          goal: '',
          initiative: '',
          responsible: 'Mkt'
        }
      ]
    },
    {
      id: 3,
      name: 'Procesos Internos',
      color: '#f59e0b',
      objectives: [
        {
          id: 1,
          strategicObjective: 'Costo Unitario de los productos',
          indicator: '',
          goal: '',
          initiative: '',
          responsible: 'Gte Producción'
        },
        {
          id: 2,
          strategicObjective: 'Tiempo de preparación por cada línea de producto',
          indicator: '',
          goal: '',
          initiative: '',
          responsible: 'Gte de Logística'
        }
      ]
    },
    {
      id: 4,
      name: 'Aprendizaje y Crecimiento',
      color: '#8b5cf6',
      objectives: [
        {
          id: 1,
          strategicObjective: 'Encuesta NPS',
          indicator: '',
          goal: '',
          initiative: '',
          responsible: 'Gte de RRHH'
        }
      ]
    }
  ]);

  const handleObjectiveChange = (perspectiveId, objectiveId, field, value) => {
    setPerspectives(prev => prev.map(perspective => {
      if (perspective.id === perspectiveId) {
        return {
          ...perspective,
          objectives: perspective.objectives.map(obj => {
            if (obj.id === objectiveId) {
              return { ...obj, [field]: value };
            }
            return obj;
          })
        };
      }
      return perspective;
    }));
  };

  const addObjective = (perspectiveId) => {
    setPerspectives(prev => prev.map(perspective => {
      if (perspective.id === perspectiveId) {
        const newObjective = {
          id: perspective.objectives.length + 1,
          strategicObjective: '',
          indicator: '',
          goal: '',
          initiative: '',
          responsible: ''
        };
        return {
          ...perspective,
          objectives: [...perspective.objectives, newObjective]
        };
      }
      return perspective;
    }));
  };

  const removeObjective = (perspectiveId, objectiveId) => {
    setPerspectives(prev => prev.map(perspective => {
      if (perspective.id === perspectiveId) {
        return {
          ...perspective,
          objectives: perspective.objectives.filter(obj => obj.id !== objectiveId)
        };
      }
      return perspective;
    }));
  };

  const handleSave = () => {
    console.log('Guardando Balanced Scorecard:', perspectives);
    setIsEditing(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="balanced-scorecard-container">
      {/* Header */}
      <div className="header-section">
        <div className="header-content">
          <PieChart className="header-icon" size={32} />
          <div>
            <h1 className="page-title">Balanced Scorecard (CMI)</h1>
            <p className="page-subtitle">Cuadro de Mando Integral - Control Estratégico del Negocio</p>
          </div>
        </div>
        <div className="action-buttons">
          {isSaved && (
            <span className="saved-indicator">
              <CheckCircle size={20} />
              Guardado exitosamente
            </span>
          )}
          {isEditing ? (
            <button className="btn-save" onClick={handleSave}>
              <Save size={20} />
              Guardar Cambios
            </button>
          ) : (
            <button className="btn-edit" onClick={handleEdit}>
              <Edit2 size={20} />
              Editar
            </button>
          )}
        </div>
      </div>

      {/* Info Card */}
      <div className="info-card">
        <h3>📊 ¿Qué es el Balanced Scorecard?</h3>
        <p>
          El Cuadro de Mando Integral (CMI) es una herramienta de gestión estratégica que traduce 
          la estrategia de una organización en un conjunto coherente de indicadores de desempeño, 
          organizados en cuatro perspectivas fundamentales.
        </p>
      </div>

      {/* Perspectives */}
      {perspectives.map((perspective) => (
        <div key={perspective.id} className="perspective-section">
          <div 
            className="perspective-header"
            style={{ borderLeftColor: perspective.color }}
          >
            <div className="perspective-title-container">
              <div 
                className="perspective-color-badge"
                style={{ backgroundColor: perspective.color }}
              />
              <h2 className="perspective-title">{perspective.name}</h2>
            </div>
            {isEditing && (
              <button 
                className="add-objective-btn"
                onClick={() => addObjective(perspective.id)}
              >
                <Plus size={18} />
                Agregar Objetivo
              </button>
            )}
          </div>

          <div className="table-container">
            <table className="scorecard-table">
              <thead>
                <tr>
                  <th className="col-objective">Objetivos Estratégicos</th>
                  <th className="col-indicator">Indicadores</th>
                  <th className="col-goal">Metas</th>
                  <th className="col-initiative">Iniciativas Estratégicas</th>
                  <th className="col-responsible">Responsable</th>
                  {isEditing && <th className="col-actions">Acciones</th>}
                </tr>
              </thead>
              <tbody>
                {perspective.objectives.map((objective) => (
                  <tr key={objective.id}>
                    <td className="cell-objective">
                      {isEditing ? (
                        <textarea
                          value={objective.strategicObjective}
                          onChange={(e) => handleObjectiveChange(
                            perspective.id, 
                            objective.id, 
                            'strategicObjective', 
                            e.target.value
                          )}
                          placeholder="Ej: Incrementar rentabilidad"
                          rows="2"
                          className="table-textarea"
                        />
                      ) : (
                        <span className="cell-content">{objective.strategicObjective || '-'}</span>
                      )}
                    </td>
                    <td className="cell-indicator">
                      {isEditing ? (
                        <textarea
                          value={objective.indicator}
                          onChange={(e) => handleObjectiveChange(
                            perspective.id, 
                            objective.id, 
                            'indicator', 
                            e.target.value
                          )}
                          placeholder="Ej: % ROI, NPS, Unidades/hora"
                          rows="2"
                          className="table-textarea"
                        />
                      ) : (
                        <span className="cell-content">{objective.indicator || '-'}</span>
                      )}
                    </td>
                    <td className="cell-goal">
                      {isEditing ? (
                        <textarea
                          value={objective.goal}
                          onChange={(e) => handleObjectiveChange(
                            perspective.id, 
                            objective.id, 
                            'goal', 
                            e.target.value
                          )}
                          placeholder="Ej: 25% anual, NPS > 70"
                          rows="2"
                          className="table-textarea"
                        />
                      ) : (
                        <span className="cell-content">{objective.goal || '-'}</span>
                      )}
                    </td>
                    <td className="cell-initiative">
                      {isEditing ? (
                        <textarea
                          value={objective.initiative}
                          onChange={(e) => handleObjectiveChange(
                            perspective.id, 
                            objective.id, 
                            'initiative', 
                            e.target.value
                          )}
                          placeholder="Ej: Optimizar costos, Capacitación"
                          rows="2"
                          className="table-textarea"
                        />
                      ) : (
                        <span className="cell-content">{objective.initiative || '-'}</span>
                      )}
                    </td>
                    <td className="cell-responsible">
                      {isEditing ? (
                        <input
                          type="text"
                          value={objective.responsible}
                          onChange={(e) => handleObjectiveChange(
                            perspective.id, 
                            objective.id, 
                            'responsible', 
                            e.target.value
                          )}
                          placeholder="Ej: Gte Finanzas"
                          className="table-input"
                        />
                      ) : (
                        <span className="cell-content responsible-badge">
                          {objective.responsible || '-'}
                        </span>
                      )}
                    </td>
                    {isEditing && (
                      <td className="cell-actions">
                        <button
                          onClick={() => removeObjective(perspective.id, objective.id)}
                          className="delete-btn"
                          title="Eliminar objetivo"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Tips Card */}
      <div className="tips-card">
        <h3>💡 Las 4 Perspectivas del Balanced Scorecard</h3>
        <div className="tips-grid">
          <div className="tip-item">
            <div className="tip-badge" style={{ backgroundColor: '#10b981' }}>1</div>
            <div className="tip-content">
              <strong>Financiera:</strong> ¿Cómo nos ven los accionistas? Enfocada en resultados financieros y rentabilidad.
            </div>
          </div>
          <div className="tip-item">
            <div className="tip-badge" style={{ backgroundColor: '#3b82f6' }}>2</div>
            <div className="tip-content">
              <strong>Clientes:</strong> ¿Cómo nos ven los clientes? Mide satisfacción, retención y participación de mercado.
            </div>
          </div>
          <div className="tip-item">
            <div className="tip-badge" style={{ backgroundColor: '#f59e0b' }}>3</div>
            <div className="tip-content">
              <strong>Procesos Internos:</strong> ¿En qué debemos sobresalir? Evalúa eficiencia operativa y calidad.
            </div>
          </div>
          <div className="tip-item">
            <div className="tip-badge" style={{ backgroundColor: '#8b5cf6' }}>4</div>
            <div className="tip-content">
              <strong>Aprendizaje y Crecimiento:</strong> ¿Podemos seguir mejorando? Desarrollo del talento e innovación.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalancedScorecard;