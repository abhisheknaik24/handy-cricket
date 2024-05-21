import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { tournamentId: string; matchId: string } }
) {
  const { tournamentId, matchId } = params;

  const { playerTeamId }: { playerTeamId: string } = await req.json();

  if (!tournamentId?.length || !matchId?.length) {
    return NextResponse.json({
      status: false,
      message: 'Request params is missing!',
    });
  }

  if (!playerTeamId?.length) {
    return NextResponse.json({
      status: false,
      message: 'Request body is missing!',
    });
  }

  try {
    const match = await prisma.match.update({
      where: {
        id: matchId,
        tournamentId: tournamentId,
      },
      data: {
        playerTeamId: playerTeamId,
      },
      include: {
        playerTeam: {
          include: {
            team: true,
          },
        },
      },
    });

    return NextResponse.json({
      status: true,
      data: { match: match },
      message: `Player team is set to ${match.playerTeam?.team?.name}`,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: false,
      message: error.message,
    });
  }
}
