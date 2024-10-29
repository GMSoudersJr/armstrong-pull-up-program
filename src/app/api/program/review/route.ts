import { type NextRequest } from "next/server";

export function GET(request: NextRequest) {
  console.log("hello");
  const searchParams = request.nextUrl.searchParams;
  const workoutId = searchParams.get("id");
  const dayNumber = searchParams.get("dayNumber");
  const weekNumber = searchParams.get("weekNumber");

  if (workoutId) return Response.json({ workoutId });
  if (dayNumber) return Response.json({ dayNumber });
  if (weekNumber) return Response.json({ weekNumber });
}
