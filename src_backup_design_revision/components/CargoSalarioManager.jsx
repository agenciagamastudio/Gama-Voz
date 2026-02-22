// src/components/CargoSalarioManager.jsx
import React, { useState } from 'react';
import Input from './ds/Input';
import Button from './ds/Button';
import useLocalStorage from '../hooks/useLocalStorage'; // Reusing existing hook
import { formatCurrency, isPositiveNumber, calculateHourlyCostFromMonthly } from '../logic/calculosDeValor';
import './CargoSalarioManager.css';

function CargoSalarioManager({ onRolesChange }) {
    // Structure for a role: { id: number, name: string, monthlyCost: number, daysPerMonth: number, hoursPerDay: number, hourlyCost: number }
    const [roles, setRoles] = useLocalStorage('customRoles', []);
    const [newRoleName, setNewRoleName] = useState('');
    const [newRoleMonthlyCost, setNewRoleMonthlyCost] = useState('');
    const [newRoleDaysPerMonth, setNewRoleDaysPerMonth] = useState(22); // Default to 22 working days
    const [newRoleHoursPerDay, setNewRoleHoursPerDay] = useState(8);   // Default to 8 working hours per day

    const [newRoleNameError, setNewRoleNameError] = useState('');
    const [newRoleMonthlyCostError, setNewRoleMonthlyCostError] = useState('');
    const [newRoleDaysPerMonthError, setNewRoleDaysPerMonthError] = useState('');
    const [newRoleHoursPerDayError, setNewRoleHoursPerDayError] = useState('');

    const handleAddRole = () => {
        let isValid = true;
        setNewRoleNameError('');
        setNewRoleMonthlyCostError('');
        setNewRoleDaysPerMonthError('');
        setNewRoleHoursPerDayError('');

        if (!newRoleName.trim()) {
            setNewRoleNameError('O nome do cargo não pode ser vazio.');
            isValid = false;
        }
        if (roles.some(role => role.name.toLowerCase() === newRoleName.trim().toLowerCase())) {
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

        if (isValid) {
            const calculatedHourlyCost = calculateHourlyCostFromMonthly(monthlyCost, daysPerMonth, hoursPerDay);

            const newRole = {
                id: Date.now(), // Simple unique ID
                name: newRoleName.trim(),
                monthlyCost: monthlyCost,
                daysPerMonth: daysPerMonth,
                hoursPerDay: hoursPerDay,
                hourlyCost: calculatedHourlyCost
            };
            const updatedRoles = [...roles, newRole];
            setRoles(updatedRoles);
            onRolesChange(updatedRoles); // Notify parent component of change
            setNewRoleName('');
            setNewRoleMonthlyCost('');
            // Keep daysPerMonth and hoursPerDay defaults
        }
    };

    const handleRemoveRole = (id) => {
        const updatedRoles = roles.filter(role => role.id !== id);
        setRoles(updatedRoles);
        onRolesChange(updatedRoles); // Notify parent component of change
    };

    return (
        <div className="cargo-salario-manager">
            <h3>Gerenciar Cargos Personalizados</h3>
            <div className="add-role-form">
                <Input
                    label="Nome do Cargo:"
                    id="newRoleName"
                    type="text"
                    value={newRoleName}
                    onChange={(e) => setNewRoleName(e.target.value)}
                    error={newRoleNameError}
                    placeholder="Ex: Desenvolvedor Sênior"
                />
                <Input
                    label="Custo Mensal (R$):"
                    id="newRoleMonthlyCost"
                    type="number"
                    value={newRoleMonthlyCost}
                    onChange={(e) => setNewRoleMonthlyCost(e.target.value)}
                    error={newRoleMonthlyCostError}
                    placeholder="Ex: 5000"
                />
                <Input
                    label="Dias Trab. p/ Mês:"
                    id="newRoleDaysPerMonth"
                    type="number"
                    value={newRoleDaysPerMonth}
                    onChange={(e) => setNewRoleDaysPerMonth(e.target.value)}
                    error={newRoleDaysPerMonthError}
                    placeholder="Ex: 22"
                />
                 <Input
                    label="Horas Trab. p/ Dia:"
                    id="newRoleHoursPerDay"
                    type="number"
                    value={newRoleHoursPerDay}
                    onChange={(e) => setNewRoleHoursPerDay(e.target.value)}
                    error={newRoleHoursPerDayError}
                    placeholder="Ex: 8"
                />
                <Button onClick={handleAddRole} variant="primary" size="medium">Adicionar Cargo</Button>
            </div>

            {roles.length > 0 && (
                <div className="roles-list">
                    <h4>Cargos Cadastrados:</h4>
                    <ul>
                        {roles.map(role => (
                            <li key={role.id}>
                                <span>
                                    {role.name}: {formatCurrency(role.monthlyCost)}/mês
                                    ({formatCurrency(role.hourlyCost)}/hora)
                                </span>
                                <Button onClick={() => handleRemoveRole(role.id)} variant="danger" size="small">Remover</Button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default CargoSalarioManager;
