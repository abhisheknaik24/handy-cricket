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

  const { teamChooseFirst }: { teamChooseFirst: string } = await req.json();

  if (!tournamentId?.length || !matchId?.length) {
    return NextResponse.json({
      status: false,
      message: 'Request params is missing!',
    });
  }

  if (!teamChooseFirst?.length) {
    return NextResponse.json({
      status: false,
      message: 'Request body is missing!',
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

    let match = null;

    if (matchDetails.playerTeamId === matchDetails.teamOneId) {
      match = await prisma.match.update({
        where: {
          id: matchId,
          tournamentId: tournamentId,
        },
        data: {
          teamChooseFirst: teamChooseFirst as TeamChooseFirst,
          teamOneStatus: teamChooseFirst as TeamChooseFirst,
          teamTwoStatus: teamChooseFirst === 'bat' ? 'bowl' : 'bat',
        },
      });
    } else {
      match = await prisma.match.update({
        where: {
          id: matchId,
          tournamentId: tournamentId,
        },
        data: {
          teamChooseFirst: teamChooseFirst as TeamChooseFirst,
          teamOneStatus: teamChooseFirst === 'bat' ? 'bowl' : 'bat',
          teamTwoStatus: teamChooseFirst as TeamChooseFirst,
        },
      });
    }

    return NextResponse.json({
      status: true,
      data: { match: match },
      message: `You choose the ${match.teamChooseFirst} first`,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: false,
      message: error.message,
    });
  }
}
