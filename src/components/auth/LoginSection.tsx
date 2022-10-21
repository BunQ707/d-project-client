import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginValidator } from 'utils/validators';
import { LoginDto } from 'utils/auth.dto';
import { PoolInputLabel } from 'utils/formConstant';
import Input from 'components/form/Input';
import { Button } from '@mui/material';
import { useAuth } from 'contexts/auth';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

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
    if (isAuthenticated) router.push('/');
  }, [isAuthenticated]);

  return (
    <div>
      <form>
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
        <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
      </form>
    </div>
  );
};

export default LoginSection;
