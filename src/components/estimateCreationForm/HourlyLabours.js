import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import {useState, setState} from "react";
import AddItem from './AddItem'
import ItemsList from "./ItemsList";
import AddHourlyLabour from "./AddHourlyLabour";
import HourlyLabourList from "./HourlyLabourList";

export default function HourlyLabours({itemsData, setItemsData, addItemLabel, helperText, requirementsLabourData,
                                          deletionError, newDeletionError, setNewDeletionError, setDeletionError}) {

    return (
        <React.Fragment>
            <Grid container spacing={0}>
                <AddHourlyLabour itemsData = {itemsData} setItemsData = {setItemsData}
                                 addItemLabel={addItemLabel}
                                 helperText = {helperText}
                >
                </AddHourlyLabour>
            </Grid>
            {itemsData.items.length === 0
                ?
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>

                    <img src={require('./images/mechanic-empty-hourly-labours-list.png')}
                         alt="Inca nu exista lucrari adaugate in deviz"
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
                <Grid container spacing={0}>
                    <Grid container spacing={1} direction={'column'} justifyContent={'space-evenly'}
                          alignItems={'flex-stat'}>
                        <Grid item xs={12} sm={'auto'}>
                            <HourlyLabourList itemsData={itemsData} setItemsData={setItemsData}
                                              requirementsLabourData={requirementsLabourData}
                                              deletionError = {deletionError} setDeletionError = {setDeletionError} newDeletionError = {newDeletionError}  setNewDeletionError = {setNewDeletionError}
                                                deleteEnabled={true}
                            >
                            </HourlyLabourList>
                        </Grid>
                    </Grid>
                </Grid>
            }


        </React.Fragment>
    );
}

