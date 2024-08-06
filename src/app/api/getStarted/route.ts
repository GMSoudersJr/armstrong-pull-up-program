import dailyInstructions from '@/data/armstrong-pull-up-program-daily-instructions.json';

export async function GET() {

  return Response.json(dailyInstructions);
}
