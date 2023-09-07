import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button'
import Grid from "@mui/material/Grid";
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import {doc, getDoc} from "@firebase/firestore";
import {db} from "../authentification/firebase";
import {useAuth} from "../../contexts/AuthContext";

export default function AddItem({itemsData, setItemsData, addItemLabel, helperText}) {

    const [options, setOptions] = useState([])
    const currentUser = useAuth().currentUser
    const uid = currentUser.uid

    useEffect(() => {
        let docRef = null
        let docSnap = null

        const getOptions = async () => {
            try{
                docRef = await doc(db,  `${uid}lists`, 'finalVerifications')
                docSnap = await getDoc(docRef);
            }
            catch(e){
            }
        }

        getOptions().then(() => {
                let data = docSnap.data()
                setOptions(data.finalVerificationsList)
            }
        )
    }, [])

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
                let newPrice = 0

                if (options.find((e) => (e.item === itemsData.newItem)) === undefined)
                    newPrice = 0;
                else newPrice = parseFloat(options.find((e) => (e.item === itemsData.newItem)).price)

                const newItem = {
                    itemName: itemsData.newItem,
                    price: newPrice,
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
                    options={options.map(e => e.item)}
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