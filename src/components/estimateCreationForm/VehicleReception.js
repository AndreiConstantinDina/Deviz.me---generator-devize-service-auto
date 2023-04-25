import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import {useState, setState} from "react";
import AddReceptionInfo from './AddReceptionInfo'
import ReceptionInfoList from "./ReceptionInfoList";

function VehicleReception({receptionData, setReceptionData}) {

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <AddReceptionInfo receptionData = {receptionData} setReceptionData = {setReceptionData}
                            addReceptionData={"Detalii"}
                            helperText = "În ce stare se prezintă mașina?"
                >
                </AddReceptionInfo>
            </Grid>

            <Grid container spacing={1}>
                <Grid container spacing={1} direction={'column'} justifyContent={'space-evenly'} alignItems={'flex-stat'}>
                    <Grid item xs={12} sm={'auto'}>

                        {receptionData.info.length === 0
                            ?
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>

                                <img src={require('./images/mechanic-empty-details-list.png')}
                                     alt="Inca nu exista detalii adaugate in deviz"
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
                            <ReceptionInfoList receptionData={receptionData} setReceptionData={setReceptionData}>
                            </ReceptionInfoList>
                        }
                    </Grid>
                </Grid>
            </Grid>


        </React.Fragment>
    );
}

export default VehicleReception