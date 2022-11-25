import { Grid, InputAdornment, Typography } from '@mui/material';
import Layout from 'components/shared/Layout';
import type { NextPage } from 'next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { predictValidator } from 'utils/validators';
import { Button } from '@mui/material';
import { useAuth } from 'contexts/auth';
import { useCallback, useEffect, useState } from 'react';
import { PredictDto } from 'services/user.dto';
import NumberInput from 'components/form/NumberInput';
import * as api from 'services/user.service';
import { PredictionResult } from 'utils/constants';
import { useAlert } from 'hooks';
import { Box, Container } from '@mui/system';

type FormValues = PredictDto;

const defaultValues: FormValues = {};

const ChangePasswordPage: NextPage = () => {
  const [result, setResult] = useState<boolean | null>(null);
  const [user, setUser] = useState<api.ProfileResult | null>(null);

  const { isAuthenticated } = useAuth();
  const { alertError } = useAlert();

  const {
    control: controller,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<FormValues>({
    shouldFocusError: true,
    defaultValues,
    reValidateMode: 'onSubmit',
    resolver: yupResolver(predictValidator),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    return handlePredict(data);
  };

  const handlePredict = async (data: FormValues) => {
    try {
      const res = await api.predict(data);
      try {
        const resU = await api.updateProfile(data);
        if (resU?.data?._id) setUser(resU?.data);
      } catch (error) {
        console.error(error);
      }

      if ([true, false].includes(res?.data?.prediction)) setResult(res.data.prediction);
      else throw new Error('Something wrong, failed to diagnose.');
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProfile = useCallback(async (): Promise<boolean> => {
    try {
      if (!isAuthenticated) return false;

      // setLoading(true);

      const res = await api.getProfile();
      if (!res?.data?._id) throw new Error('no id');
      else setUser(res.data);

      return true;
    } catch (error: any) {
      console.error(error);
      // setLoading(false);
      alertError('Get user data failed!');
      return false;
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (!user || !user.profile) return;
    try {
      // setLoading(true);

      if (user.profile?.Pregnancies > 0) setValue('Pregnancies', user.profile.Pregnancies);
      if (user.profile?.Insulin > 0) setValue('Insulin', user.profile.Insulin);
      if (user.profile?.Weight > 0) setValue('Weight', user.profile.Weight);
      if (user.profile?.Height > 0) setValue('Height', user.profile.Height);
      if (user.profile?.Age > 0) setValue('Age', user.profile.Age);
      if (user.profile?.Glucose > 0) setValue('Glucose', user.profile.Glucose);
      if (user.profile?.BloodPressure > 0) setValue('BloodPressure', user.profile.BloodPressure);
      if (user.profile?.DiabetesPedigreeFunction > 0)
        setValue('DiabetesPedigreeFunction', user.profile.DiabetesPedigreeFunction);
      if (user.profile?.SkinThickness > 0) setValue('SkinThickness', user.profile.SkinThickness);

      if (result === null && [true, false].includes(user.profile?.prediction)) setResult(user.profile?.prediction);

      // setValue('is_listed', is_listed || false);
    } catch (error: any) {
      alertError('Error when parsing data');
      console.error(error);
    } finally {
      // setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Layout className="" title="D-Project | Change Password">
      <Container>
        {/* <LoadingScreen loading={loading} /> */}
        <Box sx={{ mt: '20px' }}>
          <Typography sx={{ fontSize: '30px', textAlign: 'center', color: '#1E7610' }}>Change Password</Typography>
        </Box>
        <Box
          sx={{
            maxWidth: '800px',
            border: '1px solid green',
            borderRadius: '10px',
            p: '30px',
            mt: '20px',
            mr: 'auto',
            ml: 'auto',
            backgroundColor: 'white',
          }}
        >
          <Grid container direction="column" component={'form'} sx={{ rowGap: '10px' }}>
            <NumberInput
              onChange={() => trigger('Pregnancies')}
              onValueChange={(values: any) => {
                setValue('Pregnancies', values.floatValue);
              }}
              control={controller}
              label={'Pregnancies'}
              name="Pregnancies"
              isError={Boolean(errors?.Pregnancies)}
              errorMessage={errors?.Pregnancies?.message}
              tooltipHelp={'Number of times pregnant'}
              decimalScale={5}
            />
            <NumberInput
              onChange={() => trigger('Insulin')}
              onValueChange={(values: any) => {
                setValue('Insulin', values.floatValue);
              }}
              control={controller}
              label={'Insulin'}
              name="Insulin"
              isError={Boolean(errors?.Insulin)}
              errorMessage={errors?.Insulin?.message}
              tooltipHelp={'2-Hour serum insulin'}
              endIcon={<InputAdornment position="end">mu U/ml</InputAdornment>}
              decimalScale={5}
            />
            <NumberInput
              onChange={() => trigger('Height')}
              onValueChange={(values: any) => {
                setValue('Height', values.floatValue);
              }}
              control={controller}
              label={'Height'}
              name="Height"
              isError={Boolean(errors?.Height)}
              errorMessage={errors?.Height?.message}
              tooltipHelp={'Height in cm'}
              endIcon={<InputAdornment position="end">Cm</InputAdornment>}
              decimalScale={5}
            />
            <NumberInput
              onChange={() => trigger('Weight')}
              onValueChange={(values: any) => {
                setValue('Weight', values.floatValue);
              }}
              control={controller}
              label={'Weight'}
              name="Weight"
              isError={Boolean(errors?.Weight)}
              errorMessage={errors?.Weight?.message}
              tooltipHelp={'Weight in kg'}
              endIcon={<InputAdornment position="end">Kg</InputAdornment>}
              decimalScale={5}
            />
            <NumberInput
              onChange={() => trigger('Age')}
              onValueChange={(values: any) => {
                setValue('Age', values.floatValue);
              }}
              control={controller}
              label={'Age'}
              name="Age"
              isError={Boolean(errors?.Age)}
              errorMessage={errors?.Age?.message}
              tooltipHelp={'Age by years'}
              endIcon={<InputAdornment position="end">Years</InputAdornment>}
              decimalScale={0}
            />
            <NumberInput
              onChange={() => trigger('Glucose')}
              onValueChange={(values: any) => {
                setValue('Glucose', values.floatValue);
              }}
              control={controller}
              label={'Glucose'}
              name="Glucose"
              isError={Boolean(errors?.Glucose)}
              errorMessage={errors?.Glucose?.message}
              tooltipHelp={'Plasma glucose concentration a 2 hours in an oral glucose tolerance test'}
              decimalScale={5}
            />
            <NumberInput
              onChange={() => trigger('BloodPressure')}
              onValueChange={(values: any) => {
                setValue('BloodPressure', values.floatValue);
              }}
              control={controller}
              label={'Blood Pressure'}
              name="BloodPressure"
              isError={Boolean(errors?.BloodPressure)}
              errorMessage={errors?.BloodPressure?.message}
              tooltipHelp={'Diastolic blood pressure'}
              endIcon={<InputAdornment position="end">mm Hg</InputAdornment>}
              decimalScale={5}
            />
            <NumberInput
              onChange={() => trigger('DiabetesPedigreeFunction')}
              onValueChange={(values: any) => {
                setValue('DiabetesPedigreeFunction', values.floatValue);
              }}
              control={controller}
              label={'Diabetes Pedigree Function'}
              name="DiabetesPedigreeFunction"
              isError={Boolean(errors?.DiabetesPedigreeFunction)}
              errorMessage={errors?.DiabetesPedigreeFunction?.message}
              tooltipHelp={'Diabetes Pedigree Function'}
              decimalScale={5}
            />
            <NumberInput
              onChange={() => trigger('SkinThickness')}
              onValueChange={(values: any) => {
                setValue('SkinThickness', values.floatValue);
              }}
              control={controller}
              label={'Skin Thickness'}
              name="SkinThickness"
              isError={Boolean(errors?.SkinThickness)}
              errorMessage={errors?.SkinThickness?.message}
              tooltipHelp={'Triceps skin fold thickness'}
              endIcon={<InputAdornment position="end">mm</InputAdornment>}
              decimalScale={5}
            />
            {/* <Box sx={{}}> */}
            <Button
              onClick={handleSubmit(onSubmit)}
              variant="contained"
              sx={{ width: '200px', margin: 'auto', mt: '18px' }}
            >
              Submit
            </Button>
            {/* </Box> */}
          </Grid>
        </Box>
        {result !== null && (
          <Box
            sx={{
              maxWidth: '800px',
              border: '1px solid green',
              borderRadius: '10px',
              p: '30px',
              mt: '20px',
              mr: 'auto',
              ml: 'auto',
              backgroundColor: 'white',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: '15px', alignItems: 'center' }}>
              <Typography sx={{ fontSize: '20px', color: '#1E7610' }}>Result:</Typography>
              <Typography>{result == true ? PredictionResult.T : PredictionResult.F}</Typography>
            </Box>
          </Box>
        )}
      </Container>
    </Layout>
  );
};

export default ChangePasswordPage;
