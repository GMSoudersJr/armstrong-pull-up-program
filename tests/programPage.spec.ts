import { ProgramPage } from "./pom/program-page";
import { test, expect } from "@playwright/test";

test("program page should have correct elements", async ({ page }) => {
  const programPage = new ProgramPage(page);
  await programPage.goto();
  await expect(programPage.homeLink).toBeVisible();
  await expect(programPage.getStartedHeader).toBeVisible();
  await expect(programPage.dayLink).toBeVisible();
});
