import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { tournamentId: string; teamId: string } }
) {
  const { tournamentId, teamId } = params;

  if (!tournamentId?.length || !teamId?.length) {
    return NextResponse.json({
      status: false,
      message: 'Request params is missing!',
    });
  }

  try {
    let matches = [];

    if (teamId === 'all') {
      matches = await prisma.match.findMany({
        where: {
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
          winnerTeam: true,
        },
        orderBy: {
          matchNo: 'asc',
        },
      });
    } else {
      matches = await prisma.match.findMany({
        where: {
          tournamentId: tournamentId,
          OR: [
            {
              teamOneId: teamId,
            },
            {
              teamTwoId: teamId,
            },
          ],
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
          winnerTeam: true,
        },
        orderBy: {
          date: 'asc',
        },
      });
    }

    return NextResponse.json({
      status: true,
      data: { matches: matches },
      message: 'Matches fetched successfully!',
    });
  } catch (error: any) {
    return NextResponse.json({
      status: false,
      message: error.message,
    });
  }
}
