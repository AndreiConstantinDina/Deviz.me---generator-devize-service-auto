import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {useState, useEffect} from 'react'

import axios from 'axios'



export default function CarBrand({carData, setCarData}) {

    const [carBrands, setCarBrands] = useState([])
    //getAllCarBrands().forEach(item => carBrands.push(item));
    useEffect(() =>{
            axios.get('https://parseapi.back4app.com/classes/Carmodels_Car_Model_List?limit=1000&keys=Make', {
                headers: {
                    'X-Parse-Application-Id': 'PMt2m00nC5cTN7QyFYe2jLBFpoKZIfHr84HtkG4e', // This is your app's application id
                    'X-Parse-REST-API-Key': 'FW5kVmVUSIkjlhrCsa2l4rJFsK3XKjPhhjfSl8X0', // This is your app's REST API key
                }
            })
                //.then(res => {res.data.results.forEach(element => console.log(element.Make))}) // this prints all makes
                .then(res => {
                    setCarBrands(res.data.results.reduce((accumulator, current) => {
                        if (!accumulator.find((item) => item.Make === current.Make)) {
                            accumulator.push(current);
                        }
                        return accumulator;
                    }, []).map(item => item.Make).sort())
                })
                .catch(err => {})

    }, [])




    //const [brand, setBrand] = React.useState('');
    //
    // const handleChange = (event) => {
    //     setBrand(event.target.value);
    // };
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Marca</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="marca"
                    value={carData.brand}
                    onChange={(event) => setCarData ({...carData, brand: event.target.value, model: '', year: '', type: ''})}
                >
                    {
                        carBrands.map(item => <MenuItem value={item}>{item}</MenuItem>)
                    }

                </Select>
            </FormControl>
        </Box>
    );
}