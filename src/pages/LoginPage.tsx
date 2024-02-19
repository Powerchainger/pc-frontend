import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BackgroundImage from '../LoginImage.jpg'
import {useNavigate} from "react-router-dom";
import { login } from "../api/Api";
import {useState} from "react";

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.powerchainger.nl/">
        Powerchainger bv
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignInSide() {
    const navigate = useNavigate();
    const [correctLogin, setCorrectLogin] = React.useState(true)
    const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const password = data.get('password');
    try {
        login(username as string, password as string).then((response) => {
            let message = Object.values(response.data);
            if (response.status === 200) {
                setCorrectLogin(true)
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', message[0] as string);
                localStorage.setItem('token', message[1] as string);
                console.log()
                navigate('/');
            }
            else if(response.status === 401){
                console.log('401')
                setCorrectLogin(false);
            }
        })
            .catch((error) => {
                console.error("Error logging in: ", error);
                setCorrectLogin(false);
            });
    }
    catch (e) {}

  };
    const handleCheckboxChange = () => {
        setShowPassword(!showPassword);
        setTimeout(() => {
            setShowPassword(false)
        }, 2000)
    }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${BackgroundImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
              { !correctLogin ? <Typography component="h1" color="red">
                 Password or username is incorrect
              </Typography>:null}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
              />
                <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={handleCheckboxChange}
                /> show password
              {/*<FormControlLabel*/}
              {/*  control={<Checkbox value="remember" color="primary" />}*/}
              {/*  label="Remember me"*/}
              {/*/>*/}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Register"}
                  </Link>
                </Grid>
              </Grid>
              {/*<Copyright sx={{ mt: 5 }} />*/}
            </Box>
          </Box>
            <Copyright></Copyright>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}