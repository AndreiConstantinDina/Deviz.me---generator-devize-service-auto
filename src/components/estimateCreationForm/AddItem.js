import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button'
import Grid from "@mui/material/Grid";
import {useState} from "react";
import Typography from "@mui/material/Typography";

export default function AddItem({itemsData, setItemsData, addItemLabel, helperText}) {
    const handleAddNewItem = () => {
        if (itemsData.newItem === '')
            ;
        else {
            const items = itemsData.items.slice(0)
            var adauga = true;
            for (var i=0; i<items.length; i++)
                if (items[i].itemName === itemsData.newItem)
                    adauga = false
            if (adauga){
                const newItem = {
                    itemName: itemsData.newItem,
                    price: 0,
                    corresponds: ""

                }
                items.unshift(newItem)

            }
            setItemsData({...itemsData, items: items, newItem: ''})

        }

    }
    return (
        <Grid container spacing={3} direction={'row'} justifyContent={'space-between'} alignItems={'center'} width = 'auto' marginBottom={'3vh'}>
            <Grid item>
                {/*<Typography fontSize={'140%'}>*/}
                {/*    {helperText}*/}
                {/*</Typography>*/}
            </Grid>
            <Grid item>
                <Autocomplete
                    size={'small'}
                    freeSolo
                    options={itemsData.options}
                    sx={{width: 300}}
                    value = {itemsData.newItem}
                    renderInput={(params) => <TextField{...params} label={addItemLabel} onChange={
                        (event) => setItemsData({
                            ...itemsData,
                            newItem: event.target.value
                        })}
                                                       onSelect = {
                                                           (event) => setItemsData({
                                                               ...itemsData,
                                                                newItem: event.target.value
                                                           })}
                    />}
                />

            </Grid>

            <Grid item>

                <Button variant="outlined"
                        onClick={() => {handleAddNewItem()}}
                >

                    Adaugă</Button>

            </Grid>
        </Grid>
    );
}