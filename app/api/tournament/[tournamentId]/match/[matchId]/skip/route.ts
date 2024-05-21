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
    const matchDetails = await prisma.match.findUnique({
      where: {
        id: matchId,
        tournamentId: tournamentId,
      },
    });

    if (!matchDetails) {
      return NextResponse.json({
        status: false,
        message: 'Match details not found!',
      });
    }

    const teams = [matchDetails.teamOneId, matchDetails.teamTwoId];

    const randomTeamIndex = Math.floor(Math.random() * teams.length);

    const teamChooseFirst = ['bat', 'bowl'];

    const randomTeamChooseFirstIndex = Math.floor(
      Math.random() * teamChooseFirst.length
    );

    const teamOneScore = Math.floor(Math.random() * 100);

    const teamTwoScore = Math.floor(Math.random() * 100);

    const match = await prisma.match.update({
      where: {
        id: matchId,
        tournamentId: tournamentId,
      },
      data: {
        playerTeamId: teams[randomTeamIndex],
        tossWinnerTeamId: teams[randomTeamIndex],
        teamChooseFirst: 'bat',
        teamOneStatus:
          randomTeamIndex === 0
            ? (teamChooseFirst[randomTeamChooseFirstIndex] as TeamChooseFirst)
            : randomTeamChooseFirstIndex === 0
            ? TeamChooseFirst.bowl
            : TeamChooseFirst.bat,
        teamOneScore: teamOneScore,
        teamOneWicket: Math.floor(Math.random() * 10),
        teamOneBalls: 0,
        teamTwoStatus:
          randomTeamIndex === 1
            ? (teamChooseFirst[randomTeamChooseFirstIndex] as TeamChooseFirst)
            : randomTeamChooseFirstIndex === 0
            ? TeamChooseFirst.bowl
            : TeamChooseFirst.bat,
        teamTwoScore: teamTwoScore,
        teamTwoWicket: Math.floor(Math.random() * 10),
        teamTwoBalls: 0,
        inning: 'over',
        winnerTeamId:
          teamOneScore < teamTwoScore
            ? matchDetails.teamTwoId
            : matchDetails.teamOneId,
        loserTeamId:
          teamOneScore < teamTwoScore
            ? matchDetails.teamOneId
            : matchDetails.teamTwoId,
      },
    });

    return NextResponse.json({
      status: true,
      data: { match: match },
      message: 'Match skiped!',
    });
  } catch (error: any) {
    return NextResponse.json({
      status: false,
      message: error.message,
    });
  }
}
