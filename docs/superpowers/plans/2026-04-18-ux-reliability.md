# UX / Reliability Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix three UX/reliability issues — a timer audio ordering bug, missing modal accessibility attributes and keyboard support, and a missing saving state in the workout save flow.

**Architecture:** All changes are scoped to existing components. No new files. No new dependencies. Modal accessibility is additive (attributes + a single useEffect per modal). The saving state in DayComplete adds one boolean to existing state and fixes a prop mutation.

**Tech Stack:** React 19, Next.js 16, TypeScript

---

### Task 1: Fix timer audio in TimerModal

**Problem:** In `TimerModal.tsx`, `beep.volume = 0.1` is set *after* `beep.play()` is called. The browser may not apply the volume before playback starts. Additionally, `beep.play()` returns a Promise that is silently dropped — if the browser blocks autoplay, the error is invisible.

**Files:**
- Modify: `src/components/program/TimerModal.tsx:20-27`

- [ ] **Step 1: Read the file**

```bash
cat -n src/components/program/TimerModal.tsx
```

- [ ] **Step 2: Fix the audio block**

Replace lines 21–26 (the `if (secondsLeft === 0)` block) with:

```tsx
  useEffect(() => {
    if (secondsLeft === 0) {
      const beep = new Audio("/audio/timer-beep.mp3");
      beep.volume = 0.1;
      beep.play().catch(() => {});
      setStateForShowTimerModal(false);
      return;
    }

    const intervalId = setInterval(() => {
      setSecondsLeft((secondsLeft) => secondsLeft - 1);
    }, 1_000);

    return () => {
      clearInterval(intervalId);
    };
  }, [secondsLeft, setStateForShowTimerModal]);
```

Key changes:
- `beep.volume = 0.1` moved **before** `beep.play()`
- `.catch(() => {})` added to silence autoplay-blocked errors without crashing

- [ ] **Step 3: Verify build**

```bash
npm run build
```
Expected: `✓ Compiled successfully`

- [ ] **Step 4: Commit**

```bash
git add src/components/program/TimerModal.tsx
git commit -m "fix(timer): set audio volume before play — silence autoplay errors

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

### Task 2: Add accessibility to all three modals

**Problem:** All three modals lack `role="dialog"` and `aria-modal="true"`. Icon-only close buttons lack `aria-label`. None respond to the Escape key.

The three modals:
- `TimerModal.tsx` — root `<div id="timer-modal">`, close button has a visibly-hidden span but no `aria-label` on the button itself
- `DailyHintModal.tsx` — root `<div id="daily-hint-modal">`, close button is icon-only with no screen-reader text at all
- `Modal.tsx` (review modal) — root `<div id="modal">`, close button has `title="Close modal"` but no `aria-label`

**Files:**
- Modify: `src/components/program/TimerModal.tsx`
- Modify: `src/components/program/DailyHintModal.tsx`
- Modify: `src/components/program/Modal.tsx`

- [ ] **Step 1: Fix TimerModal**

Read the file first. Then apply these changes:

1. Add `role="dialog"` and `aria-modal="true"` to the root div (line ~39):
```tsx
    <div
      id="timer-modal"
      className={styles.modal}
      role="dialog"
      aria-modal="true"
      aria-label="Recovery timer"
    >
```

2. Add `aria-label` to the close button (line ~48):
```tsx
        <button
          id="timer-modal-close-button"
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close timer"
        >
```

3. Add Escape key handler. Add a new `useEffect` **before** the existing timer `useEffect`:
```tsx
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose(e as unknown as React.MouseEvent<HTMLButtonElement>);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);
```

- [ ] **Step 2: Fix DailyHintModal**

Read the file first. Then apply these changes:

1. Add `role="dialog"` and `aria-modal="true"` to the root div (line ~18):
```tsx
    <div
      id="daily-hint-modal"
      className={styles.modal}
      role="dialog"
      aria-modal="true"
      aria-label="Daily hint"
    >
```

2. Add `aria-label` and screen-reader text to the close button (line ~54):
```tsx
        <button
          id="daily-hint-modal-close-button"
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close hint"
        >
          <XIcon className={styles.icon} />
        </button>
```

3. Add Escape key handler. `DailyHintModal` is a function component that receives `onClose`. Add this `useEffect` before the return:
```tsx
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose(e as unknown as React.MouseEvent<HTMLButtonElement>);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);
```

Note: `DailyHintModal` currently has no hooks so you will need to add the `useEffect` import. Change the top import line from nothing to:
```tsx
import { useEffect } from "react";
```

- [ ] **Step 3: Fix Modal (review modal)**

Read the file first. Then apply these changes:

1. Add `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` to the root div (line ~21):
```tsx
    <div id="modal" className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="modal-heading">
```

2. Add `id="modal-heading"` to the `<h2>` so `aria-labelledby` can reference it (line ~26):
```tsx
        <h2 id="modal-heading" style={nunito.style}>
```

3. Add `aria-label` to the close button (line ~29):
```tsx
          <button
            id="data-visualization-modal-close-button"
            title="Close modal"
            aria-label="Close modal"
            type="button"
            className={styles.closeButton}
            onClick={handleClick}
          >
```

4. Add Escape key handler inside the component. `Modal.tsx` already uses `useRouter` — add a `useEffect` after `handleClick`:
```tsx
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") handleClick();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
```

Note: `Modal.tsx` currently has no `useEffect` import. Update the React import:
```tsx
import { useEffect } from "react";
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```
Expected: `✓ Compiled successfully`

- [ ] **Step 5: Commit**

```bash
git add src/components/program/TimerModal.tsx src/components/program/DailyHintModal.tsx src/components/program/Modal.tsx
git commit -m "fix(a11y): add role=dialog, aria-modal, aria-label, and Escape key to all modals

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

