import { LucideIcon } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

export type TCardProps = {
  Icon: LucideIcon;
  heading: string;
  body: string[];
};

export type TFeature = {
  iconName: keyof typeof dynamicIconImports;
  heading: string;
  text: string;
};

export type TProgramOverview = {
  iconName: keyof typeof dynamicIconImports;
  heading: string;
  body: string[];
};

export type TDailyInstruction = {
  id: number;
  emoji: string;
  day: number;
  title: string;
  instructions: string[] | [];
  link?: string;
};

export type TFAQ = {
  id: number;
  Icon: LucideIcon;
  day: number;
  heading: string;
  body: string[] | [];
};

export type TStoreName = "weeksStore" | "workoutsStore";

export type TWeek = {
  number: number;
  lastCompletedDay: number;
  completedDays: number[];
};

export type TGetWorkoutById = {
  getWorkoutById: string;
};

export type TGetWorkoutsByWeekNumber = {
  getWorkoutsByWeekNumber: number;
};

export type TGetWorkoutsByDayNumber = {
  getWorkoutsByDayNumber: number;
};

export type TDataToGet = {
  getWorkoutById?: string;
  getWorkoutsByWeekNumber?: number;
  getWorkoutsByDayNumber?: number;
};

export type TDayAbbreviation = "5MES" | "PYRA" | "3S3G" | "MXTS";

export type TGrip =
  | "neutral"
  | "wide"
  | "close"
  | "pronated"
  | "supinated"
  | string;

export type TDayNumber = 1 | 2 | 3 | 4 | 5;

export type TDayComplete = {
  id?: string;
  date?: string;
  weekNumber?: number;
  dayNumber: TDayNumber;
  dayAbbreviation: TDayAbbreviation;
  sets: number[];
  grips?: TGrip[];
  success?: boolean;
  trainingSetReps?: number;
  trainingSetsCount?: number;
};
