export async function getAllDailyInstructions(): Promise<TDailyInstruction[]>  {

  const response = await fetch('http://localhost:3000/api/getStarted');
  if (!response.ok) {
    throw new Error("Failed to fetch the daily instructions");
  }

  const data = await response.json();

  return data;
}
