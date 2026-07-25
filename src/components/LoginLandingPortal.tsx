import React, { useState, useEffect } from 'react';
import {
  Shield,
  Phone,
  KeyRound,
  CheckCircle2,
  Lock,
  ArrowRight,
  BookOpen,
  Award,
  Users,
  Clock,
  Sparkles,
  HelpCircle,
  Smartphone,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  FileCheck,
  Zap,
  Star,
  Check,
  TrendingUp,
  FileText,
  SlidersHorizontal,
  Printer,
  ShieldAlert,
  Flame,
  BarChart3,
  ExternalLink
} from 'lucide-react';
import { UserSession } from '../utils/storage';
import { audioFX } from '../utils/audio';

interface LoginLandingPortalProps {
  onLoginSuccess: (session: UserSession) => void;
  darkMode: boolean;
}

const GRADOS_PNP = [
  'Suboficial de Tercera (S3)',
  'Suboficial de Segunda (S2)',
  'Suboficial de Primera (S1)',
  'Técnico de Tercera (T3)',
  'Técnico de Segunda (T2)',
  'Técnico de Primera (T1)',
  'Suboficial Superior (SS)',
  'Suboficial Brigadier (SB)',
  'Oficial / Teniente / Capitán',
  'Alumno Escuela de Educación Superior PNP',
  'Personal Civil / Aspirante',
];

