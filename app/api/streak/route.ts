export async function GET() {
  return Response.json({
    currentStreak: 0,
    totalDays: 0
  });
}