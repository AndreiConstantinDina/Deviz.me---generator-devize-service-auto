import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmDeleteAlert({element, message, setJustRendered, setShowConfirmDeleteDialog, setConfirmDelete, deleteElement, setOpenParent}) {
    const [open, setOpen] = React.useState(true);

    const confirm = () => {
        setConfirmDelete(true)
        setShowConfirmDeleteDialog(false)
        setJustRendered(false)
        try{
            deleteElement(element.id)
        }
        catch(e){
        }
        setOpenParent(false)
    }

    const handleClose = () => {
        setShowConfirmDeleteDialog(false)
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
                        Șterge devizul
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}