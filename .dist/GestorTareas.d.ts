import ModeloTarea = require("./ModeloTarea");
interface GestorTareas {
    tareas: ModeloTarea.Tarea[];
    agregar(tarea: ModeloTarea.Tarea): boolean;
    reemplazarTodas(tareas: ModeloTarea.Tarea[]): void;
    actualizar(index: number, tarea: ModeloTarea.Tarea): boolean;
    obtenerTodas(): ModeloTarea.Tarea[];
    filtrarPorEstado(estado: ModeloTarea.Estado): {
        tarea: ModeloTarea.Tarea;
        index: number;
    }[];
    buscarPorTitulo(titulo: string): ModeloTarea.Tarea | undefined;
}
interface ConstructorGestorTareas {
    new (): GestorTareas;
    prototype: GestorTareas;
}
declare const GestorTareas: ConstructorGestorTareas;
export = GestorTareas;
//# sourceMappingURL=GestorTareas.d.ts.map