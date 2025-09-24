import React, { useState, useEffect } from 'react';
import { Save, Download, Upload, HelpCircle, Plus, X, Edit3 } from 'lucide-react';
import './CanvasMethod.css';

const CanvasMethod = () => {
  const [canvasData, setCanvasData] = useState({
    keyPartners: [],
    keyActivities: [],
    keyResources: [],
    valueProposition: [],
    customerRelationships: [],
    channels: [],
    customerSegments: [],
    costStructure: [],
    revenueStreams: []
  });

  const [editingSection, setEditingSection] = useState(null);
  const [newItem, setNewItem] = useState('');
  const [savedAt, setSavedAt] = useState(null);

  // Cargar datos guardados al montar el componente
  useEffect(() => {
    const savedData = localStorage.getItem('strategyCom_canvas');
    if (savedData) {
      setCanvasData(JSON.parse(savedData));
    }
  }, []);

  // Guardar automáticamente
  const saveData = () => {
    localStorage.setItem('strategyCom_canvas', JSON.stringify(canvasData));
    setSavedAt(new Date().toLocaleTimeString());
    setTimeout(() => setSavedAt(null), 3000);
  };

  // Añadir nuevo elemento a una sección
  const addItem = (section) => {
    if (newItem.trim()) {
      setCanvasData(prev => ({
        ...prev,
        [section]: [...prev[section], { id: Date.now(), text: newItem.trim() }]
      }));
      setNewItem('');
      setEditingSection(null);
    }
  };

  // Eliminar elemento
  const removeItem = (section, itemId) => {
    setCanvasData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== itemId)
    }));
  };

  // Editar elemento
  const editItem = (section, itemId, newText) => {
    setCanvasData(prev => ({
      ...prev,
      [section]: prev[section].map(item => 
        item.id === itemId ? { ...item, text: newText } : item
      )
    }));
  };

  // Exportar datos
  const exportCanvas = () => {
    const dataStr = JSON.stringify(canvasData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'business_model_canvas.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Componente para cada sección del Canvas
  const CanvasSection = ({ title, section, description, className, items }) => {
    const [editingItem, setEditingItem] = useState(null);
    const [editText, setEditText] = useState('');

    const startEdit = (item) => {
      setEditingItem(item.id);
      setEditText(item.text);
    };

    const saveEdit = () => {
      editItem(section, editingItem, editText);
      setEditingItem(null);
      setEditText('');
    };

    return (
      <div className={`canvas-section ${className}`}>
        <div className="section-header">
          <div className="section-title">
            {title}
            <div className="help-icon-container">
              <HelpCircle className="help-icon" />
              <div className="tooltip">
                {description}
              </div>
            </div>
          </div>
          <button
            onClick={() => setEditingSection(section)}
            className="add-btn"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="canvas-items">
          {items.map((item) => (
            <div key={item.id} className="canvas-item">
              {editingItem === item.id ? (
                <div className="input-form">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="input-field"
                    onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                    autoFocus
                  />
                  <button
                    onClick={saveEdit}
                    className="input-btn btn-add"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="item-content">
                  <p className="item-text">{item.text}</p>
                  <div className="item-actions">
                    <button
                      onClick={() => startEdit(item)}
                      className="item-btn btn-edit"
                    >
                      <Edit3 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => removeItem(section, item.id)}
                      className="item-btn btn-delete"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {editingSection === section && (
            <div className="input-form">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder={`Añadir ${title.toLowerCase()}...`}
                className="input-field"
                onKeyPress={(e) => e.key === 'Enter' && addItem(section)}
                autoFocus
              />
              <button
                onClick={() => addItem(section)}
                className="input-btn btn-add"
              >
                Añadir
              </button>
              <button
                onClick={() => {setEditingSection(null); setNewItem('');}}
                className="input-btn btn-cancel"
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="canvas-container">
      {/* Header */}
      <div className="canvas-header">
        <h1>Business Model Canvas</h1>
        <p>Visualiza y diseña tu modelo de negocio de forma integral</p>
        
        <div className="canvas-actions">
          <button onClick={saveData} className="btn-action btn-save">
            <Save className="w-4 h-4" />
            <span>Guardar</span>
          </button>
          <button onClick={exportCanvas} className="btn-action btn-export">
            <Download className="w-4 h-4" />
            <span>Exportar</span>
          </button>
        </div>
      </div>

      {savedAt && (
        <div className="save-indicator">
          ✓ Guardado automáticamente a las {savedAt}
        </div>
      )}

      {/* Canvas Grid */}
      <div className="canvas-grid">
        {/* Primera Fila */}
        <CanvasSection
          title="Socios Clave"
          section="keyPartners"
          description="¿Quiénes son tus socios y proveedores clave? ¿Qué recursos clave obtienes de ellos?"
          className="partners"
          items={canvasData.keyPartners}
        />
        
        <CanvasSection
          title="Actividades Clave"
          section="keyActivities"
          description="¿Qué actividades clave requiere tu propuesta de valor?"
          className="activities"
          items={canvasData.keyActivities}
        />
        
        <CanvasSection
          title="Propuesta de Valor"
          section="valueProposition"
          description="¿Qué valor entregas a tus clientes? ¿Qué problemas resuelves?"
          className="value"
          items={canvasData.valueProposition}
        />
        
        <CanvasSection
          title="Relaciones con Clientes"
          section="customerRelationships"
          description="¿Qué tipo de relación establecerás con cada segmento de clientes?"
          className="relationships"
          items={canvasData.customerRelationships}
        />
        
        <CanvasSection
          title="Segmentos de Clientes"
          section="customerSegments"
          description="¿Para quién estás creando valor? ¿Quiénes son tus clientes más importantes?"
          className="segments"
          items={canvasData.customerSegments}
        />

        {/* Segunda Fila */}
        <CanvasSection
          title="Recursos Clave"
          section="keyResources"
          description="¿Qué recursos clave requiere tu propuesta de valor?"
          className="resources"
          items={canvasData.keyResources}
        />
        
        <CanvasSection
          title="Canales"
          section="channels"
          description="¿A través de qué canales quieren ser alcanzados tus segmentos de clientes?"
          className="channels"
          items={canvasData.channels}
        />

        {/* Tercera Fila */}
        <CanvasSection
          title="Estructura de Costos"
          section="costStructure"
          description="¿Cuáles son los costos más importantes en tu modelo de negocio?"
          className="costs"
          items={canvasData.costStructure}
        />
        
        <CanvasSection
          title="Fuentes de Ingresos"
          section="revenueStreams"
          description="¿Por qué valores están dispuestos a pagar tus clientes?"
          className="revenue"
          items={canvasData.revenueStreams}
        />
      </div>

      {/* Guía rápida */}
      <div className="quick-guide">
        <h3 className="guide-title">💡 Guía rápida</h3>
        <div className="guide-grid">
          <div className="guide-item">
            <h4>1. Empieza por el centro</h4>
            <p>Define primero tu Propuesta de Valor y Segmentos de Clientes</p>
          </div>
          <div className="guide-item">
            <h4>2. Expande hacia los lados</h4>
            <p>Completa Canales, Relaciones y luego Recursos y Actividades</p>
          </div>
          <div className="guide-item">
            <h4>3. Finaliza con finanzas</h4>
            <p>Define tu Estructura de Costos y Fuentes de Ingresos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanvasMethod;