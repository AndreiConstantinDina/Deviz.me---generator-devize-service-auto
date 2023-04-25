import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import {useEffect} from "react";

export default function RecommendationsList({recommendationsData, setRecommendationsData}) {
    const handleRecommandationDelete = (value) => {
        var recommendations = recommendationsData.recommendations.slice(0);
        const index = recommendations.indexOf(value)
        recommendations.splice(index, 1);

        setRecommendationsData({
            ...recommendations,
            recommendations: recommendations
        }, [])
    }

    return (
        <List sx={{ width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper' ,
            alignItems: 'flex-start' ,
            paddingLeft: '20px'
        }}>
            {recommendationsData.recommendations.map((value) => (
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
                    <ListItemText primary={`${value}`} sx={{overflowWrap: 'break-word'}} />
                    <IconButton>
                        <DeleteIcon onClick={() => {handleRecommandationDelete(value)}}>
                        </DeleteIcon>
                    </IconButton>


                </ListItem>
            ))}
        </List>
    );
}