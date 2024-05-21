import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

enum TeamChooseFirst {
  bat = 'bat',
  bowl = 'bowl',
}

export async function PATCH(
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
    const matchTeams = await prisma.match.findUnique({
      where: {
        id: matchId,
        tournamentId: tournamentId,
        playerTeamId: {
          not: null,
        },
        isActive: true,
      },
    });

    if (!matchTeams) {
      return NextResponse.json({
        status: false,
        message: 'Teams not found!',
      });
    }

    const teams = [matchTeams.teamOneId, matchTeams.teamTwoId];

    const randomTeamIndex = Math.floor(Math.random() * teams.length);

    let match = null;

    if (teams[randomTeamIndex] !== matchTeams.playerTeamId) {
      const teamChooseFirst = ['bat', 'bowl'];

      const randomTeamChooseFirstIndex = Math.floor(
        Math.random() * teamChooseFirst.length
      );

      match = await prisma.match.update({
        where: {
          id: matchId,
          tournamentId: tournamentId,
        },
        data: {
          tossWinnerTeamId: teams[randomTeamIndex],
          teamChooseFirst: teamChooseFirst[
            randomTeamChooseFirstIndex
          ] as TeamChooseFirst,
          teamOneStatus:
            randomTeamIndex === 0
              ? (teamChooseFirst[randomTeamChooseFirstIndex] as TeamChooseFirst)
              : randomTeamChooseFirstIndex === 0
              ? TeamChooseFirst.bowl
              : TeamChooseFirst.bat,
          teamTwoStatus:
            randomTeamIndex === 1
              ? (teamChooseFirst[randomTeamChooseFirstIndex] as TeamChooseFirst)
              : randomTeamChooseFirstIndex === 0
              ? TeamChooseFirst.bowl
              : TeamChooseFirst.bat,
        },
        include: {
          tossWinnerTeam: {
            include: {
              team: true,
            },
          },
        },
      });
    } else {
      match = await prisma.match.update({
        where: {
          id: matchId,
          tournamentId: tournamentId,
        },
        data: {
          tossWinnerTeamId: teams[randomTeamIndex],
        },
        include: {
          tossWinnerTeam: {
            include: {
              team: true,
            },
          },
        },
      });
    }

    return NextResponse.json({
      status: true,
      data: { match: match },
      message: `Toss winner is ${match.tossWinnerTeam?.team?.name}`,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: false,
      message: error.message,
    });
  }
}
