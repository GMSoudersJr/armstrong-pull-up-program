import type { TDailyInstruction } from "./definitions";
import dailyInstructions from "./data/armstrong-pull-up-program-daily-instructions.json";

export async function getAllDailyInstructions(): Promise<TDailyInstruction[]> {
  return dailyInstructions as TDailyInstruction[];
}

export const isSingular = (count: number): boolean => {
  return count === 1;
};
