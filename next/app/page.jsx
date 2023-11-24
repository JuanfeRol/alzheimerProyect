"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { blue } from "@mui/material/colors";
import { redirect } from "next/dist/server/api-utils";
import { parseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { useRouter } from "next/navigation";


export default function SignIn() {

  const emailRef = React.useRef(null);
  const router = useRouter();

  React.useEffect(() => {
    window.localStorage.setItem('logged', false);
    if (window.localStorage.getItem('logged') === true) {
      redirect("/news");
    }

    let emailPrev = window.localStorage.getItem('email');
    if (emailPrev != null || emailPrev != undefined) {
      emailRef.current.value = emailPrev;
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    console.log(data.get('email'));
    console.log(data.get('password'));

    fetch('http://localhost:8080/api/login', {
      method: 'POST',
      body: JSON.stringify({
        email: data.get('email'),
        password: data.get('password')
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      mode: 'cors',
      cache: 'default'
    }).then(response => {
        if (response.status == 500 || response.status == 401) {
          alert('Invalid credentials');
          return;
        }

        return response.json();
      }).then(data => {
        console.log("data: ",data);
        router.push('/news');
      })
      .catch((error) => {
        console.error('Error de NJS:', error);
      });
  };

  // window.localStorage.setItem('logged', true);
  // window.localStorage.setItem('email', data.body.email);
  // window.localStorage.setItem('token', cookieValue[1]);
  // window.localStorage.setItem('role', data.body.role);
  // window.localStorage.setItem('id', data.body.id);

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
          Welcome
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
          onSubmit={handleSubmit}
        >
          <TextField
            margin="normal"
            name="email"
            fullWidth
            id="email"
            label="Email"
            autoComplete="email"
            autoFocus
            inputRef={emailRef}
          />
          
          <TextField
            margin="normal"
            type="password"
            name="password"
            fullWidth
            id="password"
            label="Password"
            autoComplete="password"
            autoFocus
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{
              mt: "1rem",
              mb: "1rem",
              py: "0.5rem",
              backgroundColor: blue[500],
            }}
          >
            <Typography fontWeight={500} fontSize="1rem">
              Login
            </Typography>
          </Button>
        </Box>
      </Box>
      
    </Container>
  );
}
