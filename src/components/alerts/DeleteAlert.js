import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export default function DeleteAlert() {
    return (
            <Alert severity="success">
                <AlertTitle>Succes</AlertTitle>
                Devizul a fost sters!
            </Alert>
    );
}