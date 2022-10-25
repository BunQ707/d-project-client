import Radio, { RadioProps } from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Control, Controller } from 'react-hook-form';
import { ChangeEvent } from 'react';

type Tlabel = { value: string | number; label: string };

type Props = {
  control: Control | any;
  name: string;
  labelList: Tlabel[];
  defaultChecked?: boolean;
  disabled?: boolean;
  color?: RadioProps['color'];
  onChange?: (a: string) => void;
  defaultValue?: Tlabel['value'];
  readOnly?: boolean;
  disableHelp?: boolean;
};

const RadioInput: React.FC<Props> = ({
  control,
  name,
  defaultChecked,
  color = 'primary',
  labelList,
  disabled,
  onChange,
  defaultValue,
  readOnly,
  disableHelp,
  ...rest
}) => {
  return (
    <Controller
      render={({ field }) => {
        return (
          <RadioGroup
            row
            name={field.name}
            value={field.value}
            onChange={(event: ChangeEvent<HTMLInputElement>, value: string | number) => {
              field.onChange(event, value);
              onChange && onChange(event.target.value);
            }}
            defaultValue={defaultValue}
          >
            {labelList.map((label, index) => (
              <FormControlLabel
                key={index}
                value={label.value}
                control={<Radio />}
                label={label.label}
                // disabled={disabled || (readOnly && field.value !== label.value)}
                color="primary"
              />
            ))}
          </RadioGroup>
        );
      }}
      control={control}
      name={name}
      defaultValue={defaultValue}
    />
  );
};

export default RadioInput;
