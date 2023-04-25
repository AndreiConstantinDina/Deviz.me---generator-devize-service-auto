import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button'
import Grid from "@mui/material/Grid";
import {useState} from "react";
import Typography from "@mui/material/Typography";

function AddProblem({problemsData, setProblemsData, addProblemLabel, helperText, problemsDict, setProblemsDict}) {
    const handleAddNewProblem = () => {
        if (problemsData.newProblem === '')
            ;
        else {
            const problems = problemsData.problems.slice(0)
            var adauga = true;
            for (var i=0; i<problems.length; i++)
                if (problems[i] === problemsData.newProblem)
                    adauga = false
            if (adauga) {
                problems.push(problemsData.newProblem)
                problemsDict.push({
                    key: problemsData.newProblem,
                    value: {
                        problems: [],
                        newProblem: ''
                    }
                }

                )
            }
            setProblemsData({...problemsData, problems: problems, newProblem: ''})
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
                    options={problemsData.options}
                    sx={{width: 300}}
                    value = {problemsData.newProblem}
                    renderInput={(params) => <TextField{...params} label={addProblemLabel} onChange={
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

            <Grid item>

                <Button variant="outlined"
                        onClick={() => {handleAddNewProblem()}}
                >

                    Adaugă</Button>

            </Grid>
        </Grid>
    );
}


export default AddProblem