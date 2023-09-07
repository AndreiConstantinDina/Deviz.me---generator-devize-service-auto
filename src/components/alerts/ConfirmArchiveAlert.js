import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmArchiveAlert({element, message, setJustRendered, setShowConfirmArchiveDialog, setConfirmArchive, archiveElement, setOpenParent}) {
    const [open, setOpen] = React.useState(true);

    const confirm = () => {
        setConfirmArchive(true)
        setShowConfirmArchiveDialog(false)
        setJustRendered(false)
        try{
            archiveElement(element.id)
        }
        catch(e){
        }
        setOpenParent(false)
    }

    const handleClose = () => {
        setShowConfirmArchiveDialog(false)
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Atenție!"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Anulează</Button>
                    <Button onClick={confirm} autoFocus>
                        Închide devizul
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}