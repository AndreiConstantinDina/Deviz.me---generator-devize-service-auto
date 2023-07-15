import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CarBrand from './CarBrand'
import CarModel from "./CarModel";
import {useState, setState} from "react";
import CarYear from './CarYear'
import CarType from './CarType'
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

export default function CarDetails({carData, setCarData, error}) {
    // const [carData, setCarData] = useState({
    //     vin: '',
    //     plate: '',
    //     brand: '',
    //     model: '',
    //     year: '',
    //     type: '',
    //     capacity: '',
    //     motorCode: '',
    //     fuel: '',
    //     color: ''
    // })
    return (
        <React.Fragment>
            {/*<Typography variant="h6" gutterBottom>*/}
            {/*    Introduceți datele mașinii:*/}

            {/*</Typography>*/}
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="plate"
                        error = {error !== "" && carData.plate === ""}
                        label="Numar de înmatriculare"
                        fullWidth
                        defaultValue={carData.plate}
                        onChange={(event) => {
                            event.target.value = event.target.value.toString().toUpperCase()
                            event.target.value = event.target.value.toString().replace(/[^a-zA-Z0-9]/i, '')

                            setCarData({...carData, plate: event.target.value})
                        }
                        }
                        inputProps={{ style: { textTransform: "uppercase" } }}
                        // textTransform = "uppercase"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        optional
                        id="vin"
                        label="Serie de șasiu/ VIN"
                        fullWidth
                        defaultValue={carData.vin}
                        onChange={(event) => {
                            event.target.value = event.target.value.toString().toUpperCase()
                            event.target.value = event.target.value.toString().replace(/[^a-zA-Z0-9]/i, '')
                            setCarData({...carData, vin: event.target.value})
                        }
                    }
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                   <CarBrand carData={carData} setCarData={setCarData}/>
                </Grid>

                <Grid item xs={12} md={6}>
                    <CarModel carData={carData} setCarData={setCarData}/>
                </Grid>

                <Grid item xs={12} md={6}>
                    <CarYear carData={carData} setCarData={setCarData}/>
                </Grid>

                <Grid item xs={12} md={6}>
                    <CarType carData={carData} setCarData={setCarData}/>
                </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            optional
                            id="motorCode"
                            label="Cod Motor"
                            fullWidth
                            defaultValue = {carData.motorCode}
                            onChange={(event) => {
                                event.target.value = event.target.value.toString().toUpperCase()
                                setCarData({...carData, motorCode: event.target.value})
                            }

                        }
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            optional
                            id="capacity"
                            label="Capacitate cilidrica (cc)"
                            fullWidth
                            defaultValue={ carData.capacity}
                            onChange={(event) => {
                                event.target.value = event.target.value.toString().replace(/\D/g, '')
                                setCarData({...carData, capacity: event.target.value})
                            }                        }
                        />
                    </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        optional
                        id="kw"
                        label="Putere (kW)"
                        fullWidth
                        defaultValue={ carData.kw}
                        onChange={(event) => {
                            event.target.value = event.target.value.toString().replace(/\D/g, '')
                            setCarData({...carData, kw: event.target.value})
                        }                        }
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel>Carburant</InputLabel>
                            <Select
                                value={carData.fuel}
                                label="fuel"
                                onChange={(event) => setCarData ({...carData, fuel: event.target.value})}
                            >
                                {
                                    ['Benzina', 'Diesel', 'Electric'].map(item => <MenuItem value={item}>{item}</MenuItem>)
                                }

                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}