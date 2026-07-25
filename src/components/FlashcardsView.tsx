import React, { useState } from 'react';
import { Layers, ChevronLeft, ChevronRight, RotateCcw, BookOpen, Check, Shield } from 'lucide-react';
import { FLASHCARDS_PNP } from '../data/bancoPreguntas';

interface FlashcardsViewProps {
  onBack: () => void;
  darkMode: boolean;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  onBack,
  darkMode,
}) => {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = FLASHCARDS_PNP[index];

  const handleNext = () => {
    setFlipped(false);
    setIndex((prev) => (prev + 1) % FLASHCARDS_PNP.length);
  };

  const handlePrev = () => {
    setFlipped(false);
    setIndex((prev) => (prev - 1 + FLASHCARDS_PNP.length) % FLASHCARDS_PNP.length);
  };

  return (
    <div id="flashcards-view" className="max-w-2xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4 border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 border border-amber-500/40 flex items-center justify-center font-bold">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-xl font-serif text-slate-900 dark:text-white">
              Tarjetas de Memoria (Flashcards)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Memorización rápida de principios, normas y ley PNP
            </p>
          </div>
        </div>

        <span className="font-mono text-xs font-bold px-3 py-1 bg-amber-500/20 text-amber-500 rounded-full border border-amber-500/30">
          {index + 1} / {FLASHCARDS_PNP.length}
        </span>
      </div>

      {/* Main Flip Card Container */}
      <div
        onClick={() => setFlipped(!flipped)}
        className={`w-full min-h-[300px] p-8 sm:p-10 rounded-3xl border shadow-lg cursor-pointer transition-all duration-300 flex flex-col justify-between select-none relative overflow-hidden ${
          darkMode
            ? flipped ? 'bg-amber-950/30 border-amber-500/50 text-amber-100' : 'bg-slate-900 border-slate-800 text-slate-100'
            : flipped ? 'bg-amber-50 border-amber-300 text-slate-900' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Top Tag */}
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 border-b pb-3 border-slate-200/50 dark:border-slate-800">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-amber-500">
            <BookOpen className="w-4 h-4" />
            {card.titulo}
          </span>
          <span className="font-mono text-[11px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500">
            {card.leyRelacionada}
          </span>
        </div>

        {/* Card Content (Question vs Answer) */}
        <div className="py-6 space-y-4">
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">
            {flipped ? 'RESPUESTA / FUNDAMENTO LEGAL:' : 'PREGUNTA DE EVALUACIÓN:'}
          </span>

          <p className={`font-serif leading-relaxed ${
            flipped ? 'text-lg sm:text-xl font-bold whitespace-pre-line text-amber-600 dark:text-amber-300' : 'text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100'
          }`}>
            {flipped ? card.respuesta : card.pregunta}
          </p>
        </div>

        {/* Footer Prompt */}
        <div className="pt-4 border-t border-slate-200/50 dark:border-slate-800 text-center text-xs font-semibold text-slate-400">
          {flipped ? 'Haz clic para voltear a la pregunta' : 'Haz clic para ver la respuesta legal'}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handlePrev}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border font-semibold text-xs sm:text-sm bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          Anterior
        </button>

        <button
          onClick={() => setFlipped(!flipped)}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md"
        >
          Voltear Tarjeta 🔄
        </button>

        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border font-semibold text-xs sm:text-sm bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
        >
          Siguiente
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
