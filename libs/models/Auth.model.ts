interface AuthModel {
   id: string;
  email: string;
  password: string;
  refreshToken: string | null;
  createdAt: Date;
}

interface ILoginModel {
  email: string;
  password: string;
}

interface IRegisterModel {
  email: string;
  password: string;
  config: string;
}

interface IRestoreModel {
  email: string;
}

export type { AuthModel, ILoginModel, IRegisterModel, IRestoreModel };
