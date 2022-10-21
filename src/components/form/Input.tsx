import { Control, Controller } from 'react-hook-form';

import TextField, { TextFieldProps } from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { IconWithTooltip } from './IconWithTooltip';

type Props = {
  control: Control | any;
  name: string;
  label?: string;
  type?: 'text' | 'password' | 'number';
  fullWidth?: boolean;
  variant?: TextFieldProps['variant'];
  isError: boolean;
  errorMessage?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  tooltipHelp?: string;
  onValueChange?: (e?: any) => void;
  disabled?: boolean;
  isUrl?: boolean;
  disableHelp?: boolean;
};

const Input: React.FC<Props & TextFieldProps> = ({
  control,
  name,
  label,
  fullWidth = true,
  type = 'text',
  variant = 'outlined',
  isError,
  errorMessage,
  startIcon,
  endIcon,
  tooltipHelp,
  disableHelp,
  onValueChange,
  disabled,
  isUrl,
  ...rest
}) => {
  return (
    <Controller
      render={({ field }) => {
        return (
          <TextField
            type={type}
            label={
              <div style={{ display: 'flex', columnGap: 4 }} tabIndex={-1}>
                <Typography color="text.primary" sx={{ ...(disabled && { opacity: 0.5 }) }}>
                  {label}
                  {rest.required ? ' *' : ''}
                </Typography>
                {tooltipHelp && !disableHelp ? IconWithTooltip(tooltipHelp) : ''}
              </div>
            }
            placeholder={tooltipHelp}
            InputLabelProps={{ style: { pointerEvents: 'auto' }, htmlFor: name, required: false }}
            fullWidth={fullWidth}
            variant={variant}
            autoComplete="off"
            error={isError}
            helperText={errorMessage}
            id={name}
            InputProps={{
              endAdornment: endIcon,
              startAdornment: startIcon,
            }}
            {...{ ...field, ...rest }}
            onChange={(event: any) => {
              if (isUrl) {
                let value = event.target.value.toString();
                value = value.replace(/\s+/g, '');
                event.target.value = value;
              }
              field.onChange(event);
              onValueChange && onValueChange(event);
            }}
            disabled={disabled}
            className={disabled ? 'input-disabled' : ''}
          />
        );
      }}
      control={control}
      name={name}
    />
  );
};

export default Input;
