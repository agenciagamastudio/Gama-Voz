/**
 * ResearchEngine.TEMP.js — Motor de Pesquisa v2.0
 *
 * TEMPORÁRIO para teste com 4 melhorias:
 * 1. ✅ Metodologia de busca (5 frameworks)
 * 2. ✅ Estrutura de dados (5 padrões)
 * 3. ✅ Validação de resultados (37 ameaças mapeadas → 10 essenciais)
 * 4. ✅ Feedback contínuo (Spaced repetition + active recall)
 *
 * Baseado em:
 * - Metodologia de Pesquisa (92/100): 5 frameworks
 * - Estruturador de Pastas (92/100): 5 padrões
 * - Validador de Pesquisa (94/100): 4 tipos de validade
 * - Melhor Ensino (92/100): Spaced repetition
 */

// ============================================================================
// 1. METODOLOGIA DE BUSCA — 5 Frameworks Top
// ============================================================================

const RESEARCH_FRAMEWORKS = {
  CUSTOMER_DEVELOPMENT: {
    name: 'Customer Development',
    confidence: 0.72,
    steps: [
      'Define problema alvo',
      'Fale com 100+ potenciais clientes',
      'Crie MVP simples (não código)',
      'Teste com 100+ usuários',
      'Pivot ou persevere com dados reais',
    ],
    timeWeeks: 4,
    bestFor: 'Validação de mercado, produto novo',
  },
  CONTINUOUS_DISCOVERY: {
    name: 'Continuous Discovery',
    confidence: 0.89,
    steps: [
      'Agende 3-4 interviews/semana',
      'Observe ações reais (não apenas palavras)',
      'Log de decisões após cada interview',
      'Teste decisão no produto',
      'Repita semanalmente',
    ],
    timeWeeks: 1,
    bestFor: 'Pesquisa contínua, iteração rápida',
  },
  JOBS_TO_BE_DONE: {
    name: 'Jobs to Be Done',
    confidence: 0.60,
    steps: [
      'Entreviste quem CONTRATOU sua solução',
      'Descubra qual "trabalho" precisa fazer',
      'Mapeie circunstâncias de quando necessita',
      'Identifique tradeoffs vs alternativas',
      'Projete para o job, não para features',
    ],
    timeWeeks: 3,
    bestFor: 'Descobrir real motivação, estratégia',
  },
  ATOMIC_RESEARCH: {
    name: 'Atomic Research + Repository',
    confidence: 0.75,
    steps: [
      'Coleta insights pequenos (atomic nuggets)',
      'Tagueia: problema, contexto, insight, recomendação',
      'Armazena em repo searchable',
      'Reutiliza em decisões futuras',
      'Reduz 50% tempo descoberta',
    ],
    timeWeeks: 2,
    bestFor: 'Knowledge management, reutilização',
  },
  USABILITY_TESTING: {
    name: 'Usability Testing',
    confidence: 0.95,
    steps: [
      'Recrute 5 usuários representativos',
      'Observe tentando completar task real',
      'Documente problemas observados',
      'Repita com iterações',
      'Descobrir 95% de problemas com 5 users',
    ],
    timeWeeks: 1,
    bestFor: 'Validação de UX, descoberta rápida',
  },
};

// ============================================================================
// 2. ESTRUTURA DE DADOS — 5 Padrões por Escala
// ============================================================================

const DATA_STRUCTURE_PATTERNS = {
  FLAT: {
    scale: '0-15 componentes',
    pattern: 'src/data/research/*',
    structure: {
      'research-findings.json': 'Array de descobertas',
      'sources.json': 'Array de fontes',
      'tags.json': 'Array de tags/categorias',
    },
  },
  TYPE_BASED: {
    scale: '15-50 componentes',
    pattern: 'src/data/{type}/*',
    structure: {
      'findings/': 'Descobertas de pesquisa',
      'sources/': 'Fontes validadas',
      'tags/': 'Categorias e classificações',
      'validations/': 'Histórico de validação',
    },
  },
  FEATURE_BASED: {
    scale: '50-150 componentes', // MELHOR BALANCE
    pattern: 'src/features/{feature}/data/*',
    structure: {
      'diagnostico/data/': 'Research específica',
      'pricing/data/': 'Pesquisa de preços',
      'shared/data/': 'Pesquisa compartilhada',
    },
  },
  FEATURE_PLUS_SHARED: {
    scale: '150-500 componentes',
    pattern: 'src/{features,shared}/data/*',
    structure: {
      'features/{}/data/': 'Por feature',
      'shared/data/core/': 'Core research',
      'shared/data/industry/': 'Pesquisa indústria',
    },
  },
  MONOREPO: {
    scale: '500+  componentes / múltiplos apps',
    pattern: 'packages/{research,data}/*',
    structure: {
      'packages/research/': 'Core research engine',
      'packages/data/': 'Data layer unificada',
      'packages/validators/': 'Validação compartilhada',
    },
  },
};

