declare namespace ModeloTarea {
    enum Estado {
        PENDIENTE = 0,
        EN_CURSO = 1,
        TERMINADA = 2,
        CANCELADA = 3
    }
    enum Dificultad {
        FACIL = 0,
        MEDIO = 1,
        DIFICIL = 2
    }
    interface Tarea {
        titulo: string;
        descripcion: string | null;
        dificultad: Dificultad;
        estado: Estado;
        fechaCreacion: string;
        ultimaEdicion: string | null;
        vencimiento: string | null;
    }
    interface ConstructorTarea {
        new (titulo: string, descripcion: string | null, dificultad: Dificultad, estado: Estado, fechaCreacion: string, ultimaEdicion?: string | null, vencimiento?: string | null): Tarea;
    }
    const Tarea: ConstructorTarea;
    const nombresEstado: string[];
    const emojisDificultad: string[];
}
export = ModeloTarea;
//# sourceMappingURL=ModeloTarea.d.ts.map