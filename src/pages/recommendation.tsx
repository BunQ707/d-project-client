import { Box, Container, Grid, InputAdornment, Typography } from '@mui/material';
import Layout from 'components/shared/Layout';
import type { NextPage } from 'next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RecommendValidator } from 'utils/validators';
import { Button } from '@mui/material';
import { useAuth } from 'contexts/auth';
import { useCallback, useEffect, useState } from 'react';
import { RecommendDto } from 'services/user.dto';
import NumberInput from 'components/form/NumberInput';
import * as api from 'services/user.service';
import { useAlert } from 'hooks';
import RadioInput from 'components/form/RadioInput';

type FormValues = RecommendDto;

const defaultValues: FormValues = {
  Gender: 0,
  DiabetesType: 0,
  // ActivityFactor: 0,
};

const RecommendationPage: NextPage = () => {
  const [result, setResult] = useState<string[]>([]);
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
    resolver: yupResolver(RecommendValidator),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    return handleRecommend(data);
  };

  const handleRecommend = async (data: FormValues) => {
    try {
      const resR = await api.recommend(data);

      if (resR?.data?.rules?.length > 0) setResult(resR?.data?.rules);
      else throw new Error('Something wrong, failed to recommend.');

      try {
        const resP = await api.updateProfile(data);
        if (resP?.data?._id) setUser(resP?.data);
      } catch (error) {
        console.error(error);
      }
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
      if (user.profile?.Weight > 0) setValue('Weight', user.profile.Weight);
      if (user.profile?.Height > 0) setValue('Height', user.profile.Height);
      if (user.profile?.Age > 0) setValue('Age', user.profile.Age);
      if (user.profile?.DiabetesType > 0) setValue('DiabetesType', user.profile.DiabetesType);
      if (user.profile?.Gender > 0) setValue('Gender', user.profile.Gender);
    } catch (error: any) {
      alertError('Error when parsing data');
      console.error(error);
    } finally {
      // setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Layout className="" title="D-Project | Food Recommendation">
      <Container>
        <Box sx={{ mt: '20px' }}>
          <Typography sx={{ fontSize: '30px', textAlign: 'center', color: '#1E7610' }}>Recommendations</Typography>
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
            <RadioInput
              control={controller}
              name="Gender"
              labelList={[
                {
                  label: 'Male',
                  value: 0,
                },
                {
                  label: 'Female',
                  value: 1,
                },
              ]}
              defaultValue={0}
            />
            <RadioInput
              control={controller}
              name="DiabetesType"
              labelList={[
                {
                  label: 'Diabetes Type 1',
                  value: 1,
                },
                {
                  label: 'Diabetes Type 2',
                  value: 2,
                },
                {
                  label: 'At risk of diabetes',
                  value: 0,
                },
              ]}
              defaultValue={0}
            />

            {/* <NumberInput
            onChange={() => trigger('ActivityFactor')}
            onValueChange={(values: any) => {
              setValue('ActivityFactor', values.floatValue);
            }}
            control={controller}
            label={'Activity Factor'}
            name="ActivityFactor"
            isError={Boolean(errors?.ActivityFactor)}
            errorMessage={errors?.ActivityFactor?.message}
            tooltipHelp={'Activity Factor (0 to 1)'}
            decimalScale={5}
            min={0}
            max={1}
            required
          /> */}
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
              required
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
              required
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
              required
            />

            <Button
              onClick={handleSubmit(onSubmit)}
              variant="contained"
              sx={{ width: '200px', margin: 'auto', mt: '18px' }}
            >
              Submit
            </Button>
            {/* <>
              {result.length > 0 &&
                result.map((r, index) => (
                  <Typography color={'black'} key={index}>
                    {r}
                  </Typography>
                ))}
            </> */}
          </Grid>
        </Box>
        {result.length > 0 && (
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
              <Box sx={{ flexGrow: 1 }}>
                {result.length > 0 &&
                  result.map((r, index) => (
                    <Typography color={'black'} key={index} sx={{ textAlign: 'justify' }}>
                      {'-'} {r}
                    </Typography>
                  ))}
              </Box>
            </Box>
          </Box>
        )}
      </Container>
    </Layout>
  );
};

export default RecommendationPage;