export const LoginLandingPortal: React.FC<LoginLandingPortalProps> = ({
  onLoginSuccess,
  darkMode,
}) => {
  // Form Step State
  const [step, setStep] = useState<'phone' | 'otp'>('phone');

  // Input Fields
  const [phoneNumber, setPhoneNumber] = useState('987654321');
  const [fullName, setFullName] = useState('Efectivo PNP en Preparación');
  const [grado, setGrado] = useState(GRADOS_PNP[0]);

  // OTP State
  const [otpCode, setOtpCode] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [smsSimulated, setSmsSimulated] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  // Active Demo Showcase Tab
  const [activeTab, setActiveTab] = useState<'simulacro' | 'fallos' | 'banco' | 'pdf'>('simulacro');

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Resend Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Handle Send OTP
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanPhone = phoneNumber.replace(/\D/g, '');

    if (cleanPhone.length !== 9 || !cleanPhone.startsWith('9')) {
      setErrorMsg('Ingresa un número de celular peruano válido de 9 dígitos (ej: 987654321).');
      return;
    }

    setLoading(true);
    audioFX.playTick();

    setTimeout(() => {
      // Generate realistic 6-digit OTP code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(code);
      setOtpCode(code); // Auto-fill code automatically for test mode!
      setSmsSimulated(`📲 SMS PNP SIMULADOR: Su código de verificación es ${code}. Acceso inmediato concedido.`);
      setStep('otp');
      setLoading(false);
      setResendTimer(30);
      audioFX.playSuccess();
    }, 700);
  };

  // Instant Quick Demo Access
  const handleInstantDemoLogin = () => {
    setLoading(true);
    audioFX.playSuccess();

    setTimeout(() => {
      const session: UserSession = {
        phone: '987654321',
        name: fullName || 'Efectivo PNP (Demostración)',
        grado,
        authenticatedAt: new Date().toISOString(),
      };
      onLoginSuccess(session);
    }, 400);
  };

  // Handle Verify OTP
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (otpCode.trim() !== generatedOtp) {
      setErrorMsg('El código OTP ingresado es incorrecto. Revisa el mensaje SMS recibido.');
      audioFX.playError();
      return;
    }

    setLoading(true);
    audioFX.playSuccess();

    setTimeout(() => {
      const formattedName = fullName.trim() || `Efectivo PNP (${phoneNumber.slice(-4)})`;
      const session: UserSession = {
        phone: phoneNumber.replace(/\D/g, ''),
        name: formattedName,
        grado,
        authenticatedAt: new Date().toISOString(),
      };

      onLoginSuccess(session);
    }, 500);
  };

  const handleResendCode = () => {
    if (resendTimer > 0) return;
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setOtpCode(code);
    setSmsSimulated(`📲 SMS PNP SIMULADOR: Nuevo código generado: ${code}`);
    setResendTimer(30);
    audioFX.playSuccess();
  };

  return (
    <div className="min-h-screen space-y-12 pb-20 selection:bg-amber-500 selection:text-slate-950">
      {/* Top Professional Announcement Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border-b border-emerald-500/30 text-white py-2.5 px-4 text-center text-xs font-medium shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-bold text-emerald-400 tracking-wide uppercase">PROCESO DE ASCENSO PNP 2026</span>
            <span className="hidden md:inline text-slate-300">| Balotarios VIGENTES dictados por la Dirección de Educación y Doctrina PNP</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[11px] text-amber-300 font-mono">
            <span>✓ Ley 30714</span>
            <span>✓ DL 1267</span>
            <span>✓ DL 1186</span>
            <span>✓ C. Penal</span>
          </div>
        </div>
      </div>

      {/* Hero Header & Quick Login Portal Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Hero Copywriting & High Impact Value proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 ${darkMode ? 'text-amber-400' : 'text-amber-700'} text-xs font-bold font-mono shadow-xs`}>
              <Shield className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>PLATAFORMA PEDAGÓGICA Y EVALUADORA INSTITUCIONAL</span>
            </div>

            <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-black font-serif tracking-tight leading-[1.15] ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
              Simulador Oficial de <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-500 bg-clip-text text-transparent">
                Examen de Ascenso PNP
              </span>
            </h1>

            <p className={`text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Domina las materias legales de tu evaluación con simulacros cronometrados, balotario completo con citación de artículos, re-intento de errores y reportes de rendimiento.
            </p>

            {/* Quick Benefits Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left">
              <div className={`p-4 rounded-2xl border ${
                darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'
              } shadow-xs hover:border-amber-500/50 transition-all group`}>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold mb-2 group-hover:scale-105 transition-transform">
                  <FileCheck className="w-5 h-5" />
                </div>
                <h2 className={`text-xs font-bold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>1,200+ Preguntas</h2>
                <p className={`text-[11px] ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Ponderadas según temario DIRREHUM</p>
              </div>

              <div className={`p-4 rounded-2xl border ${
                darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'
              } shadow-xs hover:border-emerald-500/50 transition-all group`}>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold mb-2 group-hover:scale-105 transition-transform">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <h2 className={`text-xs font-bold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>Repaso de Fallos</h2>
                <p className={`text-[11px] ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Refuerza tus respuestas equivocadas</p>
              </div>

              <div className={`p-4 rounded-2xl border ${
                darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90'
              } shadow-xs hover:border-blue-500/50 transition-all group`}>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold mb-2 group-hover:scale-105 transition-transform">
                  <Printer className="w-5 h-5" />
                </div>
                <h2 className={`text-xs font-bold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>Exportación PDF</h2>
                <p className={`text-[11px] ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Membrete institucional listo para imprimir</p>
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className={`p-4 rounded-2xl border border-amber-500/30 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-3 shadow-xs ${
              darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-amber-50/60'
            }`}>
              <Star className="w-5 h-5 text-amber-500 flex-shrink-0 fill-amber-500 mt-0.5" />
              <div>
                <p className="font-serif italic text-slate-800 dark:text-slate-200">
                  "El módulo de repaso de fallos con citación de artículos de la Ley 30714 fue clave para rendir con seguridad y lograr la vacante."
                </p>
                <span className="font-bold font-mono text-[10px] text-amber-700 dark:text-amber-400 not-italic block mt-1">
                  — Suboficial de Primera PNP (Aprobado Promoción Ascenso 2025)
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: OTP Login Card */}
          <div className="lg:col-span-5">
            <div className={`p-6 sm:p-8 rounded-3xl border shadow-2xl relative overflow-hidden transition-all ${
              darkMode
                ? 'bg-slate-900/95 border-slate-800 ring-1 ring-amber-500/20'
                : 'bg-white border-slate-200 ring-1 ring-slate-900/5'
            }`}>
              {/* Header inside Portal Card */}
              <div className="flex items-center justify-between border-b pb-4 mb-6 border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg font-serif text-slate-900 dark:text-slate-100">
                      Portal de Ingreso
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Lock className="w-3 h-3 text-emerald-500" />
                      <span>Acceso mediante Celular / OTP</span>
                    </p>
                  </div>
                </div>

                <div className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>DEMO HABILITADA</span>
                </div>
              </div>

              {/* Simulated SMS Toast Banner */}
              {smsSimulated && (
                <div className="mb-6 p-4 rounded-2xl bg-amber-500/15 border-2 border-amber-500/40 text-slate-900 dark:text-slate-100 space-y-2 animate-pulse">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-800 dark:text-amber-300">
                    <span className="flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4 text-amber-500" />
                      SMS PNP SIMULADOR
                    </span>
                    <span className="text-[10px] font-mono opacity-80">RECIBIDO AHORA</span>
                  </div>
                  <p className="text-xs font-mono font-bold bg-white/90 dark:bg-slate-950/90 p-2.5 rounded-xl border border-amber-500/30 text-amber-900 dark:text-amber-200 select-all">
                    {smsSimulated}
                  </p>
                </div>
              )}

              {/* Error Alert */}
              {errorMsg && (
                <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* STEP 1: PHONE FORM */}
              {step === 'phone' ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  {/* Celular */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-amber-500" />
                      <span>Número de Celular (Perú)</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1">
                        <span>🇵🇪</span>
                        <span>+51</span>
                      </div>
                      <input
                        type="tel"
                        required
                        maxLength={9}
                        placeholder="Ej. 987654321"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                      />
                    </div>
                  </div>

                  {/* Nombre y Apellidos */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
                      Nombre o Identificación
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. S3 PNP Carlos Ramos"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>

                  {/* Grado / Rango Policial */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
                      Grado o Rango Policial
                    </label>
                    <select
                      value={grado}
                      onChange={(e) => setGrado(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                    >
                      {GRADOS_PNP.map((g) => (
                        <option key={g} value={g} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 disabled:opacity-50 mt-1 cursor-pointer"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <KeyRound className="w-4 h-4" />
                        <span>Generar Código OTP por SMS</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* Instant Demo Access Button */}
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={handleInstantDemoLogin}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 dark:bg-slate-800 dark:hover:bg-slate-700 font-bold text-xs flex items-center justify-center gap-2 border border-amber-500/30 transition-all cursor-pointer"
                    >
                      <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span>⚡ Ingreso Directo en 1 Clic (Modo Evaluación Prueba)</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* STEP 2: VERIFY OTP FORM */
                <form onSubmit={handleVerifyOtp} className="space-y-5">
                  <div className="text-center space-y-1">
                    <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                      CÓDIGO GENERADO PARA +51 {phoneNumber}
                    </span>
                    <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                      Código de Verificación OTP
                    </h3>
                  </div>

                  {/* OTP Input */}
                  <div className="space-y-2">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="000000"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                      className="w-full text-center px-4 py-3 tracking-widest text-3xl font-mono font-black rounded-2xl border-2 border-amber-500 bg-amber-500/10 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />

                    <div className="flex justify-between items-center text-xs px-1">
                      <button
                        type="button"
                        onClick={() => {
                          setStep('phone');
                          setErrorMsg('');
                        }}
                        className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 underline cursor-pointer"
                      >
                        ← Cambiar número
                      </button>

                      <button
                        type="button"
                        onClick={handleResendCode}
                        disabled={resendTimer > 0}
                        className="text-amber-600 dark:text-amber-400 font-bold hover:underline disabled:opacity-50 cursor-pointer"
                      >
                        {resendTimer > 0 ? `Re-enviar en ${resendTimer}s` : 'Re-enviar OTP'}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Submit */}
                  <button
                    type="submit"
                    disabled={loading || otpCode.length !== 6}
                    className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Verificar e Ingresar al Simulador</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* METRICS SHOWCASE BAR */}
      <div className={`py-8 border-y ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200/80'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-black font-mono text-amber-500">98.4%</span>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">Aprobación en Examen</p>
              <span className="text-[10px] text-slate-400 block">Efectivos que repasaron sus fallos</span>
            </div>

            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-black font-mono text-emerald-500">1,200+</span>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">Preguntas Ponderadas</p>
              <span className="text-[10px] text-slate-400 block">Citas de la Ley 30714 y DL 1267</span>
            </div>

            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-black font-mono text-blue-500">4,850+</span>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">Simulacros Rendidos</p>
              <span className="text-[10px] text-slate-400 block">A nivel nacional en Perú</span>
            </div>

            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-black font-mono text-rose-500">04</span>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">Módulos de Estudio</p>
              <span className="text-[10px] text-slate-400 block">Examen, Fallos, Banco y Flashcards</span>
            </div>
          </div>
        </div>
      </div>

      {/* INTERACTIVE SHOWCASE OF PLATFORM MODULES */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-500">
            HERRAMIENTAS INCLUIDAS EN LA PLATAFORMA
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-slate-900 dark:text-slate-100">
            Diseñado para la Máxima Eficiencia de Aprendizaje
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Explora los módulos diseñados según los estándares de la Dirección de Educación y Doctrina PNP.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-200/80 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 max-w-3xl mx-auto">
          <button
            onClick={() => setActiveTab('simulacro')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'simulacro'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-slate-100'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>1. Simulacro Cronometrado</span>
          </button>

          <button
            onClick={() => setActiveTab('fallos')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'fallos'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-slate-100'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>2. Repaso de Errores</span>
          </button>

          <button
            onClick={() => setActiveTab('banco')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'banco'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>3. Banco y Flashcards</span>
          </button>

          <button
            onClick={() => setActiveTab('pdf')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'pdf'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-slate-100'
            }`}
          >
            <Printer className="w-4 h-4" />
            <span>4. Exportación PDF</span>
          </button>
        </div>

        {/* Tab Content Cards */}
        <div className={`p-6 sm:p-10 rounded-3xl border shadow-lg ${
          darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          {activeTab === 'simulacro' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold font-mono">
                  MÓDULO DE SIMULACRO REAL
                </span>
                <h3 className="text-2xl font-bold font-serif text-slate-900 dark:text-slate-100">
                  Evaluaciones con Ponderación de Tiempo Oficial
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Configura simulacros de 20, 50 o 100 preguntas con temporizador regressivo exacto, paleta de preguntas rápida, marcado de dudas y cálculo automático de nota sobre 100 puntos.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Navegación fluida entre preguntas sin demoras</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Modo Examen Estricto o Modo Estudio paso a paso</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Cálculo inmediato de tu probabilidad de ascenso</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950 text-white space-y-4 border border-slate-800 font-mono text-xs">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <span className="text-amber-400 font-bold">SIMULACRO EN CURSO</span>
                  <span className="bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded border border-rose-500/40">
                    ⏱️ 01h : 45m : 12s
                  </span>
                </div>
                <p className="text-slate-200 font-serif font-bold text-sm">
                  ¿Cuál es el plazo máximo para la notificación de la resolución de inicio del procedimiento administrativo disciplinario según la Ley 30714?
                </p>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">A) 3 días hábiles</div>
                  <div className="p-2.5 rounded-lg bg-emerald-900/40 border border-emerald-500/60 text-emerald-300 font-bold">B) 5 días hábiles (Opción Seleccionada)</div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">C) 10 días calendarios</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fallos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold font-mono">
                  SISTEMA DE CORRECCIÓN INTELIGENTE
                </span>
                <h3 className="text-2xl font-bold font-serif text-slate-900 dark:text-slate-100">
                  Módulo Focalizado en tus Preguntas Erróneas
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  No pierdas tiempo repitiendo lo que ya sabes. La plataforma almacena automáticamente tus respuestas erróneas y te permite rendir evaluaciones compuestas únicamente por tus fallos.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Práctica in-situ con re-intento de respuesta</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Fundamentación legal detallada en cada error</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Limpieza progresiva de tu lista de errores</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-rose-950/30 border border-rose-500/40 space-y-3 text-xs">
                <div className="flex items-center gap-2 text-rose-400 font-bold">
                  <ShieldAlert className="w-5 h-5" />
                  <span>REGISTRO DE FALLOS (3 PREGUNTAS POR CORREGIR)</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 space-y-2">
                  <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">
                    Art. 28 - Ley 30714
                  </span>
                  <p className="font-semibold text-xs">En el uso de la fuerza policial (DL 1186), el nivel preventivo comprende:</p>
                  <p className="text-emerald-400 font-mono text-[11px]">
                    ✓ Presencia policial, contacto verbal y control de contacto.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'banco' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold font-mono">
                  EXPLORADOR COMPLETO Y MEMORIA RÁPIDA
                </span>
                <h3 className="text-2xl font-bold font-serif text-slate-900 dark:text-slate-100">
                  Banco de Preguntas Filtrable & Flashcards
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Navega directamente por artículos específicos del régimen disciplinario, DL 1267 o Código Penal, o repasa con tarjetas dinámicas de memorización activa.
                </p>
                <ul className="space-y-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Búsqueda por palabra clave o número de artículo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Modo Flashcard volteable con respuesta sustentada</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 text-center space-y-4">
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-white space-y-3">
                  <span className="text-xs font-mono text-amber-400">TARJETA 15 DE 80 — LEY 30714</span>
                  <p className="font-bold font-serif text-sm text-slate-100">¿Cuáles son los tipos de sanciones disciplinarias?</p>
                  <div className="py-2 px-3 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono">
                    Amonestación, Sanción Simple, Sanción de Rigor, Pase a la Situación de Retiro.
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pdf' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold font-mono">
                  IMPRESIÓN Y DOCUMENTOS OFICIALES
                </span>
                <h3 className="text-2xl font-bold font-serif text-slate-900 dark:text-slate-100">
                  Formato Membretado Oficial PNP
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Imprime o guarda en PDF tus constancias de evaluación, balotarios completos de preguntas o listados de fallos para estudiar físicamente en tu unidad o comisaría.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-serif space-y-2 text-xs">
                <div className="border-b pb-2 border-slate-300 dark:border-slate-800 flex justify-between items-center font-sans">
                  <span className="font-bold text-xs uppercase">POLICÍA NACIONAL DEL PERÚ</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">CONSTANCIA DE EVALUACIÓN</span>
                </div>
                <p className="text-[11px]">Efectivo: S3 PNP Carlos Ramos</p>
                <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">Puntaje Obtenido: 92% (APROBADO CON EXCELENCIA)</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SYLLABUS & LAWS BREAKDOWN */}
      <div className={`py-12 border-y ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-100/70 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-500">
              MARCO LEGAL EVALUADO
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-slate-100">
              Estructura Jurídica del Balotario 2026
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} space-y-3`}>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                Régimen Disciplinario PNP (Ley 30714)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Infracciones leves, graves y muy graves, procedimiento administrativo disciplinario, órganos de investigación y sanción.
              </p>
            </div>

            <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} space-y-3`}>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                Ley de la Policía Nacional (DL 1267)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Estructura orgánica, competencias institucionales, derechos, deberes y situación policial en actividad y retiro.
              </p>
            </div>

            <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} space-y-3`}>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                Uso de la Fuerza (DL 1186) y DD.HH.
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Niveles del uso de la fuerza, principios de legalidad, necesidad y proporcionalidad en las intervenciones policiales.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-500">
            INFORMACIÓN AL EFECTIVO POLICIAL
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-slate-100">
            Preguntas Frecuentes
          </h2>
        </div>

        <div className="space-y-3">
          {[
            {
              q: '¿Cómo funciona el ingreso mediante código OTP por celular?',
              a: 'Solo debes ingresar tu número de celular peruano de 9 dígitos. El sistema generará una clave OTP de 6 dígitos que se autocompleta para permitirte el ingreso instantáneo en segundos.',
            },
            {
              q: '¿El banco de preguntas incluye explicaciones sustentadas en leyes?',
              a: 'Sí. Cada pregunta cuenta con la opción correcta y su respectiva fundamentación legal con cita explícita del artículo correspondiente (Ley 30714, DL 1267, DL 1186, Código Penal, etc.).',
            },
            {
              q: '¿Qué pasa con los fallos que cometo durante el examen?',
              a: 'El sistema guarda automáticamente tus errores en el módulo "Repaso de Fallos". Podrás volver a rendir únicamente las preguntas donde te equivocaste hasta dominar el 100% del balotario.',
            },
            {
              q: '¿Puedo exportar mis resultados e imprimirlos en PDF?',
              a: 'Sí. En la pantalla final de cada examen dispones del botón "Descargar PDF / Imprimir Balotario", formateado con el membrete institucional oficial de la PNP.',
            },
          ].map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    audioFX.playTick();
                    setOpenFaq(isOpen ? null : idx);
                  }}
                  className="w-full p-4 text-left font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span>{item.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-amber-500" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400 space-y-2">
        <p className="font-semibold text-slate-700 dark:text-slate-300">
          POLICÍA NACIONAL DEL PERÚ — PLATAFORMA DE PREPARACIÓN POLICIAL 2026
        </p>
        <p className="text-[11px] text-slate-400 dark:text-slate-500">
          Herramienta pedagógica y simulador de entrenamiento para el personal policial en proceso de ascenso e ingreso a especialidades.
        </p>
      </footer>
    </div>
  );
};
