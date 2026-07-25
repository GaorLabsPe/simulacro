import React, { useState, useEffect, useRef } from 'react';
import { Shield, BookOpen, Layers, Flame, UserCheck, PlayCircle } from 'lucide-react';
import {
  ModoExamen,
  Pregunta,
  RespuestaUsuario,
  ResultadoExamen,
  UserStats,
  PorAreaStat,
  PorTemaStat,
} from './types';
import { BANCO_PREGUNTAS_PNP, AREAS_PNP } from './data/bancoPreguntas';
import {
  getStoredHistorial,
  saveResultadoHistorial,
  getStoredGuardadas,
  getStoredFallos,
  saveStoredFallos,
  getStoredSettings,
  saveStoredSettings,
  calculateUserStats,
  AppSettings,
  UserSession,
  getStoredUserSession,
  saveStoredUserSession,
  clearStoredUserSession,
} from './utils/storage';
import { audioFX } from './utils/audio';

import { Header } from './components/Header';
import { LoginLandingPortal } from './components/LoginLandingPortal';
import { DashboardInicio } from './components/DashboardInicio';
import { ExamenInteractive } from './components/ExamenInteractive';
import { ResultadosAvanzados } from './components/ResultadosAvanzados';
import { FlashcardsView } from './components/FlashcardsView';
import { BancoPreguntasView } from './components/BancoPreguntasView';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function App() {
  // User Authentication Session State
  const [userSession, setUserSession] = useState<UserSession | null>(() => getStoredUserSession());

  // Navigation State
  const [pantalla, setPantalla] = useState<'portal' | 'inicio' | 'examen' | 'resultados' | 'flashcards' | 'banco'>(
    () => (getStoredUserSession() ? 'inicio' : 'portal')
  );

  // Exam Config State
  const [modo, setModo] = useState<ModoExamen>('simulacro');
  const [areasSeleccionadas, setAreasSeleccionadas] = useState<string[]>(AREAS_PNP.map((a) => a.id));
  const [temasSeleccionados, setTemasSeleccionados] = useState<string[]>([]);
  const [cantidad, setCantidad] = useState<number>(15);

  // Active Exam Execution State
  const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
  const [indice, setIndice] = useState<number>(0);
  const [respuestas, setRespuestas] = useState<Record<string, RespuestaUsuario>>({});

  // Timer State
  const [segundosTimer, setSegundosTimer] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Persistent Storage State
  const [historial, setHistorial] = useState<ResultadoExamen[]>([]);
  const [guardadasIds, setGuardadasIds] = useState<string[]>([]);
  const [fallosIds, setFallosIds] = useState<string[]>([]);
  const [settings, setSettings] = useState<AppSettings>(getStoredSettings());

  const [ultimoResultado, setUltimoResultado] = useState<ResultadoExamen | null>(null);

  // Initial Load from LocalStorage
  useEffect(() => {
    setHistorial(getStoredHistorial());
    setGuardadasIds(getStoredGuardadas());
    setFallosIds(getStoredFallos());
  }, []);

  // Login Success Handler
  const handleLoginSuccess = (session: UserSession) => {
    saveStoredUserSession(session);
    setUserSession(session);
    setPantalla('inicio');
  };

  // Logout Handler
  const handleLogout = () => {
    clearStoredUserSession();
    setUserSession(null);
    setPantalla('portal');
  };

  // Update Settings in LocalStorage & DarkMode HTML Class
  const handleUpdateSettings = (newSettings: Partial<AppSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    saveStoredSettings(updated);
    audioFX.enabled = updated.soundEnabled;
  };

  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    audioFX.enabled = settings.soundEnabled;
  }, [settings]);

  // Timer Effect
  useEffect(() => {
    if (pantalla === 'examen' && (modo === 'simulacro' || modo === 'maraton')) {
      timerRef.current = setInterval(() => {
        setSegundosTimer((s) => s + 1);
      }, 1000);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [pantalla, modo]);

  // Toggle Area Selection
  const handleToggleArea = (id: string) => {
    audioFX.playTick();
    setAreasSeleccionadas((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  // Toggle Tema Selection
  const handleToggleTema = (key: string) => {
    audioFX.playTick();
    setTemasSeleccionados((prev) =>
      prev.includes(key) ? prev.filter((t) => t !== key) : [...prev, key]
    );
  };

  // Pool of questions based on filters
  const poolDisponible = BANCO_PREGUNTAS_PNP.filter((p) => {
    if (modo === 'fallos') {
      return fallosIds.includes(p.id);
    }
    return areasSeleccionadas.includes(p.area);
  });

  // Start Exam Execution
  const handleIniciarExamen = () => {
    audioFX.playSuccess();
    let seleccion: Pregunta[] = [];

    if (modo === 'fallos') {
      const preguntasFalladas = BANCO_PREGUNTAS_PNP.filter((p) => fallosIds.includes(p.id));
      seleccion = shuffle(preguntasFalladas).slice(0, Math.min(cantidad, preguntasFalladas.length));
    } else {
      seleccion = shuffle(poolDisponible).slice(0, Math.min(cantidad, poolDisponible.length));
    }

    if (seleccion.length === 0) return;

    setPreguntas(seleccion);
    setIndice(0);
    setRespuestas({});
    setSegundosTimer(0);
    setPantalla('examen');
  };

  // Finalize Exam & Calculate Stats
  const handleFinalizarExamen = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    let correctasCount = 0;
    let incorrectasCount = 0;
    let enBlancoCount = 0;

    const porAreaMap: Record<string, { total: number; correctas: number }> = {};
    const porTemaMap: Record<string, { areaId: string; total: number; correctas: number }> = {};

    const nuevosFallos = new Set<string>(fallosIds);

    preguntas.forEach((preg) => {
      const resp = respuestas[preg.id];
      const optSel = resp ? resp.opcionSeleccionada : undefined;

      if (!porAreaMap[preg.area]) {
        porAreaMap[preg.area] = { total: 0, correctas: 0 };
      }
      porAreaMap[preg.area].total += 1;

      const temaKey = `${preg.area}::${preg.tema}`;
      if (!porTemaMap[temaKey]) {
        porTemaMap[temaKey] = { areaId: preg.area, total: 0, correctas: 0 };
      }
      porTemaMap[temaKey].total += 1;

      if (optSel === undefined) {
        enBlancoCount += 1;
      } else if (optSel === preg.correcta) {
        correctasCount += 1;
        porAreaMap[preg.area].correctas += 1;
        porTemaMap[temaKey].correctas += 1;
        // Si la acertó, podemos quitarla de la lista de fallos
        nuevosFallos.delete(preg.id);
      } else {
        incorrectasCount += 1;
        // Si falló, agregar a la lista de fallos acumulados
        nuevosFallos.add(preg.id);
      }
    });

    const total = preguntas.length;
    const puntajePct = Math.round((correctasCount / total) * 100);

    const porAreaStats: PorAreaStat[] = Object.entries(porAreaMap).map(([areaId, data]) => {
      const areaInfo = AREAS_PNP.find((a) => a.id === areaId);
      return {
        areaId,
        nombreArea: areaInfo ? areaInfo.nombre : areaId,
        total: data.total,
        correctas: data.correctas,
        porcentaje: Math.round((data.correctas / data.total) * 100),
      };
    });

    const porTemaStats: PorTemaStat[] = Object.entries(porTemaMap).map(([temaKey, data]) => {
      const parts = temaKey.split('::');
      return {
        areaId: data.areaId,
        tema: parts[1] || temaKey,
        total: data.total,
        correctas: data.correctas,
        porcentaje: Math.round((data.correctas / data.total) * 100),
      };
    });

    const resultado: ResultadoExamen = {
      id: `res-${Date.now()}`,
      fecha: new Date().toLocaleString('es-PE', { dateStyle: 'medium', timeStyle: 'short' }),
      modo,
      totalPreguntas: total,
      correctas: correctasCount,
      incorrectas: incorrectasCount,
      enBlanco: enBlancoCount,
      puntajePorcentaje: puntajePct,
      tiempoEmpleadoSegundos: segundosTimer,
      aprobado: puntajePct >= 60,
      porArea: porAreaStats,
      porTema: porTemaStats,
      respuestas,
      preguntasIds: preguntas.map((p) => p.id),
    };

    // Save
    const nuevoHistorial = saveResultadoHistorial(resultado);
    setHistorial(nuevoHistorial);

    const listaFallosArray: string[] = [...nuevosFallos];
    saveStoredFallos(listaFallosArray);
    setFallosIds(listaFallosArray);

    setUltimoResultado(resultado);
    setPantalla('resultados');

    if (puntajePct >= 60) {
      audioFX.playSuccess();
    } else {
      audioFX.playError();
    }
  };

  const userStats: UserStats = calculateUserStats(historial, fallosIds, guardadasIds);

  return (
    <div
      id="app-root"
      className={`min-h-screen font-sans antialiased transition-colors duration-200 selection:bg-amber-500/30 ${
        settings.darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Top Navigation Header */}
      <Header
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        pantalla={pantalla}
        onGoHome={() => setPantalla(userSession ? 'inicio' : 'portal')}
        segundosTimer={segundosTimer}
        modoTimer={modo === 'simulacro' || modo === 'maraton'}
        userSession={userSession}
        onOpenPortal={() => setPantalla('portal')}
        onLogout={handleLogout}
        onOpenFlashcards={() => setPantalla('flashcards')}
        onOpenBanco={() => setPantalla('banco')}
      />

      {/* Main Container with Mobile Bottom Padding */}
      <div className={pantalla !== 'examen' && pantalla !== 'portal' ? 'pb-20 md:pb-0' : ''}>
        {/* View Switcher */}
        {pantalla === 'portal' && (
          <LoginLandingPortal
            onLoginSuccess={handleLoginSuccess}
            darkMode={settings.darkMode}
          />
        )}

        {pantalla === 'inicio' && (
          <DashboardInicio
            modo={modo}
            setModo={setModo}
            areasSeleccionadas={areasSeleccionadas}
            toggleArea={handleToggleArea}
            temasSeleccionados={temasSeleccionados}
            toggleTema={handleToggleTema}
            cantidad={cantidad}
            setCantidad={setCantidad}
            poolDisponible={poolDisponible}
            onIniciarExamen={handleIniciarExamen}
            onOpenFlashcards={() => setPantalla('flashcards')}
            onOpenBanco={() => setPantalla('banco')}
            userStats={userStats}
            darkMode={settings.darkMode}
          />
        )}

        {pantalla === 'examen' && (
          <ExamenInteractive
            preguntas={preguntas}
            indice={indice}
            setIndice={setIndice}
            respuestas={respuestas}
            setRespuestas={setRespuestas}
            modo={modo}
            settings={settings}
            segundosTimer={segundosTimer}
            guardadasIds={guardadasIds}
            setGuardadasIds={setGuardadasIds}
            onFinalizarExamen={handleFinalizarExamen}
            darkMode={settings.darkMode}
          />
        )}

        {pantalla === 'resultados' && ultimoResultado && (
          <ResultadosAvanzados
            resultado={ultimoResultado}
            preguntas={preguntas}
            onRepetirSimulacro={() => handleIniciarExamen()}
            onRepasarFalladas={() => {
              setModo('fallos');
              handleIniciarExamen();
            }}
            darkMode={settings.darkMode}
          />
        )}

        {pantalla === 'flashcards' && (
          <FlashcardsView
            onBack={() => setPantalla('inicio')}
            darkMode={settings.darkMode}
          />
        )}

        {pantalla === 'banco' && (
          <BancoPreguntasView
            guardadasIds={guardadasIds}
            setGuardadasIds={setGuardadasIds}
            darkMode={settings.darkMode}
          />
        )}
      </div>

      {/* Persistent Mobile Bottom Navigation Dock (Native App Feel for Officers) */}
      {pantalla !== 'examen' && pantalla !== 'portal' && (
        <nav
          id="mobile-bottom-dock"
          className={`md:hidden fixed bottom-0 left-0 right-0 z-30 border-t backdrop-blur-lg flex items-center justify-around px-2 py-2 shadow-2xl transition-colors duration-200 ${
            settings.darkMode
              ? 'bg-slate-900/95 border-slate-800 text-slate-300'
              : 'bg-slate-900 text-slate-100 border-slate-800'
          }`}
        >
          <button
            onClick={() => setPantalla('inicio')}
            className={`flex flex-col items-center justify-center gap-1 min-w-[64px] py-1 px-2 rounded-xl transition-all ${
              pantalla === 'inicio'
                ? 'text-amber-400 font-bold bg-amber-500/10'
                : 'text-slate-400 font-medium hover:text-slate-200'
            }`}
          >
            <Shield className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Inicio</span>
          </button>

          <button
            onClick={() => {
              setPantalla('banco');
            }}
            className={`flex flex-col items-center justify-center gap-1 min-w-[64px] py-1 px-2 rounded-xl transition-all ${
              pantalla === 'banco'
                ? 'text-amber-400 font-bold bg-amber-500/10'
                : 'text-slate-400 font-medium hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Banco</span>
          </button>

          <button
            onClick={() => {
              setPantalla('inicio');
              setTimeout(() => {
                const btn = document.getElementById('btn-iniciar-examen-main');
                if (btn) btn.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="flex flex-col items-center justify-center gap-1 min-w-[64px] py-1 px-2 rounded-xl text-amber-400 font-extrabold active:scale-95 transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg -mt-5 border-2 border-slate-900">
              <PlayCircle className="w-6 h-6 stroke-[2.2]" />
            </div>
            <span className="text-[10px] tracking-tight font-bold text-amber-400">Simulacro</span>
          </button>

          <button
            onClick={() => {
              setPantalla('flashcards');
            }}
            className={`flex flex-col items-center justify-center gap-1 min-w-[64px] py-1 px-2 rounded-xl transition-all ${
              pantalla === 'flashcards'
                ? 'text-amber-400 font-bold bg-amber-500/10'
                : 'text-slate-400 font-medium hover:text-slate-200'
            }`}
          >
            <Layers className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Flashcards</span>
          </button>

          <button
            onClick={() => {
              setModo('fallos');
              handleIniciarExamen();
            }}
            className="flex flex-col items-center justify-center gap-1 min-w-[64px] py-1 px-2 rounded-xl text-slate-400 font-medium hover:text-slate-200 transition-all"
          >
            <Flame className="w-5 h-5 text-rose-400" />
            <span className="text-[10px] tracking-tight">Fallos</span>
          </button>
        </nav>
      )}
    </div>
  );
}
