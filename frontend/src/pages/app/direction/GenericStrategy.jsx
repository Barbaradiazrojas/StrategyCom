// frontend/src/pages/app/direction/GenericStrategy.jsx
import React, { useState } from 'react';
import { Save, Edit2, CheckCircle, Lightbulb, TrendingUp } from 'lucide-react';
import './GenericStrategy.css';

const GenericStrategy = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [strategies, setStrategies] = useState([
    {
      id: 1,
      name: 'Líder en Costos',
      description: 'Lograr ventaja competitiva mediante la reducción de costos',
      attributes: [
        'Producto básico (sin adornos)',
        'Diseño del producto y composición (simple)',
        'Control de los suministros (materia prima)',
        'Costo de la mano de obra (llevarla a otros países)',
        'Ayudas gubernamentales',
        'Localización privilegiada',
        'Innovaciones en producción (tecnología para ahorrar)'
      ],
      current: '',
      future: '',
      competitors: {
        A: '',
        B: '',
        C: '',
        D: '',
        E: ''
      }
    },
    {
      id: 2,
      name: 'Diferenciación',
      description: 'Ofrecer productos o servicios únicos y valiosos',
      attributes: [
        'Atributo único del producto',
        'Calidad del producto',
        'Confianza en el producto',
        'Innovación del producto',
        'Imagen de marca',
        'Servicios complementarios'
      ],
      current: '',
      future: '',
      competitors: {
        A: '',
        B: '',
        C: '',
        D: '',
        E: ''
      }
    },
    {
      id: 3,
      name: 'Enfoque o Alta Segmentación',
      description: 'Concentrarse en un mercado específico',
      attributes: [
        'Línea de productos',
        'Impactar en un segmento',
        'Área geográfica limitada'
      ],
      current: '',
      future: '',
      competitors: {
        A: '',
        B: '',
        C: '',
        D: '',
        E: ''
      }
    },
    {
      id: 4,
      name: 'Excelencia Operativa',
      description: 'Ofrece mayor valor liderando el sector en precio y conveniencia',
      attributes: [],
      current: '',
      future: '',
      competitors: {
        A: '',
        B: '',
        C: '',
        D: '',
        E: ''
      }
    },
    {
      id: 5,
      name: 'Conocimiento del Cliente',
      description: 'Ofrece mayor valor segmentando minuciosamente sus mercados y personalizando sus productos o servicios para satisfacer necesidades concretas de los consumidores de cada público objetivo',
      attributes: [],
      current: '',
      future: '',
      competitors: {
        A: '',
        B: '',
        C: '',
        D: '',
        E: ''
      }
    },
    {
      id: 6,
      name: 'Liderazgo en Producto',
      description: 'Ofrece mayor valor mediante un flujo continuo de productos o servicios de vanguardia. El objetivo es dejar obsoletos tanto a sus propios productos como los de sus competidores con nuevos lanzamientos',
      attributes: [],
      current: '',
      future: '',
      competitors: {
        A: '',
        B: '',
        C: '',
        D: '',
        E: ''
      }
    }
  ]);

  const handleStrategyChange = (strategyIndex, field, value) => {
    const newStrategies = [...strategies];
    if (field === 'current' || field === 'future') {
      newStrategies[strategyIndex][field] = value;
    } else {
      newStrategies[strategyIndex].competitors[field] = value;
    }
    setStrategies(newStrategies);
  };

  const handleSave = () => {
    console.log('Guardando estrategias:', strategies);
    setIsEditing(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="generic-strategy-container">
      {/* Header */}
      <div className="header-section">
        <div className="header-content">
          <Lightbulb className="header-icon" size={32} />
          <div>
            <h1 className="page-title">Estrategia Genérica</h1>
            <p className="page-subtitle">Define tu estrategia competitiva y analiza la competencia</p>
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

      {/* Definiciones de Estrategias */}
      <div className="section definitions-section">
        <div className="section-header">
          <TrendingUp size={24} />
          <h2 className="section-title">Definición de Estrategias Genéricas</h2>
        </div>

        <div className="strategies-grid">
          {strategies.map((strategy, index) => (
            <div key={strategy.id} className="strategy-definition-card">
              <div className="strategy-card-header">
                <span className="strategy-number">{strategy.id}</span>
                <h3 className="strategy-name">{strategy.name}</h3>
              </div>
              <p className="strategy-description">{strategy.description}</p>
              
              {strategy.attributes.length > 0 && (
                <div className="strategy-attributes">
                  <h4 className="attributes-title">Formas de obtenerla:</h4>
                  <ul className="attributes-list">
                    {strategy.attributes.map((attr, idx) => (
                      <li key={idx}>{attr}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Análisis Comparativo */}
      <div className="section analysis-section">
        <div className="section-header">
          <TrendingUp size={24} />
          <h2 className="section-title">Análisis de Estrategias: Empresa vs Competencia</h2>
        </div>

        <div className="analysis-info">
          <p>
            Define cuál es tu estrategia actual y futura, y compárala con la de tus principales competidores.
            Marca con una "X" o describe brevemente la estrategia que aplica cada empresa.
          </p>
        </div>

        <div className="table-container">
          <table className="analysis-table">
            <thead>
              <tr>
                <th className="strategy-col">Estrategia Genérica</th>
                <th className="company-col actual">Actual</th>
                <th className="company-col future">Futura</th>
                <th className="competitor-col">Compet. A</th>
                <th className="competitor-col">Compet. B</th>
                <th className="competitor-col">Compet. C</th>
                <th className="competitor-col">Compet. D</th>
                <th className="competitor-col">Compet. E</th>
              </tr>
            </thead>
            <tbody>
              {strategies.map((strategy, strategyIndex) => (
                <tr key={strategy.id}>
                  <td className="strategy-name-cell">
                    <strong>{strategy.id}. {strategy.name}</strong>
                  </td>
                  
                  {/* Actual */}
                  <td className="input-cell actual-cell">
                    {isEditing ? (
                      <input
                        type="text"
                        value={strategy.current}
                        onChange={(e) => handleStrategyChange(strategyIndex, 'current', e.target.value)}
                        placeholder="X o descripción"
                        className="table-input"
                      />
                    ) : (
                      <span className="cell-content">{strategy.current || '-'}</span>
                    )}
                  </td>

                  {/* Futura */}
                  <td className="input-cell future-cell">
                    {isEditing ? (
                      <input
                        type="text"
                        value={strategy.future}
                        onChange={(e) => handleStrategyChange(strategyIndex, 'future', e.target.value)}
                        placeholder="X o descripción"
                        className="table-input"
                      />
                    ) : (
                      <span className="cell-content">{strategy.future || '-'}</span>
                    )}
                  </td>

                  {/* Competidores */}
                  {['A', 'B', 'C', 'D', 'E'].map((comp) => (
                    <td key={comp} className="input-cell competitor-cell">
                      {isEditing ? (
                        <input
                          type="text"
                          value={strategy.competitors[comp]}
                          onChange={(e) => handleStrategyChange(strategyIndex, comp, e.target.value)}
                          placeholder="X"
                          className="table-input"
                        />
                      ) : (
                        <span className="cell-content">{strategy.competitors[comp] || '-'}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Consejos */}
      <div className="tips-card">
        <h3>💡 Consejos para definir tu Estrategia Genérica</h3>
        <ul>
          <li><strong>Enfoque:</strong> No intentes aplicar todas las estrategias. Elige 1 o 2 principales donde puedas sobresalir.</li>
          <li><strong>Diferenciación:</strong> Identifica qué te hace único frente a la competencia y potencia esos atributos.</li>
          <li><strong>Costos:</strong> Si compites por precio, asegúrate de tener una estructura de costos sostenible.</li>
          <li><strong>Análisis competitivo:</strong> Estudia las estrategias de tus competidores para encontrar oportunidades de diferenciación.</li>
          <li><strong>Coherencia:</strong> Tu estrategia debe alinearse con tu misión, visión y objetivos estratégicos.</li>
        </ul>
      </div>
    </div>
  );
};

export default GenericStrategy;