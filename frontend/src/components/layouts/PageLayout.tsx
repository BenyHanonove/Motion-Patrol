import React from "react";
import { Container, Typography } from "@mui/material";

interface PageLayoutProps {
  title?: string;
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, children }) => {
  return (
    <Container maxWidth={false} sx={{ p: 2 }}>
      {title && (
        <Typography variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>
      )}
      {children}
    </Container>
  );
};

export default PageLayout;
