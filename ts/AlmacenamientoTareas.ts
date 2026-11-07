import fs = require("fs/promises");
import path = require("path");
import ModeloTarea = require("./ModeloTarea");

const RUTA_ARCHIVO = path.resolve(process.cwd(), "tasks.json");

const estadosJson: Record<string, ModeloTarea.Estado> = {
  PENDING: ModeloTarea.Estado.PENDIENTE,
  "IN-PROGRESS": ModeloTarea.Estado.EN_CURSO,
  FINISHED: ModeloTarea.Estado.TERMINADA,
  CANCELED: ModeloTarea.Estado.CANCELADA,
};

namespace AlmacenamientoTareas {
  function esObjeto(valor: unknown): valor is Record<string, unknown> {
    return typeof valor === "object" && valor !== null && !Array.isArray(valor);
  }

  function validarFecha(valor: unknown, campo: string, indice: number): string | null {
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
      if (
        fecha.getUTCFullYear() !== Number(anio) ||
        fecha.getUTCMonth() !== Number(mes) - 1 ||
        fecha.getUTCDate() !== Number(dia)
      ) {
        throw new Error(`La tarea ${indice + 1} tiene una fecha inválida en "${campo}".`);
      }
    }

    return valor;
  }

  function convertirTarea(valor: unknown, indice: number): ModeloTarea.Tarea {
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
    if (
      typeof estado !== "string" ||
      !Object.prototype.hasOwnProperty.call(estadosJson, estado) ||
      estadosJson[estado] === undefined
    ) {
      throw new Error(`La tarea ${indice + 1} tiene un estado no válido.`);
    }
    if (typeof dificultad !== "number" || !Number.isInteger(dificultad) || dificultad < 1 || dificultad > 3) {
      throw new Error(`La dificultad de la tarea ${indice + 1} debe ser 1, 2 o 3.`);
    }

    const creacion = validarFecha(valor.creacion, "creacion", indice);
    if (typeof creacion !== "string") {
      throw new Error(`La tarea ${indice + 1} debe tener una fecha de creación.`);
    }

    return new ModeloTarea.Tarea(
      titulo,
      descripcion,
      dificultad - 1,
      estadosJson[estado],
      creacion,
      validarFecha(valor.ultimaEdicion, "ultimaEdicion", indice),
      validarFecha(valor.vencimiento, "vencimiento", indice),
    );
  }

  export async function leerTareas(): Promise<ModeloTarea.Tarea[]> {
    const contenido = await fs.readFile(RUTA_ARCHIVO, "utf8");
    let datos: unknown;

    try {
      datos = JSON.parse(contenido) as unknown;
    } catch {
      throw new Error(`El archivo ${RUTA_ARCHIVO} no contiene JSON válido.`);
    }

    if (!Array.isArray(datos)) {
      throw new Error(`El archivo ${RUTA_ARCHIVO} debe contener un array de tareas.`);
    }

    return datos.map((tarea: unknown, indice: number) => convertirTarea(tarea, indice));
  }

  export async function escribirTareas(tareas: ModeloTarea.Tarea[]): Promise<void> {
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

    datos.forEach((tarea: unknown, indice: number) => convertirTarea(tarea, indice));
    await fs.writeFile(RUTA_ARCHIVO, `${JSON.stringify(datos, null, 2)}\n`, "utf8");
  }
}

export = AlmacenamientoTareas;
