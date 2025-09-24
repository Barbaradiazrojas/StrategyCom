-- database/migrations/003_create_strategic_analysis_table.sql

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum for analysis types
CREATE TYPE analysis_type_enum AS ENUM (
  'problem_analysis',
  'canvas_method',
  'pestel_analysis',
  'porter_forces',
  'benchmarking',
  'value_chain',
  'swot_analysis',
  'critical_factors',
  'competitive_advantage'
);

-- Create enum for status
CREATE TYPE analysis_status_enum AS ENUM (
  'draft',
  'in_progress',
  'completed',
  'reviewed'
);

-- Create strategic_analyses table
CREATE TABLE strategic_analyses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_plan_id UUID NOT NULL,
  user_id UUID NOT NULL,
  analysis_type analysis_type_enum NOT NULL,
  data JSONB NOT NULL DEFAULT '{}',
  status analysis_status_enum DEFAULT 'draft',
  completed_at TIMESTAMP WITH TIME ZONE,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID,
  notes TEXT,
  version INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  -- Foreign key constraints
  CONSTRAINT fk_strategic_business_plan 
    FOREIGN KEY (business_plan_id) 
    REFERENCES business_plans(id) 
    ON DELETE CASCADE,
  
  CONSTRAINT fk_strategic_user 
    FOREIGN KEY (user_id) 
    REFERENCES users(id) 
    ON DELETE CASCADE,
  
  CONSTRAINT fk_strategic_reviewer 
    FOREIGN KEY (reviewed_by) 
    REFERENCES users(id) 
    ON DELETE SET NULL,
  
  -- Unique constraint to prevent duplicate analyses per business plan
  CONSTRAINT uk_strategic_business_plan_type 
    UNIQUE (business_plan_id, analysis_type)
);

-- Create indexes for better performance
CREATE INDEX idx_strategic_business_plan_id ON strategic_analyses(business_plan_id);
CREATE INDEX idx_strategic_user_id ON strategic_analyses(user_id);
CREATE INDEX idx_strategic_analysis_type ON strategic_analyses(analysis_type);
CREATE INDEX idx_strategic_status ON strategic_analyses(status);
CREATE INDEX idx_strategic_completed_at ON strategic_analyses(completed_at);

-- Create GIN index for JSONB data for efficient querying
CREATE INDEX idx_strategic_data_gin ON strategic_analyses USING GIN (data);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_strategic_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER tr_strategic_updated_at
  BEFORE UPDATE ON strategic_analyses
  FOR EACH ROW
  EXECUTE FUNCTION update_strategic_updated_at();

-- Function to validate analysis data based on type
CREATE OR REPLACE FUNCTION validate_strategic_analysis_data()
RETURNS TRIGGER AS $$
BEGIN
  -- Basic validation that data is not null
  IF NEW.data IS NULL THEN
    RAISE EXCEPTION 'Analysis data cannot be null';
  END IF;
  
  -- Type-specific validations can be added here
  CASE NEW.analysis_type
    WHEN 'problem_analysis' THEN
      -- Validate problem analysis structure
      IF NOT (NEW.data ? 'problemDefinition' OR NEW.data ? 'necessity' OR 
               NEW.data ? 'opportunity' OR NEW.data ? 'innovativeSolution') THEN
        RAISE NOTICE 'Problem analysis should contain problemDefinition, necessity, opportunity, and innovativeSolution';
      END IF;
    
    WHEN 'canvas_method' THEN
      -- Validate canvas method structure
      IF NOT (NEW.data ? 'keyPartners' OR NEW.data ? 'keyActivities' OR 
               NEW.data ? 'valueProposition') THEN
        RAISE NOTICE 'Canvas method should contain key business model components';
      END IF;
    
    WHEN 'pestel_analysis' THEN
      -- Validate PESTEL analysis structure
      IF NOT (NEW.data ? 'political' OR NEW.data ? 'economic' OR 
               NEW.data ? 'social' OR NEW.data ? 'technological' OR
               NEW.data ? 'environmental' OR NEW.data ? 'legal') THEN
        RAISE NOTICE 'PESTEL analysis should contain political, economic, social, technological, environmental, and legal factors';
      END IF;
    
    ELSE
      -- For other analysis types, just ensure data is not empty
      IF NEW.data = '{}' THEN
        RAISE NOTICE 'Analysis data appears to be empty';
      END IF;
  END CASE;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for data validation
