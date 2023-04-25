import * as React from 'react';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import {useState, setState} from "react";
import AddProblem from './AddProblem'
import ProblemsList from "./ProblemsList";

function ProblemsFoundByService({foundProblemsData, setFoundProblemsData, problemsDict, setProblemsDict,otherProblemsData, deletionError, newDeletionError, setNewDeletionError, setDeletionError}) {

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <AddProblem problemsData = {foundProblemsData} setProblemsData = {setFoundProblemsData} addProblemLabel = {"Cerință de service"}
                            helperText = "Cerințe în urma constatării:"
                            problemsDict = {problemsDict} setProblemsDict = {setProblemsDict}

                >
                </AddProblem>
            </Grid>

            <Grid container spacing={1}>
                <Grid container spacing={1} direction={'column'} justifyContent={'space-evenly'} alignItems={'flex-stat'}>
                    <Grid item xs={12} sm={'auto'}>
                        {foundProblemsData.problems.length === 0
                            ?
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>

                                <img src={require('./images/mechanic-empty-service-problems-list.png')}  alt="Inca nu exista defectiuni adaugate in deviz"
                                     style={{ width: 'auto', height: 'auto', objectFit: 'cover', maxWidth: '60vw', maxHeight: '60vh'}}
                                />
                            </div>
                            :
                            <ProblemsList problemsData = {foundProblemsData} setProblemsData = {setFoundProblemsData} problemsDict={problemsDict}
                            otherProblemsData={otherProblemsData} deletionError = {deletionError} setDeletionError = {setDeletionError} newDeletionError = {newDeletionError}  setNewDeletionError = {setNewDeletionError}>
                            </ProblemsList>
                        }
                    </Grid>
                </Grid>
            </Grid>


        </React.Fragment>
    );
}

export default ProblemsFoundByService