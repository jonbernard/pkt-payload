'use client';

import { useMemo } from 'react';

import { isNumber } from 'lodash';
import { useRouter } from 'next/navigation';

import { Button } from '@mui/material';

import { Page, Post } from '@payload-types';

type Props = {
  type?: ('reference' | 'custom') | null;
  newTab?: boolean | null;
  label?: string | null;
  reference?:
    | {
        relationTo: 'pages';
        value: number | Page;
      }
    | {
        relationTo: 'posts';
        value: number | Post;
      }
    | null;
  url?: string | null;
  id?: string | null;
};

const LinkButton = (props: Props) => {
  const { label: passedLabel, newTab, reference, type, url } = props;

  const router = useRouter();

  const label = useMemo(() => {
    if (type === 'reference' && reference && !isNumber(reference.value)) {
      return passedLabel && passedLabel !== '' ? passedLabel : reference.value.title;
    }

    return passedLabel;
  }, [passedLabel, type, reference]);

  const onClick = () => {
    let nextUrl = url || '/';

    if (type === 'reference' && reference && !isNumber(reference.value)) {
      nextUrl = reference.value.url || '/';
    }

    if (newTab === true) {
      window.open(nextUrl, '_blank');
    } else {
      router.push(nextUrl);
    }
  };

  return (
    <>
      <Button variant="contained" onClick={onClick} className="hidden dark:block">
        {label}
      </Button>
      <Button variant="outlined" onClick={onClick} className="dark:hidden block bg-white">
        {label}
      </Button>
    </>
  );
};

export default LinkButton;
