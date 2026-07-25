import React from 'react';
import { Flag, Check, Circle } from 'lucide-react';
import { RespuestaUsuario } from '../types';

interface QuestionPaletteProps {
  total: number;
  indiceActual: number;
  respuestas: Record<string, RespuestaUsuario>;
  preguntasIds: string[];
  onSelectIndice: (idx: number) => void;
  darkMode?: boolean;
}

export const QuestionPalette: React.FC<QuestionPaletteProps> = ({
  total,
  indiceActual,
  respuestas,
  preguntasIds,
  onSelectIndice,
  darkMode = false,
}) => {
  return (
    <div id="question-palette-container" className="space-y-3">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        <span>Matriz de Preguntas</span>
        <span>{(Object.values(respuestas) as RespuestaUsuario[]).filter(r => r.opcionSeleccionada !== undefined).length} / {total} Respondidas</span>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
        {Array.from({ length: total }).map((_, idx) => {
          const pregId = preguntasIds[idx];
          const resp = pregId ? respuestas[pregId] : undefined;
          const respondida = resp && resp.opcionSeleccionada !== undefined;
          const marcada = resp && resp.marcadaRevision;
          const esActual = idx === indiceActual;

          let bgClasses = darkMode
            ? 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500'
            : 'bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-300';

          if (respondida) {
            bgClasses = darkMode
              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/80'
              : 'bg-emerald-100 text-emerald-900 border-emerald-300';
          }

          if (esActual) {
            bgClasses += ' ring-2 ring-amber-500 ring-offset-1 font-bold';
          }

          return (
            <button
              key={idx}
              id={`palette-item-${idx}`}
              onClick={() => onSelectIndice(idx)}
              className={`relative h-9 rounded-lg border text-xs font-medium flex items-center justify-center transition-all ${bgClasses}`}
            >
              <span>{idx + 1}</span>

              {marcada && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-[8px] font-black shadow-xs">
                  🚩
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500" />
          <span>Respondida</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-amber-500 text-slate-950 text-[9px] flex items-center justify-center font-bold">🚩</span>
          <span>Revisión</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600" />
          <span>Pendiente</span>
        </div>
      </div>
    </div>
  );
};
