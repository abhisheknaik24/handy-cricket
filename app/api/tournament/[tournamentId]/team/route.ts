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
    const tournamentTeams = await prisma.tournamentTeam.findMany({
      where: {
        tournamentId: tournamentId,
        isActive: true,
      },
      include: {
        team: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return NextResponse.json({
      status: true,
      data: { tournamentTeams: tournamentTeams },
      message: 'Tournament teams fetched successfully!',
    });
  } catch (error: any) {
    return NextResponse.json({
      status: false,
      message: error.message,
    });
  }
}

export async function POST(
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

  const { teamId }: { teamId: string } = await req.json();

  if (!teamId?.length) {
    return NextResponse.json({
      status: false,
      message: 'Request body is missing!',
    });
  }

  try {
    const tournamentTeamExist = await prisma.tournamentTeam.findFirst({
      where: {
        tournamentId: tournamentId,
        teamId: teamId,
        isActive: true,
      },
    });

    if (!!tournamentTeamExist) {
      return NextResponse.json({
        status: false,
        message: 'Tournament team already exist!',
      });
    }

    const tournamentTeam = await prisma.tournamentTeam.create({
      data: {
        tournamentId: tournamentId,
        teamId: teamId,
      },
    });

    return NextResponse.json({
      status: true,
      data: { tournamentTeam: tournamentTeam },
      message: 'Tournament team added successfully!',
    });
  } catch (error: any) {
    return NextResponse.json({
      status: false,
      message: error.message,
    });
  }
}
