import React from 'react';
import {
  BookOpen,
  Target,
  Zap,
  Shield,
  Layers,
  Award,
  ListFilter,
  ChevronRight,
  Clock,
  RotateCcw,
  CheckCircle,
  Sparkles,
  BarChart3,
  Bookmark
} from 'lucide-react';
import { Area, ModoExamen, UserStats, Pregunta } from '../types';
import { AREAS_PNP, BANCO_PREGUNTAS_PNP } from '../data/bancoPreguntas';

interface DashboardInicioProps {
  modo: ModoExamen;
  setModo: (m: ModoExamen) => void;
  areasSeleccionadas: string[];
  toggleArea: (id: string) => void;
  temasSeleccionados: string[];
  toggleTema: (key: string) => void;
  cantidad: number;
  setCantidad: (n: number) => void;
  poolDisponible: Pregunta[];
  onIniciarExamen: () => void;
  onOpenFlashcards: () => void;
  onOpenBanco: () => void;
  userStats: UserStats;
  darkMode: boolean;
}

export const DashboardInicio: React.FC<DashboardInicioProps> = ({
  modo,
  setModo,
  areasSeleccionadas,
  toggleArea,
  temasSeleccionados,
  toggleTema,
  cantidad,
  setCantidad,
  poolDisponible,
  onIniciarExamen,
  onOpenFlashcards,
  onOpenBanco,
  userStats,
  darkMode,
}) => {
  const disponibles = poolDisponible.length;

  return (
    <div id="dashboard-inicio-container" className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Hero Header */}
      <div className={`p-6 sm:p-10 rounded-3xl border relative overflow-hidden shadow-xs ${
        darkMode
          ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/30 border-slate-800'
          : 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white border-amber-500/30'
      }`}>
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-semibold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span>Sistema Institucional de Entrenamiento 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight leading-tight text-white">
            Preparación de Excelencia para el Ascenso PNP
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Plataforma interactiva con normatividad actualizada: Código Penal, Decreto Legislativo N° 1267 (Ley PNP), Ley N° 30714 (Régimen Disciplinario) y DL 1186 (Uso de la Fuerza).
          </p>

          {/* Quick Access Action Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onOpenFlashcards}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md active:scale-95"
            >
              <Layers className="w-4 h-4" />
              <span>Tarjetas de Memoria (Flashcards)</span>
            </button>

            <button
              onClick={onOpenBanco}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Explorar Banco ({BANCO_PREGUNTAS_PNP.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Summary Widget */}
      {userStats.examenesCompletados > 0 && (
        <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl border ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="space-y-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Simulacros Rendidos</span>
            <div className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white">
              {userStats.examenesCompletados}
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Promedio Promocional</span>
            <div className="text-xl sm:text-2xl font-bold font-serif text-amber-500">
              {userStats.promedioPuntaje}%
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Mejor Calificación</span>
            <div className="text-xl sm:text-2xl font-bold font-serif text-emerald-600 dark:text-emerald-400">
              {userStats.mejorPuntaje}%
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Tiempo de Estudio</span>
            <div className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white">
              {userStats.tiempoTotalMinutos} min
            </div>
          </div>
        </div>
      )}

      {/* Configuration Steps Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Step 1: Modo de Evaluación */}
        <div className={`p-6 rounded-2xl border space-y-4 lg:col-span-1 ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center gap-2 border-b pb-3 border-slate-100 dark:border-slate-800">
            <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center">1</span>
            <h3 className="font-bold text-base font-serif text-slate-900 dark:text-slate-100">Modo de Examen</h3>
          </div>

          <div className="space-y-3">
            {[
              {
                id: 'simulacro' as ModoExamen,
                titulo: 'Simulacro Oficial PNP',
                desc: 'Cronometrado, sin pistas inmediatas. Evalúa tu nivel real.',
                icono: Target,
                color: 'text-rose-500',
              },
              {
                id: 'estudio' as ModoExamen,
                titulo: 'Práctica Guiada Paso a Paso',
                desc: 'Feedback inmediato con articulado de ley y fundamentación.',
                icono: BookOpen,
                color: 'text-amber-500',
              },
              {
                id: 'maraton' as ModoExamen,
                titulo: 'Maratón Contrarreloj ⚡',
                desc: 'Evaluación rápida para agilizar el ritmo de respuesta.',
                icono: Zap,
                color: 'text-indigo-500',
              },
              {
                id: 'fallos' as ModoExamen,
                titulo: 'Repaso de Fallos Previos 🛡️',
                desc: 'Focalizado únicamente en las preguntas que has equivocado.',
                icono: RotateCcw,
                color: 'text-emerald-500',
              },
            ].map((m) => {
              const Icon = m.icono;
              const activo = modo === m.id;
              return (
                <div
                  key={m.id}
                  id={`modo-option-${m.id}`}
                  onClick={() => setModo(m.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    activo
                      ? 'bg-amber-500/10 border-amber-500 ring-1 ring-amber-500'
                      : darkMode
                      ? 'bg-slate-800/50 border-slate-800 hover:border-slate-700'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-1">
                    <Icon className={`w-5 h-5 ${m.color}`} />
                    <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{m.titulo}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pl-8">
                    {m.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2 & 3: Áreas & Temario Especifico */}
        <div className={`p-6 rounded-2xl border space-y-6 lg:col-span-2 ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          {/* Areas Header */}
          <div className="flex items-center gap-2 border-b pb-3 border-slate-100 dark:border-slate-800">
            <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center">2</span>
            <h3 className="font-bold text-base font-serif text-slate-900 dark:text-slate-100">Áreas & Normativa Institucional</h3>
          </div>

          {/* Area Buttons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {AREAS_PNP.map((a) => {
              const activa = areasSeleccionadas.includes(a.id);
              return (
                <div
                  key={a.id}
                  id={`area-card-${a.id}`}
                  onClick={() => toggleArea(a.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    activa
                      ? 'bg-slate-900 text-white border-amber-500 shadow-xs'
                      : darkMode
                      ? 'bg-slate-800/40 border-slate-800 text-slate-400 hover:border-slate-700'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-amber-400">{a.nombre}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      activa ? 'bg-amber-500 text-slate-950' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                    }`}>
                      {activa ? 'Seleccionada' : 'Inactiva'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {a.descripcion}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Number of Questions Slider */}
          <div className="border-t pt-5 border-slate-100 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <ListFilter className="w-4 h-4 text-amber-500" />
                Cantidad de Preguntas
              </span>
              <span className="font-mono text-amber-500 font-bold text-sm">
                {Math.min(cantidad, disponibles || 0)} / {disponibles} preguntas
              </span>
            </div>

            <input
              type="range"
              min={Math.min(5, disponibles || 1)}
              max={Math.max(disponibles, 5)}
              value={Math.min(cantidad, disponibles || 5)}
              onChange={(e) => setCantidad(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              disabled={disponibles === 0}
            />

            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Rápido (5-10)</span>
              <span>Estándar (15-20)</span>
              <span>Completo (Máx: {disponibles})</span>
            </div>
          </div>

          {/* Start Button */}
          <div className="pt-2">
            <button
              id="btn-iniciar-simulacro-main"
              onClick={onIniciarExamen}
              disabled={disponibles === 0}
              className={`w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-base flex items-center justify-center gap-3 transition-all shadow-lg active:scale-98 ${
                disponibles === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span>INICIAR {modo === 'simulacro' ? 'SIMULACRO' : 'EVALUACIÓN'} ({Math.min(cantidad, disponibles || 0)} PREGUNTAS)</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
