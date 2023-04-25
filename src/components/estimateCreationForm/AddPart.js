import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button'
import Grid from "@mui/material/Grid";
import {useState} from "react";
import Typography from "@mui/material/Typography";

function AddPart({partsData, setPartsData}) {
    const handleAddNewPart = () => {
        if (partsData.newPart === '')
            ;
        else {
            const parts = partsData.parts.slice(0)
            var adauga = true;
            for (var i=0; i<parts.length; i++)
                if (parts[i] === partsData.newPart)
                    adauga = false
            if (adauga){
                const newPart = {
                    part: partsData.newPart,
                    quantity: 1,
                    price: 0,
                    total: 0,
                    partCode: '',
                    partManufacturer: '',
                    partInfo: '',
                }
                parts.unshift(newPart)

            }
            setPartsData({...partsData, parts: parts, newPart: ''})

        }

    }
    return (
        <Grid container spacing={3} direction={'row'} justifyContent={'space-between'} alignItems={'center'} width = 'auto' marginBottom={'3vh'}>
            {/*<Grid item >*/}
            {/*    <Typography variant="h6" gutterBottom>*/}
            {/*        Adauga piese in deviz:*/}
            {/*    </Typography>*/}
            {/*</Grid>*/}
            <Grid item>
                <Autocomplete
                    size={'small'}
                    freeSolo
                    id="combo-box-demo"
                    options={['piesa1', 'piesa2']}
                    sx={{width: 300}}
                    value = {partsData.newPart}
                    renderInput={(params) => <TextField{...params} label="Piesa" onChange={
                        (event) => setPartsData({
                            ...partsData,
                            newPart: event.target.value
                        })}
                                                       onSelect = {
                                                           (event) => setPartsData({
                                                               ...partsData,
                                                               newPart: event.target.value
                                                           })}
                    />}
                />

            </Grid>

            <Grid item>

                <Button variant="outlined"
                        onClick={() => {handleAddNewPart()}}
                >

                    Adaugă</Button>

            </Grid>
        </Grid>
    );
}


export default AddPart