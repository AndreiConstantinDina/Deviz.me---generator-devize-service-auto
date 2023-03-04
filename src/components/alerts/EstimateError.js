import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react'

export default function EstimateError( props ) {
    const [show, setShow] = useState(true)

    useEffect(() => {
        const timeId = setTimeout(() => {
            // After 3 seconds set the show value to false
            setShow(false)
        }, 3000)

        return () => {
            clearTimeout(timeId)
        }
    }, []);


    if (!show) {
        return null;
    }

    return (
        <Alert severity="error" style={{position: "absolute", bottom: 0, right: 0, margin: 10, borderRadius: 10, width: 'auto'}}>
            <AlertTitle >Eroare</AlertTitle>
            {props.error}
        </Alert>
    );
}