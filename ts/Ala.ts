
const readline = require("readline");
import ModeloTarea = require("./ModeloTarea");
import GestorTareas = require("./GestorTareas");
import AlmacenamientoTareas = require("./AlmacenamientoTareas");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function input(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer: string) => {
      resolve(answer);
    });
  });
}

const MAX_TITULO = 100;
const MAX_DESC = 500;

const gestorTareas = new GestorTareas();

function mostrarDetalleTarea(tarea: ModeloTarea.Tarea): void {
  console.log("Título:", tarea.titulo);
  console.log("Descripción:", tarea.descripcion ?? "Sin descripción");
  console.log("Estado:", ModeloTarea.nombresEstado[tarea.estado]);
  console.log("Dificultad:", ModeloTarea.emojisDificultad[tarea.dificultad]);
  console.log("Fecha de creación:", tarea.fechaCreacion);
  console.log("Última edición:", tarea.ultimaEdicion ?? "Sin editar");
  console.log("Vencimiento:", tarea.vencimiento ?? "Sin vencimiento");
}

async function agregarTareas(): Promise<void> {
  const nueva = new ModeloTarea.Tarea(
    "",
    null,
    ModeloTarea.Dificultad.FACIL,
    ModeloTarea.Estado.PENDIENTE,
    new Date().toISOString().slice(0, 10),
  );

  nueva.titulo = (await input("Ingrese el título de la tarea: ")).trim().slice(0, MAX_TITULO);
  if (nueva.titulo === "") {
    console.log("El título es obligatorio; no se agregó la tarea.\n");
    return;
  }
  const descripcion = (await input("Descripción (opcional, ENTER para omitir): ")).slice(0, MAX_DESC);
  nueva.descripcion = descripcion || null;

  const dif = parseInt(await input("Dificultad (0: Fácil, 1: Medio, 2: Difícil): "));
  nueva.dificultad = (dif >= 0 && dif <= 2) ? dif as ModeloTarea.Dificultad : ModeloTarea.Dificultad.FACIL;

  const est = parseInt(await input("Estado (0: Pendiente, 1: En curso, 2: Terminada, 3: Cancelada): "));
  nueva.estado = (est >= 0 && est <= 3) ? est as ModeloTarea.Estado : ModeloTarea.Estado.PENDIENTE;

  const fechaCreacion = await input("Ingrese la fecha de creación (Formato: AAAA-MM-DD, ENTER para hoy): ");
  if (fechaCreacion.trim() !== "") {
    nueva.fechaCreacion = fechaCreacion;
  }

  gestorTareas.agregar(nueva);
  await guardarTareas();

  console.log("✅ Tarea agregada con éxito.\n");
}

async function modificarTarea(): Promise<void> {
  mostrarTareas();
  const indice = Number.parseInt(await input("Número de tarea a modificar: "), 10) - 1;
  const actual = gestorTareas.obtenerTodas()[indice];
  if (!actual) {
    console.log("Número de tarea no válido.\n");
    return;
  }

  console.log("Deje el campo vacío para mantener su valor actual.");
  const titulo = await input(`Título (${actual.titulo}): `);
  const descripcion = await input(`Descripción (${actual.descripcion ?? "Sin descripción"}; "-" para borrar): `);
  const estado = await input(`Estado (0: Pendiente, 1: En curso, 2: Terminada, 3: Cancelada) (${actual.estado}): `);
  const dificultad = await input(`Dificultad (0: Fácil, 1: Medio, 2: Difícil) (${actual.dificultad}): `);
  const vencimiento = await input(`Vencimiento (${actual.vencimiento ?? "Sin vencimiento"}; "-" para borrar): `);

  const estadoNumero = estado.trim() === "" ? actual.estado : Number.parseInt(estado, 10);
  const dificultadNumero = dificultad.trim() === "" ? actual.dificultad : Number.parseInt(dificultad, 10);
  if (
    !Number.isInteger(estadoNumero) ||
    estadoNumero < 0 ||
    estadoNumero > 3 ||
    !Number.isInteger(dificultadNumero) ||
    dificultadNumero < 0 ||
    dificultadNumero > 2
  ) {
    console.log("Estado o dificultad no válidos; no se modificó la tarea.\n");
    return;
  }

  const modificada = new ModeloTarea.Tarea(
    titulo.trim() === "" ? actual.titulo : titulo.slice(0, MAX_TITULO),
    descripcion.trim() === "" ? actual.descripcion : descripcion === "-" ? null : descripcion.slice(0, MAX_DESC),
    dificultadNumero as ModeloTarea.Dificultad,
    estadoNumero as ModeloTarea.Estado,
    actual.fechaCreacion,
    new Date().toISOString().slice(0, 10),
    vencimiento.trim() === "" ? actual.vencimiento : vencimiento === "-" ? null : vencimiento,
  );

  gestorTareas.actualizar(indice, modificada);
  await guardarTareas();
  console.log("✅ Tarea modificada con éxito.\n");
}

