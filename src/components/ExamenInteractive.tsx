import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Flag,
  Bookmark,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  List,
  AlertTriangle,
  X,
  Clock,
  Eye,
  EyeOff
} from 'lucide-react';
import { Pregunta, RespuestaUsuario, ModoExamen } from '../types';
import { AppSettings, toggleGuardada } from '../utils/storage';
import { audioFX } from '../utils/audio';
import { QuestionPalette } from './QuestionPalette';
import { AITutorModal } from './AITutorModal';

interface ExamenInteractiveProps {
  preguntas: Pregunta[];
  indice: number;
  setIndice: (idx: number) => void;
  respuestas: Record<string, RespuestaUsuario>;
  setRespuestas: React.Dispatch<React.SetStateAction<Record<string, RespuestaUsuario>>>;
  modo: ModoExamen;
  settings: AppSettings;
  segundosTimer: number;
  guardadasIds: string[];
  setGuardadasIds: React.Dispatch<React.SetStateAction<string[]>>;
  onFinalizarExamen: () => void;
  darkMode: boolean;
}

export const ExamenInteractive: React.FC<ExamenInteractiveProps> = ({
  preguntas,
  indice,
  setIndice,
  respuestas,
  setRespuestas,
  modo,
  settings,
  segundosTimer,
  guardadasIds,
  setGuardadasIds,
  onFinalizarExamen,
  darkMode,
}) => {
  const [showPaletteModal, setShowPaletteModal] = useState(false);
  const [showAITutor, setShowAITutor] = useState(false);
  const [showConfirmFinishModal, setShowConfirmFinishModal] = useState(false);

  const pregunta = preguntas[indice];
  const total = preguntas.length;

  if (!pregunta) return null;

  const respActual = respuestas[pregunta.id] || {
    preguntaId: pregunta.id,
    opcionSeleccionada: undefined,
    marcadaRevision: false,
    descartadas: [],
  };

  const respondida = respActual.opcionSeleccionada !== undefined;
  const esGuardada = guardadasIds.includes(pregunta.id);

  // FontSize mapping
  const fontClasses = {
    sm: { enunciado: 'text-base', alternativa: 'text-xs' },
    md: { enunciado: 'text-lg sm:text-xl', alternativa: 'text-sm sm:text-base' },
    lg: { enunciado: 'text-xl sm:text-2xl', alternativa: 'text-base sm:text-lg' },
  }[settings.fontSize];

  // Selecting an option
  const handleSelectOption = (optIndex: number) => {
    audioFX.playSelect();
    setRespuestas((prev) => ({
      ...prev,
      [pregunta.id]: {
        ...respActual,
        opcionSeleccionada: optIndex,
      },
    }));

    if (modo === 'estudio') {
      if (optIndex === pregunta.correcta) {
        audioFX.playSuccess();
      } else {
        audioFX.playError();
      }
    }
  };

  // Toggle Strike-through / Descartar
  const handleToggleDescartar = (e: React.MouseEvent, optIndex: number) => {
    e.stopPropagation();
    audioFX.playTick();
    const existe = respActual.descartadas.includes(optIndex);
    const nuevasDescartadas = existe
      ? respActual.descartadas.filter((i) => i !== optIndex)
      : [...respActual.descartadas, optIndex];

    setRespuestas((prev) => ({
      ...prev,
      [pregunta.id]: {
        ...respActual,
        descartadas: nuevasDescartadas,
      },
    }));
  };

  // Toggle Flag 🚩
  const handleToggleFlag = () => {
    audioFX.playFlag();
    setRespuestas((prev) => ({
      ...prev,
      [pregunta.id]: {
        ...respActual,
        marcadaRevision: !respActual.marcadaRevision,
      },
    }));
  };

  // Toggle Bookmark 🔖
  const handleToggleBookmark = () => {
    const actualizadas = toggleGuardada(pregunta.id);
    setGuardadasIds(actualizadas);
    audioFX.playTick();
  };

  const handleNext = () => {
    if (indice < total - 1) {
      setIndice(indice + 1);
    } else {
      setShowConfirmFinishModal(true);
    }
  };

  const handlePrev = () => {
    if (indice > 0) {
      setIndice(indice - 1);
    }
  };

  const respondidasCount = (Object.values(respuestas) as RespuestaUsuario[]).filter((r) => r.opcionSeleccionada !== undefined).length;
  const marcadasCount = (Object.values(respuestas) as RespuestaUsuario[]).filter((r) => r.marcadaRevision).length;

  return (
    <div id="examen-interactive-view" className="max-w-4xl mx-auto px-4 py-6 pb-24 sm:pb-8 space-y-6">
      {/* Top Bar Navigation & Actions */}
      <div className={`p-4 rounded-2xl border shadow-xs flex flex-wrap items-center justify-between gap-4 ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-amber-500/20 text-amber-500 border border-amber-500/30">
            Pregunta {indice + 1} / {total}
          </span>

          {pregunta.articuloLey && (
            <span className="hidden sm:inline-block px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {pregunta.articuloLey}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Palette Modal Trigger */}
          <button
            id="btn-open-palette"
            onClick={() => setShowPaletteModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
          >
            <List className="w-4 h-4 text-amber-500" />
            <span className="hidden sm:inline">Matriz ({respondidasCount}/{total})</span>
          </button>

          {/* AI Tutor Trigger */}
          <button
            id="btn-open-ai-tutor"
            onClick={() => setShowAITutor(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/30 hover:bg-amber-500/20 transition-all shadow-2xs"
          >
            <Sparkles className="w-4 h-4 text-amber-500 animate-spin-slow" />
            <span>Tutor Legal IA</span>
          </button>

          {/* Flag Button */}
          <button
            id="btn-flag-question"
            title="Marcar para revisión posterior"
            onClick={handleToggleFlag}
            className={`p-2 rounded-lg border transition-all ${
              respActual.marcadaRevision
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 hover:text-amber-500'
            }`}
          >
            <Flag className="w-4 h-4" />
          </button>

          {/* Bookmark Button */}
          <button
            id="btn-bookmark-question"
            title="Guardar en biblioteca personal"
            onClick={handleToggleBookmark}
            className={`p-2 rounded-lg border transition-all ${
              esGuardada
                ? 'bg-amber-500 text-slate-950 border-amber-400'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 hover:text-amber-500'
            }`}
          >
            <Bookmark className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Line */}
      <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
        <div
          className="bg-amber-500 h-full transition-all duration-300"
          style={{ width: `${((indice + 1) / total) * 100}%` }}
        />
      </div>

      {/* Main Question Card */}
      <div className={`p-6 sm:p-8 rounded-2xl border shadow-sm space-y-6 ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        {/* Category Badge & Topic */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-4 border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {pregunta.tema}
            </span>
          </div>
          <span className="text-xs font-mono font-medium text-slate-400">
            Dificultad: <span className="capitalize text-amber-500">{pregunta.dificultad}</span>
          </span>
        </div>

        {/* Enunciado */}
        <h2 className={`font-bold font-serif leading-relaxed text-slate-900 dark:text-slate-100 ${fontClasses.enunciado}`}>
          {pregunta.enunciado}
        </h2>

        {/* Options */}
        <div className="space-y-3 pt-2">
          {pregunta.alternativas.map((alt, optIdx) => {
            const esSeleccionada = respActual.opcionSeleccionada === optIdx;
            const esDescartada = respActual.descartadas.includes(optIdx);
            const esCorrecta = optIdx === pregunta.correcta;

            let borderAndBg = darkMode
              ? 'bg-slate-800/80 border-slate-700 text-slate-100 hover:border-slate-500'
              : 'bg-slate-50 border-slate-200 text-slate-900 hover:border-slate-300';

            if (esSeleccionada) {
              borderAndBg = 'bg-amber-500/20 border-amber-500 text-slate-950 dark:text-amber-200 ring-1 ring-amber-500/50 font-semibold';
            }

            // In Estudio Mode: show green for correct, red for wrong if answered
            if (modo === 'estudio' && respondida) {
              if (esCorrecta) {
                borderAndBg = 'bg-emerald-500/20 border-emerald-500 text-emerald-950 dark:text-emerald-200 font-semibold';
              } else if (esSeleccionada && !esCorrecta) {
                borderAndBg = 'bg-rose-500/20 border-rose-500 text-rose-950 dark:text-rose-200 font-semibold';
              } else {
                borderAndBg = 'opacity-50 bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300';
              }
            }

            return (
              <div
                key={optIdx}
                id={`option-card-${optIdx}`}
                onClick={() => handleSelectOption(optIdx)}
                className={`relative p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all duration-150 ${borderAndBg} ${
                  esDescartada ? 'opacity-40 line-through' : ''
                }`}
              >
                {/* Radio Circle / Indicator */}
                <div className={`w-6 h-6 rounded-lg border flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold transition-all ${
                  esSeleccionada
                    ? 'bg-amber-500 border-amber-500 text-slate-950'
                    : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200'
                }`}>
                  {String.fromCharCode(65 + optIdx)}
                </div>

                {/* Text */}
                <span className={`flex-1 font-sans ${fontClasses.alternativa}`}>
                  {alt.replace(/^[A-D]\)\s*/, '')}
                </span>

                {/* Strike-through Discard Button */}
                <button
                  onClick={(e) => handleToggleDescartar(e, optIdx)}
                  title={esDescartada ? 'Restaurar opción' : 'Tachar/Descartar esta opción'}
                  className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all text-xs"
                >
                  {esDescartada ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>

                {/* Feedback Icons in Estudio Mode */}
                {modo === 'estudio' && respondida && (
                  <div className="flex-shrink-0">
                    {esCorrecta && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                    {esSeleccionada && !esCorrecta && <XCircle className="w-5 h-5 text-rose-500" />}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Immediate Explanation in Estudio Mode */}
        {modo === 'estudio' && respondida && (
          <div id="estudio-explanation-box" className="p-5 rounded-xl border bg-slate-50 dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 space-y-2 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" />
                Fundamentación Legal & Doctrinal
              </span>
              {pregunta.articuloLey && (
                <span className="text-xs font-mono bg-amber-500/20 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded font-semibold">
                  {pregunta.articuloLey}
                </span>
              )}
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              {pregunta.explicacion}
            </p>
          </div>
        )}
      </div>

      {/* Desktop Bottom Navigation Buttons */}
      <div className="hidden sm:flex items-center justify-between gap-4 pt-2">
        <button
          id="btn-anterior-pregunta"
          onClick={handlePrev}
          disabled={indice === 0}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border font-semibold text-sm transition-all ${
            indice === 0
              ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Anterior
        </button>

        <div className="flex items-center gap-2">
          {/* Finish Early Button */}
          <button
            id="btn-terminar-anticipado"
            onClick={() => setShowConfirmFinishModal(true)}
            className="inline-flex px-4 py-2.5 rounded-xl border border-rose-500/40 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 text-xs font-bold transition-all"
          >
            Finalizar Examen
          </button>

          {/* Next Button */}
          <button
            id="btn-siguiente-pregunta"
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-md active:scale-95"
          >
            <span>{indice === total - 1 ? 'Finalizar' : 'Siguiente'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Sticky Action Bar for Officers */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/98 border-t border-slate-800 p-2.5 px-3 flex items-center justify-between gap-2 shadow-2xl backdrop-blur-md">
        <button
          onClick={handlePrev}
          disabled={indice === 0}
          className="flex items-center justify-center gap-1 min-h-[44px] px-3 py-2 rounded-xl border font-semibold text-xs bg-slate-800 text-slate-200 border-slate-700 disabled:opacity-30 active:scale-95 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Ant.</span>
        </button>

        <button
          onClick={handleToggleFlag}
          title="Marcar duda"
          className={`flex items-center justify-center min-h-[44px] px-3 py-2 rounded-xl border text-xs font-semibold active:scale-95 transition-all ${
            respActual.marcadaRevision
              ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
              : 'bg-slate-800 text-slate-300 border-slate-700'
          }`}
        >
          <Flag className="w-4 h-4" />
        </button>

        <button
          onClick={() => setShowPaletteModal(true)}
          className="flex items-center justify-center min-h-[44px] px-3 py-2 rounded-xl border bg-slate-800 text-amber-400 border-slate-700 text-xs font-bold active:scale-95 transition-all"
        >
          <List className="w-4 h-4 mr-1 text-amber-400" />
          <span>{indice + 1}/{total}</span>
        </button>

        <button
          onClick={handleNext}
          className="flex items-center justify-center gap-1 min-h-[44px] px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-md active:scale-95 transition-all"
        >
          <span>{indice === total - 1 ? 'Finalizar' : 'Siguiente'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Matriz / Palette Modal */}
      {showPaletteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div className={`w-full max-w-lg p-6 rounded-2xl border shadow-2xl space-y-5 ${
            darkMode ? 'bg-slate-900 text-slate-100 border-slate-800' : 'bg-white text-slate-900 border-slate-200'
          }`}>
            <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-lg font-serif">Matriz de Navegación Rápida</h3>
              <button
                onClick={() => setShowPaletteModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <QuestionPalette
              total={total}
              indiceActual={indice}
              respuestas={respuestas}
              preguntasIds={preguntas.map((p) => p.id)}
              onSelectIndice={(idx) => {
                setIndice(idx);
                setShowPaletteModal(false);
              }}
              darkMode={darkMode}
            />

            <button
              onClick={() => setShowPaletteModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs"
            >
              Cerrar Matriz
            </button>
          </div>
        </div>
      )}

      {/* AI Tutor Modal */}
      {showAITutor && (
        <AITutorModal
          pregunta={pregunta}
          onClose={() => setShowAITutor(false)}
          darkMode={darkMode}
        />
      )}

      {/* Confirm Finish Modal */}
      {showConfirmFinishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
          <div className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl space-y-5 text-center ${
            darkMode ? 'bg-slate-900 text-slate-100 border-slate-800' : 'bg-white text-slate-900 border-slate-200'
          }`}>
            <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-500 border border-amber-500/40 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-xl font-serif">¿Deseas concluir el examen?</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Has respondido <strong className="text-amber-500">{respondidasCount} de {total}</strong> preguntas.
                {marcadasCount > 0 && ` Tienes ${marcadasCount} preguntas marcadas para revisión.`}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowConfirmFinishModal(false)}
                className="py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                Seguir respondiendo
              </button>
              <button
                onClick={() => {
                  setShowConfirmFinishModal(false);
                  onFinalizarExamen();
                }}
                className="py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md"
              >
                Sí, ver resultados
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
