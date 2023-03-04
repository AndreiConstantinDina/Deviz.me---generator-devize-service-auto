import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {useEffect} from "react";
import {useState, setState} from "react";

export default function ClientDetails({clientData, setClientData, error}) {

    // const [clientData, setClientData] = useState({
    //     lastName: '',
    //     firstName: '',
    //     email: '',
    //     phone: '',
    //     address: '',
    //     city: '',
    //     county: '',
    //     country: 'Romania'
    // })

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Introduceți datele clientului:
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        error = {error !== "" && clientData.lastName === ""}
                        label="Nume"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                        defaultValue={clientData.lastName}
                        onChange = { (event) =>
                            clientData.lastName = event.target.value
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        error = {error !== "" && clientData.firstName === ""}

                        label="Prenume"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        defaultValue={clientData.firstName}
                        onChange = { (event) =>
                            clientData.firstName = event.target.value
                        }
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        label="Adresa"
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="standard"
                        defaultValue={clientData.address}
                        onChange = { (event) =>
                            clientData.address = event.target.value
                        }
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Oraș"
                        fullWidth
                        autoComplete="shipping address-level2"
                        variant="standard"
                        defaultValue={clientData.city}
                        onChange = { (event) =>
                            clientData.city = event.target.value
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Județ"
                        fullWidth
                        variant="standard"
                        defaultValue={clientData.county}
                        onChange = { (event) =>
                            clientData.county = event.target.value
                        }
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        error = {error !== "" && clientData.phone === ""}

                        label="Telefon"
                        fullWidth
                        variant="standard"
                        defaultValue={clientData.phone }
                        onChange = { (event) =>
                            clientData.phone = event.target.value
                        }
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        optional
                        label="E-mail"
                        fullWidth
                        variant="standard"
                        defaultValue={clientData.email}
                        onChange = { (event) =>
                            clientData.email = event.target.value
                        }
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}