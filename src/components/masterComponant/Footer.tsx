import React from "react";
import { Box, Typography } from "@mui/material";

export const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#fff",
        color: "#000",
        py: 2,
        textAlign: "center",
        mt: 4,
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Community Page. All rights reserved.
      </Typography>
    </Box>
  );
};
