"use client";

import * as React from "react"; 

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/navigation';

const defaultTheme = createTheme();

export default function page(){

  const emailRef = React.useRef(null);
  const checkboxRef = React.useRef(null);
  const router = useRouter();

  React.useEffect(() => {
    let cookieValue = document.cookie;

    if (cookieValue != '') {
      cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('user'))
        .split('=')[1];
      
      console.log("cookieValue: ", cookieValue);
      router.push('/news');
    }

    let emailPrev = window.localStorage.getItem('email');
    if (emailPrev != null || emailPrev != undefined) {
      emailRef.current.value = emailPrev;
    }
  }, []);

  const validations = (data) => {
    if (data.get('firstName').length < 1) {
      alert('You must enter a first name');
      return false;
    }

    if (data.get('lastName').length < 1) {
      alert('You must enter a last name');
      return false;
    }

    if (data.get('email').length < 1) {
      alert('You must enter an email');
      return false;
    }

    if (data.get('password').length < 1) {
      alert('You must enter a password');
      return false;
    }

    if (!checkboxRef.current.checked) {
      alert('You must accept the privacy policies');
      return false;
    }

    return true;
  }
  
  const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      
      if (!validations(data)) {
        return;
      }

      console.log({
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        email: data.get('email'),
        password: data.get('password'),
      });

      fetch("http://alzproject.ddns.net/api/create-user", {
        method: "POST",
        body: JSON.stringify({
          name: data.get('firstName'),
          last_name: data.get('lastName'),
          email: data.get('email'),
          password: data.get('password'),
        }),
      }).then((res) => {
          console.log(res);
          if (res.status === 200) {
            localStorage.setItem('email', data.get('email'));
            router.push('/');
          }
          if (res.status === 500) {
            alert('The email is already registered');
          }
        })
        .catch((err) => {
          console.log(err);
          alert('An error has ocurred');
          router.push('/register-form');
        });
  };
    
  return (
      <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    inputRef={emailRef}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" inputRef={checkboxRef}/>}
                    label="I agree to the privacy policies and to receive monthly emails to be informed with the latest scientific advances in Alzheimer's."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
}
