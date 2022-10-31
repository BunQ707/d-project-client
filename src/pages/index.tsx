import { Box, Grid, Link, Tooltip, Typography } from '@mui/material';
import Layout from 'components/shared/Layout';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { funtionalPages } from 'utils/constants';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <Layout className="" title="D-Project | Diagnose">
      <Box
        sx={{
          maxWidth: '800px',
          border: '1px solid green',
          borderRadius: '10px',
          p: '30px',
          mt: '20px',
          mr: 'auto',
          ml: 'auto',
          backgroundColor: 'white',
        }}
      >
        <Grid container direction="column">
          <Box sx={{ mb: '0.75rem' }}>
            <Tooltip title="cdc.gov" placement="right">
              <Link
                href="https://www.cdc.gov/diabetes/basics/diabetes.html"
                target="_blank"
                underline="none"
                sx={{ color: '#222', fontWeight: 400, fontSize: '2.25rem' }}
              >
                What is Diabetes?
              </Link>
            </Tooltip>
          </Box>
          <Grid container direction="column" sx={{ rowGap: '15px' }}>
            <Typography sx={{ fontSize: '17px' }}>
              Diabetes is a chronic (long-lasting) health condition that affects how your body turns food into energy.
            </Typography>
            <Typography sx={{ fontSize: '17px' }}>
              Your body breaks down most of the food you eat into sugar (glucose) and releases it into your bloodstream.
              When your blood sugar goes up, it signals your pancreas to release insulin. Insulin acts like a key to let
              the blood sugar into your body’s cells for use as energy.
            </Typography>
            <Typography sx={{ fontSize: '17px' }}>
              With diabetes, your body doesn’t make enough insulin or can’t use it as well as it should. When there
              isn’t enough insulin or cells stop responding to insulin, too much blood sugar stays in your bloodstream.
              Over time, that can cause serious health problems, such as heart disease, vision loss, and kidney disease.
            </Typography>
            <Typography sx={{ fontSize: '17px' }}>
              There isn’t a cure yet for diabetes, but losing weight, eating healthy food, and being active can really
              help. Other things we can help:
            </Typography>
            {funtionalPages.map((page, index) => (
              <Link
                href="#"
                underline="none"
                key={index}
                onClick={() => {
                  router.push(page.url);
                }}
              >
                <Typography sx={{ fontSize: '17px' }} component="li">
                  {page.name}
                </Typography>
              </Link>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Home;
