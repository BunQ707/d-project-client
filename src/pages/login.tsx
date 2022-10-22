import { Grid, Tabs, Tab } from '@mui/material';
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
      {/* <LoadingScreen loading={loading} /> */}
      <Grid container direction="column">
        <Grid container justifyContent="center">
          <Tabs
            value={tabId}
            onChange={onSwitchTab}
            aria-label="simple tabs example"
            style={{ marginBottom: 20 }}
            indicatorColor="primary"
            textColor="primary"
            sx={{
              borderBottom: '2px',
              borderColor: 'background.default',
              mb: 4,
              '& .MuiTab-root.Mui-selected': { color: 'text.primary' },
              '& .MuiTab-root': { color: '#A7A7A7' },
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
        </Grid>
        {tabId === 0 && <LoginSection />}
        {tabId === 1 && <RegisterSection />}
      </Grid>
    </Layout>
  );
};

export default LoginPage;
