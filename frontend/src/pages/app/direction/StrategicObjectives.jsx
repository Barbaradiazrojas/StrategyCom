// frontend/src/pages/app/direction/StrategicObjectives.jsx
import React, { useState } from 'react';
import { Save, Edit2, CheckCircle, Target, TrendingUp } from 'lucide-react';
import './StrategicObjectives.css';

const StrategicObjectives = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  const [generalObjective, setGeneralObjective] = useState({
    description: '',
    specific: '',
    measurable: '',
    achievable: '',
    relevant: '',
    timeBound: ''
  });

  const [specificObjectives, setSpecificObjectives] = useState([
    {
      id: 1,
      area: 'Marketing',
      specific: '',
      examples: '',
      measurable: '',
      achievable: '',
      relevant: '',
      timeBound: ''
    },
    {
      id: 2,
      area: 'Financiero',
      specific: '',
      examples: '',
      measurable: '',
      achievable: '',
      relevant: '',
      timeBound: ''
    },
    {
      id: 3,
      area: 'Operaciones',
      specific: '',
      examples: '',
      measurable: '',
      achievable: '',
      relevant: '',
      timeBound: ''
    },
    {
      id: 4,
      area: 'Recursos Humanos',
      specific: '',
      examples: '',
      measurable: '',
      achievable: '',
      relevant: '',
      timeBound: ''
    }
  ]);

  const handleGeneralChange = (field, value) => {
    setGeneralObjective(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSpecificChange = (index, field, value) => {
    const newObjectives = [...specificObjectives];
    newObjectives[index][field] = value;
    setSpecificObjectives(newObjectives);
  };

  const handleSave = () => {
    console.log('Guardando objetivos:', { generalObjective, specificObjectives });
    setIsEditing(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="strategic-objectives-container">
      {/* Header */}
      <div className="header-section">
        <div className="header-content">
          <Target className="header-icon" size={32} />
          <div>
            <h1 className="page-title">Objetivos Estratégicos</h1>
            <p className="page-subtitle">Define tus objetivos usando el método SMART</p>
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

      {/* Método SMART Info */}
      <div className="smart-info-card">
        <h3>📊 Método SMART</h3>
        <div className="smart-criteria">
          <div className="smart-item">
            <strong>S</strong>pecífico - Define claramente qué quieres lograr
          </div>
          <div className="smart-item">
            <strong>M</strong>edible - Establece métricas cuantificables
          </div>
          <div className="smart-item">
            <strong>A</strong>lcanzable - Asegúrate de que sea realista
          </div>
          <div className="smart-item">
            <strong>R</strong>elevante - Alineado con la visión de la empresa
          </div>
          <div className="smart-item">
            <strong>T</strong>emporal - Define un plazo específico
          </div>
        </div>
      </div>

      {/* Objetivo General */}
      <div className="section general-objective-section">
        <div className="section-header">
          <TrendingUp size={24} />
          <h2 className="section-title">Objetivo General</h2>
        </div>

        <div className="form-group">
          <label className="label-main">Descripción del Objetivo General</label>
          {isEditing ? (
            <textarea
              value={generalObjective.description}
              onChange={(e) => handleGeneralChange('description', e.target.value)}
              placeholder="Ejemplo: Diseñar un plan de negocios que permita a la empresa XXX ser líder en ventas de XXX al finalizar el quinto año de operación en la ciudad/país XXXXX"
              rows="3"
              className="textarea-field"
            />
          ) : (
            <p className="display-text">{generalObjective.description || 'No definido'}</p>
          )}
        </div>

        <div className="smart-grid">
          <div className="smart-card">
            <div className="smart-card-header specific">
              <span className="smart-letter">S</span>
              <span className="smart-label">Específico</span>
            </div>
            {isEditing ? (
              <textarea
                value={generalObjective.specific}
                onChange={(e) => handleGeneralChange('specific', e.target.value)}
                placeholder="¿Qué exactamente quieres lograr?"
                rows="3"
                className="textarea-field"
              />
            ) : (
              <p className="display-text">{generalObjective.specific || 'No definido'}</p>
            )}
          </div>

          <div className="smart-card">
            <div className="smart-card-header measurable">
              <span className="smart-letter">M</span>
              <span className="smart-label">Medible</span>
            </div>
            {isEditing ? (
              <textarea
                value={generalObjective.measurable}
                onChange={(e) => handleGeneralChange('measurable', e.target.value)}
                placeholder="¿Cómo medirás el progreso y éxito?"
                rows="3"
                className="textarea-field"
              />
            ) : (
              <p className="display-text">{generalObjective.measurable || 'No definido'}</p>
            )}
          </div>

          <div className="smart-card">
            <div className="smart-card-header achievable">
              <span className="smart-letter">A</span>
              <span className="smart-label">Alcanzable</span>
            </div>
            {isEditing ? (
              <textarea
                value={generalObjective.achievable}
                onChange={(e) => handleGeneralChange('achievable', e.target.value)}
                placeholder="¿Es realista con tus recursos?"
                rows="3"
                className="textarea-field"
              />
            ) : (
              <p className="display-text">{generalObjective.achievable || 'No definido'}</p>
            )}
          </div>

          <div className="smart-card">
            <div className="smart-card-header relevant">
              <span className="smart-letter">R</span>
              <span className="smart-label">Relevante</span>
            </div>
            {isEditing ? (
              <textarea
                value={generalObjective.relevant}
                onChange={(e) => handleGeneralChange('relevant', e.target.value)}
                placeholder="¿Por qué es importante este objetivo?"
                rows="3"
                className="textarea-field"
              />
            ) : (
              <p className="display-text">{generalObjective.relevant || 'No definido'}</p>
            )}
          </div>

          <div className="smart-card">
            <div className="smart-card-header temporal">
              <span className="smart-letter">T</span>
              <span className="smart-label">Temporal</span>
            </div>
            {isEditing ? (
              <textarea
                value={generalObjective.timeBound}
                onChange={(e) => handleGeneralChange('timeBound', e.target.value)}
                placeholder="¿Cuándo lo lograrás?"
                rows="3"
                className="textarea-field"
              />
            ) : (
              <p className="display-text">{generalObjective.timeBound || 'No definido'}</p>
            )}
          </div>
        </div>
      </div>

      {/* Objetivos Específicos */}
      <div className="section specific-objectives-section">
        <div className="section-header">
          <Target size={24} />
          <h2 className="section-title">Objetivos Específicos</h2>
        </div>

        <div className="objectives-grid">
          {specificObjectives.map((objective, index) => (
            <div key={objective.id} className="objective-card">
              <div className="objective-card-header">
                <span className="objective-number">{index + 1}</span>
                <div className="objective-area-badge">{objective.area}</div>
              </div>

              <div className="objective-content">
                <div className="form-group-compact">
                  <label className="label-compact specific-label">
                    <span className="smart-letter-inline">S</span> Específico
                  </label>
                  {isEditing ? (
                    <textarea
                      value={objective.specific}
                      onChange={(e) => handleSpecificChange(index, 'specific', e.target.value)}
                      placeholder="Define el objetivo específico"
                      rows="2"
                      className="textarea-field-compact"
                    />
                  ) : (
                    <p className="display-text-compact">{objective.specific || 'No definido'}</p>
                  )}
                </div>

                <div className="form-group-compact">
                  <label className="label-compact examples-label">💡 Ejemplos</label>
                  {isEditing ? (
                    <textarea
                      value={objective.examples}
                      onChange={(e) => handleSpecificChange(index, 'examples', e.target.value)}
                      placeholder="Ej: Alcanzar un 20% de participación de mercado"
                      rows="2"
                      className="textarea-field-compact"
                    />
                  ) : (
                    <p className="display-text-compact examples-text">{objective.examples || 'No definido'}</p>
                  )}
                </div>

                <div className="form-group-compact">
                  <label className="label-compact measurable-label">
                    <span className="smart-letter-inline">M</span> Medible
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={objective.measurable}
                      onChange={(e) => handleSpecificChange(index, 'measurable', e.target.value)}
                      placeholder="¿Cómo lo medirás?"
                      className="input-field-compact"
                    />
                  ) : (
                    <p className="display-text-compact">{objective.measurable || 'No definido'}</p>
                  )}
                </div>

                <div className="form-group-compact">
                  <label className="label-compact achievable-label">
                    <span className="smart-letter-inline">A</span> Alcanzable
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={objective.achievable}
                      onChange={(e) => handleSpecificChange(index, 'achievable', e.target.value)}
                      placeholder="¿Es realista?"
                      className="input-field-compact"
                    />
                  ) : (
                    <p className="display-text-compact">{objective.achievable || 'No definido'}</p>
                  )}
                </div>

                <div className="form-group-compact">
                  <label className="label-compact relevant-label">
                    <span className="smart-letter-inline">R</span> Relevante
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={objective.relevant}
                      onChange={(e) => handleSpecificChange(index, 'relevant', e.target.value)}
                      placeholder="¿Por qué es importante?"
                      className="input-field-compact"
                    />
                  ) : (
                    <p className="display-text-compact">{objective.relevant || 'No definido'}</p>
                  )}
                </div>

                <div className="form-group-compact">
                  <label className="label-compact temporal-label">
                    <span className="smart-letter-inline">T</span> Temporal
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={objective.timeBound}
                      onChange={(e) => handleSpecificChange(index, 'timeBound', e.target.value)}
                      placeholder="¿Cuándo?"
                      className="input-field-compact"
                    />
                  ) : (
                    <p className="display-text-compact">{objective.timeBound || 'No definido'}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips adicionales */}
      <div className="tips-card">
        <h3>💡 Consejos para definir objetivos SMART</h3>
        <ul>
          <li><strong>General:</strong> Define un objetivo amplio que guíe la estrategia general de la empresa (3-5 años)</li>
          <li><strong>Específicos:</strong> Crea objetivos por área funcional (Marketing, Finanzas, Operaciones, RRHH)</li>
          <li><strong>Cuantifica:</strong> Usa números, porcentajes y plazos concretos</li>
          <li><strong>Alinea:</strong> Asegúrate de que todos los objetivos apoyen la visión de la empresa</li>
        </ul>
      </div>
    </div>
  );
};

export default StrategicObjectives;