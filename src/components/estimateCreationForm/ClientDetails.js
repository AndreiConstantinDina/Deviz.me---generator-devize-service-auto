import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {useEffect} from "react";
import {useState, setState} from "react";

export default function ClientDetails({clientData, setClientData, error}) {

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        error = {error !== "" && clientData.lastName === ""}
                        label="Nume"
                        fullWidth
                        autoComplete="family-name"
                        defaultValue={clientData.lastName}
                        onChange = { (event) => {
                            event.target.value = event.target.value.toString().replace(/[^a-zA-Z ]/i, '')
                            setClientData({...clientData, lastName: event.target.value})
                            }
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
                        defaultValue={clientData.firstName}
                        onChange = { (event) => {
                            event.target.value = event.target.value.toString().replace(/[^a-zA-Z ]/i, '')
                            setClientData({...clientData, firstName: event.target.value})
                        }
                        }

                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        label="Adresa"
                        fullWidth
                        autoComplete="shipping address-line1"
                        defaultValue={clientData.address}
                        onChange = { (event) =>
                            setClientData({...clientData, address: event.target.value})
                        }
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Oraș"
                        fullWidth
                        autoComplete="shipping address-level2"
                        defaultValue={clientData.city}
                        onChange = { (event) =>
                        {
                            event.target.value = event.target.value.toString().replace(/[^a-zA-Z ]/i, '')
                            setClientData({...clientData, city: event.target.value})
                        }
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Județ"
                        fullWidth
                        defaultValue={clientData.county}
                        onChange = { (event) =>{
                            event.target.value = event.target.value.toString().replace(/[^a-zA-Z ]/i, '')
                            setClientData({...clientData, county: event.target.value})
                        }
                        }
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        error = {error !== "" && clientData.phone === ""}

                        label="Telefon"
                        fullWidth
                        defaultValue={clientData.phone }
                        onChange = { (event) => {
                            event.target.value = event.target.value.toString().replace(/[^+0-9]/i, '')
                            setClientData({...clientData, phone: event.target.value})
                            }
                        }
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        optional
                        label="E-mail"
                        type={"email"}
                        fullWidth
                        defaultValue={clientData.email}
                        onChange = { (event) =>
                            setClientData({...clientData, email: event.target.value})
                        }
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}