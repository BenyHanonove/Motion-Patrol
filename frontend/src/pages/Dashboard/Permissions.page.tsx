import React from "react";
import { Container } from "@mui/material";

// Import custom components
import PageTitle from "@components/common/PageTitle";

const PermissionsPage: React.FC = () => {
  return (
    <Container>
      <PageTitle text="Permissions" />
    </Container>
  );
};

export default PermissionsPage;
