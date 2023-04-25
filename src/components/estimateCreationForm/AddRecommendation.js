import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button'
import Grid from "@mui/material/Grid";
import {useState} from "react";
import Typography from "@mui/material/Typography";

export default function AddRecommendation({recommendationsData, setRecommendationsData, recommenationsDataLabel, helperText}) {
    const handleAddNewInfo = () => {
        if (recommendationsData.newRecommendation === '')
            ;
        else {
            const recommendations = recommendationsData.recommendations.slice(0)
            var adauga = true;
            for (var i=0; i<recommendations.length; i++)
                if (recommendations[i] === recommendationsData.newRecommendation)
                    adauga = false
            if (adauga)
                recommendations.push(recommendationsData.newRecommendation)
            setRecommendationsData({...recommendations, recommendations: recommendations, newRecommendation: ''})

        }

    }
    return (
        <Grid container spacing={3} direction={'row'} justifyContent={'space-between'} alignItems={'center'} width = 'auto' marginBottom={'3vh'}>
            {/*<Grid item>*/}
            {/*    <Typography fontSize={'140%'}>*/}
            {/*        {helperText}*/}
            {/*    </Typography>*/}
            {/*</Grid>*/}
            <Grid item>
                <Autocomplete
                    size={'small'}
                    freeSolo
                    options={['1','2']}
                    sx={{width: 300}}
                    value = {recommendationsData.newRecommendation}
                    renderInput={(params) => <TextField{...params} label={recommenationsDataLabel} onChange={
                        (event) => setRecommendationsData({
                            ...recommendationsData,
                            newRecommendation: event.target.value
                        })}
                                                       onSelect = {
                                                           (event) => setRecommendationsData({
                                                               ...recommendationsData,
                                                               newRecommendation: event.target.value
                                                           })}
                    />}
                />

            </Grid>

            <Grid item>

                <Button variant="outlined"
                        onClick={() => {handleAddNewInfo()}}
                >

                    Adaugă</Button>

            </Grid>
        </Grid>
    );
}


