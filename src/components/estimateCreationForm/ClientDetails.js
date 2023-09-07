import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {useEffect} from "react";
import {useState, setState} from "react";
import {FormGroup, Tab, Tabs} from "@mui/material";

export default function ClientDetails({clientData, setClientData, error}) {

    const handleClientTypeChange = () => {
       clientData.clientType === 'person' ?
           setClientData({...clientData, clientType: 'company'})
           :  setClientData({...clientData, clientType: 'person'})
    }

    return (
        <React.Fragment>

            <Grid container spacing={0} justifyContent={'space-around'} direction={'column'}>
                <Grid item position={'relative'} sx={{ }}>

                    <FormGroup>
                        <FormControlLabel control={<Checkbox
                            defaultChecked={clientData.clientType === 'company'}
                            onChange = {handleClientTypeChange}/>} label="Clientul este persoană juridică" />
                    </FormGroup>

                </Grid>
            </Grid>


            <Grid container spacing={1} paddingTop={'3vh'}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        error={error !== "" && clientData.name === ""}
                        label="Nume și prenume"
                        fullWidth
                        autoComplete="family-name"
                        defaultValue={clientData.name}
                        onChange={(event) => {
                            event.target.value = event.target.value.toString().replace(/[^a-zA-Z ]/i, '')
                            setClientData({...clientData, name: event.target.value})
                        }
                        }
                    />
                </Grid>
                {/*<Grid item xs={12} sm={6}>*/}
                {/*    <TextField*/}
                {/*        required*/}
                {/*        error={error !== "" && clientData.firstName === ""}*/}

                {/*        label="Prenume"*/}
                {/*        fullWidth*/}
                {/*        autoComplete="given-name"*/}
                {/*        defaultValue={clientData.firstName}*/}
                {/*        onChange={(event) => {*/}
                {/*            event.target.value = event.target.value.toString().replace(/[^a-zA-Z ]/i, '')*/}
                {/*            setClientData({...clientData, firstName: event.target.value})*/}
                {/*        }*/}
                {/*        }*/}

                {/*    />*/}
                {/*</Grid>*/}


                <Grid item xs={12} sm={12}>
                    <TextField
                        label="Adresă"
                        fullWidth
                        autoComplete="shipping address-level2"
                        defaultValue={clientData.address}
                        onChange={(event) => {
                            setClientData({...clientData, address: event.target.value})
                        }
                        }
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        error={error !== "" && clientData.phone === ""}

                        label="Telefon"
                        fullWidth
                        defaultValue={clientData.phone}
                        onChange={(event) => {
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
                        onChange={(event) =>
                            setClientData({...clientData, email: event.target.value})
                        }
                    />
                </Grid>
            </Grid>

            { clientData.clientType === 'company' &&
                <div>
                    <Grid item paddingTop={"4vh"}>

                        <Grid container spacing={1} alignItems={'center'} justifyContent={'center'} direction={'row'}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    label="Denumirea firmei"
                                    fullWidth
                                    defaultValue={clientData.company}
                                    onChange={(event) => {
                                        setClientData({...clientData, company: event.target.value})
                                    }}

                                />
                            </Grid>



                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Cod unic de înregistrare fiscală (CUI/CIF)"
                                    fullWidth
                                    defaultValue={clientData.CUI}
                                    onChange={(event) => {
                                        setClientData({...clientData, CUI: event.target.value})
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Numărul Registrului Comerțului"
                                    fullWidth
                                    defaultValue={clientData.commerceRegistrationNumber}
                                    onChange={(event) => {
                                        setClientData({...clientData, commerceRegistrationNumber: event.target.value})
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Denumire banca"
                                    fullWidth
                                    defaultValue={clientData.bank}
                                    onChange={(event) => {
                                        setClientData({...clientData, bank: event.target.value})
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="IBAN"
                                    fullWidth
                                    defaultValue={clientData.IBAN}
                                    onChange={(event) => {
                                        setClientData({...clientData, IBAN: event.target.value})
                                    }}
                                />
                            </Grid>


                        </Grid>
                        <Grid container spacing={0}
                              direction="row"
                              justifyContent="flex-end"
                              alignItems="center"
                              lg
                              paddingTop="6px"
                        >
                        </Grid>

                    </Grid>
                </div>
            }
        </React.Fragment>
    );
}