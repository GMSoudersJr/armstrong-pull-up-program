# Code Quality Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove dead code (unused API route and duplicate `makeTransaction`), then add Playwright test coverage for the skip flow day-advancement and Escape key modal dismissal.

**Architecture:** Three independent tasks. Tasks 1 and 2 are pure deletions/simplifications. Task 3 adds new tests to existing spec files without touching app code.

**Tech Stack:** Next.js 16, TypeScript, Playwright

---

### Task 1: Delete unused `/api/program/review` route

**Problem:** `src/app/api/program/review/route.ts` exists as a GET handler that just echoes query params back as JSON. No client code anywhere in the app calls this endpoint. It is dead code.

**Files:**
- Delete: `src/app/api/program/review/route.ts`

- [ ] **Step 1: Confirm nothing imports this route**

```bash
grep -r "api/program/review" src/
```
Expected: no output (nothing calls it)

- [ ] **Step 2: Delete the file**

```bash
rm src/app/api/program/review/route.ts
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```
Expected: `✓ Compiled successfully` — the route table should no longer include `/api/program/review`

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove unused /api/program/review route

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

### Task 2: Remove duplicate `makeTransaction` from `index.ts`

**Problem:** `src/app/lib/data/indexedDB/index.ts` contains a private `makeTransaction` function (lines 16–26) that duplicates the exported one in `actions.ts`. The `index.ts` copy is only used once — in the `openRequest.onsuccess` handler to load test data (line 101). Since `db` is always set at that point, the call can be replaced with a direct `db.transaction()` call, and the local function can be deleted.

Removing it also removes the now-unused `TStoreName` import at line 1.

**Files:**
- Modify: `src/app/lib/data/indexedDB/index.ts`

- [ ] **Step 1: Read the file**

```bash
cat -n src/app/lib/data/indexedDB/index.ts
```

- [ ] **Step 2: Remove the `TStoreName` import and `makeTransaction` function**

Delete line 1: `import type { TStoreName } from "@/definitions";`

Delete lines 15–27 (the `// MAKE_TRANSACTION {{{` block):
```ts
// MAKE_TRANSACTION {{{
function makeTransaction(storeName: TStoreName, mode: IDBTransactionMode) {
  if (!db) return;

  let transaction = db.transaction(storeName, mode);

  transaction.onerror = (err) => {
    console.warn(err);
  };

  return transaction;
}
//}}}
```

- [ ] **Step 3: Replace the single `makeTransaction` call with a direct transaction**

In the `openRequest.onsuccess` handler, the test data block currently reads:
```ts
    let transaction = makeTransaction("weeksStore", "readwrite");
    if (!transaction) return;
    transaction.oncomplete = () => console.log("Finished adding data.");
```

Replace with:
```ts
    const transaction = db.transaction("weeksStore", "readwrite");
    transaction.onerror = (err) => { console.warn(err); };
    transaction.oncomplete = () => console.log("Finished adding data.");
```

`db` is guaranteed non-null here because this code runs inside `openRequest.onsuccess` after `db = openRequest.result` on the line above.

- [ ] **Step 4: Verify build**

```bash
npm run build
```
Expected: `✓ Compiled successfully`

- [ ] **Step 5: Commit**

```bash
git add src/app/lib/data/indexedDB/index.ts
git commit -m "chore: remove duplicate makeTransaction from index.ts

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

### Task 3: Add missing Playwright test coverage

**Problem:** Two behaviors have no test coverage:
1. **Skip flow day advancement** — existing tests verify that past workouts appear after skip, but do not verify the day counter actually advanced (i.e., the link now says "DAY 2" not "DAY 1")
2. **Escape key closes modals** — the new Escape key handlers in TimerModal and DailyHintModal have no tests

**Files:**
- Modify: `tests/programPage.spec.ts` — add one new test
- Modify: `tests/dayOnePage.spec.ts` — add two new tests

---

#### 3a — Skip advances to DAY 2

Add a new test at the end of `tests/programPage.spec.ts`:

```ts
test("skip advances day counter to DAY 2", async ({ page }) => {
  const programPage = new ProgramPage(page);
  await programPage.goto();
  await expect(programPage.dayLink).toBeVisible();
  await expect(programPage.dayLink).toHaveText("DAY 1");
  await expect(programPage.skipButton).toBeVisible();
  await expect(programPage.skipButton).toBeEnabled();
  await programPage.pressSkipButton();
  await expect(programPage.dayLink).toBeVisible();
  await expect(programPage.dayLink).toHaveText("DAY 2");
});
```

---

#### 3b — Escape key closes hint modal

Add a new test at the end of `tests/dayOnePage.spec.ts`. The `DayOneWorkoutPage` POM already has `dailyHintModal`, `dailyHintButton`, and `pressDailyHintButton()` available:

```ts
test("Escape key closes hint modal", async ({ page }) => {
  const dayOnePage = new DayOneWorkoutPage(page, 1);
  await dayOnePage.goto();
  await dayOnePage.pressDailyHintButton();
  await expect(dayOnePage.dailyHintModal).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dayOnePage.dailyHintModal).not.toBeVisible();
});
```

---

#### 3c — Escape key closes timer modal

Add another new test at the end of `tests/dayOnePage.spec.ts`:

```ts
test("Escape key closes timer modal", async ({ page }) => {
  const dayOnePage = new DayOneWorkoutPage(page, 1);
  await dayOnePage.goto();
  await dayOnePage.pressCompleteSetButton();
  await expect(dayOnePage.timerModal).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dayOnePage.timerModal).not.toBeVisible();
});
```

---

#### Steps for Task 3

- [ ] **Step 1: Add the skip day-advancement test to `tests/programPage.spec.ts`**

Append the test shown in 3a to the end of the file.

- [ ] **Step 2: Add the two Escape key tests to `tests/dayOnePage.spec.ts`**

Append the tests shown in 3b and 3c to the end of the file.

- [ ] **Step 3: Run the new tests in isolation to verify they pass**

```bash
npx playwright test tests/programPage.spec.ts tests/dayOnePage.spec.ts
```
Expected: all tests in those two files pass (existing + new)

- [ ] **Step 4: Run full suite**

```bash
npx playwright test
```
Expected: 66 passed (62 original + 4 new: 1 skip advancement + 2 Escape key + 1 is the `programPage.spec.ts` test that already existed but didn't check DAY 2 text)

Wait — 3 new tests total: skip DAY 2 check, Escape hint, Escape timer = 62 + 3 = 65 passed.

- [ ] **Step 5: Commit**

```bash
git add tests/programPage.spec.ts tests/dayOnePage.spec.ts
git commit -m "test: add skip day-advancement and Escape key modal tests

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```
