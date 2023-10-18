"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { blue } from "@mui/material/colors";
import { redirect } from "next/dist/server/api-utils";


export default function SignIn() {

  window.localStorage.setItem('logged', false);
  // Login
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {
    fetch("http://localhost:8080/api/publications")
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));

    window.localStorage.setItem('logged', true);

    /*
    const data = {
      email: email,
      password: password,
    };
    fetch("http://localhost:8080/api/send/email", {
      method: "POST",
      body: JSON.stringify(data),
    }).then((res) => {
        console.log(res);
        if (res.status === 200) {
          //localStorage.setItem("token", res.data.token);
          //redirect("/news");
        }
      })
      .catch((err) => console.log(err));

    //redirect("/news");
    */
  };

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
        <img
          alt="icono"
          src="/brain.png"
          style={{
            marginY: "3rem",
            backgroundColor: "transparent",
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
          Bienvenido Usuario
        </Typography>
        <Typography
          color={blue[500]}
          variant="caption"
          fontWeight="bold"
          fontSize="1rem"
        >
          Alzheimer Project
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
          
          <TextField
            margin="normal"
            type="password"
            fullWidth
            id="email"
            label="Contraseña"
            autoComplete="email"
            autoFocus
            
          />

          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
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
