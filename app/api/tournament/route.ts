import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const tournaments = await prisma.tournament.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return NextResponse.json({
      status: true,
      data: { tournaments: tournaments },
      message: 'Tournaments fetched successfully!',
    });
  } catch (error: any) {
    return NextResponse.json({
      status: false,
      message: error.message,
    });
  }
}

export async function POST(req: Request) {
  const { image, name }: { image: string; name: string } = await req.json();

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

    if (!!tournamentExist) {
      return NextResponse.json({
        status: false,
        message: 'Tournament already exist!',
      });
    }

    const tournament = await prisma.tournament.create({
      data: {
        image: image.trim(),
        name: name.trim().toLowerCase(),
      },
    });

    return NextResponse.json({
      status: true,
      data: { tournament: tournament },
      message: 'Tournament added successfully!',
    });
  } catch (error: any) {
    return NextResponse.json({
      status: false,
      message: error.message,
    });
  }
}
