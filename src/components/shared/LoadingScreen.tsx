import Box from '@mui/material/Box';
import Spinner from './Spinner';

interface Props {
  loading: boolean;
}

const LoadingScreen: React.FC<Props> = ({ loading = false }) => {
  return (
    <>
      {loading && (
        <Box
          sx={{
            position: 'fixed',
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'black',
            opacity: 0.75,
          }}
          className="inset-0"
        >
          <Spinner size="large" variant="basic" />
        </Box>
      )}
    </>
  );
};

export default LoadingScreen;
