import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Container from "@mui/material/Container";
import Paper from '@mui/material/Paper'
import {useEffect, useState} from "react";
import {TextField, MenuItem, Select, InputLabel, FormControl, FormControlLabel, FormGroup, Checkbox} from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default function PartsList({partsData, setPartsData, showCode, showMaker, showInfo, setShowCode, setShowMaker, setShowInfo}) {
    const handlePartDelete = (value) => {
        var parts = partsData.parts.slice(0)
        const index = parts.indexOf(value)
        parts.splice(index, 1);

        setPartsData({
            ...partsData,
            parts: parts
        }, [])
    }


    return (
        <div>

        <List sx={{ width: 'auto',
            bgcolor: 'background.paper' ,
            alignItems: 'flex-start' ,
            }}>
            {partsData.parts.map((part) => (
                <div>
                <ListItem
                    key={part.part}
                    sx={{borderStyle: 'solid',
                        borderWidth: '0.5px',
                        borderColor: 'gray',
                        justifyContent: 'space-around',
                        alignItems: "center",
                        margin: '1vh',
                        borderRadius: '5px',
                        width: '60vw'
                    }}
                >
                    <Grid container spacing={0} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Grid item justifyContent={'flex-start'}>
                            <Typography sx = {{width: '10vw', overflowWrap: 'break-word', fontSize: '100%'}} >
                                {`${part.part}`}
                            </Typography>
                        </Grid>
                        <Grid item justifyContent={'flex-end'}>
                            {showCode && <TextField label={"Cod"} sx ={{width: '6vw'}} defaultValue={part.partCode}
                                onChange={(event) => {
                                       part.partCode = event.target.value
                                   }}
                                   inputProps={{style: {fontSize: '85%'}}}
                        />}

                        {showMaker && <TextField label={"Producator"} sx={{width: '8vw'}} defaultValue={part.partManufacturer}
                                    onChange={(event) => {
                                        part.partManufacturer = event.target.value
                                    }}
                                    inputProps={{style: {fontSize: '85%'}}}

                        />}

                        {showInfo && <FormControl sx={{ width: '8vw'}}>
                            <InputLabel>Info</InputLabel>
                            <Select
                                value={part.partInfo}
                                label="Age"
                                onChange={() => {
                                    setPartsData({
                                        ...partsData,
                                        parts: partsData.parts
                                    }, [])
                                }}

                                sx={{fontSize: '85%'}}
                            >
                                <MenuItem value='' onClick={(event) => {
                                    part.partInfo = ''
                                }}
                                >-</MenuItem>
                                <MenuItem value='Client' onClick={(event) => {
                                    part.partInfo = 'Client'
                                }}
                                >Client</MenuItem>
                                <MenuItem value='Nou'
                                          onClick={(event) => {
                                              part.partInfo = 'Nou'
                                          }}
                                >Nou</MenuItem>
                                <MenuItem value='Recondiționat'
                                          onClick={(event) => {
                                              part.partInfo = 'Recondiționat'
                                          }}
                                >Recondiționat</MenuItem>
                                <MenuItem value='Second Hand' onClick={(event) => {
                                    part.partInfo = 'Second Hand'
                                }}

                                >Second Hand</MenuItem>

                            </Select>
                        </FormControl>
                        }

                        <TextField label={"Preț"} type={'text'} sx ={{width: '8vw'}} value={part.price}
                                   onChange={(event) => {
                                       if (event.target.value >= 0 && event.target.value < 999999){
                                           part.price = event.target.value
                                           part.price!== '' && part.quantity!== '' ?
                                               part.total = (parseFloat(part.price) * parseFloat(part.quantity)).toFixed(2).toString()
                                               : part.total = ''
                                           setPartsData({
                                               ...partsData,
                                               parts: partsData.parts
                                           }, [])
                                       }
                                       else if (event.target.value < 0)
                                           event.target.value = 0
                                       else event.target.value = 999999
                                   }}

                                   inputProps={{style: {fontSize: '85%'}}}
                        />
                        <TextField label={"Buc"} type={'text'} sx ={{width: '5vw'}}
                                   inputProps={{ inputProps: { min: 1, max: 99 }, inputMode: 'numeric', pattern: '[0-9]*' }}
                                   value = {part.quantity}
                                   onChange={(event) => {
                                       if (event.target.value >= 0 && event.target.value <= 99)
                                       {

                                           part.quantity = event.target.value
                                           part.price!== '' && part.quantity!== '' ?
                                               part.total = (parseFloat(part.price) * parseFloat(part.quantity)).toFixed(2).toString()
                                               : part.total = ''
                                           setPartsData({
                                               ...partsData,
                                               parts: partsData.parts
                                           }, [])

                                       }
                                       else if (event.target.value < 0){
                                           part.quantity = 0
                                       }
                                       else part.quantity = 99

                                   }}

                                   inputProps={{style: {fontSize: '85%'}}}
                        />
                        <TextField label={"Total"} sx ={{width: '8vw'}}
                                   InputProps={{
                                       shrink: true,
                                       readOnly: true,
                                   }}
                                   value={part.total}
                                   inputProps={{style: {fontSize: '100%', fontWeight: 'bold'}}}
                                   InputLabelProps={{style: {fontWeight: 'bold', fontSize: '110%'}}}
                                   />




                            <IconButton>
                                <DeleteIcon onClick={() => {handlePartDelete(part)}}>
                                </DeleteIcon>
                            </IconButton>
                        </Grid>
                    </Grid>
                </ListItem>
                </div>
            ))}
        </List>
        </div>
    );
}

