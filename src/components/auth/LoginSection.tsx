import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginValidator } from 'utils/validators';
import { LoginDto } from 'services/auth.dto';
import { PoolInputLabel } from 'utils/formConstant';
import Input from 'components/form/Input';
import { Button, Grid } from '@mui/material';
import { useAuth } from 'contexts/auth';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import queryString from 'query-string';

interface Props {}

type FormValues = LoginDto;

const defaultValues: FormValues = {
  email: '',
  password: '',
};

const LoginSection: React.FC<Props> = () => {
  const router = useRouter();
  const { handleLoginUid, isAuthenticated } = useAuth();
  const {
    control: controller,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    shouldFocusError: true,
    defaultValues,
    reValidateMode: 'onSubmit',
    resolver: yupResolver(loginValidator),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    return handleSubmitLogin(data);
  };

  const handleSubmitLogin = async (data: FormValues) => await handleLoginUid(data);

  useEffect(() => {
    if (isAuthenticated) {
      const { redirectUrl } = queryString.parse(location.search);
      if (redirectUrl) {
        router.push(`${redirectUrl}`);
      } else {
        router.push('/');
      }
    }
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
        label={PoolInputLabel.password}
        name="password"
        isError={Boolean(errors?.password)}
        errorMessage={errors?.password?.message}
        type="password"
        tooltipHelp={PoolInputLabel.password_tooltip}
        disableHelp
        required
      />
      <Button onClick={handleSubmit(onSubmit)} variant="contained" sx={{ width: '200px', margin: 'auto', mt: '18px' }}>
        Submit
      </Button>
    </Grid>
  );
};

export default LoginSection;
