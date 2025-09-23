import * as z from 'zod';

export const requiredString = z.string().min(1, { message: "Campo requerido" });
export const emailSchema = z.string().email({ message: "Email inválido" });
export const passwordSchema = z.string().min(6, { message: "Mínimo 6 caracteres" });

// Validaciones para análisis estratégico
export const problemAnalysisSchema = z.object({
  problemStatement: requiredString.max(1000, { message: "Máximo 1000 caracteres" })
});

export const canvasSchema = z.object({
  keyPartners: requiredString.max(500),
  keyActivities: requiredString.max(500),
  valuePropositions: requiredString.max(500),
  customerRelationships: requiredString.max(500),
  customerSegments: requiredString.max(500),
  keyResources: requiredString.max(500),
  channels: requiredString.max(500),
  costStructure: requiredString.max(500),
  revenueStreams: requiredString.max(500)
});

// Validaciones para dirección estratégica
export const missionVisionSchema = z.object({
  mission: requiredString.max(1000),
  vision: requiredString.max(1000)
});

// Validaciones para marketing
export const marketingObjectivesSchema = z.object({
  objectives: z.array(
    z.object({
      description: requiredString.max(500),
      metric: requiredString.max(200),
      target: requiredString.max(100),
      deadline: z.string().datetime()
    })
  )
});

// Añade aquí validaciones para RRHH, Operaciones y Financiero
