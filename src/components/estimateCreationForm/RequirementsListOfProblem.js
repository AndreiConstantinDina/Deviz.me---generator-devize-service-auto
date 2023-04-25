import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import {useEffect} from "react";

export default function RequirementsListOfProblem({problemsData, setProblemsDict, problemsDict, value,
                                                      requirementsHourlyLabourData, setRequirementsHourlyLabourData,
                                                      requirementsServicesData, setRequirementsServicesData,
                                                      requirementsFinalVerificationsData, setRequirementsFinalVerificationsData,
                                                      deletionError, newDeletionError, setNewDeletionError, setDeletionError}) {
    const handleProblemDelete = (val) => {
        // var problems = problemsData.problems.slice(0);
        // const index = problems.indexOf(value)
        // problems.splice(index, 1);

        let dict = [...problemsDict]

        for (let i = 0; i<dict.length; i++) {
            //console.log(elem[1])
            let elem = dict[i]
            try{
                if (elem.key === value) {
                    for (let j = 0; j<requirementsHourlyLabourData.length; j++) {
                        // console.log(requirementsHourlyLabourData[j].key)
                        // console.log(elem.value.problems[elem.value.problems.indexOf(val)])
                        if (requirementsHourlyLabourData[j].key === elem.value.problems[elem.value.problems.indexOf(val)]) {
                            if (requirementsHourlyLabourData[j].value.items.length + requirementsServicesData[j].value.items.length + requirementsFinalVerificationsData[j].value.items.length !== 0)
                            // do not delete, there are labour items attached to current requirement
                            {
                                setDeletionError("Această constatare nu poate fi ștearsă deoarece are elemente din categoria manoperă asociate!")
                                setNewDeletionError(true)
                                return
                            }
                            else {
                                // delete from 'lista de cerinte si defectiuni'
                                const index = elem.value.problems.indexOf(val)
                                elem.value.problems.splice(index, 1)
                                setProblemsDict(dict)

                                // delete from the 3 labour-requirement association arrays
                                requirementsHourlyLabourData.splice(j, 1)
                                requirementsServicesData.splice(j, 1)
                                requirementsFinalVerificationsData.splice(j, 1)
                                // setRequirementsHourlyLabourData( requirementsHourlyLabourData.splice(j, 1))
                                // setRequirementsServicesData( requirementsServicesData.splice(j, 1))
                                // setRequirementsFinalVerificationsData( requirementsFinalVerificationsData.splice(j, 1))


                            }
                        }
                    }


                }
            }
            catch{
            }

        }
    }

    return (
        <List sx={{ width: '30%',
            maxWidth: '30vw',
            bgcolor: 'background.paper' ,
            alignItems: 'flex-start' ,
            paddingLeft: '5vw'
        }}>
            {problemsData.problems.map((value) => (
                <ListItem
                    justifyContent= 'flex-start'
                    alignItems = "center"
                    key={value}
                    sx={{borderStyle: 'solid',
                        borderWidth: '0.5px',
                        borderColor: 'gray',
                        borderRadius: '5px',
                        margin: '8px',
                        width: '20vw',
                        paddingLeft: '10px'
                    }}
                >
                    <ListItemText primary={`${value}`} sx={{overflowWrap: 'break-word'}} />
                    <IconButton>
                        <DeleteIcon onClick={() => {handleProblemDelete(value)}}>
                        </DeleteIcon>
                    </IconButton>


                </ListItem>
            ))}
        </List>
    );
}