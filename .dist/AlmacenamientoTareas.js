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
const fs = require("fs/promises");
const path = require("path");
const ModeloTarea = require("./ModeloTarea");
const RUTA_ARCHIVO = path.resolve(process.cwd(), "tasks.json");
const estadosJson = {
    PENDING: ModeloTarea.Estado.PENDIENTE,
    "IN-PROGRESS": ModeloTarea.Estado.EN_CURSO,
    FINISHED: ModeloTarea.Estado.TERMINADA,
    CANCELED: ModeloTarea.Estado.CANCELADA,
};
var AlmacenamientoTareas;
(function (AlmacenamientoTareas) {
    function esObjeto(valor) {
        return typeof valor === "object" && valor !== null && !Array.isArray(valor);
    }
    function validarFecha(valor, campo, indice) {
        // Los campos opcionales aceptan null; las fechas informadas deben poder interpretarse.
        if (valor === null) {
            return null;
        }
        if (typeof valor !== "string" || valor.trim() === "" || Number.isNaN(Date.parse(valor))) {
            throw new Error(`La tarea ${indice + 1} tiene una fecha inválida en "${campo}".`);
        }
        const soloFecha = /^(\d{4})-(\d{2})-(\d{2})(?:$|T)/.exec(valor);
        if (soloFecha) {
            const [, anio, mes, dia] = soloFecha;
            const fecha = new Date(Date.UTC(Number(anio), Number(mes) - 1, Number(dia)));
            if (fecha.getUTCFullYear() !== Number(anio) ||
                fecha.getUTCMonth() !== Number(mes) - 1 ||
                fecha.getUTCDate() !== Number(dia)) {
                throw new Error(`La tarea ${indice + 1} tiene una fecha inválida en "${campo}".`);
            }
        }
        return valor;
    }
    function convertirTarea(valor, indice) {
        // Se valida el registro antes de convertir los valores del JSON al modelo interno.
        if (!esObjeto(valor)) {
            throw new Error(`La tarea ${indice + 1} debe ser un objeto.`);
        }
        const titulo = valor.titulo;
        const descripcion = valor.descripcion;
        const estado = valor.estado;
        const dificultad = valor.dificultad;
        if (typeof titulo !== "string" || titulo.trim() === "") {
            throw new Error(`La tarea ${indice + 1} debe tener un título no vacío.`);
        }
        if (descripcion !== null && typeof descripcion !== "string") {
            throw new Error(`La descripción de la tarea ${indice + 1} debe ser texto o null.`);
        }
        if (typeof estado !== "string" ||
            !Object.prototype.hasOwnProperty.call(estadosJson, estado) ||
            estadosJson[estado] === undefined) {
            throw new Error(`La tarea ${indice + 1} tiene un estado no válido.`);
        }
        if (typeof dificultad !== "number" || !Number.isInteger(dificultad) || dificultad < 1 || dificultad > 3) {
            throw new Error(`La dificultad de la tarea ${indice + 1} debe ser 1, 2 o 3.`);
        }
        const creacion = validarFecha(valor.creacion, "creacion", indice);
        if (typeof creacion !== "string") {
            throw new Error(`La tarea ${indice + 1} debe tener una fecha de creación.`);
        }
        return new ModeloTarea.Tarea(titulo, descripcion, dificultad - 1, estadosJson[estado], creacion, validarFecha(valor.ultimaEdicion, "ultimaEdicion", indice), validarFecha(valor.vencimiento, "vencimiento", indice));
    }
    function leerTareas() {
        return __awaiter(this, void 0, void 0, function* () {
            const contenido = yield fs.readFile(RUTA_ARCHIVO, "utf8");
            let datos;
            try {
                datos = JSON.parse(contenido);
            }
            catch (_a) {
                throw new Error(`El archivo ${RUTA_ARCHIVO} no contiene JSON válido.`);
            }
            if (!Array.isArray(datos)) {
                throw new Error(`El archivo ${RUTA_ARCHIVO} debe contener un array de tareas.`);
            }
            return datos.map((tarea, indice) => convertirTarea(tarea, indice));
        });
    }
    AlmacenamientoTareas.leerTareas = leerTareas;
    function escribirTareas(tareas) {
        return __awaiter(this, void 0, void 0, function* () {
            // El archivo conserva los nombres, estados y niveles de dificultad del formato solicitado.
            const estadosJsonPorValor = ["PENDING", "IN-PROGRESS", "FINISHED", "CANCELED"];
            const datos = tareas.map((tarea) => ({
                titulo: tarea.titulo,
                descripcion: tarea.descripcion,
                estado: estadosJsonPorValor[tarea.estado],
                creacion: tarea.fechaCreacion,
                ultimaEdicion: tarea.ultimaEdicion,
                vencimiento: tarea.vencimiento,
                dificultad: tarea.dificultad + 1,
            }));
            datos.forEach((tarea, indice) => convertirTarea(tarea, indice));
            yield fs.writeFile(RUTA_ARCHIVO, `${JSON.stringify(datos, null, 2)}\n`, "utf8");
        });
    }
    AlmacenamientoTareas.escribirTareas = escribirTareas;
})(AlmacenamientoTareas || (AlmacenamientoTareas = {}));
module.exports = AlmacenamientoTareas;
//# sourceMappingURL=AlmacenamientoTareas.js.map