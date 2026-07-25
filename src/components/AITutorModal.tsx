import React, { useState } from 'react';
import { Sparkles, X, BookOpen, AlertCircle, RefreshCw, Send } from 'lucide-react';
import { Pregunta } from '../types';

interface AITutorModalProps {
  pregunta: Pregunta;
  onClose: () => void;
  darkMode?: boolean;
}

export const AITutorModal: React.FC<AITutorModalProps> = ({
  pregunta,
  onClose,
  darkMode = false,
}) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleAskTutor = async (customPrompt?: string) => {
    setLoading(true);
    setResponse(null);

    const promptText = customPrompt || query || `Explícame en detalle con base legal policial el tema: ${pregunta.enunciado}`;

    try {
      // Intentar llamar a endpoint API servidor
      const res = await fetch('/api/tutor-legal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          preguntaId: pregunta.id,
          enunciado: pregunta.enunciado,
          articuloLey: pregunta.articuloLey,
          explicacionOriginal: pregunta.explicacion,
          userQuery: promptText,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setResponse(data.respuesta || data.text);
      } else {
        // Fallback enriquecido local
        generateFallbackResponse(promptText);
      }
    } catch {
      generateFallbackResponse(promptText);
    } finally {
      setLoading(false);
    }
  };

  const generateFallbackResponse = (q: string) => {
    setResponse(
      `🏛️ **Análisis Policial & Jurídico:**\n\n` +
      `**1. Marco Legal Aplicable:**\n* ${pregunta.articuloLey || 'Normativa Constitucional y Código Penal'}\n\n` +
      `**2. Fundamento de la Respuesta Correcta:**\n${pregunta.explicacion}\n\n` +
      `**3. Recomendación Operativa PNP:**\n` +
      `Para intervenciones o evaluaciones de ascenso, recuerde verificar siempre el principio de legalidad y la correcta formulación de actas (Acta de Intervención, Registro Personal o Cadena de Custodia).\n\n` +
      `*Consulta procesada:* "${q}"`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div
        className={`w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${
          darkMode ? 'bg-slate-900 text-slate-100 border-slate-800' : 'bg-white text-slate-900 border-slate-200'
        }`}
      >
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-amber-200">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight font-serif">Tutor Legal Policial IA</h3>
              <p className="text-xs text-amber-200">Asesoría jurídica y jurisprudencia PNP</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Question Reference Card */}
          <div className={`p-4 rounded-xl border text-sm space-y-2 ${darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-amber-50/60 border-amber-200/80'}`}>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{pregunta.articuloLey || 'Norma de referencia'}</span>
            </div>
            <p className="font-semibold text-slate-900 dark:text-slate-100">{pregunta.enunciado}</p>
          </div>

          {/* Quick Prompts */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleAskTutor('¿Por qué es la opción correcta y qué leyes la respaldan?')}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/30 hover:bg-amber-500/20 transition-all"
            >
              📖 Explicación legal detallada
            </button>
            <button
              onClick={() => handleAskTutor('Dame un ejemplo práctico de intervención policial')}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border bg-indigo-500/10 text-indigo-800 dark:text-indigo-300 border-indigo-500/30 hover:bg-indigo-500/20 transition-all"
            >
              🚓 Caso práctico de aplicación
            </button>
            <button
              onClick={() => handleAskTutor('¿Qué errores comunes se cometen en esta pregunta?')}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border bg-rose-500/10 text-rose-800 dark:text-rose-300 border-rose-500/30 hover:bg-rose-500/20 transition-all"
            >
              ⚠️ Cascos de trampa en el examen
            </button>
          </div>

          {/* Response Box */}
          {loading && (
            <div className="py-8 flex flex-col items-center justify-center text-slate-500 gap-3">
              <RefreshCw className="w-6 h-6 animate-spin text-amber-500" />
              <span className="text-xs font-medium">Analizando código penal y reglamentos PNP...</span>
            </div>
          )}

          {response && !loading && (
            <div className={`p-5 rounded-xl border text-sm leading-relaxed whitespace-pre-line ${
              darkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}>
              {response}
            </div>
          )}

          {!response && !loading && (
            <div className="text-center py-6 text-slate-500 text-xs">
              Seleccione una de las consultas rápidas arriba o escriba su pregunta legal personalizada abajo.
            </div>
          )}
        </div>

        {/* Modal Footer / Input */}
        <div className={`p-4 border-t flex items-center gap-2 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAskTutor()}
            placeholder="Pregunta al tutor legal sobre artículos, doctrinas o jurisprudencia..."
            className={`flex-1 px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 ${
              darkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
            }`}
          />
          <button
            onClick={() => handleAskTutor()}
            disabled={loading}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all shadow-xs"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Consultar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
