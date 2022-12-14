import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerValidator } from 'utils/validators';
import { RegisterDto } from 'services/auth.dto';
import { PoolInputLabel } from 'utils/formConstant';
import Input from 'components/form/Input';
import { Button, Grid } from '@mui/material';
import { useAuth } from 'contexts/auth';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as api from 'services';
import { useAlert } from 'hooks';

interface Props {}

type FormValues = RegisterDto & {
  password2: string;
};

const defaultValues: FormValues = {
  email: '',
  password: '',
  // name: '',
  password2: '',
};

const RegisterSection: React.FC<Props> = () => {
  const router = useRouter();
  const { isAuthenticated, handleLoginUid } = useAuth();
  const { alertError, alertSuccess } = useAlert();

  const {
    control: controller,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    shouldFocusError: true,
    defaultValues,
    reValidateMode: 'onSubmit',
    resolver: yupResolver(registerValidator),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    return handleSubmitRegister(data);
  };

  const handleSubmitRegister = async (data: FormValues) => {
    try {
      const regRes = await api.register(data);

      if (regRes?.status === 201) {
        alertSuccess('Create account success.');

        await handleLoginUid(data);
      } else throw new Error('response is not 201');
    } catch (error: any) {
      console.error(error);

      let errMessage = 'Something wrong, failed to register.';
      if (error?.response?.data?.message === 'Email used') errMessage = 'This email has been used.';

      alertError(errMessage);
    }
  };

  useEffect(() => {
    if (isAuthenticated) router.push('/');
  }, [isAuthenticated]);

  return (
    <Grid container direction="column" component={'form'} sx={{ rowGap: '10px', mt: '10px' }}>
      <Input
        control={controller}
        label={PoolInputLabel.email}
        name="email"
        isError={Boolean(errors?.email)}
        errorMessage={errors?.email?.message}
        tooltipHelp={PoolInputLabel.email_tooltip}
        disableHelp
        required
      />
      <Input
        control={controller}
        label={PoolInputLabel.password_new}
        name="password"
        isError={Boolean(errors?.password)}
        errorMessage={errors?.password?.message}
        type="password"
        tooltipHelp={PoolInputLabel.password_new_tooltip}
        disableHelp
        required
      />
      <Input
        control={controller}
        label={PoolInputLabel.password_confirm}
        name="password2"
        isError={Boolean(errors?.password2)}
        errorMessage={errors?.password2?.message}
        type="password"
        tooltipHelp={PoolInputLabel.password_confirm}
        disableHelp
        required
      />
      {/* <Input
          control={controller}
          label={PoolInputLabel.name}
          name="name"
          isError={Boolean(errors?.name)}
          errorMessage={errors?.name?.message}
          tooltipHelp={PoolInputLabel.name_tooltip}
          required
        /> */}
      <Button onClick={handleSubmit(onSubmit)} variant="contained" sx={{ width: '200px', margin: 'auto', mt: '18px' }}>
        Submit
      </Button>
    </Grid>
  );
};

export default RegisterSection;
