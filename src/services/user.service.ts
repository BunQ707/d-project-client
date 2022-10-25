import { apiClient } from '../utils/axios';
import { PredictDto, RecommendDto } from './user.dto';

export interface PredictResult {
  Pregnancies: number;
  Insulin: number;
  BMI: number;
  Age: number;
  Glucose: number;
  BloodPressure: number;
  DiabetesPedigreeFunction: number;
  SkinThickness: number;
  Weight: number;
  Height: number;
  prediction: boolean;
}
export interface PredictResponse {
  data: PredictResult;
}

export interface ProfileResult {
  _id: string;
  email: string;
  profile?: PredictResult;
}
export interface ProfileResponse {
  data: ProfileResult;
}

export const predict = (params: PredictDto): Promise<PredictResponse> => {
  return apiClient.post('predict', params);
};

export const updateProfile = (params: any): Promise<ProfileResponse> => {
  return apiClient.put('profile', params);
};

export const getProfile = (): Promise<ProfileResponse> => {
  return apiClient.get('profile');
};

export const recommend = (params: RecommendDto) => {
  return apiClient.post('recommendNutriPlan', params);
};
