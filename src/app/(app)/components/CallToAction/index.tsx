import { Button, Container, Stack } from '@mui/material';

const CallToAction = () => {
  return (
    <section id="home" className="dark:bg-gray-800 relative bg-gray-50 py-12 border-y border-solid border-gray-300 dark:border-gray-700">
      <Container maxWidth="lg">
        <Stack alignItems="center" justifyContent="center" spacing={6} direction="row" className="mx-auto max-w-[800px] text-center">
          <h1 className="text-sm font-bold leading-tight text-black dark:text-white sm:text-md sm:leading-tight md:text-xl md:leading-tight">
            Support Phi Chapter with the Second Century Fund
          </h1>
          <Button variant="contained">Donate</Button>
        </Stack>
      </Container>
    </section>
  );
};

export default CallToAction;
