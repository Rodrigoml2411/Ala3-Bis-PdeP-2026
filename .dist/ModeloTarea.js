"use strict";
var ModeloTarea;
(function (ModeloTarea) {
    let Estado;
    (function (Estado) {
        Estado[Estado["PENDIENTE"] = 0] = "PENDIENTE";
        Estado[Estado["EN_CURSO"] = 1] = "EN_CURSO";
        Estado[Estado["TERMINADA"] = 2] = "TERMINADA";
        Estado[Estado["CANCELADA"] = 3] = "CANCELADA";
    })(Estado = ModeloTarea.Estado || (ModeloTarea.Estado = {}));
    let Dificultad;
    (function (Dificultad) {
        Dificultad[Dificultad["FACIL"] = 0] = "FACIL";
        Dificultad[Dificultad["MEDIO"] = 1] = "MEDIO";
        Dificultad[Dificultad["DIFICIL"] = 2] = "DIFICIL";
    })(Dificultad = ModeloTarea.Dificultad || (ModeloTarea.Dificultad = {}));
    ModeloTarea.Tarea = function (titulo, descripcion, dificultad, estado, fechaCreacion, ultimaEdicion = null, vencimiento = null) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.dificultad = dificultad;
        this.estado = estado;
        this.fechaCreacion = fechaCreacion;
        this.ultimaEdicion = ultimaEdicion;
        this.vencimiento = vencimiento;
    };
    ModeloTarea.nombresEstado = ["Pendiente", "En curso", "Terminada", "Cancelada"];
    ModeloTarea.emojisDificultad = ["⭐", "⭐⭐", "⭐⭐⭐"];
})(ModeloTarea || (ModeloTarea = {}));
module.exports = ModeloTarea;
//# sourceMappingURL=ModeloTarea.js.map