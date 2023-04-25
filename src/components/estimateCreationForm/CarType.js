import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {useState, useEffect} from 'react'

import axios from 'axios'



export default function CarType({carData, setCarData}) {

    const [carTypes, setCarTypes] = useState([])

    useEffect(() =>{
        const where = encodeURIComponent(JSON.stringify({
            "Make": `${carData.brand}`,
            "Model": `${carData.model}`,
            "Year": `${carData.year}`
        }));
        axios.get(`https://parseapi.back4app.com/classes/Carmodels_Car_Model_List?limit=1000&keys=Category&where=${where}`, {
            headers: {
                'X-Parse-Application-Id': 'PMt2m00nC5cTN7QyFYe2jLBFpoKZIfHr84HtkG4e', // This is your app's application id
                'X-Parse-REST-API-Key': 'FW5kVmVUSIkjlhrCsa2l4rJFsK3XKjPhhjfSl8X0', // This is your app's REST API key
            }
        })
            .then(res => {
                setCarTypes(res.data.results.reduce((accumulator, current) => {
                    if (!accumulator.find((item) => item.Category === current.Category)) {
                        accumulator.push(current);
                    }
                    return accumulator;
                }, []).map(item => item.Category).sort())
            })
            .catch(err => {})

    }, [carData])


    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Caroserie</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={carData.type}
                    label="type"
                    onChange={(event) => setCarData ({...carData, type: event.target.value})}
                >
                    {
                        ["Sedan", "Break", "Combi", "SUV", "Pick-Up"].map(item => <MenuItem value={item}>{item}</MenuItem>)
                    }

                </Select>
            </FormControl>
        </Box>
    );
}