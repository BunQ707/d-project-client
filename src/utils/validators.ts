import * as yup from 'yup';

const ERROR_MESSAGE_REQUIRED = 'This field is required.';
const ERROR_MESSAGE_NOT_EMAIL = 'This field must be a valid email.';
const ERROR_MESSAGE_STRING_LENGTH_50 = 'It is not longer than 50 characters';
const ERROR_MESSAGE_STRING_LENGTH_6 = 'It is not shorter than 6 characters';
const ERROR_MESSAGE_STRING_LENGTH_255 = 'It is not longer than 255 characters';
const ERROR_MESSAGE_NOT_STRIM = 'This field must be a trimmed string.';

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
  name: yup.string().required(ERROR_MESSAGE_REQUIRED).max(255, ERROR_MESSAGE_STRING_LENGTH_255),
});
