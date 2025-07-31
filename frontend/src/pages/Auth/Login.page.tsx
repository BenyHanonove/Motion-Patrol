import React, { useState } from "react";
import { Container } from "@mui/material";

// Import custom components
import SecureHeader from "@components/common/SecureHeader.tsx";
import AuthForm from "@components/auth/AuthForm";

// Redux
import { useAppDispatch } from "@hooks/redux.hook";
import { showSnackbar } from "@slice/snackbar.slice";

// Import form validator
import { validateLogin } from "@utils/formValidate";

// Import interfaces
import type { FormFieldModel } from "@models/FormField.model";
import type { ILoginModel } from "@models/Auth.model";

// Import providers
import AuthProvider from "@providers/auth.provider";

// Import app navigation hook
import useAppNavigation from "@hooks/useAppNavigation.hook";

const LoginPage: React.FC = () => {
  const { navigateToPath } = useAppNavigation();

  // Redux dispatch
  const dispatch = useAppDispatch();

  // Define values for form
  const [login, setLogin] = useState<ILoginModel>({
    email: "",
    password: "",
  });

  const formFields: FormFieldModel[] = [
    {
      label: "Email",
      type: "email",
      val: login.email,
      setVal: (val: string) => setLogin((prev) => ({ ...prev, email: val })),
    },
    {
      label: "Password",
      type: "password",
      val: login.password,
      setVal: (val: string) => setLogin((prev) => ({ ...prev, password: val })),
    },
  ];

  const SubmitForm = async () => {
    const result = validateLogin(login);

    if (!result.isValid) {
      const messages = Object.values(result.errors).filter(Boolean).join(". ");
      dispatch(
        showSnackbar({
          message: messages,
          severity: "error",
        })
      );
      return;
    }

    const success = await AuthProvider.login(login);

    if (!success) {
      dispatch(
        showSnackbar({
          message: "Invalid email or password",
          severity: "error",
        })
      );
      return;
    }

    dispatch(
      showSnackbar({
        message: "Login successful!",
        severity: "success",
      })
    );

    // ✅ Navigate to dashboard/cameras
    navigateToPath("/dashboard/cameras");
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <SecureHeader text="secure login" />

      <AuthForm
        header="Login"
        desc="Welcome back! Let’s get you back in the game."
        formFields={formFields}
        footer="Don`t have account ?"
        submitHandler={SubmitForm}
      />
    </Container>
  );
};

export default LoginPage;
