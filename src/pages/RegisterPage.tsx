import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BackgroundImage from '../LoginImage.jpg'
import {useNavigate} from "react-router-dom";
import { register } from "../api/Api";

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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignInSide() {
    const navigate = useNavigate();
    const [passwordMatch, setPasswordMatch] = React.useState(true)
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let username = data.get('username');
        let password = data.get('password');
        let password2 = data.get('password2');
        if (password !== password2) {
            console.log(data.get('password') !== data.get('password2'))
            setPasswordMatch(false);
        } else {
            setPasswordMatch(true);

            try {
                register(username as string, password as string).then((response) => {
                    let message = Object.values(response.data);
                    if (response.status === 200) {
                        navigate('/login');
                    }
                })
                    .catch((error) => {
                        console.error("Error registering account: ", error);
                    });
            }
            catch (e)
            {

            }
        }
    };

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
                            Register
                        </Typography>
                        { !passwordMatch ? <Typography component="h1" color="red">
                            Passwords don't match
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
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password2"
                                label=" Repeat Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Register
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                </Grid>
                            </Grid>
                            <Grid>
                            <Link href="/login" variant="body2">
                                {"Already have an account? Log in"}
                            </Link>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright></Copyright>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}