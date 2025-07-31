import React from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

// Import theme hook and type
import useAppTheme from "@hooks/useAppTheme.hook";
import type { Theme } from "@mui/material/styles";

// Import icons
import VisibilityIcon from "@mui/icons-material/Visibility";

// Import interfaces
import type { FormFieldModel } from "@models/FormField.model";

// Import custom hooks
import useAppNavigation from "@hooks/useAppNavigation.hook";

interface AuthFormProps {
  header: string;
  desc: string;
  formFields: FormFieldModel[];
  footer: string;
  submitHandler: () => void;
}

// Renders an input based on type
import { useState } from "react";

const RenderInput: React.FC<{ formField: FormFieldModel }> = ({
  formField,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  if (formField.type === "password") {
    return (
      <Box key={formField.label}>
        <Typography>{formField.label}</Typography>
        <TextField
          value={formField.val}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            formField.setVal(e.target.value);
          }}
          fullWidth
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <VisibilityIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    );
  }

  return (
    <Box key={formField.label} sx={{ flex: 1 }}>
      <Typography>{formField.label}</Typography>
      <TextField
        fullWidth
        type={formField.type}
        value={formField.val}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          formField.setVal(e.target.value);
        }}
      />
    </Box>
  );
};

const AuthForm: React.FC<AuthFormProps> = ({
  header,
  desc,
  formFields,
  footer,
  submitHandler,
}) => {
  const { navigateToPath } = useAppNavigation();

  // Define the state of the form
  const isLogin: boolean = header.toLowerCase() === "login";

  // Access MUI theme and extract primary dark color for hover effect
  const theme: Theme = useAppTheme().theme;
  const primary: string = theme.palette.primary.dark;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 5,
      }}
    >
      <Box
        sx={{
          width: 460,
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* Header section */}
        <Box flex={1}>
          <Typography variant="h4">{header}</Typography>
          <Typography variant="body2" color="text.secondary">
            {desc}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Render input fields based on labels and types */}
          {formFields.map((field) => (
            <RenderInput key={field.label} formField={field} />
          ))}
        </Box>

        {/* Forgot password section */}
        {isLogin && (
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Typography
              color="primary"
              sx={{ cursor: "pointer" }}
              onClick={() => {
                navigateToPath("/auth/forgot-password");
              }}
            >
              Forgot password?
            </Typography>
          </Box>
        )}

        {/* Submit button */}
        <Button
          variant="contained"
          fullWidth
          sx={{ p: 1 }}
          onClick={submitHandler}
        >
          {header.toUpperCase()}
        </Button>

        {/* footer section */}
        <Box
          sx={{
            p: 1,
            display: "flex",
            flexDirection: "row",
            gap: 1,
          }}
        >
          <Typography>{footer}</Typography>

          {isLogin ? (
            <Typography
              sx={{
                cursor: "pointer",
                color: primary,
              }}
              onClick={() => {
                navigateToPath("/auth/register");
              }}
            >
              Create account
            </Typography>
          ) : (
            <Typography
              sx={{
                cursor: "pointer",
                color: primary,
              }}
              onClick={() => {
                navigateToPath("/auth/login");
              }}
            >
              Login
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AuthForm;
