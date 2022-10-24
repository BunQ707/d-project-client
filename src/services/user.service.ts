import { apiClient } from '../utils/axios';
import { PredictDto } from './user.dto';

export interface PredictResponse {
  data: {
    Pregnancies: number;
    Insulin: number;
    BMI: number;
    Age: number;
    Glucose: number;
    BloodPressure: number;
    DiabetesPedigreeFunction: number;
    SkinThickness: number;
    prediction: boolean;
  };
}

export const predict = (params: PredictDto): Promise<PredictResponse> => {
  return apiClient.post('predict', params);
};

export const updateProfile = (params: any) => {
  return apiClient.put('profile', params);
};
