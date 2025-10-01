// frontend/src/pages/app/direction/MissionVision.jsx
import React, { useState, useEffect } from 'react';
import { Save, Edit2, CheckCircle } from 'lucide-react';
import './MissionVission.css';


const MissionVision = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    whatWeDo: '',
    howWeDo: '',
    forWhom: '',
    vision: '',
    values: ['', '', '', '', '']
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleValueChange = (index, value) => {
    const newValues = [...formData.values];
    newValues[index] = value;
    setFormData(prev => ({
      ...prev,
      values: newValues
    }));
  };

  const handleSave = () => {
    // Aquí iría la lógica para guardar en la base de datos
    console.log('Guardando datos:', formData);
    setIsEditing(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="mission-vision-container">
      <div className="header-section">
        <h1 className="page-title">Misión, Visión y Valores</h1>
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

      <div className="content-grid">
        {/* Sección de Misión */}
        <div className="section mission-section">
          <h2 className="section-title">Misión</h2>
          <div className="mission-content">
            <div className="form-group">
              <label>Nombre de la empresa</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  placeholder="Ingresa el nombre de tu empresa"
                  className="input-field"
                />
              ) : (
                <p className="display-text">{formData.companyName || 'No definido'}</p>
              )}
            </div>

            <div className="form-group">
              <label>¿Qué hace?</label>
              {isEditing ? (
                <textarea
                  value={formData.whatWeDo}
                  onChange={(e) => handleChange('whatWeDo', e.target.value)}
                  placeholder="Describe qué hace tu empresa"
                  rows="4"
                  className="textarea-field"
                />
              ) : (
                <p className="display-text">{formData.whatWeDo || 'No definido'}</p>
              )}
            </div>

            <div className="form-group">
              <label>¿Cómo lo hace?</label>
              {isEditing ? (
                <textarea
                  value={formData.howWeDo}
                  onChange={(e) => handleChange('howWeDo', e.target.value)}
                  placeholder="Describe cómo lo hace tu empresa"
                  rows="4"
                  className="textarea-field"
                />
              ) : (
                <p className="display-text">{formData.howWeDo || 'No definido'}</p>
              )}
            </div>

            <div className="form-group">
              <label>¿Para quién? (Segmentación)</label>
              {isEditing ? (
                <textarea
                  value={formData.forWhom}
                  onChange={(e) => handleChange('forWhom', e.target.value)}
                  placeholder="Define tu público objetivo"
                  rows="4"
                  className="textarea-field"
                />
              ) : (
                <p className="display-text">{formData.forWhom || 'No definido'}</p>
              )}
            </div>
          </div>
        </div>

        {/* Sección de Visión */}
        <div className="section vision-section">
          <h2 className="section-title">Visión (Meta máxima)</h2>
          <div className="vision-content">
            {isEditing ? (
              <textarea
                value={formData.vision}
                onChange={(e) => handleChange('vision', e.target.value)}
                placeholder="Describe la visión de tu empresa a largo plazo"
                rows="20"
                className="textarea-field vision-textarea"
              />
            ) : (
              <p className="display-text vision-text">{formData.vision || 'No definido'}</p>
            )}
          </div>
        </div>

        {/* Sección de Valores */}
        <div className="section values-section">
          <h2 className="section-title">Valores</h2>
          <div className="values-content">
            {formData.values.map((value, index) => (
              <div key={index} className="form-group value-item">
                <label>Valor {index + 1}</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleValueChange(index, e.target.value)}
                    placeholder={`Valor ${index + 1}`}
                    className="input-field"
                  />
                ) : (
                  <p className="display-text">{value || 'No definido'}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Información adicional */}
      <div className="info-box">
        <h3>💡 Consejos para definir tu Misión, Visión y Valores:</h3>
        <ul>
          <li><strong>Misión:</strong> Define el propósito actual de tu empresa. ¿Qué hacen? ¿Cómo lo hacen? ¿Para quién?</li>
          <li><strong>Visión:</strong> Describe dónde quieres que esté tu empresa en el futuro (5-10 años).</li>
          <li><strong>Valores:</strong> Establece los principios fundamentales que guían las acciones de tu empresa.</li>
        </ul>
      </div>
    </div>
  );
};

export default MissionVision;