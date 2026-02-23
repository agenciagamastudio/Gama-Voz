import React from 'react';

/**
 * Componente para informações do projeto (Pricing Calculator)
 * Inputs: clientName, clientCompany, clientContact, projectName
 */
export function ProjectInfoForm({
  clientName,
  clientCompany,
  clientContact,
  projectName,
  onClientNameChange,
  onClientCompanyChange,
  onClientContactChange,
  onProjectNameChange,
}) {
  return (
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-primary">folder_open</span>
        <h2 className="text-lg font-bold text-white">Project Information</h2>
      </div>
      <div className="bg-card-bg p-6 rounded-xl border border-white/5 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nome Cliente */}
        <div className="space-y-1.5">
          <label htmlFor="clientName" className="text-sm font-semibold text-slate-400">
            Nome do Cliente
          </label>
          <input
            id="clientName"
            className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-white placeholder:text-slate-600"
            placeholder="Digite o nome do contato"
            type="text"
            value={clientName}
            onChange={(e) => onClientNameChange(e.target.value)}
          />
        </div>

        {/* Empresa Cliente */}
        <div className="space-y-1.5">
          <label htmlFor="clientCompany" className="text-sm font-semibold text-slate-400">
            Empresa do Cliente
          </label>
          <input
            id="clientCompany"
            className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-white placeholder:text-slate-600"
            placeholder="Digite o nome da empresa do cliente"
            type="text"
            value={clientCompany}
            onChange={(e) => onClientCompanyChange(e.target.value)}
          />
        </div>

        {/* Contato */}
        <div className="space-y-1.5">
          <label htmlFor="clientContact" className="text-sm font-semibold text-slate-400">
            Contato (Cargo/Nome)
          </label>
          <input
            id="clientContact"
            className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-white placeholder:text-slate-600"
            placeholder="Ex: Ricardo Almeida - CTO"
            type="text"
            value={clientContact}
            onChange={(e) => onClientContactChange(e.target.value)}
          />
        </div>

        {/* Nome Projeto */}
        <div className="space-y-1.5">
          <label htmlFor="projectName" className="text-sm font-semibold text-slate-400">
            Nome do Projeto
          </label>
          <input
            id="projectName"
            className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-white placeholder:text-slate-600"
            placeholder="Digite o nome do projeto"
            type="text"
            value={projectName}
            onChange={(e) => onProjectNameChange(e.target.value)}
          />
        </div>
      </div>
    </section>
  );
}
