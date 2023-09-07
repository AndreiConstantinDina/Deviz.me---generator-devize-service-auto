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
import DownloadIcon from '@mui/icons-material/Download';
import {addDoc, collection, deleteDoc, doc, getDocs} from "@firebase/firestore";
import {useEffect, useState} from "react";
import {db} from "./authentification/firebase";
import {useAuth} from "../contexts/AuthContext";
import ToggleButton from "@mui/material/ToggleButton";
import {styled} from "@mui/material/styles";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid"
import ConfirmCloseAlert from "./alerts/ConfirmCloseAlert";
import ConfirmDeleteAlert from "./alerts/ConfirmDeleteAlert";
import EstimatePreview from "./invoiceGenerator/EstimatePreview";
import {useReactToPrint} from "react-to-print";
import {useRef} from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ArchiveIcon from '@mui/icons-material/Archive';
import ConfirmArchiveAlert from "./alerts/ConfirmArchiveAlert";
import Stack from "@mui/material/Stack";

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

export default function ClosedEstimateClick({element, info, setInfo, deleteElement, usersData, URL, archiveElement}) {
    const currentUser = useAuth().currentUser
    const [open, setOpen] = React.useState(false);
    const [edit, setEdit] = React.useState(false)
    const [save, setSave] = React.useState(false)
    const [confirmClose, setConfirmClose] = React.useState(false)
    const [showConfirmDialog, setShowConfirmDialog] = React.useState(false)
    const [justRendered, setJustRendered] = React.useState(true)
    const [confirmDelete, setConfirmDelete] = React.useState(false)
    const [confirmArchive, setConfirmArchive] = React.useState(false)
    const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = React.useState(false)
    const [showArchiveDialogue, setShowArchiveDialogue] = React.useState(false)

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

    const [step, setStep] = React.useState('client');

    const handleStep = (event, newStep) => {
        if (newStep)
            setStep(newStep);
    };

    const previewDocumentRef = useRef();


    const downloadEstimate = () => {
        const input = previewDocumentRef.current;

        html2canvas(input
            // , {allowTaint: true, foreignObjectRendering: true, scrollY: -window.scrollY}
        ).then((canvas) => {
            const imgWidth = 208;
            const pageHeight = 295;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;
            heightLeft -= pageHeight;
            const doc = new jsPDF('p', 'mm');
            doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                doc.addPage();
                doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
                heightLeft -= pageHeight;
            }
            doc.save(element.carData.plate + ".pdf");
        });
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

                    <Grid container
                          direction="row"
                          justifyContent="space-between"
                          alignItems="flex-start"
                          columns={21}
                    >
                        <Grid item xs={7}>
                            <Typography>
                                {element.carData.plate}
                            </Typography>

                            <Typography>
                                {element.carData.brand}
                            </Typography>

                            <Typography>
                                {element.carData.model}
                            </Typography>

                        </Grid>

                         <Grid item xs={7}>
                             <Stack direction="column" alignItems="flex-end">
                                <Typography>
                                    {element.date}
                                </Typography>

                                 <Typography >
                                    {element.clientData.name}
                                </Typography>

                                <Typography >
                                    {element.clientData.phone}
                                </Typography>
                             </Stack>
                        </Grid>
                    </Grid>

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
                                    <DownloadIcon onClick={() => {
                                        downloadEstimate()
                                    }}>
                                    </DownloadIcon>
                                </IconButton>


                                <IconButton>
                                    <DeleteIcon onClick={handleDelete}>
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

                        {showArchiveDialogue && <ConfirmArchiveAlert
                            message="Sunteți sigur că doriți să arhivați acest deviz? Acest deviz va putea fi vizualizat și descărcat, dar nu va mai putea fi modificat."
                            setJustRendered={setJustRendered}
                            setShowConfirmArchiveDialog={setShowArchiveDialogue}
                            setConfirmArchive={setConfirmArchive}
                            archiveElement={archiveElement}
                            setOpenParent={setOpen}
                            element = {element}
                        />}

                        <Grid container spacing={2}
                              direction="row"
                              justifyContent="center"
                              alignItems="center"
                              lg
                        >

                            <Paper variant="outlined" sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginLeft: '10vw',
                                marginRight: '10vw',
                                marginTop: '10vh',
                                marginBottom: '10vh',

                            }}>
                                <EstimatePreview partsData={element.partsData}
                                                 carData={element.carData}
                                                 problemsData={element.problemsData}
                                                 foundProblemsData={element.foundProblemsData}
                                                 receptionData={element.receptionData}
                                                 problemsDict={element.problemsDict}
                                                 hourlyLabourData={element.hourlyLabourData}
                                                 servicesData={element.servicesData}
                                                 finalVerificationsData={element.finalVerificationsData}
                                                 partsDiscountType={element.partsDiscountType}
                                                 partsDiscount={element.partsDiscount}
                                                 labourDiscountType={element.labourDiscountType}
                                                 labourDiscount={element.labourDiscount}
                                                 recommendationsData={element.recommendationsData}
                                                 previewDocumentRef = {previewDocumentRef}
                                                 clientData={element.clientData}
                                                 usersData = {usersData}
                                                 URL = {URL}
                                                 date = {element.date}
                                />


                                {/*<button onClick={handlePrint}>Download</button>*/}


                            </Paper>


                        </Grid>
                    </Dialog>


                </div>
            }
        </div>

    );
}
