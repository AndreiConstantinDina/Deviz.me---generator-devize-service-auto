import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import {useEffect} from "react";

export default function ProblemList({problemsData, setProblemsData}) {
    var problems = problemsData.problems.slice(0);


    const handleProblemDelete = (value) => {
        var problems = problemsData.problems.slice(0);
        const index = problems.indexOf(value)
        problems.splice(index, 1);

        setProblemsData({
            ...problemsData,
            problems: problems
        }, [])
    }

    return (
        <List sx={{ width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper' ,
            alignItems: 'flex-start' ,
            }}>
            {problemsData.problems.map((value) => (
                <ListItem
                    alignItems = "center"
                    key={value}
                    sx={{borderStyle: 'solid',
                        borderWidth: '1px',
                        borderColor: 'gray'}}
                >
                    <IconButton>
                        <DeleteIcon onClick={() => {handleProblemDelete(value)}}>
                        </DeleteIcon>
                    </IconButton>
                    <ListItemText primary={`${value}`} />


                </ListItem>
            ))}
        </List>
    );
}