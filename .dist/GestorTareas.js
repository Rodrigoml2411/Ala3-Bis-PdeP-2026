"use strict";
const ModeloTarea = require("./ModeloTarea");
const GestorTareas = function () {
    this.tareas = [];
};
GestorTareas.prototype.agregar = function (tarea) {
    this.tareas.push(tarea);
    return true;
};
GestorTareas.prototype.reemplazarTodas = function (tareas) {
    this.tareas = [...tareas];
};
GestorTareas.prototype.actualizar = function (index, tarea) {
    if (index < 0 || index >= this.tareas.length) {
        return false;
    }
    this.tareas[index] = tarea;
    return true;
};
GestorTareas.prototype.obtenerTodas = function () {
    return [...this.tareas];
};
GestorTareas.prototype.filtrarPorEstado = function (estado) {
    return this.tareas.reduce((encontradas, tarea, index) => {
        if (tarea.estado === estado) {
            encontradas.push({ tarea, index });
        }
        return encontradas;
    }, []);
};
GestorTareas.prototype.buscarPorTitulo = function (titulo) {
    return this.tareas.find((tarea) => tarea.titulo === titulo);
};
module.exports = GestorTareas;
//# sourceMappingURL=GestorTareas.js.map