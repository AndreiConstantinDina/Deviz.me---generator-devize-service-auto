import React, {useEffect} from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {useState} from "react";
import {useAuth} from "../../../contexts/AuthContext";
import {db} from '../../authentification/firebase'
import {addDoc, collection, doc, getDoc, setDoc} from '@firebase/firestore'
import { auth } from "../../authentification/firebase"


export default function UserProfileTextInfo({company, setCompany}){

    return (
        <Grid item width={'60vw'} marginTop={"2vh"}>

            <Grid container spacing={3} alignItems={'center'} justifyContent={'center'} direction={'row'}>
                <Grid item xs={12} sm={9}>
                    <TextField
                        label="Denumirea firmei"
                        fullWidth
                        defaultValue={company}
                        onChange={(event) => {
                            setCompany(event.target.value)
                            }
                        }
                        onClick={()=>{console.log(company)}}

                    />
                </Grid>


                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Adresă sediu social"
                        fullWidth
                        autoComplete="family-name"
                        onChange={(event) => {
                        }
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Adresă punct de lucru"
                        fullWidth
                        autoComplete="family-name"
                        onChange={(event) => {
                        }
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Cod unic de înregistrare fiscală (CUI/CIF)"
                        fullWidth
                        autoComplete="family-name"
                        onChange={(event) => {
                        }
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Numărul Registrului Comerțului"
                        fullWidth
                        autoComplete="family-name"
                        onChange={(event) => {
                        }
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Denumire banca"
                        fullWidth
                        autoComplete="family-name"
                        onChange={(event) => {
                        }
                        }
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="IBAN"
                        fullWidth
                        autoComplete="family-name"
                        onChange={(event) => {
                        }
                        }
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

    )
}
