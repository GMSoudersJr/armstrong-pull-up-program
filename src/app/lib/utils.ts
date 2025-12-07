import type { TDailyInstruction } from "./definitions";

export async function getAllDailyInstructions(): Promise<TDailyInstruction[]> {
  const response = await fetch("http://localhost:3000/api/getStarted");
  if (!response.ok) {
    throw new Error("Failed to fetch the daily instructions");
  }

  const data = await response.json();

  return data;
}

export const isSingular = (count: number): boolean => {
  return count === 1;
};

export const isSafari = () => {
  const ua = navigator.userAgent;
  return /^((?!chrome|android).)*safari/i.test(ua);
};

export const isChrome = () => {
  const ua = navigator.userAgent;
  return /chrome/i.test(ua) && !isSafari();
};
