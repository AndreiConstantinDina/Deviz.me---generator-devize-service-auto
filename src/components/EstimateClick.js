import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";

import DeleteIcon from "@mui/icons-material/Delete";
import {collection, deleteDoc, doc, getDocs} from "@firebase/firestore";
import {useEffect, useState} from "react";
import {db} from "./firebase";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function EstimateClick({element, info, setInfo}) {
    const estimatesRef = collection(db, "devize") // luam colectia de devize din firestore

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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


    return (
        <div>
            <React.Fragment sx={{display: 'grid'}}>
                <span>
                <Paper variant="outlined" sx={{my: {xs: 3, md: 1},
                    p: {xs: 1, md: 3},
                    display: 'flex',
                    justifyContent: 'space-between'

                }} onClick={handleClickOpen}
                >


                    <Typography>
                        {element.carData.plate}
                    </Typography>

                    <Typography>
                        {element.clientData.lastName} {element.clientData.firstName}
                    </Typography>


                    <Typography>
                        {element.date}
                    </Typography>
                </Paper>
                </span>

            </React.Fragment>

            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {element.carData.plate}
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            save
                        </Button>
                        <IconButton>
                            <DeleteIcon onClick={()=>deleteElement(element.id)}>
                            </DeleteIcon>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Container component="main" maxWidth="sm" sx={{ mb: 4, justifyContent: 'center'}}>
                    <Typography variant="h5" gutterBottom sx={{justifyContent: "center", display: 'block', paddingTop: "30px"}}>
                        Informatii client:</Typography>
                    <Paper variant="outlined" sx={{my: {xs: 3, md: 1},
                        p: {xs: 1, md: 3},
                        display: 'flex',
                        justifyContent: 'space-between'

                    }}>
                        <List>
                            <ListItem>
                                <ListItemText>
                                    Numele clientului: {element.clientData.lastName} {element.clientData.firstName}
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    Adresa: {element.clientData.county}, {element.clientData.city}, {element.clientData.address}
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    Telefon: {element.clientData.phone}
                                </ListItemText>
                            </ListItem>

                            <ListItem>
                                <ListItemText>
                                    E-mail: {element.clientData.email}
                                </ListItemText>
                            </ListItem>


                        </List>
                    </Paper>
                </Container>

                <Container component="main" maxWidth="sm" sx={{ mb: 4, justifyContent: 'center'}}>
                    <Typography variant="h5" gutterBottom sx={{justifyContent: "center", display: 'block', paddingTop: "30px"}}>
                        Informatii masina:</Typography>
                <Paper variant="outlined" sx={{my: {xs: 3, md: 1},
                    p: {xs: 1, md: 3},
                    display: 'flex',
                    justifyContent: 'space-between'

                }}>
                <List>
                    <ListItem>
                        <ListItemText>
                            Numar de inmatriculare: {element.carData.plate}
                        </ListItemText>
                    </ListItem>

                    <ListItem>
                        <ListItemText>
                            VIN: {element.carData.vin}
                        </ListItemText>
                    </ListItem>

                    <ListItem>
                        <ListItemText>
                            Marca: {element.carData.brand}
                        </ListItemText>
                    </ListItem>

                    <ListItem>
                        <ListItemText>
                            Model: {element.carData.model}
                        </ListItemText>
                    </ListItem>

                    <ListItem>
                        <ListItemText>
                            An fabricatie: {element.carData.year}
                        </ListItemText>
                    </ListItem>

                    <ListItem>
                        <ListItemText>
                            Corp caroserie: {element.carData.type}
                        </ListItemText>
                    </ListItem>

                    <ListItem>
                        <ListItemText>
                            Cod motor: {element.carData.code}
                        </ListItemText>
                    </ListItem>

                    <ListItem>
                        <ListItemText>
                            Capacitate cilindrica (cc): {element.carData.capacity}
                        </ListItemText>
                    </ListItem>

                    <ListItem>
                        <ListItemText>
                            Culoarea masinii: {element.carData.color}
                        </ListItemText>
                    </ListItem>


                    <ListItem>
                        <ListItemText>
                            Carburant: {element.carData.fuel}
                        </ListItemText>
                    </ListItem>
                </List>
                </Paper>
                </Container>

                <Container component="main" maxWidth="sm" sx={{ mb: 4, justifyContent: 'center'}}>
                    <Typography variant="h5" gutterBottom sx={{justifyContent: "center", display: 'block', paddingTop: "30px"}}>
                        Probleme raportate de client:</Typography>
                    <Paper variant="outlined" sx={{my: {xs: 3, md: 1},
                        p: {xs: 1, md: 3},
                        display: 'flex',
                        justifyContent: 'space-between'

                    }}>
                        <List>
                            {element.problemsData.problems.map(
                                (problem) => {
                                    return(
                                        <ListItem>
                                            {problem}
                                        </ListItem>
                                    )
                                }
                            )}

                        </List>
                    </Paper>
                </Container>
                <Container component="main" maxWidth="sm" sx={{ mb: 4, justifyContent: 'center'}}>
                    <Typography variant="h5" gutterBottom sx={{justifyContent: "center", display: 'block', paddingTop: "30px"}}>
                        Cerinte service:</Typography>
                    <Paper variant="outlined" sx={{my: {xs: 3, md: 1},
                        p: {xs: 1, md: 3},
                        display: 'flex',
                        justifyContent: 'space-between'

                    }}>
                        <List>
                            {element.foundProblemsData.problems.map(
                                (problem) => {
                                    return(
                                        <ListItem>
                                            {problem}
                                        </ListItem>
                                    )
                                }
                            )}

                        </List>
                    </Paper>
                </Container>

            </Dialog>
        </div>
    );
}
