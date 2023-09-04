let flag = true;


const bicicletasTodas = [
    {
        id: 1,
        rodado: 26,
        precio: 4000,
        color: "Azul",
        estado: "Disponible",
    },
    {
        id: 2,
        rodado: 28,
        precio: 5000,
        color: "Blanco",
        estado: "Disponible",
    },
    {
        id: 3,
        rodado: 24,
        precio: 3000,
        color: "Blanco",
        estado: "Alquilado",
    },
    {
        id: 4,
        rodado: 26,
        precio: 8000,
        color: "Rojo",
        estado: "Disponible",
    },
];



const bicicletasAlquiladas = [
    {
        id: 3,
        rodado: 24,
        precio: 3000,
        color: "Blanco",
        estado: "Alquilado",
    },
];



let bicicletaArray = [];
let alquilerArray = [];



class Bicicletas {

    constructor({ id, rodado, precio, color, estado }) {
        this.id = id;
        this.rodado = rodado;
        this.precio = precio;
        this.color = color;
        this.estado = estado;
    }

    recargo() {
        return this.precio * 1.30;
    }
}



function agregarBici() {

    bicicletasTodas.forEach(bicicleta => {
        bicicletaArray.push(new Bicicletas(bicicleta))
    });


    bicicletasAlquiladas.forEach(bicicleta => {
        alquilerArray.push(new Bicicletas(bicicleta))
    });

}



function inicio() {
    do {
        let seleccion = Number(prompt("                 **------------BICICLETERIA RAULITO------------** \n<< Seleccione Opcion >> \n1- Ingresar Bicicletas \n2- Ver Bicicletas \n3- Alquilar Bicicletas \n4- Cobrar Bicicletas \n5- Ordenar Bicicletas por Rodado Mayor \n6- Eliminar Bicicletas \n7- Salida"));

        switch (seleccion) {
            case 1:
                cargarBicicletas();
                break;
            case 2:
                verBicicletas();
                break;
            case 3:
                validacionCantidad();
                alquilarBicicleta();
                break;
            case 4:
                cobrarBicicleta();
                break;
            case 5:
                ordenarBicicletasporRodado();
                verBicicletas();
                ordenarBicicletasporId();
                break;
            case 6:
                validacionCantidad();
                eliminarBicicleta();
                break;
            case 7:
                flag = false;
                break;
            default:
                alert("Ingrese una opcion valida!");
                break;
        }

        if (flag === false) {
            break;
        }

    } while (flag);

}



function cargarBicicletas() {
    do {
        rodado = Number(prompt("Ingrese Rodado "));
    } while (isNaN(rodado));

    do {
        precio = Number(prompt("Ingrese Precio de alquiler "));
    } while (isNaN(precio));

    do {
        color = prompt("Ingrese Color");
    } while (!isNaN(color));

    bicicletaArray.push(new Bicicletas({
        id: maximoId()+ 1,
        rodado: rodado,
        precio: precio,
        color: color,
        estado: "Disponible"
    }));
    alert("Se agrega nueva bicicleta !");
}



function verBicicletas() {
    let cadenaBicicletas = "";
    bicicletaArray.forEach(bicicleta => {
        cadenaBicicletas += "ID: " + bicicleta.id + " - Rodado: " + bicicleta.rodado + " - Color: " + bicicleta.color + " - Precio: " + bicicleta.precio + " - Estado: " + bicicleta.estado + " \n"
    });
    alert("*****************LISTADO BICICLETAS***************** \n" + cadenaBicicletas);
}



function alquilarBicicleta() {
    let id;
    let bicicletaYaAlquilada = false;

    do {
        id = Number(prompt("Ingrese ID de la bicicleta que desea alquilar "));
    } while (isNaN(id));

    if (!encuentaIdBicicleta(id)) {
        alert("No existe esa bicicleta!");
        return inicio();
    }

    bicicletaArray.forEach(bicicleta => {
        if (bicicleta.id === id && bicicleta.estado === "Disponible") {
            bicicleta.estado = "Alquilado";
            alquilerArray.push(new Bicicletas(bicicleta));
            alert("Bicicleta " + id + " alquilada! ");
        } else if (bicicleta.id === id && bicicleta.estado !== "Disponible" && !bicicletaYaAlquilada) {
            bicicletaYaAlquilada = true;
            alert("La bicicleta " + id + " ya está alquilada! ");
        }
    });
}



