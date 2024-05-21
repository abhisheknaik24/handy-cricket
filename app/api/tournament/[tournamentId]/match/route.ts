import { prisma } from '@/lib/prisma';
import { shuffleArray } from '@/lib/shuffleArray';
import { NextResponse } from 'next/server';

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

  try {
    const tournamentTeams = await prisma.tournamentTeam.findMany({
      where: {
        tournamentId: tournamentId,
        isActive: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    if (tournamentTeams.length < 8) {
      return NextResponse.json({
        status: false,
        message: 'At least eight teams needed to make a matches!',
      });
    }

    const teamMatches: any[] = [];

    for (const teamOne of tournamentTeams) {
      for (const teamTwo of tournamentTeams) {
        if (
          teamOne.id !== teamTwo.id &&
          !teamMatches.some(
            (match) =>
              match.teamOneId === teamOne.id && match.teamTwoId === teamTwo.id
          ) &&
          !teamMatches.some(
            (match) =>
              match.teamOneId === teamTwo.id && match.teamTwoId === teamOne.id
          )
        ) {
          teamMatches.push({ teamOneId: teamOne.id, teamTwoId: teamTwo.id });
        }
      }
    }

    const matchData = shuffleArray(teamMatches)?.map((item, index) => ({
      matchNo: index + 1,
      tournamentId: tournamentId,
      teamOneId: item.teamOneId as string,
      teamTwoId: item.teamTwoId as string,
      date: new Date(),
      isActive: true,
    }));

    await prisma.match.createMany({
      data: matchData,
    });

    const matches = await prisma.match.findMany({
      where: {
        tournamentId: tournamentId,
        isActive: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return NextResponse.json({
      status: true,
      data: { matches: matches },
      message: 'Matches added successfully!',
    });
  } catch (error: any) {
    return NextResponse.json({
      status: false,
      message: error.message,
    });
  }
}
