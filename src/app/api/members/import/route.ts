import * as XLSX from 'xlsx';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '@payload-config';
import { NextRequest, NextResponse } from 'next/server';
import { filter, isNumber, uniq } from 'lodash';
import { Member } from '@payload-types';
import { DateTime } from 'luxon';

type ImportRow = {
  pref?: string;
  first: string;
  middle?: string;
  'Pref first'?: string;
  last: string;
  suf?: string;
  Nickname?: string;
  grad_year?: number;
  'est age'?: number;
  Age?: number;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  email?: string;
  phone?: number;
  title?: string;
  employer?: string;
  L?: number;
  D?: number;
  HROG?: number;
  Join?: Date | string;
  nhq_id?: string;
  Init?: Date | string;
  PIN?: number;
  DOB?: Date | string;
  DOD?: Date | string;
  'sub?'?: number;
  major?: string;
  'Notes | PRIVATE'?: string;
};

const isValidDate = (date: any) => date instanceof Date;

const getDate = (date: Date | string) => {
  if (isValidDate(date)) {
    return (date as Date).toISOString();
  }

  return DateTime.fromFormat(date as string, 'd/M/yyyy').toISO();
};

const payload = await getPayloadHMR({
  config: configPromise,
});

export const GET = async () => {
  const data = await payload.find({
    collection: 'users',
  });

  return Response.json(data);
};

export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData();

    const file = formData.get('file') as Blob | null;

    if (!file) {
      return NextResponse.json(
        {
          message: 'Bad request',
          status: 400,
        },
        { status: 400 },
      );
    }

    const workbook = XLSX.read(await file.arrayBuffer(), {
      type: 'binary',
      cellDates: true,
      cellNF: false,
      cellText: false,
    });

    const data = (XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]) as ImportRow[]).filter((item) => item && isNumber(item.L));

    const promises = data.map(async (row) => {
      try {
        return payload.create({
          collection: 'members',
          data: {
            // location?: string | null;
            // altEmail?: string | null;
            // altPhone?: string | null;
            ...(row.pref ? { prefix: row.pref as Member['prefix'] } : {}),
            firstName: row.first || 'unknown',
            ...(row.middle ? { middleName: row.middle } : {}),
            lastName: row.last,
            ...(row.suf ? { suffix: row.suf } : {}),
            ...(row.Nickname ? { nickname: row.Nickname } : {}),
            ...(row['Pref first'] ? { preferredName: row['Pref first'] } : {}),
            ...(row.grad_year ? { class: row.grad_year } : {}),
            ...(row.Age ? { age: row.Age } : {}),
            ...(row.DOB ? { dateOfBirth: getDate(row.DOB) } : {}),
            ...(row.address ? { address: row.address } : {}),
            ...(row.city ? { city: row.city } : {}),
            ...(row.state ? { state: row.state as Member['state'] } : {}),
            ...(row.zip ? { zip: row.zip } : {}),
            ...(row.email ? { email: row.email } : {}),
            ...(row.phone ? { phone: row.phone.toString() } : {}),
            ...(row.major ? { major: row.major } : {}),
            ...(row.employer || row.title
              ? {
                  occupation: {
                    ...(row.employer ? { employer: row.employer } : {}),
                    ...(row.title ? { title: row.title } : {}),
                  },
                }
              : {}),
            ...(row.L ? { lost: row.L === 1 } : {}),
            ...(row.D ? { dead: row.D === 1 } : {}),
            ...(row.DOD ? { deathDate: getDate(row.DOD) } : {}),
            ...(row.HROG ? { hrog: row.HROG === 1 } : {}),
            ...(row.Join ? { hrogDate: getDate(row.Join) } : {}),
            ...(row.nhq_id || row.Init || row.PIN
              ? {
                  national: {
                    ...(row.nhq_id ? { nhqId: row.nhq_id } : {}),
                    ...(row.Init ? { initiation: getDate(row.Init) } : {}),
                    ...(row.PIN ? { pin: row.PIN.toString() } : {}),
                  },
                }
              : {}),
            ...(row['Notes | PRIVATE'] ? { notes: row['Notes | PRIVATE'] } : {}),
            ...(row.major ? { major: row.major } : {}),
          },
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
