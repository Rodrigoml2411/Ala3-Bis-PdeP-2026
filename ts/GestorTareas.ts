import ModeloTarea = require("./ModeloTarea");

interface GestorTareas {
  tareas: ModeloTarea.Tarea[];
  agregar(tarea: ModeloTarea.Tarea): boolean;
  reemplazarTodas(tareas: ModeloTarea.Tarea[]): void;
  actualizar(index: number, tarea: ModeloTarea.Tarea): boolean;
  obtenerTodas(): ModeloTarea.Tarea[];
  filtrarPorEstado(estado: ModeloTarea.Estado): { tarea: ModeloTarea.Tarea; index: number }[];
  buscarPorTitulo(titulo: string): ModeloTarea.Tarea | undefined;
}

interface ConstructorGestorTareas {
  new (): GestorTareas;
  prototype: GestorTareas;
}

const GestorTareas: ConstructorGestorTareas = function (this: GestorTareas): void {
  this.tareas = [];
} as unknown as ConstructorGestorTareas;

GestorTareas.prototype.agregar = function (this: GestorTareas, tarea: ModeloTarea.Tarea): boolean {
  this.tareas.push(tarea);
  return true;
};

GestorTareas.prototype.reemplazarTodas = function (
  this: GestorTareas,
  tareas: ModeloTarea.Tarea[],
): void {
  this.tareas = [...tareas];
};

GestorTareas.prototype.actualizar = function (
  this: GestorTareas,
  index: number,
  tarea: ModeloTarea.Tarea,
): boolean {
  if (index < 0 || index >= this.tareas.length) {
    return false;
  }

  this.tareas[index] = tarea;
  return true;
};

GestorTareas.prototype.obtenerTodas = function (this: GestorTareas): ModeloTarea.Tarea[] {
  return [...this.tareas];
};

GestorTareas.prototype.filtrarPorEstado = function (
  this: GestorTareas,
  estado: ModeloTarea.Estado,
): { tarea: ModeloTarea.Tarea; index: number }[] {
  return this.tareas.reduce<{ tarea: ModeloTarea.Tarea; index: number }[]>((encontradas, tarea, index) => {
    if (tarea.estado === estado) {
      encontradas.push({ tarea, index });
    }
    return encontradas;
  }, []);
};

GestorTareas.prototype.buscarPorTitulo = function (
  this: GestorTareas,
  titulo: string,
): ModeloTarea.Tarea | undefined {
  return this.tareas.find((tarea) => tarea.titulo === titulo);
};

export = GestorTareas;