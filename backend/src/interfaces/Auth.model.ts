interface IAuthModel {
  id?: string;
  email: string;
  password: string;
  token?: string | null;
  createdAt?: Date;
}

interface ILoginRequest {
  email: string;
  password: string;
}

interface ILoginResponse {
  token: string;
}

interface IRegisterRequest {
  email: string;
  password: string;
}

export type { IAuthModel, ILoginRequest, ILoginResponse, IRegisterRequest };
