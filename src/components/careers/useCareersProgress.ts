"use client";

import { useCallback, useSyncExternalStore } from "react";
import { phases, phaseBySlug, TOTAL_STEPS } from "@/app/careers/data";

// Anonymous, local-only progress tracking for the AI Engineering Track.
// No backend, no login — matches the site's static-hosting model. Backed by a
// tiny external store so every mounted hook (hub widget + phase module) stays in
// sync, and read through useSyncExternalStore so SSR/hydration is handled cleanly.

const STORAGE_KEY = "vantix-careers-progress-v1";

interface ProgressState {
  completedSteps: string[];
  passedQuizzes: string[];
}

const EMPTY: ProgressState = { completedSteps: [], passedQuizzes: [] };

let memoryState: ProgressState = EMPTY;
let initialized = false;
const listeners = new Set<() => void>();

function readStorage(): ProgressState {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      completedSteps: Array.isArray(parsed.completedSteps) ? parsed.completedSteps : [],
      passedQuizzes: Array.isArray(parsed.passedQuizzes) ? parsed.passedQuizzes : [],
    };
  } catch {
    return EMPTY;
  }
}

function emit() {
  listeners.forEach((fn) => fn());
}

function setState(next: ProgressState) {
  memoryState = next;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage full / disabled — keep in-memory only */
    }
  }
  emit();
}

function subscribe(onChange: () => void): () => void {
  // Lazily hydrate from localStorage the first time anyone subscribes.
  if (!initialized) {
    memoryState = readStorage();
    initialized = true;
  }
  listeners.add(onChange);

  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      memoryState = readStorage();
      emit();
    }
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

// getSnapshot must return a referentially-stable value while unchanged.
function getSnapshot(): ProgressState {
  return initialized ? memoryState : EMPTY;
}

function getServerSnapshot(): ProgressState {
  return EMPTY;
}

export function useCareersProgress() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleStep = useCallback((id: string) => {
    const has = memoryState.completedSteps.includes(id);
    setState({
      ...memoryState,
      completedSteps: has
        ? memoryState.completedSteps.filter((s) => s !== id)
        : [...memoryState.completedSteps, id],
    });
  }, []);

  const setQuizPassed = useCallback((quizId: string, passed: boolean) => {
    const has = memoryState.passedQuizzes.includes(quizId);
    if (passed === has) return;
    setState({
      ...memoryState,
      passedQuizzes: passed
        ? [...memoryState.passedQuizzes, quizId]
        : memoryState.passedQuizzes.filter((q) => q !== quizId),
    });
  }, []);

  const resetProgress = useCallback(() => setState(EMPTY), []);

  const isStepDone = useCallback((id: string) => state.completedSteps.includes(id), [state]);

  const isQuizPassed = useCallback((quizId: string) => state.passedQuizzes.includes(quizId), [state]);

  // A phase is "complete" when all its steps are checked off AND its knowledge
  // check is passed.
  const isPhaseComplete = useCallback(
    (slug: string) => {
      const phase = phaseBySlug(slug);
      if (!phase) return false;
      const stepsDone = phase.steps.every((s) => state.completedSteps.includes(s.id));
      const quizDone = phase.quiz.length === 0 || state.passedQuizzes.includes(`${slug}/quiz`);
      return stepsDone && quizDone;
    },
    [state],
  );

  const phasePercent = useCallback(
    (slug: string) => {
      const phase = phaseBySlug(slug);
      if (!phase) return 0;
      const totalUnits = phase.steps.length + (phase.quiz.length ? 1 : 0);
      if (totalUnits === 0) return 0;
      const done =
        phase.steps.filter((s) => state.completedSteps.includes(s.id)).length +
        (phase.quiz.length && state.passedQuizzes.includes(`${slug}/quiz`) ? 1 : 0);
      return Math.round((done / totalUnits) * 100);
    },
    [state],
  );

  const overallPercent = useCallback(() => {
    const totalUnits = TOTAL_STEPS + phases.filter((p) => p.quiz.length).length;
    if (totalUnits === 0) return 0;
    const stepsDone = state.completedSteps.filter((id) =>
      phases.some((p) => p.steps.some((s) => s.id === id)),
    ).length;
    const quizzesDone = phases.filter(
      (p) => p.quiz.length && state.passedQuizzes.includes(`${p.slug}/quiz`),
    ).length;
    return Math.round(((stepsDone + quizzesDone) / totalUnits) * 100);
  }, [state]);

  return {
    toggleStep,
    setQuizPassed,
    resetProgress,
    isStepDone,
    isQuizPassed,
    isPhaseComplete,
    phasePercent,
    overallPercent,
  };
}
