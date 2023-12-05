import React, { useState, useEffect } from 'react';

const KRIPresupuestoProyectos = () => {
    const [kriDesviacionPresupuesto, setKriDesviacionPresupuesto] = useState({
        valor: 'Cargando...', // Valor actual del KRI
        descripcion: 'Este KRI mide el porcentaje de desviación entre el presupuesto planificado y el presupuesto real gastado en los proyectos.',
        objetivo: 'Evaluar la precisión en la planificación financiera de los proyectos y la eficiencia en el control de costos.',
        riesgo: 'Una alta desviación en el presupuesto puede indicar problemas en la gestión de costos, lo que puede afectar la rentabilidad y la viabilidad de los proyectos.',
        formula: '(Suma de (Presupuesto Gastado - Presupuesto Planificado) / Suma del Presupuesto Planificado) x 100.',
        unidadMedida: 'Porcentaje (%)',
        origenDatos: 'Datos de presupuesto planificado y presupuesto gastado de los proyectos en el sistema.',
        periodicidadMedicion: 'Mensual o trimestral',
        frecuenciaAnalisis: 'Trimestral o semestral',
        limites: 'Meta de una desviación menor al 10% para indicar una gestión de costos efectiva.'
    });

    // Aquí podrías agregar la lógica para obtener los datos del KRI del backend

    return (
        <div>
            <div>
                <h2>Tasa de Desviación del Presupuesto de Proyectos</h2>
                <p><strong>Descripción:</strong> {kriDesviacionPresupuesto.descripcion}</p>
                <p><strong>Objetivo:</strong> {kriDesviacionPresupuesto.objetivo}</p>
                <p><strong>Riesgo:</strong> {kriDesviacionPresupuesto.riesgo}</p>
                <p><strong>Fórmula de Medición:</strong> {kriDesviacionPresupuesto.formula}</p>
                <p><strong>Unidad de Medida:</strong> {kriDesviacionPresupuesto.unidadMedida}</p>
                <p><strong>Origen de los Datos:</strong> {kriDesviacionPresupuesto.origenDatos}</p>
                <p><strong>Periodicidad de Medición:</strong> {kriDesviacionPresupuesto.periodicidadMedicion}</p>
                <p><strong>Frecuencia de Análisis:</strong> {kriDesviacionPresupuesto.frecuenciaAnalisis}</p>
                <p><strong>Límites Admitidos:</strong> {kriDesviacionPresupuesto.limites}</p>
            </div>
        </div>
    );
};

export default KRIPresupuestoProyectos;
