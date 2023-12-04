import React, { useState, useEffect } from 'react';

const KRIRegistroVecinos = ({ kriData }) => {
    const [kriIndiceInactividad, setKriIndiceInactividad] = useState({
        valor: 'Cargando...', // Valor actual del KRI
        descripcion: 'Este KRI mide el porcentaje de vecinos inactivos en el sistema para identificar posibles desafíos en la retención de usuarios.',
        objetivo: 'Detectar tempranamente la disminución en la participación de los vecinos que podría indicar problemas en la plataforma o desinterés.',
        riesgo: 'Baja participación de los vecinos y pérdida de usuarios activos.',
        formula: '(Número de vecinos inactivos en el sistema / Número total de vecinos en la unidad territorial) x 100.',
        unidadMedida: 'Porcentaje (%)',
        origenDatos: 'Datos de actividad e inactividad en la plataforma.',
        periodicidadMedicion: 'Mensual',
        frecuenciaAnalisis: 'Trimestral',
        limites: 'Un porcentaje mayor al 20% podría indicar un riesgo de desinterés en la comunidad.'
    });

    return (
        <div>
            <div>
                <h2>Índice de Inactividad de Vecinos</h2>
                <p><strong>Descripción:</strong> {kriIndiceInactividad.descripcion}</p>
                <p><strong>Objetivo:</strong> {kriIndiceInactividad.objetivo}</p>
                <p><strong>Riesgo: </strong> {kriIndiceInactividad.riesgo}</p>
                <p><strong>Fórmula de Medición:</strong> {kriIndiceInactividad.formula}</p>
                <p><strong>Unidad de Medida:</strong> {kriIndiceInactividad.unidadMedida}</p>
                <p><strong>Origen de los Datos:</strong> {kriIndiceInactividad.origenDatos}</p>
                <p><strong>Periodicidad de Medición:</strong> {kriIndiceInactividad.periodicidadMedicion}</p>
                <p><strong>Frecuencia de Análisis:</strong> {kriIndiceInactividad.frecuenciaAnalisis}</p>
                <p><strong>Límites Admitidos:</strong> {kriIndiceInactividad.limites}</p>
            </div>
        </div>
    );
};

export default KRIRegistroVecinos;
