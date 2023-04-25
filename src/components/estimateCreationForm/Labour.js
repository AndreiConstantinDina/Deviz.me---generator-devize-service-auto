import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {Switch, Tab, Tabs, TextField} from "@mui/material";
import Items from "./Items";
import ItemsList from './ItemsList'
import HourlyLabourList from "./HourlyLabourList";
import ServicesList from "./ServicesList";
import HourlyLabours from './HourlyLabours';
import Divider from '@mui/material/Divider'
import PercentIcon from '@mui/icons-material/Percent';
import DiscountIcon from '@mui/icons-material/Discount';
import Services from "./Services";
export default function Labour({currentLabourTab, setCurrentLabourTab, hourlyLabourData, setHourlyLabourData, servicesData, setServicesData,
                                   finalVerificationsData, setFinalVerificationsData, labourDiscountType, labourDiscount, setLabourDiscountType, setLabourDiscount,
                                   requirementsHourlyLabourData, setRequirementsHourlyLabourData,
                                   requirementsServicesData, setRequirementsServicesData,
                                   requirementsFinalVerificationsData, setRequirementsFinalVerificationsData,
                                   deletionError, newDeletionError, setNewDeletionError, setDeletionError

                        }) {
    const calculateTotalHourlyLabour = () => {
        let sum = 0
        for (let i=0; i<hourlyLabourData.items.length; i++)
            sum += parseFloat(hourlyLabourData.items[i].total)
        return sum.toFixed(2)
    }

    const calculateTotalServices = () => {
        let sum = 0
        for (let i=0; i<servicesData.items.length; i++)
            sum += parseFloat(servicesData.items[i].total)
        return sum.toFixed(2)
    }
    const calculateTotalFinalVerifications = () => {
        let sum = 0
        for (let i=0; i<finalVerificationsData.items.length; i++)
            sum += parseFloat(finalVerificationsData.items[i].price)
        return sum.toFixed(2)
    }
    const calculateTotalNoDiscount= () => {
        return (parseFloat(calculateTotalFinalVerifications()) + parseFloat(calculateTotalServices()) + parseFloat(calculateTotalHourlyLabour())).toFixed(2)
    }

    const calculateDiscount = () => {
        let sum = calculateTotalNoDiscount()
        if (labourDiscountType === 'ammount')
            return labourDiscount
        else return (sum*(labourDiscount)/100).toFixed(2)
    }
    const calculateTotal = () => {
        let sum = (parseFloat(calculateTotalFinalVerifications()) + parseFloat(calculateTotalServices()) + parseFloat(calculateTotalHourlyLabour())).toFixed(2)

        if (labourDiscountType === 'ammount')
            return (sum - labourDiscount).toFixed(2)
        return (sum * (100-labourDiscount)/100).toFixed(2)

    }

    const handleChange = (event, newValue) => {
        setCurrentLabourTab(newValue);
    };

    return (
        <React.Fragment>
            <Grid container spacing={0} justifyContent={'space-around'} direction={'column'}>
                <Grid item position={'relative'} sx={{ left: '10vw'}}>

                    <Tabs value={currentLabourTab} onChange={handleChange} aria-label="icon label tabs example">
                        <Tab label="Manopera" />
                        <Tab label="Lucrari în service" />
                        <Tab label="Servicii" />
                        <Tab label="Verificari finale" />

                    </Tabs>
                </Grid>


                {currentLabourTab === 0 && hourlyLabourData.items.length === 0 && servicesData.items.length === 0 && finalVerificationsData.items.length === 0
                    ?
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>

                        <img src={require('./images/mechanic-empty-labour-list.png')}
                             alt="Inca nu exista detalii despre manopera"
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
                        {currentLabourTab === 0 &&
                            <Grid item marginTop={'5vh'}>
                                <Grid container spacing={0} margin={'5vh'} direction={'column'}>
                                    <Grid item>
                                        <Typography fontSize={'140%'}>Lista lucrărilor în service
                                            efectuate:</Typography>

                                        {hourlyLabourData.items.length === 0 ?
                                            <Typography fontSize={'120%'} marginLeft={'5vw'}> Nu există lucrari în
                                                service
                                                momentan. </Typography> :
                                            <HourlyLabourList itemsData={hourlyLabourData} setItemsData={setHourlyLabourData}
                                                              requirementsLabourData={requirementsHourlyLabourData}
                                                              deletionError = {deletionError} setDeletionError = {setDeletionError} newDeletionError = {newDeletionError}  setNewDeletionError = {setNewDeletionError}
                                                                deleteEnabled={false}
                                            />

                                        }
                                        <Grid container spacing={0} direction={'row'} justifyContent={'flex-end'}>
                                            <Grid item>

                                                <Typography fontWeight={'bold'} fontSize={'110%'}>Total
                                                    lucrări: {calculateTotalHourlyLabour()} lei</Typography>
                                            </Grid>
                                        </Grid>


                                    </Grid>


                                    <Grid item>
                                        <Typography fontSize={'140%'}>Lista de servicii efectuate:</Typography>
                                        {servicesData.items.length === 0 ?
                                            <Typography fontSize={'120%'} marginLeft={'5vw'}> Nu există servicii
                                                momentan.
                                            </Typography> :
                                            <ServicesList itemsData={servicesData} setItemsData={servicesData}
                                                          requirementsLabourData={requirementsServicesData}
                                                          deletionError={deletionError}
                                                          setDeletionError={setDeletionError}
                                                          newDeletionError={newDeletionError}
                                                          setNewDeletionError={setNewDeletionError}
                                                          deleteEnabled={false}
                                            />
                                        }
                                        <Grid container spacing={0} direction={'row'} justifyContent={'flex-end'}>
                                            <Grid item>

                                                <Typography fontWeight={'bold'} fontSize={'110%'}>Total
                                                    servicii: {calculateTotalServices()} lei</Typography>
                                            </Grid>
                                        </Grid>

                                    </Grid>

                                    <Grid item>
                                        <Typography fontSize={'140%'}>Lista de verificări finale efectuate:</Typography>
                                        {
                                            finalVerificationsData.items.length === 0 ?
                                                <Typography fontSize={'120%'} marginLeft={'5vw'}> Nu există verificări
                                                    finale momentan. </Typography> :
                                                <ItemsList itemsData={finalVerificationsData} setItemsData={setFinalVerificationsData}
                                                           requirementsLabourData={requirementsFinalVerificationsData}
                                                           deletionError = {deletionError} setDeletionError = {setDeletionError} newDeletionError = {newDeletionError}  setNewDeletionError = {setNewDeletionError}
                                                           deleteEnabled={false}
                                                />

                                        }
                                        <Grid container spacing={0} direction={'row'} justifyContent={'flex-end'}>
                                            <Grid item>

                                                <Typography fontWeight={'bold'} fontSize={'110%'}>Total
                                                    verificări: {calculateTotalFinalVerifications()} lei</Typography>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                    <Divider sx={{marginTop: '5vh', marginBottom: '5vh'}}/>


                                    <Grid container spacing={0} direction={'column'} justifyContent={'flex-end'}
                                          alignItems={'flex-end'}>
                                        <Grid item>
                                            <TextField label={labourDiscountType === 'percentage' ? "Discount (procent)" : "Discount (lei)"}
                                                type={'text'}
                                                       sx={{width: '13vw'}} value={labourDiscount}
                                                       onChange={(event) => {

                                                           if (labourDiscountType === 'percentage') {
                                                               if (event.target.value >= 0 && event.target.value <= 100) {
                                                                   setLabourDiscount(event.target.value)
                                                               } else if (event.target.value < 0)
                                                                   event.target.value = 0
                                                               else event.target.value = 100

                                                           } else {
                                                               let total = calculateTotalNoDiscount()
                                                               if (event.target.value >= 0) {
                                                                   setLabourDiscount(event.target.value)
                                                               } else if (event.target.value < 0)
                                                                   event.target.value = 0
                                                               else event.target.value = total


                                                           }

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

                                                <Switch defaultChecked={labourDiscountType === 'ammount'}
                                                        onChange={() => {

                                                            setLabourDiscount(0)
                                                            if (labourDiscountType === 'ammount')
                                                                setLabourDiscountType('percentage')
                                                            else
                                                                setLabourDiscountType('ammount')

                                                        }
                                                        }/>

                                                <Grid item>
                                                    <DiscountIcon/>

                                                </Grid>


                                            </Grid>
                                        </Grid>

                                    </Grid>
                                </Grid>

                                <Grid container spacing={0} direction={'row'} justifyContent={'flex-end'}>


                                    <Grid item>

                                        <Typography fontWeight={'bold'} fontSize={'160%'}>Total
                                            manoperă: {calculateTotalNoDiscount()} lei </Typography>
                                        <Typography fontWeight={'bold'}
                                                    fontSize={'160%'}>Discount: {calculateDiscount()} lei </Typography>
                                        <Typography fontWeight={'bold'} fontSize={'160%'}>Total cu
                                            discount: {calculateTotal()} lei </Typography>

                                    </Grid>
                                </Grid>

                            </Grid>
                        }
                    </div>

                }
                {currentLabourTab === 1 &&
                    <Grid item  margin={'5vh'}>
                        <HourlyLabours itemsData={hourlyLabourData} setItemsData = {setHourlyLabourData} addItemLabel={"Lucrare"} helperText={""}
                                       requirementsLabourData = {requirementsHourlyLabourData}
                                       deletionError = {deletionError} setDeletionError = {setDeletionError} newDeletionError = {newDeletionError}  setNewDeletionError = {setNewDeletionError}

                        />

                    </Grid>

                }

                {currentLabourTab === 2 &&
                    <Grid item  margin={'5vh'}>
                        <Services itemsData={servicesData} setItemsData = {setServicesData} addItemLabel={"Serviciu"} helperText={"Adaugă serviciu:"}
                                  requirementsLabourData = {requirementsServicesData}
                                  deletionError = {deletionError} setDeletionError = {setDeletionError} newDeletionError = {newDeletionError}  setNewDeletionError = {setNewDeletionError}

                        />
                    </Grid>

                }

                {currentLabourTab === 3 &&

                    <Grid item  margin={'5vh'}>
                        <Items itemsData={finalVerificationsData} setItemsData = {setFinalVerificationsData}
                               addItemLabel={"Verificare"} helperText={"Adaugă verificare finală:"}
                               requirementsLabourData = {requirementsFinalVerificationsData}
                               deletionError = {deletionError} setDeletionError = {setDeletionError} newDeletionError = {newDeletionError}  setNewDeletionError = {setNewDeletionError}

                        />
                    </Grid>

                }

            </Grid>




        </React.Fragment>
    );
}
