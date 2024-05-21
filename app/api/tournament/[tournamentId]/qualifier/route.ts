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
        matches: true,
      },
    });

    let pointsTable: any[] = [];

    tournament?.teams?.forEach((item) => {
      pointsTable.push({
        id: item.id,
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

      return parseFloat(b.runRate) - parseFloat(a.runRate);
    });

    const totalMatchesPlayed = await prisma.match.count({
      where: {
        tournamentId,
        winnerTeamId: {
          not: null,
        },
      },
    });

    if (Number(tournament?.matches?.length) === Number(totalMatchesPlayed)) {
      const topFourTeams = pointsTable.slice(0, 4);

      const semiFinalMatchExist = await prisma.match.findMany({
        where: {
          tournamentId: tournamentId,
          type: 'semiFinal',
        },
      });

      if (!semiFinalMatchExist.length) {
        const nextMatchNo = await prisma.match.aggregate({
          _max: {
            matchNo: true,
          },
        });

        await prisma.match.createMany({
          data: [
            {
              matchNo: Number(nextMatchNo._max.matchNo),
              tournamentId: tournamentId,
              type: 'semiFinal',
              teamOneId: topFourTeams[0].id,
              teamTwoId: topFourTeams[3].id,
              date: new Date(),
              isActive: true,
            },
            {
              matchNo: Number(nextMatchNo._max.matchNo) + 1,
              tournamentId: tournamentId,
              type: 'semiFinal',
              teamOneId: topFourTeams[1].id,
              teamTwoId: topFourTeams[2].id,
              date: new Date(),
              isActive: true,
            },
          ],
        });
      }

      const finalMatchExist = await prisma.match.findMany({
        where: {
          tournamentId: tournamentId,
          type: 'final',
        },
      });

      if (!finalMatchExist.length) {
        const nextMatchNo = await prisma.match.aggregate({
          _max: {
            matchNo: true,
          },
        });

        const semiFinalWinners = await prisma.match.findMany({
          where: {
            tournamentId: tournamentId,
            type: 'semiFinal',
            winnerTeamId: {
              not: null,
            },
          },
          orderBy: {
            matchNo: 'asc',
          },
        });

        if (semiFinalWinners?.length === 2) {
          await prisma.match.create({
            data: {
              matchNo: Number(nextMatchNo._max.matchNo) + 1,
              tournamentId: tournamentId,
              type: 'final',
              teamOneId: semiFinalWinners[0].winnerTeamId as string,
              teamTwoId: semiFinalWinners[1].winnerTeamId as string,
              date: new Date(),
              isActive: true,
            },
          });
        }
      }
    }

    const matches = await prisma.match.findMany({
      where: {
        tournamentId: tournamentId,
        OR: [
          {
            type: 'semiFinal',
          },
          {
            type: 'final',
          },
        ],
      },
      include: {
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
      },
      orderBy: {
        matchNo: 'asc',
      },
    });

    return NextResponse.json({
      status: true,
      data: { matches: matches },
      message: 'Qualifier fetched successfully!',
    });
  } catch (error: any) {
    return NextResponse.json({
      status: false,
      message: error.message,
    });
  }
}
