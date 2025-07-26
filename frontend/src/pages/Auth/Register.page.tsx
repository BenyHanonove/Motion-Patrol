import React, { useState } from "react";
import { Container } from "@mui/material";

// Import custom components
import SecureHeader from "@components/common/SecureHeader";
import AuthForm from "@components/auth/AuthForm";

// Redux
import { useAppDispatch } from "@hooks/redux";
import { showSnackbar } from "@slice/snackbar.slice";

// Import interfaces
import type { FormFieldModel } from "@models/FormField.model";
import type { IRegisterModel } from "@models/Auth.model";
import { validateRegister } from "@utils/formValidate";

// Import providers
import AuthProvider from "@providers/auth.provider";

// Import app navigation hook
import useAppNavigation from "@hooks/useAppNavigation";

const RegisterPage: React.FC = () => {
  const { navigateToPath } = useAppNavigation();

  // Redux dispatch
  const dispatch = useAppDispatch();

  // Define values for form
  const [register, setRegister] = useState<IRegisterModel>({
    email: "",
    password: "",
    config: "",
  });

  const formFields: FormFieldModel[] = [
    {
      label: "Email",
      type: "email",
      val: register.email,
      setVal: (val: string) => setRegister((prev) => ({ ...prev, email: val })),
    },
    {
      label: "Password",
      type: "password",
      val: register.password,
      setVal: (val: string) =>
        setRegister((prev) => ({ ...prev, password: val })),
    },
    {
      label: "Password Config",
      type: "password",
      val: register.config,
      setVal: (val: string) =>
        setRegister((prev) => ({ ...prev, config: val })),
    },
  ];

  const SubmitForm = async () => {
    const result = validateRegister(register); // Assuming 'registerFormData' holds the form data

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

    const success = await AuthProvider.register(register);

    if (success) {
      dispatch(
        showSnackbar({
          message: "Register successful!",
          severity: "success",
        })
      );
    } else {
      dispatch(
        showSnackbar({
          message: "Registration failed.",
          severity: "error",
        })
      );
    }

    // ✅ Navigate to dashboard/cameras
    navigateToPath("/dashboard/cameras");
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SecureHeader text="secure register" />
      <AuthForm
        header="Register"
        desc="Great to see you here! Let’s get you started."
        formFields={formFields}
        footer="Already have an account ?"
        submitHandler={SubmitForm}
      />
    </Container>
  );
};

export default RegisterPage;
