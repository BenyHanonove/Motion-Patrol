import {
  type AuthModel,
  type ILoginModel,
  type IRegisterModel,
  type IRestoreModel,
} from "@models";

// Import services
import AuthService from "@services/auth.service";

// Import Redux actions
import {
  login as loginAction,
  logout as logoutAction,
} from "@slice/auth.slice";

// Import Redux store or dispatch hook
import { store } from "@store";

const AuthProvider = {
  // Registers user, fetches auth data, and updates Redux state
  register: async (credentials: IRegisterModel): Promise<boolean> => {
    // const token: string | null = await AuthService.register(credentials);
    const token = true;
    if (token) {
      // const auth: AuthModel | null = await AuthService.fetchAuth(token);
      const auth = { email: "benyx13@gmail.com", id: "s212", token: "sadasd" };
      if (auth) {
        store.dispatch(loginAction(auth));
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },

  // Login user, call API and update Redux state
  login: async (credentials: ILoginModel): Promise<boolean> => {
    // const auth: AuthModel | null = await AuthService.login(credentials);
    const a = { email: "benyx13@gmail.com", id: "s212", token: "sadasd" };
    const auth = true;
    if (auth) {
      console.log(a);
      store.dispatch(loginAction(a));
      return true;
    } else {
      return false;
    }
  },
  // Logout user by clearing Redux state
  logout: (): void => {
    store.dispatch(logoutAction());
  },

  // Sends a password reset request to the user using provided credentials
  restore: async (credentials: IRestoreModel): Promise<boolean> => {
    const response = await AuthService.restore(credentials);
    if (response) return true;
    else return false;
  },
};

export default AuthProvider;
