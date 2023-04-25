import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import {useEffect} from "react";

export default function ReceptionInfoList({receptionData, setReceptionData}) {
    const handleReceptionInfoDelete = (value) => {
        var receptionInfo = receptionData.info.slice(0);
        const index = receptionInfo.indexOf(value)
        receptionInfo.splice(index, 1);

        setReceptionData({
            ...receptionInfo,
            info: receptionInfo
        }, [])
    }

    return (
        <List sx={{ width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper' ,
            alignItems: 'flex-start' ,
            paddingLeft: '20px',
            marginTop: '3vh'
        }}>
            {receptionData.info.map((value) => (
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
                        paddingLeft: '10px'
                    }}
                >
                    <ListItemText primary={`${value}`} sx={{overflowWrap: 'break-word'}}/>
                    <IconButton>
                        <DeleteIcon onClick={() => {handleReceptionInfoDelete(value)}}>
                        </DeleteIcon>
                    </IconButton>


                </ListItem>
            ))}
        </List>
    );
}