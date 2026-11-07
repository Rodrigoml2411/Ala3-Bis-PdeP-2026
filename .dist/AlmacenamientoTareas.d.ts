import ModeloTarea = require("./ModeloTarea");
declare namespace AlmacenamientoTareas {
    function leerTareas(): Promise<ModeloTarea.Tarea[]>;
    function escribirTareas(tareas: ModeloTarea.Tarea[]): Promise<void>;
}
export = AlmacenamientoTareas;
//# sourceMappingURL=AlmacenamientoTareas.d.ts.map