export const Peticion = async (url, metodo = 'GET', datosGuardar = null, archivos = false) => {
    let opciones = {
        method: metodo,
        headers: new Headers({
            "Content-Type": "application/json"
        }),
    };

    if (metodo === 'POST' || metodo === 'PUT') {
        if (archivos) {
            // Asumiendo que 'datosGuardar' es un objeto FormData para subir archivos
            opciones.body = datosGuardar;
        } else if (datosGuardar) {
            opciones.body = JSON.stringify(datosGuardar);
        }
    } else if (metodo === 'GET' || metodo === 'DELETE') {
        // No se necesita 'body' para estos métodos
        delete opciones.body;
    }

    try {
        const response = await fetch(url, opciones);
        const datos = await response.json();

        return {
            ok: response.ok,
            status: response.status,
            datos,
            cargando: false
        }
    } catch (error) {
        console.error("Error en la petición:", error);
        return {
            ok: false,
            status: 'Network error',
            datos: null,
            cargando: false
        }
    }
}
