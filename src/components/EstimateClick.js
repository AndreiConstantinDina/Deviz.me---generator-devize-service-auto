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
import {db} from "./authentification/firebase";
import {useAuth} from "../contexts/AuthContext";
import ToggleButton from "@mui/material/ToggleButton";
import {styled} from "@mui/material/styles";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid"


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
        margin: theme.spacing(5),
        marginBottom: 0,

        paddingTop: 0,
        border: 0,
        '&.Mui-disabled': {
            border: 0,
        },
        '&:not(:first-of-type)': {
            borderRadius: theme.shape.borderRadius,
        },
        '&:first-of-type': {
            borderRadius: theme.shape.borderRadius,
        },
    },
}));

export default function EstimateClick({element, info, setInfo}) {
    const currentUser = useAuth().currentUser
    const uid = currentUser.uid
    const estimatesRef = collection(db, `${uid}`) // luam colectia de devize din firestore
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
            console.log(data)
            setInfo(data.docs.map((doc) => ({...doc.data(), id: doc.id, date: doc.data().date})))
        }
        getEstimates()
    }

    useEffect(() => {
        newInformation()
    }, []);

    const deleteElement = (id) => {
        const docRef = doc(db, `${uid}`, id);
        // console.log(uid)
        deleteDoc(docRef)
            .then(() => {
                console.log("Element sters")
            })
            .catch(error => {
                console.log(error);
            })
        handleClose()
        newInformation()
    }

    const [step, setStep] = React.useState('client');

    const handleStep = (event, newStep) => {
        if (newStep)
            setStep(newStep);
    };

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
                <Grid container spacing={2}
                      direction="row"
                      justifyContent="start"
                      alignItems="center"
                      lg
                >
                {/*navigation system*/}
                    <Grid item xs="auto">
                    <Container display="flex" component="main" maxWidth="xs" sx={{ mb: 4, justifyContent: 'space-between'}}>

                            <StyledToggleButtonGroup
                                size="small"
                                value={step}
                                exclusive
                                onChange={handleStep}
                                aria-label="text alignment"
                                orientation="vertical"
                                fullWidth
                            >
                                <ToggleButton value="client" aria-label="left aligned">
                                    <Typography variant="h6" gutterBottom sx={{justifyContent: "center", display: 'block', paddingTop: "30px"}}>
                                        Client
                                    </Typography>
                                </ToggleButton>
                                <ToggleButton value="car" aria-label="left aligned">
                                    <Typography variant="h6" gutterBottom sx={{justifyContent: "center", display: 'block', paddingTop: "30px"}}>
                                        Autovehicul
                                    </Typography>
                                </ToggleButton>
                                <ToggleButton value="clientReportedProblems" aria-label="left aligned">
                                    <Typography variant="h6" gutterBottom sx={{justifyContent: "center", display: 'block', paddingTop: "30px"}}>
                                        Descriere defectiuni
                                    </Typography>
                                </ToggleButton>
                                <ToggleButton value="foundProblems" aria-label="left aligned">
                                    <Typography variant="h6" gutterBottom sx={{justifyContent: "center", display: 'block', paddingTop: "30px"}}>
                                        Cerinte de service
                                    </Typography>
                                </ToggleButton>

                            </StyledToggleButtonGroup>

                    </Container>
                    </Grid>

                    {/*/navigation system*/}

                    <Grid item lg>
                        <Container component="main" maxWidth="lg" sx={{ mb: 4, justifyContent: 'center',height: '100%', width: '100%'}}>

                        {step==="client" && <Container >

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
                        </Container>}

                        {step==="car" && <Container>

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
                        </Container>}

                        {step==="clientReportedProblems" && <Container>

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
                        </Container>}
                        {step==="foundProblems" && <Container>

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
                        </Container>}
                        </Container>

                    </Grid>

                </Grid>













            </Dialog>
        </div>
    );
}
