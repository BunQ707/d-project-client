import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { BsInfoCircle } from 'react-icons/bs';

export const IconWithTooltip = (description: string) => (
  <Tooltip title={description}>
    <IconButton style={{ padding: 0 }} tabIndex={-1}>
      <BsInfoCircle style={{ width: 16, height: 16 }} />
    </IconButton>
  </Tooltip>
);
