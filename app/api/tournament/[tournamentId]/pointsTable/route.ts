import { calculateRunRate } from '@/lib/calculateRunRate';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { tournamentId: string } }
) {
  const { tournamentId } = params;

  if (!tournamentId?.length) {
    return NextResponse.json({
      status: false,
      message: 'Request params is missing!',
    });
  }

  try {
    const tournament = await prisma.tournament.findUnique({
      where: {
        id: tournamentId,
      },
      include: {
        teams: {
          include: {
            team: true,
            teamOneMatches: true,
            teamTwoMatches: true,
            winnerTeamMatches: true,
            loserTeamMatches: true,
          },
        },
      },
    });

    let pointsTable: any[] = [];

    tournament?.teams?.forEach((item) => {
      pointsTable.push({
        id: item.id,
        team: item.team.name,
        totalMatches:
          Number(item?.teamOneMatches?.length) +
          Number(item?.teamTwoMatches?.length),
        playedMatches:
          Number(item?.winnerTeamMatches?.length) +
          Number(item?.loserTeamMatches?.length),
        wins: Number(item?.winnerTeamMatches?.length),
        losses: Number(item?.loserTeamMatches?.length),
        points: Number(item?.winnerTeamMatches?.length) * 2,
        runRate: calculateRunRate(item),
      });
    });

    pointsTable.sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points;
      }

      if (b.wins !== a.wins) {
        return b.wins - a.wins;
      }

      if (a.losses !== b.losses) {
        return a.losses - b.losses;
      }

      if (parseFloat(b.runRate) !== parseFloat(a.runRate)) {
        return parseFloat(b.runRate) - parseFloat(a.runRate);
      }

      return a.team.localeCompare(b.team);
    });

    return NextResponse.json({
      status: true,
      data: { pointsTable: pointsTable },
      message: 'Points table fetched successfully!',
    });
  } catch (error: any) {
    return NextResponse.json({
      status: false,
      message: error.message,
    });
  }
}
