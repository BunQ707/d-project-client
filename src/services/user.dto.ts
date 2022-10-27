export type PredictDto = {
  Pregnancies?: number;

  Insulin?: number;

  Height?: number;

  Weight?: number;

  Age?: number;

  Glucose?: number;

  BloodPressure?: number;

  DiabetesPedigreeFunction?: number;

  SkinThickness?: number;
};

export type RecommendDto = {
  Gender?: number;

  DiabetesType?: number;

  // ActivityFactor?: number;

  Age?: number;

  Height?: number;

  Weight?: number;
};
