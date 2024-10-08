'use client';

import classNames from 'classnames';
import { useRouter } from 'next/navigation';

import { Pagination as MuiPagination, Stack } from '@mui/material';

type Props = {
  page: number;
  count: number;
  createUrl: string;
  className?: string;
};

const Pagination = ({ page, count, createUrl, className }: Props) => {
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const url = createUrl.replace('${page}', String(value));

    router.push(url);
  };

  return (
    <Stack
      alignItems="center"
      className={classNames('dark:bg-gray-dark bg-white text-center', className)}
    >
      <MuiPagination count={count} page={page} onChange={handleChange} />
    </Stack>
  );
};

export default Pagination;
