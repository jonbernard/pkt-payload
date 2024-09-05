'use client';

import { Pagination as MuiPagination, Stack } from '@mui/material';

import { useRouter } from 'next/navigation';

type Props = {
  page: number;
  count: number;
  createUrl: string;
};

const Pagination = ({ page, count, createUrl }: Props) => {
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const url = createUrl.replace('${page}', String(value));

    router.push(url);
  };

  return (
    <Stack alignItems="center" className="dark:bg-gray-dark bg-white text-center">
      <MuiPagination count={count} page={page} onChange={handleChange} />
    </Stack>
  );
};

export default Pagination;
