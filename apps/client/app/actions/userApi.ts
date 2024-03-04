import {
  SignInAPIResponse,
  SignInFormData,
  SignUpFormData,
  UserDocument,
} from '@repo/shared';
import customFetch from './customFetch';

export const signIn = (formData: SignInFormData) => {
  return customFetch<SignInAPIResponse>('/auth/sign-in', {
    method: 'POST',
    body: JSON.stringify(formData),
    cache: 'no-cache',
  });
};

export const signUp = async (formData: SignUpFormData) => {
  return customFetch('/auth/sign-up', {
    method: 'POST',
    body: JSON.stringify(formData),
    cache: 'no-cache',
  });
};

export const getUser = async () => {
  return customFetch<UserDocument>(
    '/user/profile',
    {
      method: 'GET',
      next: {
        revalidateTag: ['profile'],
      },
    },
    true
  );
};

export const verifyAccount = async (verify_code: string, email: string) => {
  return customFetch('/auth/verify/' + verify_code + '/' + email, {
    method: 'GET',
    cache: 'no-cache',
  });
};
