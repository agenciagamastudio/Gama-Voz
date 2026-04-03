// src/components/CargoSalarioManager.jsx
import React, { useState, useEffect } from 'react';
import Input from './ds/Input';
import Button from './ds/Button';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../utils/supabase';
import { suggestRoleMonthlySalary } from '../utils/marketData';
import { formatCurrency, isPositiveNumber, calculateHourlyCostFromMonthly } from '../logic/calculosDeValor';

function CargoSalarioManager({ onRolesChange }) {
    const { currentUser } = useAuth();

    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    const [newRoleName, setNewRoleName] = useState('');
    const [newRoleMonthlyCost, setNewRoleMonthlyCost] = useState('');
    const [newRoleDaysPerMonth, setNewRoleDaysPerMonth] = useState(22);
    const [newRoleHoursPerDay, setNewRoleHoursPerDay] = useState(8);

    const [newRoleNameError, setNewRoleNameError] = useState('');
    const [newRoleMonthlyCostError, setNewRoleMonthlyCostError] = useState('');
    const [newRoleDaysPerMonthError, setNewRoleDaysPerMonthError] = useState('');
    const [newRoleHoursPerDayError, setNewRoleHoursPerDayError] = useState('');

    // ─── Carregar cargos do Supabase ──────────────────────────────────────────
    useEffect(() => {
        if (!currentUser) {
            setRoles([]);
            setLoading(false);
            return;
        }

        const loadRoles = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('custom_roles')
                .select('id, name, monthly_cost, days_per_month, hours_per_day, hourly_cost')
                .eq('user_id', currentUser.id)
                .order('created_at', { ascending: true });

            if (!error && data) {
                const mapped = data.map(r => ({
                    id: r.id,
                    name: r.name,
                    monthlyCost: parseFloat(r.monthly_cost),
                    daysPerMonth: r.days_per_month,
                    hoursPerDay: r.hours_per_day,
                    hourlyCost: parseFloat(r.hourly_cost),
                }));
                setRoles(mapped);
                onRolesChange(mapped);
            }
            setLoading(false);
        };

        loadRoles();
    }, [currentUser]); // eslint-disable-line react-hooks/exhaustive-deps

    // ─── Notifica o pai quando roles mudam ────────────────────────────────────
    useEffect(() => {
        onRolesChange(roles);
    }, [roles, onRolesChange]);

    // ─── Adicionar cargo ──────────────────────────────────────────────────────
    const handleAddRole = async () => {
        let isValid = true;
        setNewRoleNameError('');
        setNewRoleMonthlyCostError('');
        setNewRoleDaysPerMonthError('');
        setNewRoleHoursPerDayError('');

        if (!newRoleName.trim()) {
            setNewRoleNameError('O nome do cargo não pode ser vazio.');
            isValid = false;
        }
        if (roles.some(r => r.name.toLowerCase() === newRoleName.trim().toLowerCase())) {
            setNewRoleNameError('Já existe um cargo com este nome.');
            isValid = false;
        }

        const monthlyCost = parseFloat(newRoleMonthlyCost);
        if (!isPositiveNumber(monthlyCost) || monthlyCost <= 0) {
            setNewRoleMonthlyCostError('Custo mensal deve ser um número positivo.');
            isValid = false;
        }

        const daysPerMonth = parseFloat(newRoleDaysPerMonth);
        if (!isPositiveNumber(daysPerMonth) || daysPerMonth <= 0 || daysPerMonth > 31) {
            setNewRoleDaysPerMonthError('Dias devem ser entre 1 e 31.');
            isValid = false;
        }

        const hoursPerDay = parseFloat(newRoleHoursPerDay);
        if (!isPositiveNumber(hoursPerDay) || hoursPerDay <= 0 || hoursPerDay > 24) {
            setNewRoleHoursPerDayError('Horas devem ser entre 1 e 24.');
            isValid = false;
        }

        if (!isValid) return;

        const hourlyCost = calculateHourlyCostFromMonthly(monthlyCost, daysPerMonth, hoursPerDay);

        // Otimista: adiciona na UI imediatamente com ID temporário
        const tempId = `temp-${Date.now()}`;
        const optimisticRole = {
            id: tempId,
            name: newRoleName.trim(),
            monthlyCost,
            daysPerMonth,
            hoursPerDay,
            hourlyCost,
        };
        setRoles(prev => [...prev, optimisticRole]);
        setNewRoleName('');
        setNewRoleMonthlyCost('');

        // Persiste no Supabase
        if (currentUser) {
            const { data, error } = await supabase
                .from('custom_roles')
                .insert({
                    user_id: currentUser.id,
                    name: optimisticRole.name,
                    monthly_cost: monthlyCost,
                    days_per_month: daysPerMonth,
                    hours_per_day: hoursPerDay,
                })
                .select('id, hourly_cost')
                .single();

            if (error) {
                // Rollback se falhar
                setRoles(prev => prev.filter(r => r.id !== tempId));
                setNewRoleName(optimisticRole.name);
                setNewRoleMonthlyCost(monthlyCost.toString());
            } else {
                // Substitui ID temporário pelo UUID real do banco
                setRoles(prev => prev.map(r =>
                    r.id === tempId
                        ? { ...r, id: data.id, hourlyCost: parseFloat(data.hourly_cost) }
                        : r
                ));
            }
        }
    };

    // ─── Remover cargo ────────────────────────────────────────────────────────
    const handleRemoveRole = async (id) => {
        // Otimista: remove da UI imediatamente
        const removed = roles.find(r => r.id === id);
        setRoles(prev => prev.filter(r => r.id !== id));

        if (currentUser) {
            const { error } = await supabase
                .from('custom_roles')
                .delete()
                .eq('id', id)
                .eq('user_id', currentUser.id);

            if (error && removed) {
                // Rollback se falhar
                setRoles(prev => [...prev, removed].sort((a, b) => a.name.localeCompare(b.name)));
            }
        }
    };

    // ─── JSX ──────────────────────────────────────────────────────────────────
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end bg-white/5 p-6 rounded-xl border border-white/5">
                <Input
                    label="Nome do Cargo"
                    id="newRoleName"
                    type="text"
                    value={newRoleName}
                    onChange={(e) => setNewRoleName(e.target.value)}
                    error={newRoleNameError}
                    placeholder="Ex: Dev Sênior"
                />
                <div className="relative group">
                    <Input
                        label="Custo Mensal (R$)"
                        id="newRoleMonthlyCost"
                        type="number"
                        value={newRoleMonthlyCost}
                        onChange={(e) => setNewRoleMonthlyCost(e.target.value)}
                        error={newRoleMonthlyCostError}
                        placeholder="0.00"
                    />
                    <button
                        onClick={() => {
                            const suggested = suggestRoleMonthlySalary(newRoleName);
                            if (suggested) setNewRoleMonthlyCost(suggested.toString());
                        }}
                        disabled={!newRoleName}
                        className={`absolute right-2 top-[38px] p-1.5 rounded-md transition-all text-slate-500 hover:text-primary hover:bg-white/5 ${!newRoleName && 'opacity-20 cursor-not-allowed'}`}
                        title={newRoleName ? 'Sugerir salário médio por cargo' : 'Preencha o cargo para sugerir'}
                    >
                        <span className="material-symbols-outlined text-[18px]">auto_fix</span>
                    </button>
                </div>
                <Input
                    label="Dias/Mês"
                    type="number"
                    value={newRoleDaysPerMonth}
                    onChange={(e) => setNewRoleDaysPerMonth(e.target.value)}
                    error={newRoleDaysPerMonthError}
                />
                <Input
                    label="Horas/Dia"
                    type="number"
                    value={newRoleHoursPerDay}
                    onChange={(e) => setNewRoleHoursPerDay(e.target.value)}
                    error={newRoleHoursPerDayError}
                />
                <div className="md:col-span-2 lg:col-span-4 flex justify-end">
                    <button
                        onClick={handleAddRole}
                        className="flex items-center gap-2 px-6 py-2.5 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                    >
                        <span className="material-symbols-outlined text-[20px]">add_circle</span>
                        Cadastrar Cargo
                    </button>
                </div>
            </div>

            {loading && (
                <p className="text-[10px] text-slate-500 uppercase tracking-widest text-center animate-pulse">
                    carregando cargos...
                </p>
            )}

            {!loading && roles.length > 0 && (
                <div className="space-y-3">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Cargos Salvos</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {roles.map(role => (
                            <div key={role.id} className="flex items-center justify-between p-4 bg-[#111] border border-white/5 rounded-xl group hover:border-primary/30 transition-all">
                                <div>
                                    <p className="text-sm font-bold text-white">{role.name}</p>
                                    <div className="flex gap-3 mt-1">
                                        <p className="text-[10px] text-slate-400 font-medium">MENSAL: {formatCurrency(role.monthlyCost)}</p>
                                        <p className="text-[10px] text-primary font-bold">HORA: {formatCurrency(role.hourlyCost)}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleRemoveRole(role.id)}
                                    className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                                >
                                    <span className="material-symbols-outlined text-[18px]">delete</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CargoSalarioManager;