async function guardarTareas(): Promise<void> {
  await AlmacenamientoTareas.escribirTareas(gestorTareas.obtenerTodas());
}

function mostrarTareas(): void {
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

function filtrarPorEstado(estado: ModeloTarea.Estado): void {
  const encontradas = gestorTareas.filtrarPorEstado(estado);
  if (encontradas.length === 0) {
    console.log("No hay tareas en este estado.\n");
  } else {
    for (const t of encontradas) {
      console.log(`Tarea #${t.index + 1}: ${t.tarea.titulo}`);
      console.log("Descripción:", t.tarea.descripcion ?? "Sin descripción", "\n");
    }
  }
}

async function verTareas(): Promise<void> {
  let opcion: number;

  do {
    console.log("\n¿Qué tareas deseas ver?");
    console.log("1. Todas las tareas.");
    console.log("2. Tareas pendientes.");
    console.log("3. Tareas en curso.");
    console.log("4. Tareas terminadas.");
    console.log("5. Tareas canceladas.");
    console.log("0. Salir.");

    opcion = parseInt(await input("> "));

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
}

async function buscarTareas(): Promise<void> {
  const tituloBuscado = await input("Pon el nombre de la tarea que deseas buscar: ");
  const encontrada = gestorTareas.buscarPorTitulo(tituloBuscado);

  if (encontrada) {
    console.log("\n✅ Tarea encontrada:");
    mostrarDetalleTarea(encontrada);
  } else {
    console.log("❌ Tarea no encontrada.");
  }
}

async function main(): Promise<void> {
  try {
    const tareas = await AlmacenamientoTareas.leerTareas();
    gestorTareas.reemplazarTodas(tareas);
    console.log(`Se cargaron ${tareas.length} tareas desde tasks.json.`);
  } catch (error) {
    if (error instanceof Error && (error as NodeJS.ErrnoException).code === "ENOENT") {
      console.log("No se encontró tasks.json; se iniciará una lista vacía.");
    } else {
      throw error;
    }
  }

  let respuesta: number;

  do {
    console.log("\nHola Olivia!!");
    console.log("¿Qué deseas hacer?");
    console.log("1. Ver mis tareas.");
    console.log("2. Buscar una tarea.");
    console.log("3. Agregar una tarea.");
    console.log("4. Modificar una tarea.");
    console.log("0. Salir.");

    respuesta = parseInt(await input("> "));

    switch (respuesta) {
      case 1:
        await verTareas();
        break;
      case 2:
        await buscarTareas();
        break;
      case 3:
        await agregarTareas();
        break;
      case 4:
        await modificarTarea();
        break;
      case 0:
        console.log("Saliendo del programa...");
        break;
      default:
        console.log("Opción no válida.");
    }
  } while (respuesta !== 0);

  await guardarTareas();
  rl.close();
}

main().catch((error: unknown) => {
  console.error("No se pudo completar la operación con tasks.json:", error);
  rl.close();
  process.exitCode = 1;
});