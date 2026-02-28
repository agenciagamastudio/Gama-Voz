import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

function ImpactChart({ data }) {
  const [isLoading, setIsLoading] = useState(true);
  const COLORS = ['#C4FF0D', '#00D1FF', '#FF007A', '#FFD700', '#FFFFFF'];

  useEffect(() => {
    // Simular carregamento mínimo para renderização do Recharts
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [data]);

  // Agrupa dados por frequência ou tipo se necessário, aqui simplificado por cenário
  const chartData = data.map((scenario) => ({
    name: scenario.descricao.length > 15 ? scenario.descricao.substring(0, 15) + '...' : scenario.descricao,
    value: scenario.perdaCalculada.anual,
    fullDesc: scenario.descricao
  })).filter(d => d.value > 0);

  if (chartData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center border border-dashed border-white/10 rounded-xl bg-white/5">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Sem dados para gráfico</p>
      </div>
    );
  }

  // Skeleton loader enquanto o gráfico renderiza
  if (isLoading) {
    return (
      <div className="h-64 w-full bg-white/5 border border-white/10 rounded-xl p-4 relative">
        <p className="absolute top-4 left-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Distribuição de Perdas</p>
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Renderizando gráfico...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-64 w-full bg-white/5 border border-white/10 rounded-xl p-4 relative">
      <p className="absolute top-4 left-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Distribuição de Perdas</p>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="55%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #333', borderRadius: '8px' }}
            itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
            formatter={(value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconSize={8}
            wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', color: '#666' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ImpactChart;
