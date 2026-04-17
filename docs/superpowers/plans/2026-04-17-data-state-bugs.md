# Data/State Bug Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix four data/state bugs — a shared mutable object in SkipDayButton, an in-place array mutation in PastWorkouts, a D3 DOM accumulation memory leak in all four SVG chart components, and a circular useEffect dependency in both review pages.

**Architecture:** All fixes are surgical — no new files, no new dependencies, no structural changes. Each task is a self-contained edit to a single responsibility.

**Tech Stack:** React 19, Next.js 16, TypeScript, D3 v7, IndexedDB

---

### Task 1: Fix shared mutable object in SkipDayButton

**Problem:** `skippedDayData` is declared outside the component and mutated in `handleSkip`. All renders share the same object reference, so rapid clicks or multiple mounted instances corrupt each other's data.

**Files:**
- Modify: `src/components/program/SkipDayButton.tsx:29-34, 50-58`

- [ ] **Step 1: Remove the module-level `skippedDayData` constant and build a fresh object inside `handleSkip`**

Replace lines 29–34 (the `skippedDayData` constant) and the mutation block inside `handleSkip` (lines 50–58) with:

```tsx
// DELETE these lines entirely (lines 29-34):
// const skippedDayData: TDayComplete = {
//   id: "",
//   dayAbbreviation: "SKPD",
//   dayNumber: 1,
//   sets: [0],
// };

// Inside handleSkip, replace lines 50-58 with:
    const date = new Date(Date.now()).toLocaleDateString("en-US", dateFormatOptions);
    const skippedDayData: TDayComplete = {
      id: `${currentWeekNumber}-${dayNumber}`,
      dayAbbreviation: "SKPD",
      dayNumber: dayNumber,
      date,
      weekNumber: currentWeekNumber,
      sets: [0],
    };
```

The full `handleSkip` after the change:

```tsx
  async function handleSkip() {
    const startNewWeek = await shouldStartNewWeek();
    let currentWeekNumber = await getCurrentWeekNumber();

    if (startNewWeek) {
      currentWeekNumber++;
      addNewWeek(currentWeekNumber);
    }

    const date = new Date(Date.now()).toLocaleDateString("en-US", dateFormatOptions);
    const skippedDayData: TDayComplete = {
      id: `${currentWeekNumber}-${dayNumber}`,
      dayAbbreviation: "SKPD",
      dayNumber: dayNumber,
      date,
      weekNumber: currentWeekNumber,
      sets: [0],
    };

    await addCompletedDayToWorkoutsStore(skippedDayData);
    const weekDataToUpdate = await getWeekDataForWeekNumber(currentWeekNumber);
    updateThisWeekWithWorkoutNumber(weekDataToUpdate, skippedDayData.dayNumber);
    const nextDay = skippedDayData.dayNumber + 1;
    setStateForProgramDayNumber(nextDay);
    setStateForUpdatePastWorkouts(nextDay);
  }
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```
Expected: `✓ Compiled successfully`

- [ ] **Step 3: Commit**

```bash
git add src/components/program/SkipDayButton.tsx
git commit -m "fix(skip): build skipped day payload inside handler — eliminates shared mutable object"
```

---

### Task 2: Fix in-place array mutation in PastWorkouts

**Problem:** `setWeeklyProgress(weeklyProgress.reverse())` mutates the existing array in place before passing it to `setState`. React compares references, so it may not detect the change, and the original state is corrupted.

**Files:**
- Modify: `src/components/program/PastWorkouts.tsx:32`

- [ ] **Step 1: Replace `.reverse()` with a copy + reverse**

Change line 32 from:
```tsx
    setWeeklyProgress(weeklyProgress.reverse());
```
to:
```tsx
    setWeeklyProgress([...weeklyProgress].reverse());
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```
Expected: `✓ Compiled successfully`

- [ ] **Step 3: Commit**

```bash
git add src/components/program/PastWorkouts.tsx
git commit -m "fix(past-workouts): copy array before reversing to avoid in-place state mutation"
```

---

### Task 3: Fix D3 SVG DOM accumulation (memory leak)

**Problem:** All four SVG chart components (`DayOneSVG`, `DayTwoSVG`, `DayThreeSVG`, `DayFourSVG`) call `svgElement.append(...)` inside a `useEffect` without clearing existing children first. Every time `data` changes (e.g. navigating between workouts in the review page), a new layer of DOM nodes is appended on top of the old ones, causing visual corruption and unbounded memory growth.

**Fix:** Add `svgElement.selectAll("*").remove()` immediately after `const svgElement = d3.select(ref.current)` in each component's `useEffect`.

**Files:**
- Modify: `src/components/program/dataVisualization/DayOneSVG.tsx`
- Modify: `src/components/program/dataVisualization/DayTwoSVG.tsx`
- Modify: `src/components/program/dataVisualization/DayThreeSVG.tsx`
- Modify: `src/components/program/dataVisualization/DayFourSVG.tsx`

- [ ] **Step 1: Add clear in DayOneSVG**

In `DayOneSVG.tsx`, find the `useEffect` body. After `const svgElement = d3.select(ref.current);`, add:

```tsx
      svgElement.selectAll("*").remove();
```

The block should now read:

```tsx
  useEffect((): void => {
    if (ref.current) {
      const svgElement = d3.select(ref.current);
      svgElement.selectAll("*").remove();

      svgElement.attr("height", "100%");
      // ... rest unchanged
```

- [ ] **Step 2: Add clear in DayTwoSVG**

