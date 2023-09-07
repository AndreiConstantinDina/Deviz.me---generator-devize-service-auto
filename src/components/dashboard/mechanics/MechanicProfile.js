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
import {db, storage} from "../../authentification/firebase";
import placeHolderImage from '../../images/placeholderImage.jpeg'
import {useAuth} from "../../../contexts/AuthContext";
import {collection, doc, deleteDoc} from "@firebase/firestore";
import { setDoc } from "firebase/firestore";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function MechanicProfile(props) {
    const [open, setOpen] = React.useState(false);
    const currentUser = useAuth().currentUser
    const uid = currentUser.uid

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [name, setName] = useState(props.name)
    const [imageURL, setImageURL] = useState(props.imageURL)
    const [id, setId] = useState(props.id)

    const [imageUpload, setImageUpload] = useState(null);

    const handleImageChange = (event) => {
        setImageUpload(event.target.files[0]);
        const imageRef = ref(storage, `images/${uid}-mechanic-${name}`);
        uploadBytes(imageRef, event.target.files[0]).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((URL) => {
                setImageURL(URL)
                const newData = {
                    name: name,
                    imageURL: URL
                }
                const mechanicsRef = doc(db, `${uid}mechanics`, props.id)
                setDoc(mechanicsRef, newData).then(() => {
                }).catch((e) => {

                    }
                )
            });
        });

    };

    const handleNameChange = (e) => {
        setName(e.target.value);
        const newData = {
            name: e.target.value,
            imageURL: imageURL
        }
        const mechanicsRef = doc(db, `${uid}mechanics`, props.id)
        setDoc(mechanicsRef, newData).then(() => {
        }).catch((e) => {
            }
        )
    };

    const handleDelete = () => {
        const mechanicRef = doc(db, `${uid}mechanics`, id)
        deleteDoc(mechanicRef).then(
            props.setNewMechanicAdded(!props.newMechanicAdded)
        ).catch()
        handleClose()
    }

    return (
        <div>
            <Card sx={{maxWidth: '300px', minHeight: '350px',
                ':hover': {
                    boxShadow: 20,
                },
                borderRadius: '10%'
            }} onClick={handleClickOpen} elevation={12}>
                <Stack direction="column" alignItems="center" spacing={2} marginTop={"20px"}>
                    {imageURL !== '' ?
                        <img src={imageURL} alt="Mecanic"
                             style={{maxHeight: '200px', borderRadius: '50%', aspectRatio: '1', objectFit: 'cover', overflow: 'hidden',
                                 ':hover': {
                                     borderRadius: '20%'
                                 },
                             }}
                        />
                        :
                        <img src={placeHolderImage} alt="Mecanic"
                             style={{maxHeight: '200px', borderRadius: '50%', aspectRatio: '1', objectFit: 'cover', overflow: 'hidden',
                                 ':hover': {
                                     borderRadius: '20%'
                                 },
                             }}
                        />

                    }
                    <Typography>{name}</Typography>
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
                        <IconButton sx={{alignSelf: 'flex-end'}}>
                            <DeleteIcon onClick={handleDelete} fontSize={"large"} color={'error'}/>
                        </IconButton>
                        {imageURL !== '' ?
                            <img src={imageURL} alt="Mecanic"
                                 style={{maxHeight: '200px', borderRadius: '50%', aspectRatio: '1', objectFit: 'cover', overflow: 'hidden',
                                     ':hover': {
                                         borderRadius: '20%'
                                     },
                                }}
                            />
                            :
                            <img src={placeHolderImage} alt="Mecanic"
                            style={{maxHeight: '200px', borderRadius: '50%', aspectRatio: '1', objectFit: 'cover', overflow: 'hidden',
                            ':hover': {
                            borderRadius: '20%'
                        },
                        }}
                            />

                        }
                        <Button variant="contained" component={'label'}>
                            Schimbă fotografia
                            <input hidden accept="image/*" type="file" onChange={handleImageChange}/>
                        </Button>
                        <TextField variant='outlined' value={name}
                                   label='Nume'
                                   inputProps={{min: 0, style: { textAlign: 'center' }}}
                                   size={'small'}
                                   onChange={handleNameChange}
                        />                    </Stack>
                </DialogContent>

            </Dialog>
        </div>    );
}

export default MechanicProfile;