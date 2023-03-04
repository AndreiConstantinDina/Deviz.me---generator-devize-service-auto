import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ClientDetails from './estimateCreationForm/ClientDetails';
import CarDetails from './estimateCreationForm/CarDetails';
import ProblemsDescribedByClient from "./estimateCreationForm/ProblemsDescribedByClient";
import ProblemsFoundByService from "./estimateCreationForm/ProblemsFoundByService";
import {useRef, useState} from "react";
import {db} from './estimateCreationForm/firebase'
import {useEffect} from "react";
import {collection, getDocs, doc, deleteDoc} from "@firebase/firestore";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EstimateClick from "./EstimateClick";


const theme = createTheme();

function Estimates() {

    const [info, setInfo] =  useState([]);
    const estimatesRef = collection(db, "devize") // luam colectia de devize din firestore

    const newInformation = () => {
        const getEstimates = async () => {
            const data = await getDocs(estimatesRef)
            setInfo(data.docs.map((doc) => ({...doc.data(), id: doc.id, date: doc.data().date})))
        }
        getEstimates()
    }

    useEffect(() => {
        newInformation()
    }, []);

    const deleteElement = (id) => {
        const docRef = doc(db, "devize", id);
        deleteDoc(docRef)
            .then(() => {
                console.log("Element sters")
            })
            .catch(error => {
                console.log(error);
            })
        newInformation()
    }


    console.log(info)

    return (

        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="sm" sx={{ mb: 4, justifyContent: 'space-between'}}>

            <Typography variant="h5" gutterBottom sx={{justifyContent: "center", display: 'block', paddingTop: "30px"}}>
                Lista devize existente:
            </Typography>
            </Container>
            <CssBaseline />
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    position: 'relative',
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            >

            </AppBar>
            <Container component="main" maxWidth="sm" sx={{ mb: 4, justifyContent: 'space-between'}}>

                {info.map((element) => {
                    return(
                    <React.Fragment sx={{display: 'grid'}}>
                        <EstimateClick element = {element} info = {info} setInfo= {setInfo}/>

                        {/*<Paper variant="outlined" sx={{my: {xs: 3, md: 1},*/}
                        {/*    p: {xs: 1, md: 3},*/}
                        {/*    display: 'flex',*/}
                        {/*    justifyContent: 'space-between'*/}
                        {/*}}*/}
                        {/*>*/}
                        {/*        <Typography>*/}
                        {/*            {element.carData.plate}*/}
                        {/*        </Typography>*/}

                        {/*        <Typography>*/}
                        {/*            {element.clientData.lastName} {element.clientData.firstName}*/}
                        {/*        </Typography>*/}


                        {/*        <Typography>*/}
                        {/*            {element.date}*/}
                        {/*        </Typography>*/}
                        {/*        <IconButton>*/}
                        {/*            <DeleteIcon onClick={()=>deleteElement(element.id)}>*/}
                        {/*            </DeleteIcon>*/}
                        {/*        </IconButton>*/}
                        {/*    </Paper>*/}

                        </React.Fragment>)
                    }
                )}
            </Container>
        </ThemeProvider>
    );
}

export default Estimates;