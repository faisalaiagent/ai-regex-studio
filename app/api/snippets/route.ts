import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createSchema = z.object({
  title: z.string().min(1).max(100),
  pattern: z.string().min(1).max(2000),
  flags: z.string().max(10).optional().default(""),
  description: z.string().max(500).optional(),
  explanation: z.string().max(2000).optional(),
  tags: z.array(z.string()).max(10).optional().default([]),
  isPublic: z.boolean().optional().default(false),
  folderId: z.string().optional(),
});

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const folderId = searchParams.get("folderId");
  const tag = searchParams.get("tag");
  const search = searchParams.get("search");

  const snippets = await prisma.regexSnippet.findMany({
    where: {
      userId: session.user.id,
      ...(folderId ? { folderId } : {}),
      ...(tag ? { tags: { has: tag } } : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { pattern: { contains: search, mode: "insensitive" } },
              { description: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: { updatedAt: "desc" },
    take: 100,
  });

  return NextResponse.json({ snippets });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  // Check snippet limit for free users
  const plan = (session.user as { plan?: string })?.plan ?? "FREE";
  if (plan === "FREE") {
    const count = await prisma.regexSnippet.count({
      where: { userId: session.user.id },
    });
    if (count >= 25) {
      return NextResponse.json(
        { error: "Snippet limit reached. Upgrade to Pro for unlimited snippets." },
        { status: 403 }
      );
    }
  }

  const snippet = await prisma.regexSnippet.create({
    data: {
      ...parsed.data,
      userId: session.user.id,
    },
  });

  return NextResponse.json({ snippet }, { status: 201 });
}
