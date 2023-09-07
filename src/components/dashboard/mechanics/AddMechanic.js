import React from 'react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Slide from '@mui/material/Slide'
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {TextField} from "@mui/material";
import {useState} from "react";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../authentification/firebase";
import {db} from '../../authentification/firebase'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import placeHolderImage from '../../images/placeholderImage.jpeg'
import {useAuth} from "../../../contexts/AuthContext";
import {addDoc, collection, doc, setDoc} from "@firebase/firestore";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function AddMechanic({setNewMechanicAdded, newMechanicAdded}) {
    const [open, setOpen] = React.useState(false);
    const currentUser = useAuth().currentUser
    const uid = currentUser.uid

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [imageUpload, setImageUpload] = useState(null);
    const [name, setName] = useState('');
    const [URL, setURL] = useState("");

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleSave = () => {
        const mechanics = collection(db, `${uid}mechanics`)
        const data = {
            name: name,
            imageURL: ''
        }
        addDoc(mechanics, data);
        setNewMechanicAdded(!newMechanicAdded)
        setName('')
        handleClose()
    }


    return (
        <div>
            <Card sx={{maxWidth: '300px', minHeight: '350px',
                ':hover': {
                    boxShadow: 20,
                },
                borderRadius: '10%',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'grid'
            }} onClick={handleClickOpen} elevation={12}>
                <Stack direction="column" alignItems="center" spacing={3}>

                    <AddCircleIcon fontSize={"large"} color={'primary'}/>
                    <Typography>Adaugă un mecanic</Typography>
                </Stack>
            </Card>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{ sx: { borderRadius: "50px", minWidth: '30vw' } }}
                sx={{
                    backdropFilter: "blur(5px) sepia(5%)",
                }}

            >
                <DialogContent>
                    <Stack direction="column" alignItems="center" spacing={2} marginTop={"20px"}>
                            <img src={placeHolderImage} alt=""  object-fit={'cover'} overflow={'hidden'}
                                 style={{maxHeight: '200px', borderRadius: '50%', aspectRatio: '1', objectFit: 'cover', overflow: 'hidden'}}
                            />

                        <TextField variant='outlined' value={name}
                                   label='Nume'
                                   inputProps={{min: 0, style: { textAlign: 'center' }}}
                                   size={'small'}
                                   onChange={handleNameChange}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions style={{ justifyContent: "center" }}>
                    <Button onClick={handleClose}>Anulează</Button>
                    <Button onClick={handleSave}>Adaugă mecanic nou</Button>
                </DialogActions>
            </Dialog>
        </div>    );
}

export default AddMechanic;