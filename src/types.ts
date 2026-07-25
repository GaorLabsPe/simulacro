export type ModoExamen = 'simulacro' | 'estudio' | 'maraton' | 'fallos' | 'flashcards';

export interface Area {
  id: string;
  nombre: string;
  color: string;
  icono: string;
  descripcion: string;
}

export interface Pregunta {
  id: string;
  area: string;
  tema: string;
  enunciado: string;
  alternativas: string[];
  correcta: number;
  explicacion: string;
  articuloLey?: string; // Ej. "Art. 106 Código Penal", "DL 1267 Art. 12"
  dificultad: 'fácil' | 'intermedio' | 'avanzado';
}

export interface RespuestaUsuario {
  preguntaId: string;
  opcionSeleccionada?: number;
  marcadaRevision: boolean;
  descartadas: number[]; // índices de alternativas tachadas por el usuario
}

export interface PorAreaStat {
  areaId: string;
  nombreArea: string;
  total: number;
  correctas: number;
  porcentaje: number;
}

export interface PorTemaStat {
  areaId: string;
  tema: string;
  total: number;
  correctas: number;
  porcentaje: number;
}

export interface ResultadoExamen {
  id: string;
  fecha: string;
  modo: ModoExamen;
  totalPreguntas: number;
  correctas: number;
  incorrectas: number;
  enBlanco: number;
  puntajePorcentaje: number;
  tiempoEmpleadoSegundos: number;
  aprobado: boolean;
  porArea: PorAreaStat[];
  porTema: PorTemaStat[];
  respuestas: Record<string, RespuestaUsuario>;
  preguntasIds: string[];
}

export interface Flashcard {
  id: string;
  area: string;
  titulo: string;
  pregunta: string;
  respuesta: string;
  leyRelacionada: string;
}

export interface UserStats {
  examenesCompletados: number;
  promedioPuntaje: number;
  mejorPuntaje: number;
  tiempoTotalMinutos: number;
  fallosAcumulados: string[]; // ids de preguntas falladas recientemente
  guardadas: string[]; // ids de preguntas marcadas como favoritas
}
