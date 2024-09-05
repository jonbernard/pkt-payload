import { NextRequest, NextResponse } from 'next/server';

import { Member } from '@payload-types';
import { cookies } from 'next/headers';
import { getPayload } from '@/app/(app)/utils';

const payload = await getPayload();

export const POST = async (request: NextRequest) => {
  try {
    const data = await request.json();
    const cookieStore = cookies();

    if (cookieStore.get('API_KEY')?.value !== process.env.API_KEY) {
      return NextResponse.json(
        {
          message: 'Bad request',
          status: 400,
        },
        { status: 400 },
      );
    }

    const promises = data.map(async (row: Member) => {
      try {
        const memberExists = await payload.find({
          collection: 'members',
          where: {
            firstName: {
              equals: row.firstName || 'unknown',
            },
            lastName: {
              equals: row.lastName,
            },
          },
        });

        if (memberExists.docs.length > 0) {
          return;
        }
        return payload.create({
          collection: 'members',
          data: row,
        });
      } catch (error) {
        console.error(error);

        return null;
      }
    });

    const response = await Promise.all(promises);

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);

    return NextResponse.json(null, { status: 500 });
  }
};
