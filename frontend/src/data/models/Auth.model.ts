interface AuthModel {
  id: string;
  token: string;
  email: string;
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
