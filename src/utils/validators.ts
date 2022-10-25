import * as yup from 'yup';

const ERROR_MESSAGE_REQUIRED = 'This field is required.';
const ERROR_MESSAGE_NOT_EMAIL = 'This field must be a valid email.';
const ERROR_MESSAGE_STRING_LENGTH_50 = 'It is not longer than 50 characters';
const ERROR_MESSAGE_STRING_LENGTH_6 = 'It is not shorter than 6 characters';
const ERROR_MESSAGE_STRING_LENGTH_255 = 'It is not longer than 255 characters';
const ERROR_MESSAGE_NOT_STRIM = 'This field must be a trimmed string.';
const ERROR_MESSAGE_POSITIVE_NUMBER = 'This field must be greater than 0';

const numberPositiveCanNull = (value: number | undefined) => {
  if (!value) return true;
  try {
    return value > 0;
  } catch {
    return false;
  }
};

export const loginValidator = yup.object().shape({
  email: yup.string().required(ERROR_MESSAGE_REQUIRED).email(ERROR_MESSAGE_NOT_EMAIL),
  password: yup.string().required(ERROR_MESSAGE_REQUIRED).strict().trim(ERROR_MESSAGE_NOT_STRIM),
});

export const registerValidator = yup.object().shape({
  email: yup.string().required(ERROR_MESSAGE_REQUIRED).email(ERROR_MESSAGE_NOT_EMAIL),
  password: yup
    .string()
    .required(ERROR_MESSAGE_REQUIRED)
    .min(6, ERROR_MESSAGE_STRING_LENGTH_6)
    .max(50, ERROR_MESSAGE_STRING_LENGTH_50)
    .strict()
    .trim(ERROR_MESSAGE_NOT_STRIM),
  // name: yup.string().required(ERROR_MESSAGE_REQUIRED).max(255, ERROR_MESSAGE_STRING_LENGTH_255),

  password2: yup
    .string()
    .required(ERROR_MESSAGE_REQUIRED)
    .test({
      name: 'test_password',
      message: 'Password incorrect',
      test: (value, context) => {
        if (!value) return true;

        if (context.parent.password) return value === context.parent.password;

        return true;
      },
    }),
});

export const predictValidator = yup.object().shape({
  Pregnancies: yup.number().test({
    name: 'positive',
    message: ERROR_MESSAGE_POSITIVE_NUMBER,
    test: (value) => {
      if (!value) return true;
      try {
        return value > 0;
      } catch {
        return false;
      }
    },
  }),

  Insulin: yup.number().test({
    name: 'positive',
    message: ERROR_MESSAGE_POSITIVE_NUMBER,
    test: numberPositiveCanNull,
  }),

  Height: yup.number().test({
    name: 'positive',
    message: ERROR_MESSAGE_POSITIVE_NUMBER,
    test: numberPositiveCanNull,
  }),

  Weight: yup.number().test({
    name: 'positive',
    message: ERROR_MESSAGE_POSITIVE_NUMBER,
    test: numberPositiveCanNull,
  }),

  Age: yup.number().test({
    name: 'positive',
    message: ERROR_MESSAGE_POSITIVE_NUMBER,
    test: numberPositiveCanNull,
  }),

  Glucose: yup.number().test({
    name: 'positive',
    message: ERROR_MESSAGE_POSITIVE_NUMBER,
    test: numberPositiveCanNull,
  }),

  BloodPressure: yup.number().test({
    name: 'positive',
    message: ERROR_MESSAGE_POSITIVE_NUMBER,
    test: numberPositiveCanNull,
  }),

  DiabetesPedigreeFunction: yup.number().test({
    name: 'positive',
    message: ERROR_MESSAGE_POSITIVE_NUMBER,
    test: numberPositiveCanNull,
  }),

  SkinThickness: yup.number().test({
    name: 'positive',
    message: ERROR_MESSAGE_POSITIVE_NUMBER,
    test: numberPositiveCanNull,
  }),
});

export const RecommendValidator = yup.object().shape({
  Gender: yup.number(),

  DiabetesType: yup.number(),

  ActivityFactor: yup.number().test({
    name: 'between 0 and 1',
    message: 'This field must be between 0 and 1',
    test: (value) => {
      if (typeof value !== 'number') return true;
      return value >= 0 && value <= 1;
    },
  }),

  Age: yup.number(),

  Height: yup.number(),

  Weight: yup.number(),
});
