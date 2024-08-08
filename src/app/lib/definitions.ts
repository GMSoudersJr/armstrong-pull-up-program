type TDailyInstruction = {
  id: number;
  day: number;
  title: string;
  instructions: string[] | [];
  link?: string
}

type TGrip = 'neutral' | 'wide' | 'close' | undefined;
