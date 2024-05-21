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
          where: {
            isActive: true,
          },
        },
      },
    });

    if (!tournament) {
      return NextResponse.json({
        status: false,
        message: 'Tournament details not found!',
      });
    }

    return NextResponse.json({
      status: true,
      data: { tournament: tournament },
      message: 'Tournament details fetched successfully!',
    });
  } catch (error: any) {
    return NextResponse.json({
      status: false,
      message: error.message,
    });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { tournamentId: string } }
) {
  const { tournamentId } = params;

  const { image, name }: { image: string; name: string } = await req.json();

  if (!tournamentId?.length) {
    return NextResponse.json({
      status: false,
      message: 'Request params is missing!',
    });
  }

  if (!image?.length || !name?.length) {
    return NextResponse.json({
      status: false,
      message: 'Request body is missing!',
    });
  }

  try {
    const tournamentExist = await prisma.tournament.findFirst({
      where: {
        name: name.trim().toLowerCase(),
        isActive: true,
      },
    });

    if (tournamentExist) {
      return NextResponse.json({
        status: false,
        message: 'Tournament already exist!',
      });
    }

    const tournament = await prisma.tournament.update({
      where: {
        id: tournamentId,
      },
      data: {
        image: image.trim(),
        name: name.trim().toLowerCase(),
      },
    });

    return NextResponse.json({
      status: true,
      data: { tournament: tournament },
      message: 'Tournament updated successfully!',
    });
  } catch (error: any) {
    return NextResponse.json({
      status: false,
      message: error.message,
    });
  }
}

export async function DELETE(
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
    await prisma.tournament.delete({
      where: {
        id: tournamentId,
      },
    });

    await prisma.match.deleteMany({
      where: {
        id: tournamentId,
      },
    });

    return NextResponse.json({
      status: true,
      message: 'Tournament deleted successfully!',
    });
  } catch (error: any) {
    return NextResponse.json({
      status: false,
      message: error.message,
    });
  }
}
