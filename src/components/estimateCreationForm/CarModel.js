import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {useState, useEffect} from 'react'

import axios from 'axios'
import {Autocomplete, TextField} from "@mui/material";



export default function CarModel({carData, setCarData}) {
    const [carModels, setCarModels] = useState([])
    useEffect(() =>{
        const where = encodeURIComponent(JSON.stringify({
            "Make": `${carData.brand}`
        }));
        axios.get(`https://parseapi.back4app.com/classes/Carmodels_Car_Model_List?limit=1000&keys=Model&where=${where}`, {
            headers: {
                'X-Parse-Application-Id': 'PMt2m00nC5cTN7QyFYe2jLBFpoKZIfHr84HtkG4e', // This is your app's application id
                'X-Parse-REST-API-Key': 'FW5kVmVUSIkjlhrCsa2l4rJFsK3XKjPhhjfSl8X0', // This is your app's REST API key
            }
        })
            .then(res => {
                setCarModels(res.data.results.reduce((accumulator, current) => {
                    if (!accumulator.find((item) => item.Model === current.Model)) {
                        accumulator.push(current);
                    }
                    return accumulator;
                }, []).map(item => item.Model).sort())
            })
            .catch(err => {})

    }, [carData])


    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>

                <Autocomplete
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={carData.model}
                    options={carModels}
                    onChange={(event, value) => setCarData ({...carData, model: value, year: '', type: ''})}
                    onSelect = {
                        (event) => {
                            setCarData ({...carData, model: event.target.value, year: '', type: ''})
                        }}

                    renderInput={(params) => <TextField{...params} label={'Model'} onChange={
                        (event) => {
                            setCarData ({...carData, model: event.target.value, year: '', type: ''})
                        }
                    }
                    ></TextField>}

                />
                {/*<Select*/}
                {/*    labelId="demo-simple-select-label"*/}
                {/*    id="demo-simple-select"*/}
                {/*    value={carData.model}*/}
                {/*    label="marca"*/}
                {/*    onChange={(event) => setCarData ({...carData, model: event.target.value, year: '', type: ''})}*/}
                {/*>*/}
                {/*    {*/}
                {/*        carModels.map(item => <MenuItem value={item}>{item}</MenuItem>)*/}
                {/*    }*/}

                {/*</Select>*/}
            </FormControl>
        </Box>
    );
}