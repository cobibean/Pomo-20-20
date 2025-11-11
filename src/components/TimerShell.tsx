import { usePomodoro2020Timer } from '../hooks/usePomodoro2020Timer';
import { PhaseTimer } from './PhaseTimer';
import { Controls } from './Controls';

export function TimerShell() {
  const timer = usePomodoro2020Timer();
  const hasStarted = timer.isRunning || timer.remainingSeconds < timer.totalSecondsForCurrentPhase || timer.cycleCount > 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
      <div className="w-full max-w-md lg:max-w-lg bg-slate-900/70 backdrop-blur-sm border border-slate-700/60 rounded-3xl shadow-2xl p-6 md:p-10 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <p className="text-sm uppercase tracking-[.25em] text-slate-400">Pomodoro × 20-20-20</p>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-50">
            20-20-20 Focus Timer
          </h1>
          <p className="text-sm text-slate-400">
            25 minutes on. 20 seconds for your eyes. 5 minutes to reset. Then repeat.
          </p>
        </div>

        {/* Timer Display */}
        <PhaseTimer
          remainingSeconds={timer.remainingSeconds}
          currentPhase={timer.currentPhase}
          progress={timer.progress}
        />

        {/* Controls */}
        <Controls
          isRunning={timer.isRunning}
          hasStarted={hasStarted}
          currentPhase={timer.currentPhase}
          cycleCount={timer.cycleCount}
          onStart={timer.start}
          onPause={timer.pause}
          onResume={timer.resume}
          onSkip={timer.skipPhase}
          onReset={timer.reset}
        />
      </div>
    </div>
  );
}

