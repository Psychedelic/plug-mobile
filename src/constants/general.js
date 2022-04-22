import { ALPHANUM_REGEX } from '@constants/addresses';

export const isValidPassword = password => password && password.length < 12;

// This is only going to be used in the CreatePassword screen, we want the users to have a password between 12 and 24 chars:
export const isValidNewPassword = password =>
  password &&
  password.length >= 12 &&
  password.length <= 24 &&
  ALPHANUM_REGEX.test(password);
