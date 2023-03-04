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

export default function CarDetails({carData, setCarData}) {
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
            <Typography variant="h6" gutterBottom>
                Introduceți datele mașinii:

            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="vin"
                        label="Numar de înmatriculare"
                        fullWidth
                        variant="standard"
                        defaultValue={carData.plate}
                        onChange={(event) => setCarData ({...carData, plate: event.target.value})}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        optional
                        id="vin"
                        label="Serie de șasiu/ VIN"
                        fullWidth
                        variant="standard"
                        defaultValue={carData.vin}
                        onChange={(event) => setCarData ({...carData, vin: event.target.value})}
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
                            variant="standard"
                            defaultValue = {carData.motorCode}
                            onChange={(event) => setCarData ({...carData, motorCode: event.target.value})}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            optional
                            id="capacity"
                            label="Capacitate cilidrica (cc)"
                            fullWidth
                            variant="standard"
                            defaultValue={ carData.capacity}
                            onChange={(event) => setCarData ({...carData, capacity: event.target.value})}
                        />
                    </Grid>

                <Grid item xs={12} md={6}>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel>Culoare</InputLabel>
                            <Select
                                value={carData.color}
                                label="color"
                                defaultValue={carData.color}
                                onChange={(event) => setCarData ({...carData, color: event.target.value})}
                            >
                                {
                                    ['🔴','🟠', '🟡', "🟢", "🔵", "🟣", "🟤", "⚫", "⚪"].map(item => <MenuItem value={item}>{item}</MenuItem>)
                                }

                            </Select>
                        </FormControl>
                    </Box>
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