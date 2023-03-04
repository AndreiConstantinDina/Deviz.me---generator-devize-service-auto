import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button'
import Grid from "@mui/material/Grid";
import {useState} from "react";

function AddProblem({problemsData, setProblemsData}) {
    const handleAddNewProblem = () => {
        if (problemsData.newProblem === '')
            ;
        else {
            const problems = problemsData.problems.slice(0)
            var adauga = true;
            for (var i=0; i<problems.length; i++)
                if (problems[i] === problemsData.newProblem)
                    adauga = false
            if (adauga)
                problems.push(problemsData.newProblem)
            setProblemsData({...problemsData, problems: problems, newProblem: ''})

        }

    }
    return (
        <Grid container spacing={1} direction={'column'} justifyContent={'space-evenly'} alignItems={'center'}>
            <Grid item xs={12} sm={'auto'}>
                <Autocomplete
                    size={'small'}
                    freeSolo
                    id="combo-box-demo"
                    options={problemsData.options}
                    sx={{width: 300}}
                    value = {problemsData.newProblem}
                    renderInput={(params) => <TextField{...params} label="Problema" onChange={
                        (event) => setProblemsData({
                            ...problemsData,
                            newProblem: event.target.value
                        })}
                    onSelect = {
                        (event) => setProblemsData({
                            ...problemsData,
                            newProblem: event.target.value
                        })}
                    />}
                />

            </Grid>

            <Grid item xs={12} sm={6}>

                <Button variant="outlined"
                        onClick={() => {handleAddNewProblem()}}
                >

                    Adaugă</Button>

            </Grid>
        </Grid>
    );
}


export default AddProblem