export interface SignupPayload {
  email: string;
  name: string;
  surname: string;
  phone: number;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface FirebaseErrorResponse {
  error: {
    code: number;
    errors: Array<{ message: string; domain: string; reason: string }>;
    message: string;
  };
}
