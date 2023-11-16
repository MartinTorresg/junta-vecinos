import React, { useState, useEffect } from 'react';
import { Global } from '../../../helpers/Global';
import KPIRegistroVecinosDashboard from './KPIRegistroVecinosDashboard';

const KPIDashboard = () => {
    const [kpiRegistroVecinos, setKpiRegistroVecinos] = useState({
        valor: 'Cargando...', // Valor actual del KPI
        descripcion: 'Este KPI mide el porcentaje de los vecinos registrados en el sistema en comparación en la totalidad de los habitantes de la unidad territorial.',
        objetivo: 'Evaluar la adopción del sistema por parte de los vecinos y la eficacia de las estrategias de registro.',
        formula: '(Número de vecinos registrados en el sistema / Número total de vecinos en la unidad territorial) x 100.',
        unidadMedida: 'Porcentaje (%)',
        origenDatos: 'Datos de registro en la plataforma.',
        periodicidadMedicion: 'Diaria',
        frecuenciaAnalisis: 'Semanal',
        limites: 'Meta del 80% o más para indicar una adopción exitosa del sistema.'
    });

    // Aquí puedes implementar la lógica para obtener los datos del backend
    useEffect(() => {
        const fetchKPIData = async () => {
            try {
                // Reemplaza la URL con la URL de tu API
                const response = await fetch(Global.url + 'user/total-users');
                const data = await response.json();

                setKpiRegistroVecinos(prevState => ({
                    ...prevState,
                    valor: `${data.tasaRegistro.toFixed(2)}%` // Actualiza solo el valor del KPI
                }));
            } catch (error) {
                console.error('Error al obtener los datos del KPI:', error);
                setKpiRegistroVecinos(prevState => ({
                    ...prevState,
                    valor: 'Error al cargar' // Muestra un mensaje de error en caso de fallo
                }));
            }
        };

        fetchKPIData();
    }, []);

    return (
        <div className="kpi-container">
            <div className="kpi">
                <h2>Tasa de Registro de Vecinos</h2>
                <p><strong>Valor Actual:</strong> {kpiRegistroVecinos.valor}</p>
                <p><strong>Descripción:</strong> {kpiRegistroVecinos.descripcion}</p>
                <p><strong>Objetivo:</strong> {kpiRegistroVecinos.objetivo}</p>
                <p><strong>Fórmula de Medición:</strong> {kpiRegistroVecinos.formula}</p>
                <p><strong>Unidad de Medida:</strong> {kpiRegistroVecinos.unidadMedida}</p>
                <p><strong>Origen de los Datos:</strong> {kpiRegistroVecinos.origenDatos}</p>
                <p><strong>Periodicidad de Medición:</strong> {kpiRegistroVecinos.periodicidadMedicion}</p>
                <p><strong>Frecuencia de Análisis:</strong> {kpiRegistroVecinos.frecuenciaAnalisis}</p>
                <p><strong>Límites Admitidos:</strong> {kpiRegistroVecinos.limites}</p>
            </div>
            <div>
            <h1>Dashboard</h1>
            <KPIRegistroVecinosDashboard />
        </div>
        </div>
    );
};

export default KPIDashboard;
