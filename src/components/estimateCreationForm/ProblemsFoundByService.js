import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import {useState, setState} from "react";
import AddProblem from './AddProblem'
import ProblemList from "./ProblemList";

function ProblemsFoundByService({foundProblemsData, setFoundProblemsData}) {

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Cerințe în urma constatării:

                <br/>
                <br/>

            </Typography>

            <Grid container spacing={2}>
                <AddProblem problemsData = {foundProblemsData} setProblemsData = {setFoundProblemsData}>
                </AddProblem>
            </Grid>
            <Grid container spacing={2}>
                <Grid container spacing={1} direction={'column'} justifyContent={'space-evenly'} alignItems={'center'}>
                    <Grid item xs={12} sm={'auto'}>
                        <ProblemList problemsData = {foundProblemsData} setProblemsData = {setFoundProblemsData}>
                        </ProblemList>
                    </Grid>
                </Grid>
            </Grid>

        </React.Fragment>
    );
}

export default ProblemsFoundByService