import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import {useEffect} from "react";

export default function RequirementsListOfFinalVerifications({problemsData, setProblemsDict, problemsDict, value, labourData, setLabourData}) {
    const handleProblemDelete = (val) => {
        let dict = [...problemsDict]
        for (let i = 0; i<dict.length; i++) {
            //console.log(elem[1])
            let elem = dict[i]
            try{

                if (elem.key === value) {
                    const index = elem.value.items.indexOf(val)
                    elem.value.items.splice(index, 1)
                    setProblemsDict(dict)
                    let labourToDelete = labourData.items.find((element) => element.itemName === val).itemName
                    let numberOfAp = 0
                    for (let elem of dict)
                        if (elem.value.items.findIndex((element) => element === labourToDelete) >= 0)
                            numberOfAp++
                    if(numberOfAp === 0)
                        labourData.items.splice(labourData.items.findIndex((element) => element.item === val), 1)
                }
            }
            catch(e){
                console.log(e)
            }

        }

    }

    return (
        <List sx={{ width: '18vw',
            bgcolor: 'background.paper' ,
            alignItems: 'flex-start' ,
        }}>
            {problemsData.items.map((value) => (
                <ListItem
                    justifyContent= 'flex-start'
                    alignItems = "center"
                    key={value}
                    sx={{borderStyle: 'solid',
                        borderWidth: '0.5px',
                        borderColor: 'gray',
                        borderRadius: '5px',
                        width: '18vw',
                        overflowWrap: 'break-word'
                    }}
                >
                    <ListItemText primary={`${value}`} />
                    <IconButton>
                        <DeleteIcon onClick={() => {handleProblemDelete(value)}}>
                        </DeleteIcon>
                    </IconButton>


                </ListItem>
            ))}
        </List>
    );
}