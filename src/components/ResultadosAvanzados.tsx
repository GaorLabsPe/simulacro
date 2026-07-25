import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  BarChart2,
  ShieldCheck,
  FileText,
  Printer,
  Download,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  BookOpen,
  ArrowRight,
  Shield
} from 'lucide-react';
import { ResultadoExamen, Pregunta } from '../types';
import { AREAS_PNP } from '../data/bancoPreguntas';

interface ResultadosAvanzadosProps {
  resultado: ResultadoExamen;
  preguntas: Pregunta[];
  onRepetirSimulacro: () => void;
  onRepasarFalladas: () => void;
  darkMode: boolean;
}

export const ResultadosAvanzados: React.FC<ResultadosAvanzadosProps> = ({
  resultado,
  preguntas,
  onRepetirSimulacro,
  onRepasarFalladas,
  darkMode,
}) => {
  // Default to showing incorrect questions first if there are any
  const [filterType, setFilterType] = useState<'todas' | 'incorrectas' | 'marcadas'>(
    resultado.incorrectas > 0 ? 'incorrectas' : 'todas'
  );
  const [expandedPreguntaId, setExpandedPreguntaId] = useState<string | null>(null);

  // In-line interactive practice state for fallos
  const [falloPracticeAnswers, setFalloPracticeAnswers] = useState<Record<string, number>>({});

  const pct = resultado.puntajePorcentaje;

  // Ascenso Probability level
  let nivelAscenso = 'REQUIERE REPASO INTENSIVO';
  let colorAscenso = 'text-rose-600 border-rose-500/40 bg-rose-500/10';
  if (pct >= 85) {
    nivelAscenso = 'PROBABILIDAD DE ASCENSO MUY ALTA 🏆';
    colorAscenso = 'text-emerald-600 dark:text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
  } else if (pct >= 70) {
    nivelAscenso = 'PROBABILIDAD DE ASCENSO BUENA 👍';
    colorAscenso = 'text-amber-600 dark:text-amber-400 border-amber-500/40 bg-amber-500/10';
  } else if (pct >= 60) {
    nivelAscenso = 'NIVEL APROBATORIO BÁSICO ⚠️';
    colorAscenso = 'text-amber-700 dark:text-amber-300 border-amber-600/40 bg-amber-600/10';
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}m ${sec}s`;
  };

  const preguntasIncorrectas = preguntas.filter((p) => {
    const resp = resultado.respuestas[p.id];
    return !resp || resp.opcionSeleccionada !== p.correcta;
  });

  const preguntasFiltradas = preguntas.filter((p) => {
    const resp = resultado.respuestas[p.id];
    if (filterType === 'incorrectas') {
      return !resp || resp.opcionSeleccionada !== p.correcta;
    }
    if (filterType === 'marcadas') {
      return resp && resp.marcadaRevision;
    }
    return true;
  });

  const handlePrintOrPDF = () => {
    window.print();
  };

  const handleSelectFalloPractice = (pregId: string, optIdx: number) => {
    setFalloPracticeAnswers((prev) => ({
      ...prev,
      [pregId]: optIdx,
    }));
  };

  return (
    <div id="resultados-avanzados-view" className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* PRINT-ONLY OFFICIAL HEADER */}
      <div className="print-only p-6 border-b-2 border-black text-slate-900 space-y-2 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold font-serif uppercase tracking-wider">POLICÍA NACIONAL DEL PERÚ</h1>
            <h2 className="text-sm font-semibold text-slate-700">DIRECCIÓN DE EDUCACIÓN Y DOCTRINA PNP</h2>
            <p className="text-xs">Balotario de Repaso de Fallos y Simulacro de Ascenso 2026</p>
          </div>
          <div className="text-right text-xs">
            <p><strong>Fecha:</strong> {resultado.fecha}</p>
            <p><strong>Puntaje Obtenido:</strong> {resultado.puntajePorcentaje}% ({resultado.correctas}/{resultado.totalPreguntas})</p>
            <p><strong>Tiempo Empleado:</strong> {formatTime(resultado.tiempoEmpleadoSegundos)}</p>
          </div>
        </div>
      </div>

      {/* Result Hero Header */}
      <div className={`p-8 sm:p-10 rounded-3xl border text-center space-y-6 shadow-xs ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-500 border border-amber-500/40 flex items-center justify-center mx-auto shadow-inner">
          <Award className="w-8 h-8 stroke-[2]" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
            EVALUACIÓN CONCLUIDA
          </span>
          <h1 className="text-4xl sm:text-6xl font-black font-serif tracking-tight text-slate-900 dark:text-white">
            {pct}%
          </h1>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            {resultado.correctas} de {resultado.totalPreguntas} respuestas correctas
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className={`px-4 py-1.5 rounded-full text-xs font-black border tracking-wide uppercase ${colorAscenso}`}>
            {nivelAscenso}
          </span>

          <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            Tiempo: {formatTime(resultado.tiempoEmpleadoSegundos)}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 no-print">
          {resultado.incorrectas > 0 && (
            <button
              id="btn-repasar-fallos-main"
              onClick={onRepasarFalladas}
              className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm flex items-center gap-2 transition-all shadow-md active:scale-95 animate-pulse"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>⚡ REPASAR MIS {resultado.incorrectas} FALLOS AHORA</span>
            </button>
          )}

          <button
            id="btn-descargar-pdf-print"
            onClick={handlePrintOrPDF}
            className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all shadow-md active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>Descargar PDF / Imprimir Balotario</span>
          </button>

          <button
            id="btn-nuevo-simulacro"
            onClick={onRepetirSimulacro}
            className="px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Nuevo Simulacro</span>
          </button>
        </div>
      </div>

      {/* PROMINENT REPASO DE FALLOS BLOCK */}
      {resultado.incorrectas > 0 && (
        <div className={`p-6 sm:p-8 rounded-3xl border border-rose-500/40 shadow-md space-y-6 ${
          darkMode ? 'bg-gradient-to-br from-slate-900 via-rose-950/20 to-slate-900' : 'bg-gradient-to-br from-rose-50 via-white to-amber-50/50'
        }`}>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4 border-rose-200 dark:border-rose-900/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-bold shadow-xs">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-lg font-serif text-slate-900 dark:text-white">
                  Sección de Repaso de Fallos ({preguntasIncorrectas.length} Errores)
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Practica o descarga directamente las preguntas donde te equivocaste para reforzar la base legal.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 no-print">
              <button
                onClick={handlePrintOrPDF}
                className="px-4 py-2 rounded-xl bg-slate-900 text-amber-400 hover:bg-slate-800 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF / Imprimir Solo Fallos</span>
              </button>

              <button
                onClick={onRepasarFalladas}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
              >
                <span>Re-evaluar en Modo Examen</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive In-line Practice for Failed Questions */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 flex items-center gap-1">
              <HelpCircle className="w-4 h-4" />
              Repaso Inmediato: Re-intenta responder para fijar la respuesta correcta
            </h3>

            {preguntasIncorrectas.map((preg, idx) => {
              const userResp = resultado.respuestas[preg.id];
              const miSeleccionInLine = falloPracticeAnswers[preg.id];
              const respondidoInLine = miSeleccionInLine !== undefined;

              return (
                <div
                  key={preg.id}
                  className={`p-5 rounded-2xl border space-y-3 transition-all page-break-inside-avoid ${
                    darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-600 dark:text-rose-300 border border-rose-500/30">
                          Fallada en examen
                        </span>
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          {preg.tema}
                        </span>
                        {preg.articuloLey && (
                          <span className="text-[10px] font-mono bg-amber-500/20 text-amber-800 dark:text-amber-300 px-1.5 py-0.5 rounded font-bold">
                            {preg.articuloLey}
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-base font-serif text-slate-900 dark:text-slate-100">
                        {idx + 1}. {preg.enunciado}
                      </h4>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                    {preg.alternativas.map((alt, aIdx) => {
                      const esCorrecta = aIdx === preg.correcta;
                      const fueSeleccionadaEnExamen = userResp && userResp.opcionSeleccionada === aIdx;
                      const esSeleccionInLine = miSeleccionInLine === aIdx;

                      let styleBox = darkMode
                        ? 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-amber-500'
                        : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-amber-400';

                      if (respondidoInLine) {
                        if (esCorrecta) {
                          styleBox = 'bg-emerald-500/20 border-emerald-500 text-emerald-900 dark:text-emerald-300 font-bold';
                        } else if (esSeleccionInLine && !esCorrecta) {
                          styleBox = 'bg-rose-500/20 border-rose-500 text-rose-900 dark:text-rose-300 font-bold line-through';
                        }
                      } else if (fueSeleccionadaEnExamen) {
                        styleBox = 'bg-rose-500/10 border-rose-400/50 text-rose-700 dark:text-rose-300 font-medium';
                      }

                      return (
                        <div
                          key={aIdx}
                          onClick={() => handleSelectFalloPractice(preg.id, aIdx)}
                          className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${styleBox}`}
                        >
                          <span>{alt}</span>

                          {fueSeleccionadaEnExamen && !respondidoInLine && (
                            <span className="text-[9px] bg-rose-500 text-white px-1.5 py-0.5 rounded font-bold">
                              Tu error anterior
                            </span>
                          )}

                          {respondidoInLine && esCorrecta && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation Box */}
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-1">
                    <span className="font-bold text-amber-700 dark:text-amber-400 font-serif block">
                      Fundamentación Legal Oficial ({preg.articuloLey || 'Ley PNP'}):
                    </span>
                    <p className="text-slate-800 dark:text-slate-200 leading-relaxed">
                      {preg.explicacion}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Breakdown by Area Grid */}
      <div className={`p-6 rounded-2xl border space-y-4 ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center gap-2 border-b pb-3 border-slate-100 dark:border-slate-800">
          <BarChart2 className="w-5 h-5 text-amber-500" />
          <h3 className="font-bold text-base font-serif text-slate-900 dark:text-slate-100">
            Rendimiento Desglosado por Área Legal
          </h3>
        </div>

        <div className="space-y-4">
          {resultado.porArea.map((item) => {
            const areaInfo = AREAS_PNP.find((a) => a.id === item.areaId) || {
              nombre: item.nombreArea,
              color: '#8B2C2C',
            };

            return (
              <div key={item.areaId} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-800 dark:text-slate-200">{areaInfo.nombre}</span>
                  <span className="font-mono text-amber-500">{item.correctas} / {item.total} ({item.porcentaje}%)</span>
                </div>

                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${item.porcentaje}%`,
                      backgroundColor: areaInfo.color || '#C9A227',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Review Section for All Questions */}
      <div className={`p-6 rounded-2xl border space-y-6 ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4 border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-base font-serif text-slate-900 dark:text-slate-100">
              Revisión Completa de Respuestas ({preguntasFiltradas.length})
            </h3>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs no-print">
            <button
              onClick={() => setFilterType('todas')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                filterType === 'todas' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
              }`}
            >
              Todas ({preguntas.length})
            </button>
            <button
              onClick={() => setFilterType('incorrectas')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                filterType === 'incorrectas' ? 'bg-rose-500 text-white shadow-xs' : 'text-slate-500'
              }`}
            >
              Incorrectas ({resultado.incorrectas})
            </button>
            <button
              onClick={() => setFilterType('marcadas')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                filterType === 'marcadas' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-500'
              }`}
            >
              Marcadas 🚩
            </button>
          </div>
        </div>

        {/* Question Review List */}
        <div className="space-y-4">
          {preguntasFiltradas.map((preg, idx) => {
            const resp = resultado.respuestas[preg.id];
            const dadaIndex = resp ? resp.opcionSeleccionada : undefined;
            const esCorrecta = dadaIndex === preg.correcta;
            const isExpanded = expandedPreguntaId === preg.id || !esCorrecta; // Auto-expand wrong ones for ease!

            return (
              <div
                key={preg.id}
                className={`p-4 sm:p-5 rounded-xl border transition-all page-break-inside-avoid ${
                  esCorrecta
                    ? darkMode ? 'bg-emerald-950/20 border-emerald-900/40' : 'bg-emerald-50/50 border-emerald-200/80'
                    : darkMode ? 'bg-rose-950/20 border-rose-900/40' : 'bg-rose-50/50 border-rose-200/80'
                }`}
              >
                <div
                  onClick={() => setExpandedPreguntaId(isExpanded ? null : preg.id)}
                  className="flex items-start gap-3 cursor-pointer select-none"
                >
                  <div className="mt-0.5">
                    {esCorrecta ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
                    )}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Pregunta #{idx + 1} • {preg.tema}
                      </span>
                      {preg.articuloLey && (
                        <span className="text-[10px] font-mono bg-amber-500/20 text-amber-800 dark:text-amber-300 px-1.5 py-0.5 rounded">
                          {preg.articuloLey}
                        </span>
                      )}
                    </div>
                    <p className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                      {preg.enunciado}
                    </p>
                  </div>

                  <button className="p-1 text-slate-400 no-print">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800 space-y-3 text-xs leading-relaxed">
                    <div className="space-y-1.5">
                      {preg.alternativas.map((alt, aIdx) => {
                        const esTuOp = dadaIndex === aIdx;
                        const esSol = aIdx === preg.correcta;

                        let styleAlt = 'text-slate-700 dark:text-slate-200';
                        if (esSol) styleAlt = 'font-bold text-emerald-800 dark:text-emerald-300';
                        if (esTuOp && !esSol) styleAlt = 'font-bold text-rose-800 dark:text-rose-300 line-through';

                        return (
                          <div key={aIdx} className={`flex items-center gap-2 ${styleAlt}`}>
                            <span>{alt}</span>
                            {esSol && <span className="text-[10px] bg-emerald-500 text-white px-1.5 py-0.2 rounded font-bold">Respuesta Correcta</span>}
                            {esTuOp && !esSol && <span className="text-[10px] bg-rose-500 text-white px-1.5 py-0.2 rounded font-bold">Tu Marcación</span>}
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-slate-800 dark:text-slate-200">
                      <strong className="block text-amber-700 dark:text-amber-400 font-serif mb-0.5">Fundamentación Legal:</strong>
                      {preg.explicacion}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
