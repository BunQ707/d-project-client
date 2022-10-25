import { Control, Controller } from 'react-hook-form';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import NumberFormat, { NumberFormatProps } from 'react-number-format';
import Typography from '@mui/material/Typography';
import { IconWithTooltip } from './IconWithTooltip';
import { Box, Grid, Slider } from '@mui/material';
import MuiInput from '@mui/material/Input';

type Props = {
  control: Control | any;
  name: string;
  label?: string;
  fullWidth?: boolean;
  isError: boolean;
  errorMessage?: string;
  variant?: TextFieldProps['variant'];
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onValueChange: (number: any) => void;
  tooltipHelp?: string;
  disabled?: boolean;
  isStringInput?: boolean;
  disableHelp?: boolean;
};

const NumberRangeInput: React.FC<Props & NumberFormatProps> = ({
  control,
  name,
  label,
  fullWidth = true,
  variant = 'outlined',
  isError,
  errorMessage,
  startIcon,
  endIcon,
  onValueChange,
  tooltipHelp,
  disabled,
  isStringInput,
  disableHelp,
  ...rest
}) => {
  return (
    <Controller
      render={({ field }) => {
        return (
          <Box sx={{ width: 250 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <Slider
                  value={typeof field.value === 'number' ? field.value : 0}
                  onChange={(event: Event, newValue: number | number[]) => {
                    field.onChange(event);
                    onValueChange(newValue);
                  }}
                  aria-labelledby="input-slider"
                />
              </Grid>
              <Grid item>
                <MuiInput
                  value={field.value}
                  size="small"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    field.onChange(event);
                    onValueChange(event.target.value === '' ? '' : Number(event.target.value));
                  }}
                  onBlur={() => {
                    if (field.value < 0) {
                      onValueChange(0);
                    } else if (field.value > 1) {
                      onValueChange(1);
                    }
                  }}
                  inputProps={{
                    step: 0.1,
                    min: 0,
                    max: 1,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        );
      }}
      control={control}
      name={name}
    />
  );
};

export default NumberRangeInput;
