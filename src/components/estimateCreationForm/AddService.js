import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button'
import Grid from "@mui/material/Grid";
import {useState, useEffect} from "react";
import Typography from "@mui/material/Typography";
import {doc, getDoc} from "@firebase/firestore";
import {db} from "../authentification/firebase";
import {useAuth} from "../../contexts/AuthContext";

export default function AddService({itemsData, setItemsData, helperText, addItemLabel}) {

    const [servicesOptions, setServicesOptions] = useState([])
    const currentUser = useAuth().currentUser
    const uid = currentUser.uid


    useEffect(() => {
        let docRef = null
        let docSnap = null

        const getServicesData = async () => {
            try{
                docRef = await doc(db,  `${uid}lists`, 'services')
                docSnap = await getDoc(docRef);
            }
            catch(e){
            }
        }

        getServicesData().then(() => {
                let data = docSnap.data()
                setServicesOptions(data.servicesList)
            }
        )
    }, [])

    const handleAddNewItem = () => {
        if (itemsData.newItem === '' || itemsData.newItem === undefined)
            ;
        else {
            const items = itemsData.items.slice(0)
            var adauga = true;
            for (var i=0; i<items.length; i++)
                if (items[i] === itemsData.newItem)
                    adauga = false
            if (adauga){
                let newPrice = 0

                if (servicesOptions.find((e) => (e.item === itemsData.newItem)) === undefined)
                    newPrice = 0;
                else newPrice = parseFloat(servicesOptions.find((e) => (e.item === itemsData.newItem)).price)

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
                {/*<Typography variant="h6" gutterBottom>*/}
                {/*    {helperText}*/}
                {/*</Typography>*/}
            </Grid>
            <Grid item>
                <Autocomplete
                    size={'small'}
                    freeSolo
                    id="combo-box-demo"
                    options={servicesOptions.map( e => e.item)}
                    sx={{width: 300}}
                    value = {itemsData.newItem}
                    renderInput={(params) => <TextField{...params} label={addItemLabel}

                        onChange={
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


