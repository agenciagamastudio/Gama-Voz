/**
 * Utilitário para busca de dados de mercado e automação de preenchimento.
 * RF.FUT.001 e RF.FUT.002
 */

// Tabela de referência para Faturamento Médio por Nicho (Fallback)
const NICHO_REVENUE_AVERAGES = {
    "Tecnologia": 500000,
    "Consultoria": 150000,
    "Varejo": 300000,
    "Indústria": 1200000,
    "Saúde": 450000,
    "Educação": 200000,
    "Serviços": 100000,
    "Marketing": 180000,
    "Advocacia": 120000,
    "Engenharia": 400000
};

// Tabela de referência para Salários Médios por Cargo (Baseado em dados de mercado Brasil 2025/2026)
const ROLE_SALARY_AVERAGES = {
    "Desenvolvedor Sênior": 15000,
    "Desenvolvedor Pleno": 9000,
    "Desenvolvedor Júnior": 5000,
    "Gerente de Projetos": 12000,
    "Designer UI/UX": 8500,
    "Analista de Marketing": 6000,
    "Vendedor / SDR": 4500,
    "Assistente Administrativo": 3500,
    "Diretor / Executivo": 25000,
    "Analista Financeiro": 7500,
    "Suporte Técnico": 4000,
    "Product Owner": 13000,
    "Scrum Master": 11000,
    "Analista de RH": 6500,
    "Consultor de Negócios": 10000
};

/**
 * Sugere faturamento mensal baseado no nicho ou pesquisa web (mockada por enquanto).
 */
export const suggestMonthlyRevenue = async (nicho) => {
    // Simula latência de pesquisa web
    await new Promise(resolve => setTimeout(resolve, 800));

    // Lógica de busca: 1. Nicho exato, 2. Palavra-chave no nicho, 3. Fallback padrão
    const match = Object.keys(NICHO_REVENUE_AVERAGES).find(k => 
        nicho?.toLowerCase().includes(k.toLowerCase())
    );

    return NICHO_REVENUE_AVERAGES[match] || 100000; // 100k como fallback universal
};

/**
 * Sugere custo mensal baseado no nome do cargo.
 */
export const suggestRoleMonthlySalary = (roleName) => {
    if (!roleName) return null;

    const match = Object.keys(ROLE_SALARY_AVERAGES).find(k => 
        roleName.toLowerCase().includes(k.toLowerCase())
    );

    return ROLE_SALARY_AVERAGES[match] || null;
};

/**
 * Busca dados simplificados de CNPJ via API Pública (CNPJ.ws ou similar)
 * Nota: Requer proxy para evitar CORS se rodar direto no front.
 */
export const fetchCompanyDataByCNPJ = async (cnpj) => {
    const cleanCNPJ = cnpj.replace(/\D/g, '');
    if (cleanCNPJ.length !== 14) return null;

    try {
        const response = await fetch(`https://publica.cnpj.ws/cnpj/${cleanCNPJ}`);
        if (!response.ok) throw new Error('Falha na consulta');
        const data = await response.json();
        
        return {
            name: data.razao_social,
            niche: data.estabelecimento.atividade_economica_principal.descricao,
            capital: data.capital_social,
            suggestedRevenue: data.capital_social / 12 // Estimativa conservadora baseada no capital
        };
    } catch (error) {
        console.error("Erro ao consultar CNPJ:", error);
        return null;
    }
};
