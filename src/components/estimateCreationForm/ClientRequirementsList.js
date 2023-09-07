import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import {useEffect} from "react";
import AddRequirementToProblem from "./AddRequirementToProblem";
import RequirementsListOfProblem from './RequirementsListOfProblem';
export default function ClientRequirementsList({problemsData, setProblemsData, helperText, problemsDict, setProblemsDict,
                                             requirementsHourlyLabourData, setRequirementsHourlyLabourData,
                                             requirementsServicesData, setRequirementsServicesData,
                                             requirementsFinalVerificationsData, setRequirementsFinalVerificationsData,
                                             deletionError, newDeletionError, setNewDeletionError, setDeletionError
                                         }) {


    return (
        <List sx={{ width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper' ,
            alignItems: 'flex-start' ,
            paddingLeft: '20px'
        }}>
            {problemsData.problems.map((value) => (

                <>
                    <ListItem
                        justifyContent= 'flex-start'
                        alignItems = "center"
                        key={value.problem}
                        sx={{borderStyle: 'solid',
                            borderWidth: '0.5px',
                            borderColor: 'gray',
                            borderRadius: '5px',
                            margin: '8px',
                            width: '60vw',
                            paddingLeft: '10px'
                        }}
                    >
                        <ListItemText primary={`${value.problem}`} sx={{overflowWrap: 'break-word'}}/>
                        <Typography sx={{overflowWrap: 'break-word'}}>
                            {helperText}
                        </Typography>


                    </ListItem>

                    <AddRequirementToProblem
                        // problemsData={problemsDict.find(item => item.key === value).value}
                        addProblemLabel={"Adaugă o nouă constatare"} helperText={""}
                        problemsDict={problemsDict}
                        setProblemsDict={setProblemsDict}
                        val = {value.problem}
                        requirementsHourlyLabourData = {requirementsHourlyLabourData} setRequirementsHourlyLabourData={setRequirementsHourlyLabourData}
                        requirementsServicesData={requirementsServicesData} setRequirementsServicesData={setRequirementsServicesData}
                        requirementsFinalVerificationsData={requirementsFinalVerificationsData} setRequirementsFinalVerificationsData = {setRequirementsFinalVerificationsData}


                    />
                    <RequirementsListOfProblem problemsData = {problemsDict.find(item => item.key === value.problem).value} setProblemsDict = {setProblemsDict}
                                               problemsDict={problemsDict}
                                               value={value.problem}
                                               requirementsHourlyLabourData = {requirementsHourlyLabourData} setRequirementsHourlyLabourData={setRequirementsHourlyLabourData}
                                               requirementsServicesData={requirementsServicesData} setRequirementsServicesData={setRequirementsServicesData}
                                               requirementsFinalVerificationsData={requirementsFinalVerificationsData} setRequirementsFinalVerificationsData = {setRequirementsFinalVerificationsData}
                                               deletionError = {deletionError} setDeletionError = {setDeletionError} newDeletionError = {newDeletionError}  setNewDeletionError = {setNewDeletionError}


                    />
                </>

            ))}
        </List>
    );
}