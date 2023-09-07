import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button'
import Grid from "@mui/material/Grid";
import {useState} from "react";
import Typography from "@mui/material/Typography";
import AddIcon from '@mui/icons-material/Add';
import IconButton from "@mui/material/IconButton";

export default function AddHourlyLabourToRequirement({itemsData, setItemsData,
                                                         addItemLabel, helperText,
                                                         labourData, setLabourData,
                                                         currentRequirement,
                                                         servicesList,
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
        // de initializat cu elementele existente in lista de manopera. de facut si pentru addlabourtorequirement!!!
        let labours = []
        labourData.items.forEach(element => labours.push(element.item))

        for (let i = 0; i<newItemsData.length; i++) {
            for (let element of newItemsData[i].value.items)
                labours.push(element)
        }

        if (labours.length === 0){
            setLabourData([])
            return
        }


        labours = new Set(labours)

        let newLabourData = {
            items: [],
            newItem: '',
            options: labourData.options
        }
        labours.forEach(element => {
            if (labourData.items.find((el) => el.item === element)) {
                let newPrice = labourData.items.find((el) => el.item === element).price
                let newQuantity = labourData.items.find((el) => el.item === element).quantity
                let newTotal = labourData.items.find((el) => el.item === element).total


                newLabourData.items.push({
                    item: element,
                    price: newPrice,
                    quantity: newQuantity,
                    total: newTotal
                })
            }
            else {
                let newPrice = 0

                if (servicesList.find((el) => el.item === element) !== undefined)
                    newPrice = servicesList.find((el) => el.item === element).price

                newLabourData.items.push({
                    item: element,
                    price: newPrice,
                    quantity: 1,
                    total: 0
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
                    options={servicesList !== undefined ? servicesList.map(e => e.item) : []}
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