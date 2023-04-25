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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import {collection, deleteDoc, doc, getDocs} from "@firebase/firestore";
import {useEffect, useState} from "react";
import {db} from "./authentification/firebase";
import {useAuth} from "../contexts/AuthContext";
import ToggleButton from "@mui/material/ToggleButton";
import {styled} from "@mui/material/styles";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid"
import {TextField} from "@mui/material";
import EditEstimate from "./EditEstimate"
import ConfirmCloseAlert from "./alerts/ConfirmCloseAlert";
import ConfirmDeleteAlert from "./alerts/ConfirmDeleteAlert";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const steps = ['client', 'car', 'problemsDescription', 'serviceRequirements', 'reception', 'repairRequirements', 'parts', 'labour', 'recommendations']

const stepsDict = {
    'client': 'Client',
    'car': 'Autovehicul',
    'problemsDescription': 'Descriere defecțiuni',
    'serviceRequirements': 'Cerințe de service',
    'reception': 'Recepție autovehicul',
    'repairRequirements': 'Constatari în service',
    'parts': 'Piese',
    'labour': 'Manopera',
    'recommendations': "Recomandări service",

}

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

export default function EstimateClick({element, info, setInfo, deleteElement}) {
    const currentUser = useAuth().currentUser
    const [open, setOpen] = React.useState(false);
    const [edit, setEdit] = React.useState(false)
    const [save, setSave] = React.useState(false)
    const [confirmClose, setConfirmClose] = React.useState(false)
    const [showConfirmDialog, setShowConfirmDialog] = React.useState(false)
    const [justRendered, setJustRendered] = React.useState(true)
    const [confirmDelete, setConfirmDelete] = React.useState(false)
    const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = React.useState(false)

    const handleDelete = () => {
        setShowConfirmDeleteDialog(true)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setJustRendered(false)
        if (edit)
            setShowConfirmDialog(true)
        if (!edit) {
            setSave(false)
            setEdit(false)
            setOpen(false)
        }
    };
    const handleSave = () => {
        setSave(true)
    }
    const editElement = () => {
        setEdit(!edit)
    }

    const [step, setStep] = React.useState('client');

    const handleStep = (event, newStep) => {
        if (newStep)
            setStep(newStep);
    };

    return (<div>
            {!edit &&
                <div>
                    <React.Fragment sx={{display: 'grid'}}>
                <span>
                <Paper variant="outlined" sx={{
                    my: {xs: 3, md: 1},
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

                        <AppBar sx={{position: 'relative'}}>
                            <Toolbar>
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    onClick={handleClose}
                                    aria-label="close"
                                >
                                    <CloseIcon/>
                                </IconButton>
                                <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                                    {element.carData.plate}
                                </Typography>

                                <IconButton>
                                    <EditIcon onClick={() => {
                                        setEdit(!edit)
                                    }}>
                                    </EditIcon>
                                </IconButton>
                                <IconButton>
                                    <DeleteIcon onClick={() => {
                                        handleDelete()
                                    }}>
                                    </DeleteIcon>
                                </IconButton>

                            </Toolbar>
                        </AppBar>
                        {showConfirmDeleteDialog && <ConfirmDeleteAlert
                            message="Sunteți sigur că doriți să ștergeți acest deviz? Această operație este permanentă."
                            setJustRendered={setJustRendered}
                            setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
                            setConfirmDelete={setConfirmDelete}
                            deleteElement={deleteElement}
                            setOpenParent={setOpen}
                            element = {element}
                        />}
                        <Grid container spacing={2}
                              direction="row"
                              justifyContent="center"
                              alignItems="center"
                              lg
                        >
                            <Typography>
                                aici va fi devizul ca document
                            </Typography>
                        </Grid>
                    </Dialog>
                </div>
            }
            {edit &&
                <div>
                    <React.Fragment sx={{display: 'grid'}}>
                <span>
                <Paper variant="outlined" sx={{
                    my: {xs: 3, md: 1},
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
                        <AppBar sx={{position: 'relative'}}>
                            <Toolbar>
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    onClick={handleClose}
                                    aria-label="close"
                                >
                                    <CloseIcon/>
                                </IconButton>
                                <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                                    {element.carData.plate}
                                </Typography>
                                <Button autoFocus color="inherit" onClick={handleSave}>
                                    save
                                </Button>


                            </Toolbar>
                        </AppBar>
                        {!justRendered && showConfirmDialog && <ConfirmCloseAlert
                            message="Sunteți sigur că doriți să închideți această fereastră? Orice modificare nesalvată se va pierde"
                            setJustRendered={setJustRendered}
                            setConfirmClose={setConfirmClose}
                            setShowConfirmDialog={setShowConfirmDialog}
                            showConfirmDialog={showConfirmDialog}
                            setOpenParent={setOpen}
                            setSave={setSave}
                            setEdit={setEdit}
                        />}

                        <Grid container spacing={2}
                              direction="row"
                              justifyContent="start"
                              alignItems="center"
                              lg
                        >
                            {/*navigation system*/}
                            <Grid item xs="auto">
                                <Container display="flex" component="main" maxWidth="xs"
                                           sx={{mb: 4, justifyContent: 'space-between'}}>

                                    <StyledToggleButtonGroup
                                        size="small"
                                        value={step}
                                        exclusive
                                        onChange={handleStep}
                                        aria-label="text alignment"
                                        orientation="vertical"
                                        fullWidth
                                    >
                                        {steps.map((element) => {
                                            return <ToggleButton value={element} aria-label="left aligned" sx={{height: '7vh', justifyContent: 'center', alignItems: 'center'}}>
                                                <Typography variant="h6" gutterBottom
                                                            sx={{justifyContent: "center", display: 'block', paddingTop: "3.5vh"}}>
                                                    {stepsDict[element]}
                                                </Typography>
                                            </ToggleButton>
                                        })}

                                    </StyledToggleButtonGroup>

                                </Container>
                            </Grid>

                            {/*/navigation system*/}
                            <Grid item lg>
                                <Container>


                                        <EditEstimate element = {element} step = {step} info = {info} setInfo={setInfo} save = {save} setSave = {setSave}
                                            setEdit = {setEdit} handleClose = {handleClose} setJustRendered = {setJustRendered}
                                                      setShowConfirmDialog = {setShowConfirmDialog}
                                        />
                                </Container>
                            </Grid>
                        </Grid>
                    </Dialog>
                </div>
            }
    </div>

    );
}