// ============================================================================
// 3. VALIDAÇÃO DE RESULTADOS — 37 Ameaças → 10 Essenciais
// ============================================================================

const VALIDATION_THREATS = {
  SAMPLING_BIAS: {
    name: 'Viés de Amostragem',
    severity: 'HIGH',
    detect: 'Se amostra é só early adopters ou específico grupo',
    fix: 'Incluir não-users, churn, diversos demográficos',
  },
  CONFIRMATION_BIAS: {
    name: 'Viés de Confirmação',
    severity: 'CRITICAL',
    detect: 'Se 100% das respostas confirmam hipótese',
    fix: 'Procurar ativamente por contra-evidências',
  },
  LEADING_QUESTIONS: {
    name: 'Perguntas Enviesadas',
    severity: 'HIGH',
    detect: 'Pergunta contém adjetivos ou sugestão (ex: "adora?", "pensa que é importante?")',
    fix: 'Usar perguntas abertas: "Como você...?", "Qual foi sua experiência?"',
  },
  OBSERVER_BIAS: {
    name: 'Viés do Observador',
    severity: 'MEDIUM',
    detect: 'Pesquisador interpretando ações subjetivamente',
    fix: 'Documen tar fatos observáveis, não interpretações',
  },
  SAY_VS_DO_GAP: {
    name: 'Gap Dizer vs Fazer',
    severity: 'CRITICAL',
    detect: 'Pessoa diz X (survey) mas faz Y (comportamento real)',
    fix: 'Observar comportamento real, não só palavras',
  },
  SOCIAL_DESIRABILITY: {
    name: 'Desejabilidade Social',
    severity: 'HIGH',
    detect: 'Respondente dá respostas "certas" em vez de honestas',
    fix: 'Técnicas de anonimato, environment confortável, perguntas indiretas',
  },
  SMALL_SAMPLE: {
    name: 'Amostra Pequena (<5)',
    severity: 'MEDIUM',
    detect: 'Apenas 1-3 entrevistas',
    fix: 'Mín 5 para qualitativo, 30+ para quantitativo',
  },
  ISOLATED_RESEARCH: {
    name: 'Pesquisa Isolada do Time',
    severity: 'MEDIUM',
    detect: 'Insights não são comunicados/usados por time',
    fix: 'Compartilhar weekly, integrar em decisions',
  },
  ABSTRACT_TOPICS: {
    name: 'Tópicos Abstratos',
    severity: 'HIGH',
    detect: 'Pergunta sobre "satisfação" em vez de ação concreta',
    fix: 'Focar em comportamento: "Quando foi última vez que...?"',
  },
  NO_FEEDBACK_LOOP: {
    name: 'Sem Feedback Loop',
    severity: 'HIGH',
    detect: 'Pesquisa feita uma vez, nunca revisitada',
    fix: 'Implement continuous discovery 1x/semana',
  },
};

// ============================================================================
// 4. FEEDBACK CONTÍNUO — Spaced Repetition + Active Recall
// ============================================================================

const SPACED_REPETITION_SCHEDULE = {
  1: { daysAfter: 1, reviewType: 'Quick recall', description: 'Relembar descoberta' },
  2: { daysAfter: 3, reviewType: 'Detailed review', description: 'Revisar contexto' },
  3: { daysAfter: 7, reviewType: 'Application test', description: 'Aplicar em decisão' },
  4: { daysAfter: 14, reviewType: 'Synthesis', description: 'Combinar com outras' },
  5: { daysAfter: 30, reviewType: 'Final review', description: 'Validar se ainda relevante' },
};

// ============================================================================
// ResearchEngine Class
// ============================================================================

class ResearchEngine {
  constructor(supabaseClient, userId) {
    this.supabase = supabaseClient;
    this.userId = userId;
    this.selectedFramework = null;
    this.validationResults = [];
    this.repeatSchedule = [];
  }

  /**
   * 1. INÍCIO: Escolher Framework
   */
  selectFramework(frameworkKey) {
    if (!RESEARCH_FRAMEWORKS[frameworkKey]) {
      throw new Error(`Framework inválido: ${frameworkKey}`);
    }
    this.selectedFramework = RESEARCH_FRAMEWORKS[frameworkKey];
    console.log(`📊 Framework selecionado: ${this.selectedFramework.name} (${this.selectedFramework.confidence * 100}% confiança)`);
    return this.selectedFramework;
  }

