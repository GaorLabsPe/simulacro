import { ResultadoExamen, UserStats } from '../types';

const STORAGE_KEYS = {
  HISTORIAL: 'pnp_exam_historial_v2',
  GUARDADAS: 'pnp_exam_guardadas_v2',
  FALLOS: 'pnp_exam_fallos_v2',
  SETTINGS: 'pnp_exam_settings_v2',
};

export interface AppSettings {
  darkMode: boolean;
  soundEnabled: boolean;
  fontSize: 'sm' | 'md' | 'lg';
}

export interface UserSession {
  phone: string;
  name: string;
  grado: string;
  authenticatedAt: string;
}

export function getStoredUserSession(): UserSession | null {
  try {
    const data = localStorage.getItem('pnp_user_session_v1');
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function saveStoredUserSession(session: UserSession): void {
  try {
    localStorage.setItem('pnp_user_session_v1', JSON.stringify(session));
  } catch {
    // Ignore
  }
}

export function clearStoredUserSession(): void {
  try {
    localStorage.removeItem('pnp_user_session_v1');
  } catch {
    // Ignore
  }
}

export function getStoredHistorial(): ResultadoExamen[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.HISTORIAL);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveResultadoHistorial(resultado: ResultadoExamen): ResultadoExamen[] {
  try {
    const actual = getStoredHistorial();
    const actualizado = [resultado, ...actual];
    localStorage.setItem(STORAGE_KEYS.HISTORIAL, JSON.stringify(actualizado));
    
    // Sincronizar fallos acumulados
    const fallosPrevios = getStoredFallos();
    const nuevosFallos = new Set(fallosPrevios);

    Object.entries(resultado.respuestas).forEach(([pregId, resp]) => {
      const preg = resultado.preguntasIds.find((id) => id === pregId);
      if (preg) {
        if (resp.opcionSeleccionada === undefined) return;
        // Si la respuesta fue incorrecta, agregar a la lista de fallos
        // Nota: la validación real la hace el sistema con las preguntas, aquí guardamos los IDs que se fallaron
      }
    });

    return actualizado;
  } catch {
    return [];
  }
}

export function getStoredGuardadas(): string[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.GUARDADAS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function toggleGuardada(preguntaId: string): string[] {
  try {
    const actual = getStoredGuardadas();
    const existe = actual.includes(preguntaId);
    const nuevo = existe ? actual.filter((id) => id !== preguntaId) : [...actual, preguntaId];
    localStorage.setItem(STORAGE_KEYS.GUARDADAS, JSON.stringify(nuevo));
    return nuevo;
  } catch {
    return [];
  }
}

export function getStoredFallos(): string[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.FALLOS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveStoredFallos(fallos: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.FALLOS, JSON.stringify(fallos));
  } catch {
    // Ignore
  }
}

export function getStoredSettings(): AppSettings {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? JSON.parse(data) : { darkMode: false, soundEnabled: true, fontSize: 'md' };
  } catch {
    return { darkMode: false, soundEnabled: true, fontSize: 'md' };
  }
}

export function saveStoredSettings(settings: AppSettings): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch {
    // Ignore
  }
}

export function calculateUserStats(historial: ResultadoExamen[], fallosIds: string[], guardadasIds: string[]): UserStats {
  if (historial.length === 0) {
    return {
      examenesCompletados: 0,
      promedioPuntaje: 0,
      mejorPuntaje: 0,
      tiempoTotalMinutos: 0,
      fallosAcumulados: fallosIds,
      guardadas: guardadasIds,
    };
  }

  const examenesCompletados = historial.length;
  const sumaPuntajes = historial.reduce((acc, curr) => acc + curr.puntajePorcentaje, 0);
  const promedioPuntaje = Math.round(sumaPuntajes / examenesCompletados);
  const mejorPuntaje = Math.max(...historial.map((h) => h.puntajePorcentaje));
  const tiempoTotalSeg = historial.reduce((acc, curr) => acc + curr.tiempoEmpleadoSegundos, 0);

  return {
    examenesCompletados,
    promedioPuntaje,
    mejorPuntaje,
    tiempoTotalMinutos: Math.round(tiempoTotalSeg / 60),
    fallosAcumulados: fallosIds,
    guardadas: guardadasIds,
  };
}
