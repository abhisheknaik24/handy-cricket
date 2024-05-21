import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const teams = await prisma.team.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return NextResponse.json({
      status: true,
      data: { teams: teams },
      message: 'Teams fetched successfully!',
    });
  } catch (error: any) {
    return NextResponse.json({
      status: false,
      message: error.message,
    });
  }
}
