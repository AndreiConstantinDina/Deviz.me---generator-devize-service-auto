import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import {FormGroup, FormControlLabel, Checkbox, RadioGroup, FormControl, FormLabel, Radio} from "@mui/material";
import Grid from "@mui/material/Grid";
import {useState} from "react";

export default function ProblemsList({problemsData, setProblemsData, problemsDict, otherProblemsData, deletionError, setDeletionError, newDeletionError, setNewDeletionError}) {
    const handleProblemDelete = (value) => {
        let deleteElement = true
        for (const [key, val] of Object.entries(problemsDict)){
            // console.log(problemsDict[key].key)
            // console.log(value)
            if (problemsDict[key].key === value) {
                if (problemsDict[key].value.problems.length !== 0) {
                    setDeletionError("Acest element nu poate fi șters deoarece are constatari asociate!")
                    setNewDeletionError(true)
                    return
                }
                else {
                    var problems = problemsData.problems.slice(0);
                    const index = problems.indexOf(value)
                    problems.splice(index, 1);

                    setProblemsData({
                        ...problemsData,
                        problems: problems
                    }, [])

                    if (otherProblemsData.includes(problemsDict[key].key))
                        return
                    problemsDict.splice(problemsDict.indexOf(problemsDict[key]), problemsDict.indexOf(problemsDict[key])+1)
                   //delete problemsDict[key]

                }
            }
        }
    }

    const [addLabourType, setAddLabourType] = useState('none')

    return (
        <List sx={{ width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper' ,
            alignItems: 'flex-start' ,
            paddingLeft: '20px',
            marginTop: '3vh'
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
                        width: '60vw',
                        paddingLeft: '10px',
                        minHeight: '60px'
                    }}
                >
                    <ListItemText primary={`${value}`} sx={{overflowWrap: 'break-word', width: '500%'}} />

                    <IconButton>
                        <DeleteIcon onClick={() => {handleProblemDelete(value)}}>
                        </DeleteIcon>
                    </IconButton>


                </ListItem>
            ))}
        </List>
    );
}