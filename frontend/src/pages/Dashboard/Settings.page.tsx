import React from "react";
import { Container } from "@mui/material";

// Import custom components
import PageTitle from "@components/common/PageTitle";

const SettingsPage: React.FC = () => {
  return (
    <Container>
      <PageTitle text="Settings" />
    </Container>
  );
};

export default SettingsPage;
