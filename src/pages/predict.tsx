import { Grid, InputAdornment, Typography } from '@mui/material';
import Layout from 'components/shared/Layout';
import type { NextPage } from 'next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { predictValidator } from 'utils/validators';
import { PoolInputLabel } from 'utils/formConstant';
import Input from 'components/form/Input';
import { Button } from '@mui/material';
import { useAuth } from 'contexts/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PredictDto } from 'services/user.dto';
import NumberInput from 'components/form/NumberInput';
import * as api from 'services/user.service';
import { PredictionResult } from 'utils/constants';

type FormValues = PredictDto;

const defaultValues: FormValues = {};

const DiagnosePage: NextPage = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const [result, setResult] = useState<string>('');

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
    if (!isAuthenticated)
      try {
        const res = await api.predict(data);

        if ([true, false].includes(res?.data?.prediction))
          setResult(res.data.prediction == true ? PredictionResult.T : PredictionResult.F);
        else throw new Error('Something wrong, failed to diagnose.');
      } catch (error) {
        console.error(error);
      }

    try {
      const res = await api.updateProfile(data);

      if ([true, false].includes(res?.data?.profile?.prediction))
        setResult(res.data.profile.prediction == true ? PredictionResult.T : PredictionResult.F);
      else throw new Error('Something wrong, failed to diagnose.');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout className="" title="D-Project | Diagnose">
      {/* <LoadingScreen loading={loading} /> */}
      <Grid container direction="column">
        <form>
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

          <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
          {result && <Typography color={'black'}>{result}</Typography>}
        </form>
      </Grid>
    </Layout>
  );
};

export default DiagnosePage;
