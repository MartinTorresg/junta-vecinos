export const Peticion = async (url, metodo, datosGuardar = "", archivos = false) => {

    let cargando = true;


    let opciones = {
        method: "GET"
    }

    if (metodo == "GET" || metodo == "DELETE") {
        opciones = {
            method: metodo,
        };
    }

    if (metodo === "POST" || metodo === "PUT") {
        if (archivos) {
            opciones = {
                method: metodo,
                body: datosGuardar
            };
        } else {
            opciones = {
                method: metodo,
                headers: {
                    "Content-Type": "application/json"
                }
            };
            if (datosGuardar) {
                opciones.body = JSON.stringify(datosGuardar);
            }
        }
    }
    

    const peticion = await fetch(url, opciones);
    const datos = await peticion.json();

    cargando = false;

    return {
        datos,
        cargando
    }

}
