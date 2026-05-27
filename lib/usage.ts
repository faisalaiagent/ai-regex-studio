import { prisma } from "@/lib/prisma";
import type { Plan } from "@/types";

const DAILY_LIMITS: Record<Plan, number> = {
  GUEST: parseInt(process.env.GUEST_DAILY_LIMIT ?? "3"),
  FREE: parseInt(process.env.FREE_DAILY_LIMIT ?? "20"),
  PRO: 999999,
  TEAM: 999999,
};

export async function checkUsageLimit(
  userId: string | null,
  plan: Plan,
  action: "AI_GENERATE" | "AI_EXPLAIN" | "AI_OPTIMIZE"
): Promise<{ allowed: boolean; used: number; limit: number }> {
  const limit = DAILY_LIMITS[plan];

  if (!userId) {
    // Guest: use IP-based or session tracking (simplified here)
    return { allowed: true, used: 0, limit: DAILY_LIMITS.GUEST };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const used = await prisma.usageTracking.count({
    where: {
      userId,
      action,
      date: { gte: today, lt: tomorrow },
    },
  });

  return {
    allowed: used < limit,
    used,
    limit,
  };
}

export async function trackUsage(
  userId: string,
  action: "AI_GENERATE" | "AI_EXPLAIN" | "AI_OPTIMIZE" | "SAVE_SNIPPET" | "SHARE_SNIPPET"
): Promise<void> {
  await prisma.usageTracking.create({
    data: { userId, action },
  });
}

export async function getUserUsageStats(userId: string, plan: Plan) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [generateCount, explainCount] = await Promise.all([
    prisma.usageTracking.count({
      where: {
        userId,
        action: "AI_GENERATE",
        date: { gte: today, lt: tomorrow },
      },
    }),
    prisma.usageTracking.count({
      where: {
        userId,
        action: "AI_EXPLAIN",
        date: { gte: today, lt: tomorrow },
      },
    }),
  ]);

  return {
    generate: { used: generateCount, limit: DAILY_LIMITS[plan] },
    explain: { used: explainCount, limit: DAILY_LIMITS[plan] },
    plan,
    resetAt: tomorrow.toISOString(),
  };
}
