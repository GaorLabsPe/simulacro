import React, { useState } from 'react';
import { Shield, Moon, Sun, Volume2, VolumeX, RotateCcw, User, LogOut, Smartphone, Menu, X, BookOpen, Layers, Flame, FileText, Sparkles } from 'lucide-react';
import { AppSettings, UserSession } from '../utils/storage';

interface HeaderProps {
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  pantalla: 'portal' | 'inicio' | 'examen' | 'resultados' | 'flashcards' | 'banco';
  onGoHome: () => void;
  segundosTimer?: number;
  modoTimer?: boolean;
  userSession: UserSession | null;
  onOpenPortal: () => void;
  onLogout: () => void;
  onOpenFlashcards?: () => void;
  onOpenBanco?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  onUpdateSettings,
  pantalla,
  onGoHome,
  segundosTimer = 0,
  modoTimer = false,
  userSession,
  onOpenPortal,
  onLogout,
  onOpenFlashcards,
  onOpenBanco,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const isLowTime = segundosTimer > 0 && segundosTimer < 300; // Less than 5 mins

  return (
    <header
      id="app-header"
      className={`sticky top-0 z-40 transition-colors duration-200 border-b shadow-sm ${
        settings.darkMode
          ? 'bg-slate-900/95 text-slate-100 border-slate-800'
          : 'bg-slate-900 text-white border-amber-500/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo & Brand */}
        <div
          id="brand-logo-button"
          onClick={() => {
            setMobileMenuOpen(false);
            onGoHome();
          }}
          className="flex items-center gap-2.5 cursor-pointer group py-1"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-200 shadow-xs flex-shrink-0">
            <Shield className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm sm:text-lg tracking-tight font-serif text-amber-400">
                SIMULACRO PNP
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                PRO 2026
              </span>
            </div>
            <span className="text-[10px] sm:text-xs text-slate-400 font-medium block leading-none truncate max-w-[170px] sm:max-w-none">
              Plataforma Oficial de Ascensos & Especialidades
            </span>
          </div>
        </div>

        {/* Center: Timer if in Exam */}
        {pantalla === 'examen' && modoTimer && (
          <div
            id="exam-header-timer"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono font-semibold text-xs sm:text-sm transition-all shadow-inner ${
              isLowTime
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 animate-pulse'
                : 'bg-slate-800/80 text-amber-300 border-slate-700'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>{formatTime(segundosTimer)}</span>
          </div>
        )}

        {/* Right Actions Desktop */}
        <div className="hidden md:flex items-center gap-2 sm:gap-3">
          {/* User Session Badge / Login Portal Button */}
          {userSession ? (
            <div className="flex items-center gap-2">
              <div
                title={`${userSession.grado} - ${userSession.name}`}
                className="flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-amber-300"
              >
                <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                <span className="max-w-[140px] truncate">{userSession.name}</span>
                <span className="font-mono text-[10px] text-slate-400">({userSession.phone.slice(-4)})</span>
              </div>

              <button
                id="btn-logout-header"
                title="Cerrar Sesión / Cambiar de Usuario"
                onClick={onLogout}
                className="p-2 rounded-lg bg-slate-800 text-slate-400 border border-slate-700 hover:text-rose-400 hover:bg-slate-700 transition-all"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              id="btn-portal-header"
              onClick={onOpenPortal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs hover:bg-amber-500 hover:text-slate-950 transition-all"
            >
              <User className="w-3.5 h-3.5" />
              <span>Portal OTP</span>
            </button>
          )}

          {/* Sound Toggle */}
          <button
            id="toggle-sound-btn"
            title={settings.soundEnabled ? 'Silenciar audio' : 'Activar audio'}
            onClick={() => onUpdateSettings({ soundEnabled: !settings.soundEnabled })}
            className={`p-2 rounded-lg border transition-all ${
              settings.soundEnabled
                ? 'bg-slate-800 text-amber-400 border-slate-700 hover:bg-slate-700'
                : 'bg-slate-800/50 text-slate-500 border-slate-800 hover:text-slate-300'
            }`}
          >
            {settings.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Dark / Light Toggle */}
          <button
            id="toggle-theme-btn"
            title={settings.darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            onClick={() => onUpdateSettings({ darkMode: !settings.darkMode })}
            className="p-2 rounded-lg bg-slate-800 text-amber-400 border border-slate-700 hover:bg-slate-700 transition-all"
          >
            {settings.darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Back Home / Exit Exam Button */}
          {pantalla !== 'inicio' && pantalla !== 'portal' && (
            <button
              id="btn-regresar-inicio"
              onClick={onGoHome}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-semibold text-xs hover:bg-amber-400 transition-all shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Inicio</span>
            </button>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          {/* Quick theme toggle on mobile header */}
          <button
            onClick={() => onUpdateSettings({ darkMode: !settings.darkMode })}
            className="p-2 rounded-lg bg-slate-800 text-amber-400 border border-slate-700"
          >
            {settings.darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            id="btn-mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-800 text-amber-400 border border-slate-700 active:scale-95 transition-all"
            aria-label="Abrir menú móvil"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900/98 text-slate-100 px-4 py-5 space-y-4 shadow-2xl animate-fadeIn">
          {/* User Profile in Mobile Drawer */}
          {userSession ? (
            <div className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs border border-amber-500/30">
                  PNP
                </div>
                <div>
                  <p className="font-bold text-sm text-amber-300">{userSession.name}</p>
                  <p className="text-xs text-slate-400">{userSession.grado} • {userSession.phone}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
                className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold"
              >
                Salir
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPortal();
              }}
              className="w-full py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md"
            >
              <User className="w-4 h-4" />
              <span>Ingresar con Portal OTP</span>
            </button>
          )}

          {/* Quick Navigation Links */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onGoHome();
              }}
              className={`p-3 rounded-xl border text-left font-bold text-xs flex items-center gap-2 ${
                pantalla === 'inicio' ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-slate-800 border-slate-700 text-slate-200'
              }`}
            >
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Dashboard Principal</span>
            </button>

            {onOpenBanco && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBanco();
                }}
                className={`p-3 rounded-xl border text-left font-bold text-xs flex items-center gap-2 ${
                  pantalla === 'banco' ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-slate-800 border-slate-700 text-slate-200'
                }`}
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Banco 1,200 Preg.</span>
              </button>
            )}

            {onOpenFlashcards && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenFlashcards();
                }}
                className={`p-3 rounded-xl border text-left font-bold text-xs flex items-center gap-2 ${
                  pantalla === 'flashcards' ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-slate-800 border-slate-700 text-slate-200'
                }`}
              >
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Tarjetas Flashcards</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onUpdateSettings({ soundEnabled: !settings.soundEnabled });
              }}
              className="p-3 rounded-xl border border-slate-700 bg-slate-800 text-slate-200 font-bold text-xs flex items-center gap-2"
            >
              {settings.soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-rose-400" />}
              <span>{settings.soundEnabled ? 'Sonido Activado' : 'Sonido Silenciado'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

