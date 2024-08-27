import dynamicIconImports from 'lucide-react/dynamicIconImports';

export type TFeature = {
  iconName: keyof typeof dynamicIconImports;
  heading: string;
  text: string;
}

export type TDailyInstruction = {
  id: number;
  emoji: string;
  day: number;
  title: string;
  instructions: string[] | [];
  link?: string
};

export type TStoreName = 'weeksStore' | 'workoutsStore';

export type TWeek = {
  number: number;
  lastCompletedDay: number;
  completedDays: number[];
};

type TDayAbrreviation = '5MES' | 'PYRA' | '3S3G' | 'MXTS';

export type TGrip = 'neutral' | 'wide' | 'close' | 'pronated' | 'supinated' | string;

export type TDayNumber = 1 | 2 | 3 | 4 | 5;

export type TDayComplete = {
  id?: string;
  date?: string;
  weekNumber?: number;
  dayNumber: TDayNumber;
  dayAbbreviation: TDayAbrreviation;
  sets: number[]
  grips?: TGrip[];
  success?: boolean;
  trainingSetReps?: number;
  trainingSetsCount?: number;
}

