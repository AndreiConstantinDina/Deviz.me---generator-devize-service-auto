import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button'
import Grid from "@mui/material/Grid";
import {useState} from "react";
import Typography from "@mui/material/Typography";

function AddReceptionInfo({receptionData, setReceptionData, addReceptionData, helperText}) {
    const handleAddNewInfo = () => {
        if (receptionData.newInfo === '')
            ;
        else {
            const receptionInfo = receptionData.info.slice(0)
            var adauga = true;
            for (var i=0; i<receptionInfo.length; i++)
                if (receptionInfo[i] === receptionData.newInfo)
                    adauga = false
            if (adauga)
                receptionInfo.push(receptionData.newInfo)
            setReceptionData({...receptionInfo, info: receptionInfo, newInfo: ''})

        }
    }
    return (
        <Grid container spacing={3} direction={'row'} justifyContent={'space-between'} alignItems={'center'} width = 'auto' marginBottom={'3vh'}>
            {/*<Grid item>*/}
            {/*    <Typography fontSize={'140%'}>*/}
            {/*        {helperText}*/}
            {/*    </Typography>*/}
            {/*</Grid>*/}
            <Grid item>
                <Autocomplete
                    size={'small'}
                    freeSolo
                    options={['1','2']}
                    sx={{width: 300}}
                    value = {receptionData.newInfo}
                    renderInput={(params) => <TextField{...params} label={addReceptionData} onChange={
                        (event) => setReceptionData({
                            ...receptionData,
                            newInfo: event.target.value
                        })}
                                                       onSelect = {
                                                           (event) => setReceptionData({
                                                               ...receptionData,
                                                               newInfo: event.target.value
                                                           })}
                    />}
                />

            </Grid>

            <Grid item>

                <Button variant="outlined"
                        onClick={() => {handleAddNewInfo()}}
                >

                    Adaugă</Button>

            </Grid>
        </Grid>
    );
}


export default AddReceptionInfo