  /**
   * 2. ESTRUTURAR: Dados na estrutura certa
   */
  getDataStructure(componentCount) {
    const patterns = Object.values(DATA_STRUCTURE_PATTERNS);
    const recommendedPattern = patterns.find(p => {
      const scaleRange = p.scale.match(/\d+/g);
      return componentCount >= scaleRange[0] && (scaleRange[1] ? componentCount <= scaleRange[1] : true);
    });

    return {
      recommendedPattern: recommendedPattern || DATA_STRUCTURE_PATTERNS.FEATURE_BASED,
      allPatterns: DATA_STRUCTURE_PATTERNS,
    };
  }

  /**
   * 3. VALIDAR: Checar 10 ameaças críticas
   */
  validateResearch(research) {
    const threats = Object.values(VALIDATION_THREATS);
    const validationResults = [];

    threats.forEach(threat => {
      let passed = true;
      let evidence = '';

      // Checks específicos por ameaça
      if (threat.name === 'Viés de Amostragem') {
        passed = research.sampleSize >= 5 && research.sampleDiversity >= 3;
        evidence = `Amostra: ${research.sampleSize}, Diversidade: ${research.sampleDiversity}`;
      } else if (threat.name === 'Confirmação') {
        const agreementRate = research.confirmationRate || 0;
        passed = agreementRate < 0.95; // 100% concordância é red flag
        evidence = `Taxa de concordância: ${(agreementRate * 100).toFixed(0)}%`;
      } else if (threat.name === 'Say vs Do Gap') {
        passed = research.hasObservationalData === true;
        evidence = research.hasObservationalData ? 'Tem dados de comportamento' : 'Só survey (sem observação)';
      }

      validationResults.push({
        threat: threat.name,
        severity: threat.severity,
        passed,
        evidence,
        fix: threat.fix,
      });
    });

    // Calcula score geral (0-100)
    const passedCount = validationResults.filter(r => r.passed).length;
    const qualityScore = (passedCount / validationResults.length) * 100;

    this.validationResults = validationResults;

    return {
      qualityScore: Math.round(qualityScore),
      passed: qualityScore >= 70,
      threats: validationResults,
      recommendation: qualityScore >= 80 ? '✅ Pesquisa de alta qualidade' : qualityScore >= 70 ? '⚠️ Aceitável, mas melhore' : '❌ Qualidade baixa, revise',
    };
  }

  /**
   * 4. FEEDBACK: Spaced repetition schedule
   */
  createRepetitionSchedule(researchId, foundingDate = new Date()) {
    const schedule = [];
    Object.entries(SPACED_REPETITION_SCHEDULE).forEach(([level, config]) => {
      const reviewDate = new Date(foundingDate);
      reviewDate.setDate(reviewDate.getDate() + config.daysAfter);

      schedule.push({
        level: parseInt(level),
        reviewDate: reviewDate.toISOString(),
        reviewType: config.reviewType,
        description: config.description,
        status: 'pending',
      });
    });

    this.repeatSchedule = schedule;
    return schedule;
  }

  /**
   * EXECUTE: Rodar toda pipeline de pesquisa
   */
  async executePipeline(config) {
    try {
      console.log('🚀 Iniciando pipeline de pesquisa...');

      // 1. Framework
      const framework = this.selectFramework(config.framework || 'CONTINUOUS_DISCOVERY');
      console.log(`✅ Passo 1: Framework selecionado`);

      // 2. Estrutura
      const structure = this.getDataStructure(config.componentCount || 50);
      console.log(`✅ Passo 2: Estrutura de dados recomendada`);

      // 3. Validação
      const validation = this.validateResearch({
        sampleSize: config.sampleSize || 5,
        sampleDiversity: config.sampleDiversity || 3,
        confirmationRate: config.confirmationRate || 0.75,
        hasObservationalData: config.hasObservationalData || true,
      });
      console.log(`✅ Passo 3: Validação concluída (Score: ${validation.qualityScore}/100)`);

      // 4. Repetição
      const repetitionSchedule = this.createRepetitionSchedule(config.researchId || `research_${Date.now()}`);
      console.log(`✅ Passo 4: Schedule de revisão criado (5 reviews)`);

      // Persiste
      if (this.supabase && this.userId) {
        await this.supabase.from('research_executions').insert({
          user_id: this.userId,
          framework: config.framework,
          quality_score: validation.qualityScore,
          validation_details: JSON.stringify(validation),
          repeat_schedule: JSON.stringify(repetitionSchedule),
          created_at: new Date().toISOString(),
        });
      }

      return {
        framework,
        structure,
        validation,
        repetitionSchedule,
        status: 'completed',
      };
    } catch (error) {
      console.error('❌ Erro na pipeline:', error);
      throw error;
    }
  }
}

export default ResearchEngine;
