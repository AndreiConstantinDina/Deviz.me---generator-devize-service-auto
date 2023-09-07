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
import ServicesList from './ServicesList'
import AddService from "./AddService";

export default function Services({itemsData, setItemsData, addItemLabel, helperText, requirementsLabourData,
                                     deletionError, newDeletionError, setNewDeletionError, setDeletionError}) {

    return (
        <React.Fragment>
            <Grid container spacing={0}>
                <AddService itemsData = {itemsData} setItemsData = {setItemsData}
                                 addItemLabel={addItemLabel}
                                 helperText = {helperText}

                >
                </AddService>
            </Grid>


            {itemsData.items.length === 0
                ?
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>

                    <img src={require('./images/mechanic-empty-services-list.png')}
                         alt="Inca nu exista servicii adaugate in deviz"
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
                            <ServicesList itemsData={itemsData} setItemsData={setItemsData}
                                          requirementsLabourData={requirementsLabourData}
                                          deletionError = {deletionError} setDeletionError = {setDeletionError} newDeletionError = {newDeletionError}  setNewDeletionError = {setNewDeletionError}
                                        deleteEnabled={true}
                            >
                            </ServicesList>
                        </Grid>
                    </Grid>
                </Grid>
            }


        </React.Fragment>
    );
}