### Task 3: Add saving state to DayComplete — and fix prop mutation

**Problems:**

1. `handleSave` is async but the save button shows no loading state. Rapid clicks can fire multiple saves.
2. `handleSave` mutates the `dayData` prop directly (`dayData.date = ...`, `dayData.weekNumber = ...`, `dayData.id = ...`). Props must not be mutated — this corrupts the parent's data.
3. If `addCompletedDayToWorkoutsStore` rejects, the error is silently swallowed and `setStateForSavedDay` is never called.

**Files:**
- Modify: `src/components/program/DayComplete.tsx`

- [ ] **Step 1: Read the file**

```bash
cat -n src/components/program/DayComplete.tsx
```

- [ ] **Step 2: Rewrite the component**

Replace the entire file with:

```tsx
"use client";

import { Dispatch, SetStateAction, useState } from "react";
import styles from "./DayComplete.module.css";
import type { TDayComplete } from "@/app/lib/definitions";
import {
  getCurrentWeekNumber,
  addCompletedDayToWorkoutsStore,
  shouldStartNewWeek,
  addNewWeek,
  updateThisWeekWithWorkoutNumber,
  getWeekDataForWeekNumber,
} from "@/indexedDBActions";
import TotalReps from "./TotalReps";
import { nunito } from "@/fonts";
import { CircleCheckBigIcon, SaveIcon, ThumbsUpIcon } from "lucide-react";
import Link from "next/link";
import {
  DAY_COMPLETE_MESSAGES,
  THUMBS_UP_ICON_MESSAGE,
  CIRCLE_CHECK_BIG_ICON_MESSAGE,
} from "@/lib/strings/dayComplete";

interface DayCompleteProps {
  dayData: TDayComplete;
  setStateForSavedDay: Dispatch<SetStateAction<boolean>>;
}

const dateFormatOptions: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const DayComplete = ({ dayData, setStateForSavedDay }: DayCompleteProps) => {
  const [isDataSaved, setIsDataSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);

  async function handleSave() {
    if (isSaving || isDataSaved) return;
    setIsSaving(true);
    setSaveError(false);

    try {
      const startNewWeek = await shouldStartNewWeek();
      let currentWeekNumber = await getCurrentWeekNumber();

      if (startNewWeek) {
        currentWeekNumber++;
        addNewWeek(currentWeekNumber);
      }

      const payload: TDayComplete = {
        ...dayData,
        date: new Date(Date.now()).toLocaleDateString("en-US", dateFormatOptions),
        weekNumber: currentWeekNumber,
        id: `${currentWeekNumber}-${dayData.dayNumber}`,
      };

      const dataSavedInIndexedDB = await addCompletedDayToWorkoutsStore(payload);
      const weekDataToUpdate = await getWeekDataForWeekNumber(currentWeekNumber);
      updateThisWeekWithWorkoutNumber(weekDataToUpdate, payload.dayNumber);
      setIsDataSaved(dataSavedInIndexedDB);
      setStateForSavedDay(true);
    } catch {
      setSaveError(true);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div id="day-complete-container" className={styles.dayCompleteContainer}>
      <div id="thumbs-up-icon-wrapper" className={styles.thumbsUpIconWrapper}>
        <ThumbsUpIcon className={`${styles.icon} ${styles.thumbsUpIcon}`} />
        <span className="visibly-hidden">{THUMBS_UP_ICON_MESSAGE}</span>
      </div>
      <div className={styles.totalReps}>
        <TotalReps sets={dayData.sets} />
      </div>
      <h3 className={styles.message} style={nunito.style}>
        {saveError
          ? "Save failed — please try again"
          : isDataSaved
            ? DAY_COMPLETE_MESSAGES[0]
            : DAY_COMPLETE_MESSAGES[1]}
      </h3>
      <div className={styles.takeAction} style={nunito.style}>
        {isDataSaved ? (
          <Link href={"/program"}>
            <div className={styles.checkIconWrapper}>
              <CircleCheckBigIcon
                className={`${styles.icon} ${styles.circleCheckBigIcon}`}
              />
              <span className="visibly-hidden">
                {CIRCLE_CHECK_BIG_ICON_MESSAGE}
              </span>
            </div>
          </Link>
        ) : (
          <button
            id="save-icon-button"
            title={isSaving ? "Saving…" : "Save your workout"}
            type="button"
            className={styles.saveButton}
            onClick={handleSave}
            disabled={isSaving}
          >
            <SaveIcon className={`${styles.icon} ${styles.saveIcon}`} />
          </button>
        )}
      </div>
    </div>
  );
};

export default DayComplete;
```

Key changes:
- `isSaving` state disables the button and prevents double-saves
- `saveError` state shows a friendly message if the DB write fails
- `dayData` is no longer mutated — a fresh `payload` object is spread from it
- `try/catch/finally` wraps the async flow

- [ ] **Step 3: Verify build**

```bash
npm run build
```
Expected: `✓ Compiled successfully`

- [ ] **Step 4: Run Playwright tests**

```bash
npx playwright test
```
Expected: 62 passed

- [ ] **Step 5: Commit**

```bash
git add src/components/program/DayComplete.tsx
git commit -m "fix(save): add saving state, prevent double-save, fix prop mutation, show save error

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```
