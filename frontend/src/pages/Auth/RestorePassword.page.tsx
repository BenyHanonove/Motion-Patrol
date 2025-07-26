import React, { useState } from "react";
import { Container } from "@mui/material";

// Import custom components
import SecureHeader from "@components/common/SecureHeader.tsx";
import AuthForm from "@components/auth/AuthForm.tsx";

// Import interfaces
import type { FormFieldModel } from "@models/FormField.model";

const RestorePasswordPage: React.FC = () => {
  // Define values for form
  const [email, setEmail] = useState<string>("");

  const formFields: FormFieldModel[] = [
    {
      label: "Email",
      type: "email",
      val: email,
      setVal: (val: string) => setEmail(val),
    },
  ];

  const SubmitForm: () => void = () => {
    console.log(email);
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
