import { Grid, Tabs, Tab, Container, Box } from '@mui/material';
import LoginSection from 'components/auth/LoginSection';
import RegisterSection from 'components/auth/RegisterSection';
import Layout from 'components/shared/Layout';
import type { NextPage } from 'next';
import { useState } from 'react';

const LoginPage: NextPage = () => {
  const [tabId, setTabId] = useState<number>(0);
  const onSwitchTab = (event: React.ChangeEvent<{}>, newTabId: number) => setTabId(newTabId);

  return (
    <Layout className="" title={`D-Project | ${tabId === 0 ? 'Login' : 'Register'}`}>
      <Container>
        {/* <LoadingScreen loading={loading} /> */}
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
            <Box justifyContent="center" display={'flex'}>
              <Tabs
                value={tabId}
                onChange={onSwitchTab}
                aria-label="simple tabs example"
                style={{ marginBottom: 20 }}
                indicatorColor="primary"
                textColor="primary"
                sx={{
                  '& .MuiTabs-indicator': {
                    background: 'linear-gradient(87.21deg, #39EA3E 2.32%, #4FBBBF 45.63%, #B55DFF 97.9%)',
                  },
                  '& .MuiButtonBase-root.MuiTab-root': {
                    fontWeight: 600,
                    fontSize: '22px',
                  },
                }}
              >
                <Tab label="Login" key={0} sx={{ textTransform: 'capitalize' }} />
                <Tab label="Register" key={1} sx={{ textTransform: 'capitalize' }} />
              </Tabs>
            </Box>
            {tabId === 0 && <LoginSection />}
            {tabId === 1 && <RegisterSection />}
          </Grid>
        </Box>
      </Container>
    </Layout>
  );
};

export default LoginPage;
