export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  otp: string;
}

export interface OtpStepProps {
  register: any;
}
