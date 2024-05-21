import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { tournamentId: string; matchId: string } }
) {
  const { tournamentId, matchId } = params;

  const { run }: { run: number } = await req.json();

  if (!tournamentId?.length || !matchId?.length) {
    return NextResponse.json({
      status: false,
      message: 'Request params is missing!',
    });
  }

  if (run < 0 || run > 6) {
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

    const oppositeTeamRun = Math.floor(Math.random() * 7);

    let match = null;

    if (matchDetails.teamOneStatus === 'bat') {
      const isPlayerTeamBat =
        matchDetails.playerTeamId === matchDetails.teamOneId;

      match = await prisma.match.update({
        where: {
          id: matchId,
          tournamentId: tournamentId,
        },
        data: {
          teamOneScore:
            Number(run) !== Number(oppositeTeamRun)
              ? isPlayerTeamBat
                ? Number(matchDetails.teamOneScore) + run
                : Number(matchDetails.teamOneScore) + oppositeTeamRun
              : Number(matchDetails.teamOneScore),
          teamOneWicket:
            Number(run) === Number(oppositeTeamRun)
              ? Number(matchDetails.teamOneWicket) + 1
              : Number(matchDetails.teamOneWicket),
          teamOneBalls: Number(matchDetails.teamOneBalls) - 1,
        },
      });

      if (match.inning === 'first') {
        if (Number(match.teamOneBalls) < 1) {
          await prisma.match.update({
            where: {
              id: matchId,
              tournamentId: tournamentId,
            },
            data: {
              teamOneStatus: 'bowl',
              teamTwoStatus: 'bat',
              inning: 'second',
            },
          });
        } else if (Number(match.teamOneWicket) === 10) {
          await prisma.match.update({
            where: {
              id: matchId,
              tournamentId: tournamentId,
            },
            data: {
              teamOneStatus: 'bowl',
              teamTwoStatus: 'bat',
              inning: 'second',
            },
          });
        }
      }

      if (match.inning === 'second') {
        if (Number(match.teamOneScore) > Number(match.teamTwoScore)) {
          await prisma.match.update({
            where: {
              id: matchId,
              tournamentId: tournamentId,
            },
            data: {
              inning: 'over',
              winnerTeamId: match.teamOneId,
              loserTeamId: match.teamTwoId,
            },
          });
        } else if (Number(match.teamOneBalls) < 1) {
          await prisma.match.update({
            where: {
              id: matchId,
              tournamentId: tournamentId,
            },
            data: {
              inning: 'over',
              winnerTeamId: match.teamTwoId,
              loserTeamId: match.teamOneId,
            },
          });
        } else if (Number(match.teamOneWicket) === 10) {
          await prisma.match.update({
            where: {
              id: matchId,
              tournamentId: tournamentId,
            },
            data: {
              inning: 'over',
              winnerTeamId: match.teamTwoId,
              loserTeamId: match.teamOneId,
            },
          });
        }
      }
    } else if (matchDetails.teamTwoStatus === 'bat') {
      const isPlayerTeamBat =
        matchDetails.playerTeamId === matchDetails.teamTwoId;

      match = await prisma.match.update({
        where: {
          id: matchId,
          tournamentId: tournamentId,
        },
        data: {
          teamTwoScore:
            Number(run) !== Number(oppositeTeamRun)
              ? isPlayerTeamBat
                ? Number(matchDetails.teamTwoScore) + run
                : Number(matchDetails.teamTwoScore) + oppositeTeamRun
              : Number(matchDetails.teamTwoScore),
          teamTwoWicket:
            Number(run) === Number(oppositeTeamRun)
              ? Number(matchDetails.teamTwoWicket) + 1
              : Number(matchDetails.teamTwoWicket),
          teamTwoBalls: Number(matchDetails.teamTwoBalls) - 1,
        },
      });

      if (match.inning === 'first') {
        if (Number(match.teamTwoBalls) < 1) {
          await prisma.match.update({
            where: {
              id: matchId,
              tournamentId: tournamentId,
            },
            data: {
              teamOneStatus: 'bat',
              teamTwoStatus: 'bowl',
              inning: 'second',
            },
          });
        } else if (Number(match.teamTwoWicket) === 10) {
          await prisma.match.update({
            where: {
              id: matchId,
              tournamentId: tournamentId,
            },
            data: {
              teamOneStatus: 'bat',
              teamTwoStatus: 'bowl',
              inning: 'second',
            },
          });
        }
      }

      if (match.inning === 'second') {
        if (Number(match.teamTwoScore) > Number(match.teamOneScore)) {
          await prisma.match.update({
            where: {
              id: matchId,
              tournamentId: tournamentId,
            },
            data: {
              inning: 'over',
              winnerTeamId: match.teamTwoId,
              loserTeamId: match.teamOneId,
            },
          });
        } else if (Number(match.teamTwoBalls) < 1) {
          await prisma.match.update({
            where: {
              id: matchId,
              tournamentId: tournamentId,
            },
            data: {
              inning: 'over',
              winnerTeamId: match.teamOneId,
              loserTeamId: match.teamTwoId,
            },
          });
        } else if (Number(match.teamTwoWicket) === 10) {
          await prisma.match.update({
            where: {
              id: matchId,
              tournamentId: tournamentId,
            },
            data: {
              inning: 'over',
              winnerTeamId: match.teamOneId,
              loserTeamId: match.teamTwoId,
            },
          });
        }
      }
    }

    return NextResponse.json({
      status: true,
      data: { match: match },
      message: 'Match updated successfully!',
    });
  } catch (error: any) {
    return NextResponse.json({
      status: false,
      message: error.message,
    });
  }
}
