import React, { useState } from "react";
import { Container } from "@mui/material";

// Import custom components
import SecureHeader from "@components/common/SecureHeader.tsx";
import AuthForm from "@components/auth/AuthForm";

// Redux
import { useAppDispatch } from "@hooks/redux.hook";
import { showSnackbar } from "@slice/snackbar.slice";

// Import form validator
import { validateRestore } from "@utils/formValidate";

// Import interfaces
import type { FormFieldModel } from "@models/FormField.model";
import type { IRestoreModel } from "@models/Auth.model";

// Import providers
import AuthProvider from "@providers/auth.provider";

const RestorePasswordPage: React.FC = () => {
  // Redux dispatch
  const dispatch = useAppDispatch();

  // Define values for form
  const [restore, setRestore] = useState<IRestoreModel>({
    email: "",
  });

  const formFields: FormFieldModel[] = [
    {
      label: "Email",
      type: "email",
      val: restore.email,
      setVal: (val: string) => setRestore((prev) => ({ ...prev, email: val })),
    },
  ];

  const SubmitForm = async () => {
    const result = validateRestore(restore);

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

    const success = await AuthProvider.restore(restore);

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
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SecureHeader text={"secure restore"} />
      <AuthForm
        header="Restore Password"
        desc="Enter your email and we'll send you a new password."
        formFields={formFields}
        footer="Oh, remembered it? Just"
        submitHandler={SubmitForm}
      />
    </Container>
  );
};

export default RestorePasswordPage;
