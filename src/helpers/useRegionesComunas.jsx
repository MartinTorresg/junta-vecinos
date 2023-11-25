import { useState, useEffect } from 'react';
import { Peticion } from './Peticion';
import { Global } from './Global';

export const useRegionesComunas = (cambiado) => {
    const [regiones, setRegiones] = useState([]);
    const [comunas, setComunas] = useState([]);

    useEffect(() => {
        const cargarRegiones = async () => {
            const response = await Peticion(Global.url + "regiones/regiones", "GET");
            console.log("Regiones cargadas:", response.datos); // Información de las regiones cargadas
            setRegiones(response.datos);
        };
        cargarRegiones();
    }, []);

    const handleRegionChange = async (e) => {
        cambiado(e);
        console.log("Región seleccionada:", e.target.value); // Información de la región seleccionada

        try {
            const response = await Peticion(Global.url + `comunas/comunas/region/${e.target.value}`, "GET");
            console.log("Comunas cargadas para la región:", response.datos); // Información de las comunas cargadas
            setComunas(response.datos);
        } catch (error) {
            console.error("Error al cargar comunas:", error);
        }
    };

    return { regiones, comunas, handleRegionChange };
};
