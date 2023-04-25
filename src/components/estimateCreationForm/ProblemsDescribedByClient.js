import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import {useState, setState} from "react";
import AddProblem from './AddProblem'
import ProblemsList from "./ProblemsList";
function ProblemsDescribedByClient({problemsData, setProblemsData, problemsDict, setProblemsDict,otherProblemsData,
                                       deletionError, newDeletionError, setNewDeletionError, setDeletionError}) {

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <AddProblem problemsData = {problemsData} setProblemsData = {setProblemsData}
                            addProblemLabel={"Defecțiune raportată de client"}
                            helperText = "Ce probleme/ simptome prezintă mașina?"
                            problemsDict = {problemsDict} setProblemsDict = {setProblemsDict}
                >
                </AddProblem>
            </Grid>

                <Grid container spacing={1}>
                    <Grid container spacing={1} direction={'column'} justifyContent={'space-evenly'} alignItems={'flex-stat'}>
                        <Grid item xs={12} sm={'auto'}>
                            {problemsData.problems.length === 0
                                ?
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>

                                    <img src={require('./images/mechanic-empty-client-problems-list.png')}  alt="Inca nu exista defectiuni adaugate in deviz"
                                         style={{ width: 'auto', height: 'auto', objectFit: 'cover', maxWidth: '60vw', maxHeight: '60vh'}}
                                    />
                                </div>
                                :
                            <ProblemsList problemsData = {problemsData} setProblemsData = {setProblemsData} problemsDict={problemsDict}
                                          otherProblemsData={otherProblemsData} deletionError = {deletionError} setDeletionError = {setDeletionError} newDeletionError = {newDeletionError}  setNewDeletionError = {setNewDeletionError}>
                            </ProblemsList>
                            }
                        </Grid>
                    </Grid>
                </Grid>



        </React.Fragment>
    );
}

export default ProblemsDescribedByClient