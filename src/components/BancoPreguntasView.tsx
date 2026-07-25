import React, { useState } from 'react';
import { BookOpen, Search, Filter, Bookmark, Check, Shield } from 'lucide-react';
import { BANCO_PREGUNTAS_PNP, AREAS_PNP } from '../data/bancoPreguntas';
import { toggleGuardada } from '../utils/storage';

interface BancoPreguntasViewProps {
  guardadasIds: string[];
  setGuardadasIds: React.Dispatch<React.SetStateAction<string[]>>;
  darkMode: boolean;
}

export const BancoPreguntasView: React.FC<BancoPreguntasViewProps> = ({
  guardadasIds,
  setGuardadasIds,
  darkMode,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState<string>('todas');

  const handleToggleBookmark = (id: string) => {
    const actualizadas = toggleGuardada(id);
    setGuardadasIds(actualizadas);
  };

  const preguntasFiltradas = BANCO_PREGUNTAS_PNP.filter((p) => {
    const matchArea = selectedArea === 'todas' || p.area === selectedArea;
    const matchSearch =
      p.enunciado.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tema.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.articuloLey && p.articuloLey.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchArea && matchSearch;
  });

  return (
    <div id="banco-preguntas-view" className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4 border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 border border-amber-500/40 flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-xl font-serif text-slate-900 dark:text-white">
              Explorador de Banco de Preguntas PNP
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Consulta todo el compendio oficial de preguntas y artículos legales
            </p>
          </div>
        </div>

        <span className="font-mono text-xs font-bold px-3 py-1 bg-amber-500/20 text-amber-500 rounded-full border border-amber-500/30">
          {preguntasFiltradas.length} de {BANCO_PREGUNTAS_PNP.length} Preguntas
        </span>
      </div>

      {/* Search & Area Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por palabra clave, artículo de ley o tema (ej. homicidio, DL 1186, flagrancia)..."
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 ${
              darkMode ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
            }`}
          />
        </div>

        <select
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
          className={`px-3 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 ${
            darkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-300 text-slate-800'
          }`}
        >
          <option value="todas">Todas las Áreas ({BANCO_PREGUNTAS_PNP.length})</option>
          {AREAS_PNP.map((a) => (
            <option key={a.id} value={a.id}>
              {a.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {preguntasFiltradas.map((preg, idx) => {
          const esGuardada = guardadasIds.includes(preg.id);
          const areaInfo = AREAS_PNP.find((a) => a.id === preg.area) || {
            nombre: preg.area,
            color: '#C9A227',
          };

          return (
            <div
              key={preg.id}
              className={`p-5 rounded-2xl border space-y-3 transition-all ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-white"
                      style={{ backgroundColor: areaInfo.color }}
                    >
                      {areaInfo.nombre}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-300">
                      {preg.tema}
                    </span>
                    {preg.articuloLey && (
                      <span className="text-[10px] font-mono bg-amber-500/20 text-amber-800 dark:text-amber-300 px-1.5 py-0.5 rounded font-bold">
                        {preg.articuloLey}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-base font-serif text-slate-900 dark:text-slate-100">
                    #{idx + 1}. {preg.enunciado}
                  </h3>
                </div>

                <button
                  onClick={() => handleToggleBookmark(preg.id)}
                  title={esGuardada ? 'Quitar de guardadas' : 'Guardar pregunta'}
                  className={`p-2 rounded-lg border transition-all ${
                    esGuardada
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 hover:text-amber-500'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>

              {/* Alternatives */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                {preg.alternativas.map((alt, aIdx) => {
                  const esCorrecta = aIdx === preg.correcta;
                  return (
                    <div
                      key={aIdx}
                      className={`p-2.5 rounded-lg border font-medium ${
                        esCorrecta
                          ? 'bg-emerald-500/15 border-emerald-500/80 text-emerald-950 dark:text-emerald-200 font-bold'
                          : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {alt}
                    </div>
                  );
                })}
              </div>

              {/* Fundamento */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                <span className="font-bold text-amber-600 dark:text-amber-400 block font-serif">Fundamento Legal:</span>
                <p className="leading-relaxed">{preg.explicacion}</p>
              </div>
            </div>
          );
        })}

        {preguntasFiltradas.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-sm">
            No se encontraron preguntas que coincidan con la búsqueda "{searchTerm}".
          </div>
        )}
      </div>
    </div>
  );
};
