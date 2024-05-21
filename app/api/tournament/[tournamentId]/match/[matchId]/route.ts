import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { tournamentId: string; matchId: string } }
) {
  const { tournamentId, matchId } = params;

  if (!tournamentId?.length || !matchId?.length) {
    return NextResponse.json({
      status: false,
      message: 'Request params is missing!',
    });
  }

  try {
    const match = await prisma.match.findUnique({
      where: {
        id: matchId,
        tournamentId: tournamentId,
        isActive: true,
      },
      include: {
        tournament: true,
        teamOne: {
          include: {
            team: true,
          },
        },
        teamTwo: {
          include: {
            team: true,
          },
        },
        playerTeam: true,
        tossWinnerTeam: true,
        winnerTeam: true,
      },
    });

    if (!match) {
      return NextResponse.json({
        status: false,
        message: 'Match details not found!',
      });
    }

    return NextResponse.json({
      status: true,
      data: { match: match },
      message: 'Match details fetched successfully!',
    });
  } catch (error: any) {
    return NextResponse.json({
      status: false,
      message: error.message,
    });
  }
}
