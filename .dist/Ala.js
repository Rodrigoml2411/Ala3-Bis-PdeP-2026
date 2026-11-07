"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require("readline");
const ModeloTarea = require("./ModeloTarea");
const GestorTareas = require("./GestorTareas");
const AlmacenamientoTareas = require("./AlmacenamientoTareas");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function input(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}
const MAX_TITULO = 100;
const MAX_DESC = 500;
const gestorTareas = new GestorTareas();
function mostrarDetalleTarea(tarea) {
    var _a, _b, _c;
    console.log("Título:", tarea.titulo);
    console.log("Descripción:", (_a = tarea.descripcion) !== null && _a !== void 0 ? _a : "Sin descripción");
    console.log("Estado:", ModeloTarea.nombresEstado[tarea.estado]);
    console.log("Dificultad:", ModeloTarea.emojisDificultad[tarea.dificultad]);
    console.log("Fecha de creación:", tarea.fechaCreacion);
    console.log("Última edición:", (_b = tarea.ultimaEdicion) !== null && _b !== void 0 ? _b : "Sin editar");
    console.log("Vencimiento:", (_c = tarea.vencimiento) !== null && _c !== void 0 ? _c : "Sin vencimiento");
}
function agregarTareas() {
    return __awaiter(this, void 0, void 0, function* () {
        const nueva = new ModeloTarea.Tarea("", null, ModeloTarea.Dificultad.FACIL, ModeloTarea.Estado.PENDIENTE, new Date().toISOString().slice(0, 10));
        nueva.titulo = (yield input("Ingrese el título de la tarea: ")).trim().slice(0, MAX_TITULO);
        if (nueva.titulo === "") {
            console.log("El título es obligatorio; no se agregó la tarea.\n");
            return;
        }
        const descripcion = (yield input("Descripción (opcional, ENTER para omitir): ")).slice(0, MAX_DESC);
        nueva.descripcion = descripcion || null;
        const dif = parseInt(yield input("Dificultad (0: Fácil, 1: Medio, 2: Difícil): "));
        nueva.dificultad = (dif >= 0 && dif <= 2) ? dif : ModeloTarea.Dificultad.FACIL;
        const est = parseInt(yield input("Estado (0: Pendiente, 1: En curso, 2: Terminada, 3: Cancelada): "));
        nueva.estado = (est >= 0 && est <= 3) ? est : ModeloTarea.Estado.PENDIENTE;
        const fechaCreacion = yield input("Ingrese la fecha de creación (Formato: AAAA-MM-DD, ENTER para hoy): ");
        if (fechaCreacion.trim() !== "") {
            nueva.fechaCreacion = fechaCreacion;
        }
        gestorTareas.agregar(nueva);
        yield guardarTareas();
        console.log("✅ Tarea agregada con éxito.\n");
    });
}
function modificarTarea() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        mostrarTareas();
        const indice = Number.parseInt(yield input("Número de tarea a modificar: "), 10) - 1;
        const actual = gestorTareas.obtenerTodas()[indice];
        if (!actual) {
            console.log("Número de tarea no válido.\n");
            return;
        }
        console.log("Deje el campo vacío para mantener su valor actual.");
        const titulo = yield input(`Título (${actual.titulo}): `);
        const descripcion = yield input(`Descripción (${(_a = actual.descripcion) !== null && _a !== void 0 ? _a : "Sin descripción"}; "-" para borrar): `);
        const estado = yield input(`Estado (0: Pendiente, 1: En curso, 2: Terminada, 3: Cancelada) (${actual.estado}): `);
        const dificultad = yield input(`Dificultad (0: Fácil, 1: Medio, 2: Difícil) (${actual.dificultad}): `);
        const vencimiento = yield input(`Vencimiento (${(_b = actual.vencimiento) !== null && _b !== void 0 ? _b : "Sin vencimiento"}; "-" para borrar): `);
        const estadoNumero = estado.trim() === "" ? actual.estado : Number.parseInt(estado, 10);
        const dificultadNumero = dificultad.trim() === "" ? actual.dificultad : Number.parseInt(dificultad, 10);
        if (!Number.isInteger(estadoNumero) ||
            estadoNumero < 0 ||
            estadoNumero > 3 ||
            !Number.isInteger(dificultadNumero) ||
            dificultadNumero < 0 ||
            dificultadNumero > 2) {
            console.log("Estado o dificultad no válidos; no se modificó la tarea.\n");
            return;
        }
        const modificada = new ModeloTarea.Tarea(titulo.trim() === "" ? actual.titulo : titulo.slice(0, MAX_TITULO), descripcion.trim() === "" ? actual.descripcion : descripcion === "-" ? null : descripcion.slice(0, MAX_DESC), dificultadNumero, estadoNumero, actual.fechaCreacion, new Date().toISOString().slice(0, 10), vencimiento.trim() === "" ? actual.vencimiento : vencimiento === "-" ? null : vencimiento);
        gestorTareas.actualizar(indice, modificada);
        yield guardarTareas();
        console.log("✅ Tarea modificada con éxito.\n");
    });
}
function guardarTareas() {
    return __awaiter(this, void 0, void 0, function* () {
        yield AlmacenamientoTareas.escribirTareas(gestorTareas.obtenerTodas());
    });
}
function mostrarTareas() {
    const tareas = gestorTareas.obtenerTodas();
    if (tareas.length === 0) {
        console.log("No hay tareas registradas.\n");
        return;
    }
    for (const [index, tarea] of tareas.entries()) {
        console.log(`\nTarea #${index + 1}`);
        mostrarDetalleTarea(tarea);
    }
}
function filtrarPorEstado(estado) {
    var _a;
    const encontradas = gestorTareas.filtrarPorEstado(estado);
    if (encontradas.length === 0) {
        console.log("No hay tareas en este estado.\n");
    }
    else {
        for (const t of encontradas) {
            console.log(`Tarea #${t.index + 1}: ${t.tarea.titulo}`);
            console.log("Descripción:", (_a = t.tarea.descripcion) !== null && _a !== void 0 ? _a : "Sin descripción", "\n");
        }
    }
}
function verTareas() {
    return __awaiter(this, void 0, void 0, function* () {
        let opcion;
        do {
            console.log("\n¿Qué tareas deseas ver?");
            console.log("1. Todas las tareas.");
            console.log("2. Tareas pendientes.");
            console.log("3. Tareas en curso.");
            console.log("4. Tareas terminadas.");
            console.log("5. Tareas canceladas.");
            console.log("0. Salir.");
            opcion = parseInt(yield input("> "));
            switch (opcion) {
                case 1:
                    mostrarTareas();
                    break;
                case 2:
                    filtrarPorEstado(ModeloTarea.Estado.PENDIENTE);
                    break;
                case 3:
                    filtrarPorEstado(ModeloTarea.Estado.EN_CURSO);
                    break;
                case 4:
                    filtrarPorEstado(ModeloTarea.Estado.TERMINADA);
                    break;
                case 5:
                    filtrarPorEstado(ModeloTarea.Estado.CANCELADA);
                    break;
                case 0:
                    console.log("Saliendo de la visualización...");
                    break;
                default:
                    console.log("Opción no válida.");
                    break;
            }
        } while (opcion !== 0);
    });
}
function buscarTareas() {
    return __awaiter(this, void 0, void 0, function* () {
        const tituloBuscado = yield input("Pon el nombre de la tarea que deseas buscar: ");
        const encontrada = gestorTareas.buscarPorTitulo(tituloBuscado);
        if (encontrada) {
            console.log("\n✅ Tarea encontrada:");
            mostrarDetalleTarea(encontrada);
        }
        else {
            console.log("❌ Tarea no encontrada.");
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tareas = yield AlmacenamientoTareas.leerTareas();
            gestorTareas.reemplazarTodas(tareas);
            console.log(`Se cargaron ${tareas.length} tareas desde tasks.json.`);
        }
        catch (error) {
            if (error instanceof Error && error.code === "ENOENT") {
                console.log("No se encontró tasks.json; se iniciará una lista vacía.");
            }
            else {
                throw error;
            }
        }
        let respuesta;
        do {
            console.log("\nHola Olivia!!");
            console.log("¿Qué deseas hacer?");
            console.log("1. Ver mis tareas.");
            console.log("2. Buscar una tarea.");
            console.log("3. Agregar una tarea.");
            console.log("4. Modificar una tarea.");
            console.log("0. Salir.");
            respuesta = parseInt(yield input("> "));
            switch (respuesta) {
                case 1:
                    yield verTareas();
                    break;
                case 2:
                    yield buscarTareas();
                    break;
                case 3:
                    yield agregarTareas();
                    break;
                case 4:
                    yield modificarTarea();
                    break;
                case 0:
                    console.log("Saliendo del programa...");
                    break;
                default:
                    console.log("Opción no válida.");
            }
        } while (respuesta !== 0);
        yield guardarTareas();
        rl.close();
    });
}
main().catch((error) => {
    console.error("No se pudo completar la operación con tasks.json:", error);
    rl.close();
    process.exitCode = 1;
});
//# sourceMappingURL=Ala.js.map