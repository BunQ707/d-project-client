import { Control, Controller } from 'react-hook-form';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import NumberFormat, { NumberFormatProps } from 'react-number-format';
import Typography from '@mui/material/Typography';
import { IconWithTooltip } from './IconWithTooltip';

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

const NumberInput: React.FC<Props & NumberFormatProps> = ({
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
          <NumberFormat
            {...{ ...field, ...rest }}
            thousandSeparator={true}
            customInput={TextField}
            label={
              <div style={{ display: 'flex', columnGap: 4 }}>
                <Typography color="text.primary" sx={{ ...(disabled && { opacity: 0.5 }) }}>
                  {label}
                  {rest.required ? ' *' : ''}
                </Typography>
                {tooltipHelp && !disableHelp ? IconWithTooltip(tooltipHelp) : ''}
              </div>
            }
            placeholder={tooltipHelp}
            InputLabelProps={{ style: { pointerEvents: 'auto' }, htmlFor: name, required: false }}
            variant={variant}
            fullWidth={fullWidth}
            control={control}
            autoComplete="off"
            error={isError}
            helperText={errorMessage}
            id={name}
            InputProps={{
              endAdornment: endIcon,
              startAdornment: startIcon,
            }}
            onValueChange={(values) => {
              field.onChange();
              onValueChange(values);
            }}
            disabled={disabled}
            className={disabled ? 'input-disabled' : ''}
            {...(isStringInput && { isNumericString: true })}
            {...rest}
            // onFocus={(e) => e.target.select()}
            // className="flex-1 w-32 px-2 py-1 text-3xl font-medium text-right bg-transparent border border-gray-500 rounded-md text-interteal focus:outline-none"
          />
        );
      }}
      control={control}
      name={name}
    />
  );
};

export default NumberInput;