CREATE TRIGGER tr_validate_strategic_data
  BEFORE INSERT OR UPDATE ON strategic_analyses
  FOR EACH ROW
  EXECUTE FUNCTION validate_strategic_analysis_data();

-- Function to get analysis progress for a business plan
CREATE OR REPLACE FUNCTION get_strategic_progress(bp_id UUID)
RETURNS TABLE (
  total_analyses INTEGER,
  completed_analyses INTEGER,
  completion_percentage NUMERIC,
  analyses_detail JSONB
) AS $$
DECLARE
  total_count INTEGER := 9; -- Total number of analysis types
  completed_count INTEGER;
  analyses_info JSONB;
BEGIN
  -- Count completed analyses
  SELECT COUNT(*) INTO completed_count
  FROM strategic_analyses 
  WHERE business_plan_id = bp_id AND status IN ('completed', 'reviewed');
  
  -- Get detailed analysis information
  SELECT jsonb_object_agg(
    analysis_type, 
    jsonb_build_object(
      'status', status,
      'completed_at', completed_at,
      'version', version,
      'has_data', CASE WHEN data != '{}' THEN true ELSE false END
    )
  ) INTO analyses_info
  FROM strategic_analyses 
  WHERE business_plan_id = bp_id;
  
  RETURN QUERY SELECT 
    total_count,
    completed_count,
    ROUND((completed_count::NUMERIC / total_count) * 100, 2),
    COALESCE(analyses_info, '{}'::jsonb);
END;
$$ LANGUAGE plpgsql;

-- Insert initial data or reference data if needed
INSERT INTO strategic_analyses (business_plan_id, user_id, analysis_type, data, status) VALUES
-- These are example entries - remove in production
('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'problem_analysis', 
 '{"problemDefinition": {"mainFocus": "Ejemplo de problema", "centralHypothesis": "Ejemplo de hipótesis"}}', 'draft')
ON CONFLICT (business_plan_id, analysis_type) DO NOTHING;

-- Create view for easy querying of analysis status
CREATE VIEW v_strategic_analysis_summary AS
SELECT 
  bp.id as business_plan_id,
  bp.name as business_plan_name,
  u.name as user_name,
  COUNT(sa.id) as total_analyses,
  COUNT(CASE WHEN sa.status IN ('completed', 'reviewed') THEN 1 END) as completed_analyses,
  ROUND((COUNT(CASE WHEN sa.status IN ('completed', 'reviewed') THEN 1 END)::NUMERIC / 9) * 100, 2) as completion_percentage,
  MAX(sa.updated_at) as last_updated
FROM business_plans bp
LEFT JOIN strategic_analyses sa ON bp.id = sa.business_plan_id
LEFT JOIN users u ON bp.user_id = u.id
GROUP BY bp.id, bp.name, u.name;

-- Grant necessary permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON strategic_analyses TO strategycom_app;
GRANT SELECT ON v_strategic_analysis_summary TO strategycom_app;
GRANT EXECUTE ON FUNCTION get_strategic_progress(UUID) TO strategycom_app;

-- Add comments for documentation
COMMENT ON TABLE strategic_analyses IS 'Stores strategic analysis data for business plans';
COMMENT ON COLUMN strategic_analyses.data IS 'JSONB field containing the actual analysis data structure';
COMMENT ON COLUMN strategic_analyses.version IS 'Version number incremented on significant updates';
COMMENT ON FUNCTION get_strategic_progress(UUID) IS 'Returns strategic analysis progress for a business plan';