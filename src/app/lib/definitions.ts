type TDailyInstruction = {
  id: number;
  day: number;
  title: string;
  instructions: string[] | [];
  link?: string
}

type TDayAbrreviation = '5MES' | 'PYRA' | '3S3G' | 'MXTS';

export type TGrip = 'neutral' | 'wide' | 'close' | 'pronated' | 'supinated' | string;

type TDayNumber = 1 | 2 | 3 | 4 | 5;

export type TDayComplete = {
  date?: string;
  weekNumber?: number;
  dayNumber: TDayNumber;
  dayAbbreviation: TDayAbrreviation;
  sets?: number[]
  grips?: TGrip[];
  success?: boolean;
  trainingSetReps?: number;
  trainingSetsCount?: number;
}

