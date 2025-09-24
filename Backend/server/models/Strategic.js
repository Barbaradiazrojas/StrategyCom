// server/models/Strategic.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Strategic = sequelize.define('Strategic', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    businessPlanId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'business_plans',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    analysisType: {
      type: DataTypes.ENUM([
        'problem_analysis',
        'canvas_method',
        'pestel_analysis',
        'porter_forces',
        'benchmarking',
        'value_chain',
        'swot_analysis',
        'critical_factors',
        'competitive_advantage'
      ]),
      allowNull: false
    },
    data: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {}
    },
    status: {
      type: DataTypes.ENUM(['draft', 'in_progress', 'completed', 'reviewed']),
      defaultValue: 'draft'
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    reviewedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    reviewedBy: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    version: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {
    tableName: 'strategic_analyses',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['businessPlanId', 'analysisType']
      },
      {
        fields: ['userId']
      },
      {
        fields: ['status']
      },
      {
        fields: ['analysisType']
      }
    ]
  });

  // Instance methods
  Strategic.prototype.markAsCompleted = function() {
    this.status = 'completed';
    this.completedAt = new Date();
    return this.save();
  };

  Strategic.prototype.markAsReviewed = function(reviewerId) {
    this.status = 'reviewed';
    this.reviewedAt = new Date();
    this.reviewedBy = reviewerId;
    return this.save();
  };

  Strategic.prototype.incrementVersion = function() {
    this.version += 1;
    return this.save();
  };

  // Class methods
  Strategic.getAnalysisTypes = function() {
    return [
      'problem_analysis',
      'canvas_method',
      'pestel_analysis',
      'porter_forces',
      'benchmarking',
      'value_chain',
      'swot_analysis',
      'critical_factors',
      'competitive_advantage'
    ];
  };

  Strategic.getAnalysisProgress = async function(businessPlanId) {
    const totalTypes = this.getAnalysisTypes().length;
    const completed = await this.count({
      where: {
        businessPlanId,
        status: ['completed', 'reviewed']
      }
    });

    return {
      total: totalTypes,
      completed,
      percentage: Math.round((completed / totalTypes) * 100),
      remaining: totalTypes - completed
    };
  };

  // Associations
  Strategic.associate = function(models) {
    Strategic.belongsTo(models.BusinessPlan, {
      foreignKey: 'businessPlanId',
      as: 'businessPlan'
    });

    Strategic.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });

    Strategic.belongsTo(models.User, {
      foreignKey: 'reviewedBy',
      as: 'reviewer'
    });
  };

  // Hooks
  Strategic.beforeUpdate((strategic, options) => {
    // Auto-increment version on data changes
    if (strategic.changed('data') && strategic.status !== 'draft') {
      strategic.version += 1;
    }

    // Auto-complete if all required fields are filled
    if (strategic.changed('data')) {
      const analysisType = strategic.analysisType;
      const data = strategic.data;
      
      // Define completion criteria for each analysis type
      const completionCriteria = {
        problem_analysis: data.problemDefinition?.mainFocus && 
                         data.necessity?.expectedResults && 
                         data.opportunity?.needSegmentRelation &&
                         data.innovativeSolution?.proposalDescription,
        canvas_method: data.keyPartners && data.keyActivities && 
                      data.valueProposition && data.customerRelationships &&
                      data.customerSegments && data.keyResources &&
                      data.channels && data.costStructure && data.revenueStreams,
        pestel_analysis: data.political && data.economic && data.social &&
                        data.technological && data.environmental && data.legal,
        porter_forces: data.competitiveRivalry && data.supplierPower &&
                      data.buyerPower && data.threatOfSubstitutes &&
                      data.threatOfNewEntrants,
        swot_analysis: data.strengths && data.weaknesses && 
                      data.opportunities && data.threats,
        benchmarking: data.competitors && data.comparisonCriteria &&
                     data.analysis && data.conclusions,
        value_chain: data.primaryActivities && data.supportActivities &&
                    data.valueAnalysis,
        critical_factors: data.internalFactors && data.externalFactors &&
                         data.prioritization,
        competitive_advantage: data.advantages && data.sustainability &&
                              data.implementation
      };

      if (completionCriteria[analysisType] && strategic.status !== 'completed') {
        strategic.status = 'completed';
        strategic.completedAt = new Date();
      }
    }
  });

  return Strategic;
};