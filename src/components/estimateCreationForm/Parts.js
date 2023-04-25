import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import {useState, setState} from "react";
import AddProblem from './AddProblem'
import PartsList from "./PartsList";
import AddPart from "./AddPart";
import {Checkbox, FormControlLabel, FormGroup, Container, TextField, Switch} from "@mui/material";
import Divider from '@mui/material/Divider'
import PercentIcon from '@mui/icons-material/Percent';
import DiscountIcon from '@mui/icons-material/Discount';

function Parts({partsData, setPartsData, showCode, showMaker, showInfo, setShowCode, setShowMaker, setShowInfo,
               partsDiscount, setPartsDiscount, partsDiscountType, setPartsDiscountType}) {

    const calculateTotalNoDiscount = () => {
        let sum = 0
        for (let i=0; i<partsData.parts.length; i++)
            sum += parseFloat(partsData.parts[i].total)
        return sum.toFixed(2)
    }
    const calculateDiscount = () => {
        let sum = calculateTotalNoDiscount()
        if (partsDiscountType === 'ammount')
            return partsDiscount
        else return (sum*(partsDiscount)/100).toFixed(2)
    }
    const calculateTotal = () => {
        // let sum = calculateTotalNoDiscount()
        // if (partsDiscount === 'ammount')
        //     return (sum - partsDiscount).toFixed(2)
        // return (sum * (100 - partsDiscount) / 100).toFixed(2)
        return (calculateTotalNoDiscount() - calculateDiscount()).toFixed(2)
    }


        return (
        <React.Fragment>
            <FormGroup>

            <Grid container spacing={1} direction={'row'} justifyContent={'flex-start'} alignItems={'center'}>
                <Grid item xs={12} sm={'auto'}>
                    <FormControlLabel control={<Checkbox defaultChecked={showCode}/>} label="Cod" onChange={() => {
                        setShowCode(!showCode)
                    }}/>
                    <FormControlLabel control={<Checkbox defaultChecked={showMaker}/>} label="Producator" onChange={() => {
                        setShowMaker(!showMaker)
                    }}/>
                    <FormControlLabel control={<Checkbox defaultChecked={showInfo}/>} label="Informații piesă" onChange={() => {
                        setShowInfo(!showInfo)
                    }}/>
                </Grid>
            </Grid>
            </FormGroup>
            <br/>

            <Grid container spacing={0}>
                <AddPart partsData = {partsData} setPartsData={setPartsData}>
                </AddPart>
            </Grid>
            {partsData.parts.length === 0
                ?
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>

                    <img src={require('./images/mechanic-empty-parts-list.png')}
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
                <div>
                    <Grid container spacing={2}>
                        <Grid container spacing={1} direction={'column'} justifyContent={'space-evenly'}
                              alignItems={'center'}>
                            <Grid item xs={12} sm={'auto'}>
                                <PartsList partsData={partsData} setPartsData={setPartsData} showCode={showCode}
                                           showMaker={showMaker} showInfo={showInfo}
                                           setShowCode={setShowCode} setShowInfo={setShowInfo}
                                           setShowMaker={setShowMaker}>
                                </PartsList>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Divider sx={{marginTop: '5vh', marginBottom: '5vh'}}/>


                    <Grid container spacing={0} direction={'column'} justifyContent={'flex-end'}
                          alignItems={'flex-end'}>
                        <Grid item>
                            <TextField
                                label={partsDiscountType === 'percentage' ? "Discount (procent)" : "Discount (lei)"}
                                       type={'text'}
                                       sx={{width: '13vw'}} value={partsDiscount}
                                       onChange={(event) => {
                                           if (partsDiscountType === 'percentage') {
                                               if (event.target.value >= 0 && event.target.value <= 100) {
                                                   setPartsDiscount(event.target.value)
                                               } else if (event.target.value < 0)
                                                   event.target.value = 0
                                               else event.target.value = 100

                                           } else {
                                               let total = calculateTotalNoDiscount()
                                               if (event.target.value >= 0) {
                                                   setPartsDiscount(event.target.value)
                                               } else if (event.target.value < 0)
                                                   event.target.value = 0
                                               else event.target.value = total


                                           }
                                           // console.log(partsDiscount)

                                       }}

                                       inputProps={{style: {fontSize: '85%'}}}
                            />
                        </Grid>

                        <Grid item>

                            <Grid container spacing={0} direction={'row'} justifyContent={'flex-end'}
                                  alignItems={'flex-end'}>
                                <Grid item>
                                    <PercentIcon/>
                                </Grid>

                                <Switch defaultChecked={partsDiscountType === 'ammount'}
                                        onChange={() => {

                                            setPartsDiscount(0)
                                            if (partsDiscountType === 'ammount')
                                                setPartsDiscountType('percentage')
                                            else
                                                setPartsDiscountType('ammount')

                                        }
                                        }/>

                                <Grid item>
                                    <DiscountIcon/>

                                </Grid>


                            </Grid>
                        </Grid>

                    </Grid>


                <Grid container spacing={0} direction={'row'} justifyContent={'flex-end'}>


                    <Grid item>

                        <Typography fontWeight={'bold'} fontSize={'160%'}>Total
                            piese: {calculateTotalNoDiscount()} lei </Typography>
                        <Typography fontWeight={'bold'}
                                    fontSize={'160%'}>Discount: {calculateDiscount()} lei </Typography>
                        <Typography fontWeight={'bold'} fontSize={'160%'}>Total cu
                            discount: {calculateTotal()} lei </Typography>

                    </Grid>
                </Grid>

                </div>
            }
        </React.Fragment>
    );
}

export default Parts