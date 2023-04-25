import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import {useState, setState} from "react";
import AddRecommendation from './AddRecommendation'
import RecommendationsList from "./RecommendationsList";

export default function ServiceRecommendations({recommendationsData, setRecommendationsData}) {

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <AddRecommendation recommendationsData = {recommendationsData} setRecommendationsData = {setRecommendationsData}
                                  recommenationsDataLabel={"Recomandare"}
                                  helperText = "Ce sfaturi/ recomandări aveți pentru proprietarul mașinii?"
                >
                </AddRecommendation>
            </Grid>
            {recommendationsData.recommendations.length === 0
                ?
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>

                    <img src={require('./images/mechanic-empty-recommendations-list.png')}
                         alt="Inca nu exista defectiuni adaugate in deviz"
                         style={{
                             width: 'auto',
                             height: 'auto',
                             objectFit: 'cover',
                             maxWidth: '60vw',
                             maxHeight: '60vh'
                         }}
                    />
                </div>
                :
                <Grid container spacing={1}>
                    <Grid container spacing={1} direction={'column'} justifyContent={'space-evenly'}
                          alignItems={'flex-stat'}>
                        <Grid item xs={12} sm={'auto'}>
                            <RecommendationsList recommendationsData={recommendationsData}
                                                 setRecommendationsData={setRecommendationsData}>
                            </RecommendationsList>
                        </Grid>
                    </Grid>
                </Grid>
            }


        </React.Fragment>
    );
}

