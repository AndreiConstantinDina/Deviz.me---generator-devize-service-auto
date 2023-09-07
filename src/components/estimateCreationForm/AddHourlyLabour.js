import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button'
import Grid from "@mui/material/Grid";
import {useState} from "react";
import Typography from "@mui/material/Typography";
import {useAuth} from "../../contexts/AuthContext";
import {useEffect} from "react";
import {doc, getDoc} from "@firebase/firestore";
import {db} from "../authentification/firebase";

export default function AddHourlyLabour({itemsData, setItemsData, helperText, addItemLabel}) {

    const [options, setOptions] = useState([])
    const [price, setPrice] = useState()

    const currentUser = useAuth().currentUser
    const uid = currentUser.uid

    useEffect(() => {
        let docRef = null
        let docSnap = null

        const getOptions = async () => {
            try{
                docRef = await doc(db,  `${uid}lists`, 'hourlyLabours')
                docSnap = await getDoc(docRef);
            }
            catch(e){
            }
        }

        getOptions().then(() => {
                let data = docSnap.data()
                setOptions(data.hourlyLaboursList)
                setPrice(data.hourlyLabourPrice)
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
                if (items[i] === itemsData.newItem)
                    adauga = false
            if (adauga){
                let newPrice = price ? price : 0
                const newItem = {
                    item: itemsData.newItem,
                    quantity: 1,
                    price: newPrice,
                    total: newPrice,
                }
                items.unshift(newItem)

            }
            setItemsData({...itemsData, items: items, newItem: ''})

        }

    }
    return (
        <Grid container spacing={3} direction={'row'} justifyContent={'space-between'} alignItems={'center'} width = 'auto' marginBottom={'3vh'}>
            <Grid item >
                <Typography variant="h6" gutterBottom>
                    {helperText}
                </Typography>
            </Grid>
            <Grid item>
                <Autocomplete
                    size={'small'}
                    freeSolo
                    id="combo-box-demo"
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


