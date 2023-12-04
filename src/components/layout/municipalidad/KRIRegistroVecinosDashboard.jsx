import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Global } from '../../../helpers/Global';

const KRIRegistroVecinosDashboard = () => {
    const [kriData, setKriData] = useState({
        valorActual: 'Cargando...',
        historial: []
    });

    useEffect(() => {
        const fetchKRIData = async () => {
            try {
                // Asegúrate de actualizar la URL con el endpoint correcto para tu KRI
                const response = await fetch(Global.url + 'user/kri-indice-inactividad');
                const data = await response.json();
                setKriData({
                    valorActual: data.valorActual,
                    historial: data.historial
                });
            } catch (error) {
                console.error('Error al obtener los datos del KRI:', error);
            }
        };

        fetchKRIData();
    }, []);

    return (
        <div>
            <h1>Índice de Inactividad de Vecinos</h1>
            <p><strong>Valor Actual:</strong> {kriData.valorActual}%</p>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <AreaChart data={kriData.historial}>
                        <defs>
                            <linearGradient id="colorInactividad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="fecha" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area type="monotone" dataKey="indice" stroke="#82ca9d" fillOpacity={1} fill="url(#colorInactividad)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default KRIRegistroVecinosDashboard;
