namespace ModeloTarea {
  export enum Estado {
    PENDIENTE = 0,
    EN_CURSO,
    TERMINADA,
    CANCELADA,
  }

  export enum Dificultad {
    FACIL = 0,
    MEDIO,
    DIFICIL,
  }

  export interface Tarea {
    titulo: string;
    descripcion: string | null;
    dificultad: Dificultad;
    estado: Estado;
    fechaCreacion: string;
    ultimaEdicion: string | null;
    vencimiento: string | null;
  }

  export interface ConstructorTarea {
    new (
      titulo: string,
      descripcion: string | null,
      dificultad: Dificultad,
      estado: Estado,
      fechaCreacion: string,
      ultimaEdicion?: string | null,
      vencimiento?: string | null,
    ): Tarea;
  }

  export const Tarea: ConstructorTarea = function (
    this: Tarea,
    titulo: string,
    descripcion: string | null,
    dificultad: Dificultad,
    estado: Estado,
    fechaCreacion: string,
    ultimaEdicion: string | null = null,
    vencimiento: string | null = null,
  ): void {
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.dificultad = dificultad;
    this.estado = estado;
    this.fechaCreacion = fechaCreacion;
    this.ultimaEdicion = ultimaEdicion;
    this.vencimiento = vencimiento;
  } as unknown as ConstructorTarea;

  export const nombresEstado: string[] = ["Pendiente", "En curso", "Terminada", "Cancelada"];
  export const emojisDificultad: string[] = ["⭐", "⭐⭐", "⭐⭐⭐"];
}

export = ModeloTarea;