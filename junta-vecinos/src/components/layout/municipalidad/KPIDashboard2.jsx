import React, { useState, useEffect } from 'react';
import { Global } from '../../../helpers/Global';
import KPITasaFinalizacionProyectosDashboard from './KPITasaFinalizacionProyectosDashboard';

const KPIDashboard2 = () => {
    const [kpiFinalizacionProyectos, setKpiFinalizacionProyectos] = useState({
        valor: 'Cargando...', // Valor actual del KPI
        descripcion: 'Este KPI mide la proporción de proyectos que se han completado con éxito.',
        objetivo: 'Evaluar la eficiencia en la gestión y finalización de los proyectos.',
        formula: '(Número total de proyectos completados / Número total de proyectos iniciados) x 100.',
        unidadMedida: 'Porcentaje (%)',
        origenDatos: 'Datos del estado de los proyectos en el sistema.',
        periodicidadMedicion: 'Mensual o trimestral',
        frecuenciaAnalisis: 'Trimestral o semestral',
        limites: 'Meta del 90% o más indica una gestión eficaz.'
    });

    useEffect(() => {
        const fetchKPITasaFinalizacion = async () => {
            try {
                const response = await fetch(Global.url + 'proyecto/kpi-tasa-finalizacion-proyectos');
                const data = await response.json();

                if (data.status === 'success') {
                    setKpiFinalizacionProyectos(prevState => ({
                        ...prevState,
                        valor: `${data.tasaFinalizacion}%` // Asume que tu backend devuelve un campo 'tasaFinalizacion'
                    }));
                } else {
                    console.error('Error al obtener los datos del KPI:', data.message);
                    setKpiFinalizacionProyectos(prevState => ({
                        ...prevState,
                        valor: 'Error al cargar'
                    }));
                }
            } catch (error) {
                console.error('Error al obtener los datos del KPI:', error);
                setKpiFinalizacionProyectos(prevState => ({
                    ...prevState,
                    valor: 'Error al cargar'
                }));
            }
        };

        fetchKPITasaFinalizacion();
    }, []);

    return (
        <div className="kpi-container">
            <div className="kpi">
                <h2>Tasa de Finalización de Proyectos</h2>
                <p><strong>Valor Actual:</strong> {kpiFinalizacionProyectos.valor}</p>
                <p><strong>Descripción:</strong> {kpiFinalizacionProyectos.descripcion}</p>
                <p><strong>Objetivo:</strong> {kpiFinalizacionProyectos.objetivo}</p>
                <p><strong>Fórmula de Medición:</strong> {kpiFinalizacionProyectos.formula}</p>
                <p><strong>Unidad de Medida:</strong> {kpiFinalizacionProyectos.unidadMedida}</p>
                <p><strong>Origen de los Datos:</strong> {kpiFinalizacionProyectos.origenDatos}</p>
                <p><strong>Periodicidad de Medición:</strong> {kpiFinalizacionProyectos.periodicidadMedicion}</p>
                <p><strong>Frecuencia de Análisis:</strong> {kpiFinalizacionProyectos.frecuenciaAnalisis}</p>
                <p><strong>Límites Admitidos:</strong> {kpiFinalizacionProyectos.limites}</p>
            </div>
            {/* Aquí deberías incluir la visualización del KPI, si es necesario */}
            <KPITasaFinalizacionProyectosDashboard />
        </div>
    );
};

export default KPIDashboard2;