Apply the identical change to `DayTwoSVG.tsx` — add `svgElement.selectAll("*").remove();` on the line immediately after `const svgElement = d3.select(ref.current);`.

- [ ] **Step 3: Add clear in DayThreeSVG**

Apply the identical change to `DayThreeSVG.tsx`.

- [ ] **Step 4: Add clear in DayFourSVG**

Apply the identical change to `DayFourSVG.tsx`.

- [ ] **Step 5: Verify build passes**

```bash
npm run build
```
Expected: `✓ Compiled successfully`

- [ ] **Step 6: Commit**

```bash
git add src/components/program/dataVisualization/
git commit -m "fix(charts): clear SVG children before re-rendering to prevent DOM accumulation"
```

---

### Task 4: Fix circular useEffect dependency in both review pages

**Problem:** Both review pages store `params.getData` into a `dataToGet` state variable inside a `useEffect`, but then also list `dataToGet` as a dependency. This creates a loop:

1. Effect runs → `setDataToGet(params.getData)`
2. `dataToGet` changes → effect runs again
3. But now `dataToGet === params.getData`, so the DB queries fire a second time with the right value

The result is that on first render no data is fetched (because `dataToGet` is still `""` when the conditions are checked), and the effect fires twice per navigation. The fix is to remove `dataToGet` state entirely and use `params.getData` directly in the conditions.

**Files:**
- Modify: `src/app/(app)/program/review/[getData]/[index]/page.tsx`
- Modify: `src/app/(app)/program/@modal/(.)review/[getData]/[index]/page.tsx`

- [ ] **Step 1: Rewrite the full-page review component**

Replace the full contents of `src/app/(app)/program/review/[getData]/[index]/page.tsx` with:

```tsx
"use client";

import styles from "./page.module.css";
import { useEffect, useState, use } from "react";
import { TDayComplete } from "@/definitions";
import {
  getWorkoutById,
  getWorkoutsByDayNumber,
  getWorkoutsbyWeekNumber,
} from "@/indexedDBActions";
import DataVisualization from "@/dataVisualization";
import { nunito } from "@/fonts";

const Page = (props: { params: Promise<{ getData: string; index: string }> }) => {
  const params = use(props.params);
  const initialData: TDayComplete[] = [];
  const [data, setData] = useState(initialData);
  const [heading, setHeading] = useState("");
  const [dataError, setDataError] = useState(false);

  useEffect(() => {
    if (params.getData === "workout") {
      getWorkoutById(params.index)
        .then((value) => {
          setData(value);
          setHeading(`W${value[0].weekNumber}-D${value[0].dayNumber} REVIEW`);
        })
        .catch((error) => {
          console.warn(error);
          setDataError(true);
        });
    }

    if (params.getData === "week") {
      getWorkoutsbyWeekNumber(Number.parseInt(params.index))
        .then((value) => {
          setData(value);
          setHeading(`W${params.index} REVIEW`);
        })
        .catch((error) => {
          console.warn(error);
          setDataError(true);
        });
    }

    if (params.getData === "day") {
      getWorkoutsByDayNumber(Number.parseInt(params.index))
        .then((value) => {
          setData(value);
          setHeading(`D${params.index} REVIEW`);
        })
        .catch((error) => {
          console.warn(error);
          setDataError(true);
        });
    }
  }, [params.getData, params.index]);

  return (
    <div className={styles.page}>
      {dataError ? (
        <h1>Click the link, please</h1>
      ) : (
        <>
          <h1 style={nunito.style} className={styles.heading}>
            {heading}
          </h1>
          <DataVisualization data={data} />
        </>
      )}
    </div>
  );
};

export default Page;
```

- [ ] **Step 2: Rewrite the modal review component**

Replace the full contents of `src/app/(app)/program/@modal/(.)review/[getData]/[index]/page.tsx` with:

```tsx
"use client";

import { Modal } from "@/components/program/Modal";
import { useEffect, useState, use } from "react";
import { TDayComplete } from "@/definitions";
import {
  getWorkoutById,
  getWorkoutsByDayNumber,
  getWorkoutsbyWeekNumber,
} from "@/indexedDBActions";
import DataVisualization from "@/dataVisualization";

export default function Page(
  props: {
    params: Promise<{ getData: string; index: string }>;
  }
) {
  const params = use(props.params);
  const initialData: TDayComplete[] = [];
  const [data, setData] = useState(initialData);
  const [heading, setHeading] = useState("");

  useEffect(() => {
    if (params.getData === "workout") {
      getWorkoutById(params.index)
        .then((value) => {
          setData(value);
          setHeading(`W${value[0].weekNumber}-D${value[0].dayNumber} REVIEW`);
        })
        .catch((error) => console.warn(error));
    }

    if (params.getData === "week") {
      getWorkoutsbyWeekNumber(Number.parseInt(params.index))
        .then((value) => {
          setData(value);
          setHeading(`W${params.index} REVIEW`);
        })
        .catch((error) => console.warn(error));
    }

    if (params.getData === "day") {
      getWorkoutsByDayNumber(Number.parseInt(params.index))
        .then((value) => {
          setData(value);
          setHeading(`D${params.index} REVIEW`);
        })
        .catch((error) => console.warn(error));
    }
  }, [params.getData, params.index]);

  return (
    <Modal heading={heading}>
      <DataVisualization data={data} />
    </Modal>
  );
}
```

- [ ] **Step 3: Verify build passes**

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
git add src/app/\(app\)/program/review/ src/app/\(app\)/program/@modal/
git commit -m "fix(review): remove circular dataToGet state — use params directly in useEffect"
```