function cobrarBicicleta() {
    let flag = true;
    let id;
    let recargo = "";
    let total = 0;

    do {

        if (alquilerArray.length == 0) {
            alert("Ya no hay mas bicicletas alquiladas!!!");
            inicio();
        }

        do {
            id = Number(prompt("Ingrese ID de la bicicleta que desea cobrar "));
        } while (!encuentraIdAlquiler(id));

        do {
            recargo = prompt("Hubo atraso en la devolucion de la bicicleta? (S/N) ").toUpperCase();
        } while (recargo !== "S" && recargo !== "N");

        alquilerArray.forEach(bicicleta => {
            if (bicicleta.id === id) {

                if (recargo === "S") {
                    const bicicletaInstancia = new Bicicletas(bicicleta);
                    const precioConRecargo = bicicletaInstancia.recargo();
                    total = total + precioConRecargo;
                } else {
                    total = total + bicicleta.precio;
                }

                const bicicletaAlquilada = bicicletaArray.find(bicicleta => bicicleta.id === id);
                if (bicicletaAlquilada) {
                    bicicletaAlquilada.estado = "Disponible";
                }
                alquilerArray = alquilerArray.filter(bici => bici.id !== id);
            }
        });

        do {
            respuesta = prompt("Desea seguir cargando? (S/N)").toUpperCase();
        } while (respuesta !== "S" && respuesta !== "N");

        if (respuesta === "N") {
            alert("El total a pagar por las bicicletas alquiladas es: " + total);
            flag = false;
        } else {
            if (alquilerArray.length == 0) {
                alert("Ya no hay mas bicicletas alquiladas, el total a pagar es: " + total);
                flag = false;
            }
        }

    } while (flag);
}




function eliminarBicicleta() {
    let id;
    do {
        id = Number(prompt("Ingrese ID de la bicicleta que desea eliminar "));
    } while (isNaN(id));

    const bicicletaId = bicicletaArray.findIndex(bicicleta => bicicleta.id === id);

    if (bicicletaId === -1) {
        alert("No se encontró una bicicleta con ese ID");
    } else if (bicicletaArray[bicicletaId].estado !== "Disponible") {
        alert("La bicicleta con ID " + id + " esta alquilada, no se puede eliminar");
    } else {
        const bicicletaEliminada = bicicletaArray.splice(bicicletaId, 1)[0];
        alert("Eliminaste la bicicleta " + bicicletaEliminada.id);
    }
}



function ordenarBicicletasporRodado() {
    bicicletaArray.sort(compararPorRodado);
}

function ordenarBicicletasporId() {
    bicicletaArray.sort(compararPorId);
}

function compararPorRodado(a, b) {
    return b.rodado - a.rodado;
}

function compararPorId(a, b) {
    return a.id - b.id;
}

function encuentaIdBicicleta(id) {
    return bicicletaArray.find(item => item.id === id) !== undefined;
}

function encuentraIdAlquiler(id) {
    return alquilerArray.find(item => item.id === id) !== undefined;
}



function validacionCantidad() {
    let disponible = 0;
    bicicletaArray.forEach(bicicleta => {
        if (bicicleta.estado === "Disponible") {
            disponible = disponible + 1;
        }
    });

    if (disponible === 0) {
        alert("No hay bicicletas disponibles!!");
        return inicio();
    }
}



function maximoId() {
    let maxId = 0;
    for (const bicicleta of bicicletaArray) {
        if (bicicleta.id > maxId) {
            maxId = bicicleta.id;
        }
    }
    return maxId;
}



agregarBici();
inicio();