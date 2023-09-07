import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {useState, useEffect} from 'react'

import axios from 'axios'
import {Autocomplete, TextField} from "@mui/material";



export default function CarYear({carData, setCarData}) {

    const [carYears, setCarYears] = useState([])
    useEffect(() =>{
        const where = encodeURIComponent(JSON.stringify({
            "Make": `${carData.brand}`,
            "Model": `${carData.model}`

        }));
        axios.get(`https://parseapi.back4app.com/classes/Carmodels_Car_Model_List?limit=1000&keys=Year&where=${where}`, {
            headers: {
                'X-Parse-Application-Id': 'PMt2m00nC5cTN7QyFYe2jLBFpoKZIfHr84HtkG4e', // This is your app's application id
                'X-Parse-REST-API-Key': 'FW5kVmVUSIkjlhrCsa2l4rJFsK3XKjPhhjfSl8X0', // This is your app's REST API key
            }
        })
            .then(res => {
                setCarYears(res.data.results.reduce((accumulator, current) => {
                    if (!accumulator.find((item) => item.Year === current.Year)) {
                        accumulator.push(current);
                    }
                    return accumulator;
                }, []).map(item => item.Year).sort())
            })
            .catch(err => {})

    }, [carData])


    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <Autocomplete
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={carData.year}
                    options={carYears}
                    onChange={(event, value) => setCarData ({...carData, year: value, type: ''})}
                    onSelect = {
                        (event) => {
                            setCarData ({...carData, year: event.target.value, type: ''})
                        }}

                    renderInput={(params) => <TextField{...params} label={'An'} onChange={
                        (event) => {
                            setCarData ({...carData, year: event.target.value, type: ''})
                        }
                    }
                    ></TextField>}

                />

                {/*<InputLabel id="demo-simple-select-label">An</InputLabel>*/}
                {/*<Select*/}
                {/*    labelId="demo-simple-select-label"*/}
                {/*    id="demo-simple-select"*/}
                {/*    value={carData.year}*/}
                {/*    label="an"*/}
                {/*    onChange={(event) => setCarData ({...carData, year: event.target.value, type: ''})}*/}
                {/*>*/}
                {/*    {*/}
                {/*        carYears.map(item => <MenuItem value={item}>{item}</MenuItem>)*/}
                {/*    }*/}

                {/*</Select>*/}
            </FormControl>
        </Box>
    );
}