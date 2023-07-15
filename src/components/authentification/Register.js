import * as React from 'react';
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
import Alert from '@mui/material/Alert'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useAuth} from '../../contexts/AuthContext'
import { useState } from 'react'



function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="src/components#">
                devize-auto.ro
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function Register() {
    const {register} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit (event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (data.get("email") === "" || data.get("password") === "" || data.get("password-confirm") === "" || data.get("firstName") === ""  || data.get("lastName") === "" ){
            return setError("Toate câmpurile trebuie completate.")
        }

        if (data.get('password') !== data.get('password-confirm')){
            return setError("Parolele nu coincid!")
        }

        try{
            setError('')
            setLoading(true)
            await register(data.get('email'), data.get('password'))
        } catch {
            setError('Contul nu a putut fi creat din cauza unei erori. Încercați mai tarziu.')
        }
        setLoading(false)

    };

    return (
        <ThemeProvider theme={theme}>
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
                        Înregistrează-te
                    </Typography>

                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Nume"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="Prenume"
                                    autoFocus
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Adresă de e-mail"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Parola"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password-confirm"
                                    label="Confirmă parola"
                                    type="password"
                                    id="password-confirm"
                                    autoComplete="new-password"
                                />
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled = {loading}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Înregistrează-te
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/log-in" variant="body2">
                                    Ai deja un cont? Intră in cont
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                    {error && <Alert severity={'error'} sx={{marginTop: "3vh"}}> {error} </Alert> }
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}