import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button'
import Grid from "@mui/material/Grid";
import {useState} from "react";
import Typography from "@mui/material/Typography";
import AddIcon from '@mui/icons-material/Add';
import IconButton from "@mui/material/IconButton";

export default function AddFinalVerificationToRequirement({itemsData, setItemsData,
                                               addItemLabel, helperText,
                                               labourData, setLabourData,
                                               currentRequirement,
                                                   finalVerificationsList

                                               }) {

    const handleAddNewItem = () => {

        let newItemsData = [...itemsData]

        for (let i = 0; i<newItemsData.length; i++) {
            let element = newItemsData[i]
            if (element.value.newItem !== ''){
                for (let j=0; j< element.value.items.length; j++)
                    if (element.value.items[j] === element.value.newItem)
                        return

                element.value.items.push(element.value.newItem)
                element.value.newItem = ''
                }
            }
        setItemsData(newItemsData)

        let labours = []
        labourData.items.forEach(element => labours.push(element.itemName))
        for (let i = 0; i<newItemsData.length; i++) {
            for (let element of newItemsData[i].value.items)
                labours.push(element)
        }

        labours = new Set(labours)

        let newLabourData = {
            items: [],
            newItem: '',
            options: labourData.options
        }
        labours.forEach(element => {
            if (labourData.items.find((el) => el.itemName === element)) {
                let newPrice = labourData.items.find((el) => el.itemName === element).price
                let newCorrespondsStatus= labourData.items.find((el) => el.itemName === element).corresponds

                newLabourData.items.push({
                    itemName: element,
                    price: newPrice,
                    corresponds: newCorrespondsStatus
                })
            }
            else {
                let newPrice = 0

                if (finalVerificationsList.find((el) => el.item === element) !== undefined)
                    newPrice = finalVerificationsList.find((el) => el.item === element).price

                newLabourData.items.push({
                    itemName: element,
                    price: newPrice,
                    corresponds: ""

                })
            }
        })
        setLabourData(newLabourData)

        }

            //setItemsData({...itemsData, items: items, newItem: ''})


    return (
        <Grid container spacing={0} direction={'row'} justifyContent={'flex-start' } alignItems={'center'}
              sx={{width: '20vw'}}

        >
            <Grid item>
                <Autocomplete
                    size={'small'}
                    freeSolo
                    options={finalVerificationsList !== undefined ? finalVerificationsList.map(e => e.item) : []}
                    sx={{
                        width: '15vw',
                        }}
                    value ={itemsData.find(item => item.key === currentRequirement).value.newItem}
                    renderInput={(params) => <TextField{...params} label={addItemLabel}

                               onChange = {
                                            (event) => {
                                                itemsData.find(item => item.key === currentRequirement).value.newItem = event.target.value
                                                setItemsData([...itemsData])
                                            }
                                        }

                               onSelect = {
                                           (event) => {
                                               itemsData.find(item => item.key === currentRequirement).value.newItem = event.target.value
                                               setItemsData([...itemsData])
                                           }
                                     }
                    />}
                />

            </Grid>

            <Grid item>

                <Button variant="outlined"
                        onClick={() => {handleAddNewItem()}}

                >

                    <AddIcon/>
                </Button>

            </Grid>
        </Grid>
    );
}