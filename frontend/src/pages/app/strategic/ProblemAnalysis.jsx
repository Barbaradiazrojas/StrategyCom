import { useState, useEffect } from 'react';
import { useBusinessPlan } from '../../../../context/BusinessPlanContext';
import { useParams } from 'react-router-dom';
import { problemAnalysisSchema } from '../../../../utils/validators';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function ProblemAnalysis() {
  const { currentPlan, updatePlan } = useBusinessPlan();
  const { planId } = useParams();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(problemAnalysisSchema),
    defaultValues: {
      problemStatement: currentPlan?.strategic?.problemStatement || ''
    }
  });

  useEffect(() => {
    if (currentPlan?.strategic?.problemStatement) {
      reset({ problemStatement: currentPlan.strategic.problemStatement });
    }
  }, [currentPlan, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    await updatePlan(planId, 'strategic', {
      problemStatement: data.problemStatement
    });
    setLoading(false);
  };

  return (
    <div className="content-card">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="card-title mb-0">Análisis del Problema</h2>
        <button
          className="btn btn-primary"
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
              Guardando...
            </>
          ) : 'Guardar Cambios'}
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="problemStatement" className="form-label">
            Declaración del Problema
          </label>
          <textarea
            id="problemStatement"
            className={`form-control ${errors.problemStatement ? 'is-invalid' : ''}`}
            rows="8"
            {...register('problemStatement')}
            placeholder="Describe claramente el problema que resuelve tu negocio..."
          />
          {errors.problemStatement && (
            <div className="invalid-feedback">{errors.problemStatement.message}</div>
          )}
        </div>

        <div className="alert alert-info">
          <h5>Guía para el análisis:</h5>
          <ul>
            <li>¿Qué problema específico resuelve tu producto/servicio?</li>
            <li>¿Quiénes son los más afectados por este problema?</li>
            <li>¿Cómo se resuelve actualmente este problema?</li>
            <li>¿Por qué tu solución es mejor que las alternativas existentes?</li>
          </ul>
        </div>
      </form>
    </div>
  );
}
