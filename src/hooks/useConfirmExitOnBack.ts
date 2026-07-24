"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export function useConfirmExitOnBack(hasProgress: boolean) {
  const router = useRouter();
  const guardedRef = useRef(false);
  const [showExitModal, setShowExitModal] = useState(false);

  useEffect(() => {
    if (hasProgress && !guardedRef.current) {
      guardedRef.current = true;
      window.history.pushState({ workoutExitGuard: true }, "");
    }
    if (!hasProgress && guardedRef.current) {
      guardedRef.current = false;
      setShowExitModal(false);
    }
  }, [hasProgress]);

  useEffect(() => {
    // If a review modal (src/components/program/Modal.tsx) is ever opened from
    // inside an active workout, its Escape/close handler calls router.back(),
    // which this listener would intercept and misreport as a workout-exit
    // attempt. No current code path mounts both at once, so this is safe today.
    function handlePopState() {
      if (!guardedRef.current) return;
      window.history.pushState({ workoutExitGuard: true }, "");
      setShowExitModal(true);
    }
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const cancelExit = useCallback(() => setShowExitModal(false), []);

  const confirmExit = useCallback(() => {
    guardedRef.current = false;
    setShowExitModal(false);
    router.replace("/program");
  }, [router]);

  return { showExitModal, cancelExit, confirmExit };
}
