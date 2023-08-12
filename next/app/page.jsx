"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { blue } from "@mui/material/colors";


export default function SignIn() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: "4rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          alt="Icono de Pixis"
          src="favicon.ico"
          sx={{
            marginY: "3rem",
            bgcolor: "transparent",
            width: "2.5rem",
            height: "2.5rem",
          }}
        />
        <Typography
          component="h2"
          variant="h5"
          fontWeight="bold"
          fontSize="1.5rem"
        >
          Bienvenido
        </Typography>
        <Typography
          color={blue[500]}
          variant="caption"
          fontWeight="bold"
          fontSize="1rem"
        >
          Bienvenido
        </Typography>

        <Box
          component="form"
          sx={{ mt: "1rem", width: "100%" }}
        >
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Correo Electrónico"
            autoComplete="email"
            autoFocus
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: "1rem",
              mb: "1rem",
              py: "0.5rem",
              backgroundColor: blue[500],
            }}
          >
            <Typography fontWeight={500} fontSize="1rem">
              Iniciar Sesión
            </Typography>
          </Button>
        </Box>
      </Box>
      
    </Container>
  );
}
