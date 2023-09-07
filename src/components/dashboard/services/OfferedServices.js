import React from 'react';
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {Tab, Tabs} from "@mui/material";
import {useState} from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import SearchIcon from "@mui/icons-material/Search";
import {useEffect} from 'react'
import {useAuth} from "../../../contexts/AuthContext";
import {ref} from "firebase/storage";
import {db, storage} from "../../authentification/firebase";
import {doc, getDoc, setDoc} from "@firebase/firestore";

function OfferedServices(props) {

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    const handleHourlyLabourDelete = (element) => {
        const newHourlyLaboursList = hourlyLaboursList.filter((e) => e.item !== element.item)
        setHourlyLaboursList(newHourlyLaboursList);
    }

    const handleServiceDelete = (element) => {
        const newServicesList = servicesList.filter((e) => e.item !== element.item)
        setServicesList(newServicesList);
    }

    const handleFinalVerificationDelete = (element) => {
        const newFinalVerificationsList = finalVerificationsList.filter((e) => e.item !== element.item)
        setFinalVerificationsList(newFinalVerificationsList);
    }

    const currentUser = useAuth().currentUser
    const uid = currentUser.uid


    const [hourlyLaboursList, setHourlyLaboursList] = useState([]);

    const [hourlyLabourPrice, setHourlyLabourPrice] = useState('0')
    const [newHourlyLabour, setNewHourlyLabour] = useState('')

    const [hourlyLabourSearchValue, setHourlyLabourSearchValue] = useState('')


    const [servicesList, setServicesList] = useState([]);

    const [newServicePrice, setNewServicePrice] = useState('')
    const [newService, setNewService] = useState('')

    const [serviceSearchValue, setServiceSearchValue] = useState('')


    const [newFinalVerificationPrice, setNewFinalVerificationPrice] = useState('')
    const [newFinalVerification, setNewFinalVerification] = useState('')

    const [finalVerificationSearchValue, setFinalVerificationSearchValue] = useState('')

    const [finalVerificationsList, setFinalVerificationsList] = useState([]);


    const [currentTab, setCurrentTab] = useState(0)


    const addNewHourlyLabour = () => {
        if (newHourlyLabour === '' )
            return;
        const newHourlyLaboursList = []
        let add = true

        hourlyLaboursList.forEach((element) => {
            if (element.item === newHourlyLabour)
                add = false;
            newHourlyLaboursList.push({
                item: element.item,
            })
        })

        newHourlyLaboursList.push({
            item: newHourlyLabour,
        })
        if (add) {
            setHourlyLaboursList(newHourlyLaboursList)
        }
        setNewHourlyLabour('')
    }


    const addNewService = () => {
        if (newService === '' || newServicePrice === '')
            return
        const newServicesList = []
        let add = true
        servicesList.forEach((element) => {
            if (element.item === newService)
                add = false;
            newServicesList.push({
                item: element.item,
                price: element.price
            })
        })

        newServicesList.push({
            item: newService,
            price: newServicePrice
        })
        if (add) {
            setServicesList(newServicesList)
        }        setNewService('')
        setNewServicePrice('')
    }

    const addNewFinalVerification = () => {
        if (newFinalVerification === '' || newFinalVerificationPrice === '')
            return
        const newFinalVerificationsList = []
        let add = true
        finalVerificationsList.forEach((element) => {
            if (element.item === newFinalVerification)
                add = false;
            newFinalVerificationsList.push({
                item: element.item,
                price: element.price
            })
        })

        newFinalVerificationsList.push({
            item: newFinalVerification,
            price: newFinalVerificationPrice
        })
        if (add) {
            setFinalVerificationsList(newFinalVerificationsList)
        }
        setNewFinalVerification('')
        setNewFinalVerificationPrice('')
    }


    const handleSaveServices = async () => {
        await setDoc(doc(db, `${uid}lists`, 'services'), {
           servicesList
        })
    }

    const handleSaveFinalVerifications = async () => {
        await setDoc(doc(db, `${uid}lists`, 'finalVerifications'), {
            finalVerificationsList
        })
    }

    const handleSaveHourlyLabours = async () => {
        await setDoc(doc(db, `${uid}lists`, 'hourlyLabours'), {
            hourlyLaboursList,
            hourlyLabourPrice
        })
    }

    useEffect(() => {
        let docRef = null
        let docSnap = null

        const getServicesData = async () => {
            try{
                docRef = await doc(db,  `${uid}lists`, 'services')
                docSnap = await getDoc(docRef);
            }
            catch(e){
            }
        }

        getServicesData().then(() => {
            let data = docSnap.data()
            setServicesList(data.servicesList)
            }
        )

        const getFinalVerificationsData = async () => {
            try{
                docRef = await doc(db,  `${uid}lists`, 'finalVerifications')
                docSnap = await getDoc(docRef);
            }
            catch(e){
            }
        }

        getFinalVerificationsData().then(() => {
            let data = docSnap.data()
            setFinalVerificationsList(data.finalVerificationsList)
        })

        const getHourlyLaboursData = async () => {
            try{
                docRef = await doc(db,  `${uid}lists`, 'hourlyLabours')
                docSnap = await getDoc(docRef);
            }
            catch(e){
            }
        }

        getHourlyLaboursData().then(() => {
            let data = docSnap.data()
            setHourlyLaboursList(data.hourlyLaboursList)
            setHourlyLabourPrice(data.hourlyLabourPrice)
        })

    }, [])


    useEffect(() => {
        if (servicesList.length !== 0)
            handleSaveServices()
    }, [servicesList])

    useEffect(() => {
        if (finalVerificationsList.length !== 0)
            handleSaveFinalVerifications()
    }, [finalVerificationsList])


    useEffect(() => {
        if (hourlyLaboursList.length !== 0)
            handleSaveHourlyLabours()
    }, [hourlyLaboursList, hourlyLabourPrice])


    return (
        <div>
            <Grid container spacing={2}
                   direction="column"
                   justifyContent="space-around  "
                   alignItems="center"
                   auto
                   padding={5}
                   style={{gap: 30}}
            >

                <Grid item position={'relative'}>

                    <Tabs value={currentTab} onChange={handleTabChange} aria-label="icon label tabs example">
                        <Tab label="Tarife orare" />
                        <Tab label="Tarife servicii" />
                        <Tab label="Tarife verificari finale" />

                    </Tabs>
                </Grid>
                {currentTab === 0 &&
                    <>
                    <Grid container spacing={3} direction={'row'} justifyContent={'space-between'} alignItems={'center'} width = 'auto' marginBottom={'3vh'}>

                        <Grid item >
                            <TextField  size={'small'}
                                        label={'Tarif universal (lei/h)'}
                                        onChange={(event) => {
                                            if (event.target.value >= 0 && event.target.value < 999999){
                                                let price = event.target.value
                                                setHourlyLabourPrice(price)
                                            }
                                            else if (event.target.value < 0)
                                                event.target.value = 0
                                            else event.target.value = 999999
                                        }}
                                        value={hourlyLabourPrice}
                                        inputProps={{style: {fontSize: '100%', fontWeight: '700'}}}
                                        InputLabelProps={{style: {fontWeight: '700'}}}
                            />
                        </Grid>
                        <Grid item >
                                <TextField  size={'small'}
                                            label={'Denumire lucrare'}
                                            onChange={(event)=>{
                                                setNewHourlyLabour(event.target.value)
                                            }}
                                            value={newHourlyLabour}
                                />
                            </Grid>
                            <Grid item>
                                <Button variant={'outlined'}
                                        onClick={addNewHourlyLabour}
                                > Adaugă </Button>
                            </Grid>
                        </Grid>
                        <Card sx={{ width: '100%', maxWidth: '40vw', minHeight: '60vh', bgcolor: 'background.paper' }} elevation={6}>
                            <Box sx={{ width: '80%', bgcolor: 'background.paper', paddingLeft: '25%', paddingTop: '30px'}}>

                                <TextField size={'small'}
                                           label={'Caută o lucrare'}
                                           onChange={(event)=>{
                                               setHourlyLabourSearchValue(event.target.value)
                                           }}
                                />

                                <IconButton disabled={true}>
                                    <SearchIcon color={'primary'}
                                    />
                                </IconButton>
                            </Box>
                            <Box sx={{ width: '80%', maxWidth: '20vw', maxHeight: '50vh', overflow: 'auto', bgcolor: 'background.paper', paddingLeft: '25%', paddingTop: '30px', marginBottom: '30px'}}>
                                <List style={{maxHeight: '100%', overflow: 'auto'}}>
                                    {hourlyLaboursList.map(labourItem => {
                                        if (labourItem.item.toLowerCase().includes(hourlyLabourSearchValue.toLowerCase()))
                                        {
                                            return <ListItem sx={{
                                                borderStyle: 'solid',
                                                borderWidth: '1px',
                                                borderColor: 'gray',
                                                marginBottom: '1px',
                                                borderRadius: '5px',
                                                '&:nth-of-type(even)': {
                                                    backgroundColor: "whitesmoke",
                                                },
                                            }}>
                                                <ListItemText primary= {labourItem.item}/>
                                                <IconButton onClick={() => {
                                                    handleHourlyLabourDelete(labourItem)
                                                }}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItem>
                                        }
                                    })}
                                </List>
                            </Box>
                        </Card>
                    </>
                }

                {currentTab === 1 &&
                    <>
                    <Grid container spacing={3} direction={'row'} justifyContent={'space-between'} alignItems={'center'} width = 'auto' marginBottom={'3vh'}>
                        <Grid item >
                            <TextField  size={'small'}
                                        label={'Denumire serviciu'}
                                        onChange={(event)=>{
                                            setNewService(event.target.value)
                                        }}
                                        value={newService}
                            />
                        </Grid>
                        <Grid item>
                            <TextField  size={'small'}
                                        label={'Tarif (lei)'}
                                        sx={{width: '70%'}}
                                        onChange={(event) => {
                                            if (event.target.value >= 0 && event.target.value < 999999){
                                                let price = event.target.value
                                                setNewServicePrice(price)
                                            }
                                            else if (event.target.value < 0)
                                                event.target.value = 0
                                            else event.target.value = 999999
                                        }}
                                        value={newServicePrice}
                            />
                        </Grid>

                        <Grid item>
                            <Button variant={'outlined'}
                                onClick={addNewService}
                                > Adaugă </Button>
                        </Grid>
                    </Grid>
                    <Card sx={{ width: '100%', maxWidth: '40vw', minHeight: '60vh', bgcolor: 'background.paper' }} elevation={6}>
                        <Box sx={{ width: '80%', bgcolor: 'background.paper', paddingLeft: '25%', paddingTop: '30px'}}>

                            <TextField size={'small'}
                                       label={'Caută un serviciu'}
                                       onChange={(event)=>{
                                           setServiceSearchValue(event.target.value)
                                       }}
                            />

                            <IconButton disabled={true}>
                                <SearchIcon color={'primary'}
                                />
                            </IconButton>
                        </Box>
                        <Box sx={{ width: '80%', maxWidth: '20vw', maxHeight: '50vh', overflow: 'auto', bgcolor: 'background.paper', paddingLeft: '25%', paddingTop: '30px', marginBottom: '30px'}}>


                        <List style={{maxHeight: '100%', overflow: 'auto'}}>
                                {servicesList.map(serviceItem => {
                                    if (serviceItem.item.toLowerCase().includes(serviceSearchValue.toLowerCase())
                                        ||
                                        serviceItem.price.toLowerCase().includes(serviceSearchValue.toLowerCase())
                                    )
                                    {
                                        return <ListItem sx={{
                                            borderStyle: 'solid',
                                            borderWidth: '1px',
                                            borderColor: 'gray',
                                            marginBottom: '1px',
                                            borderRadius: '5px',
                                            '&:nth-of-type(even)': {
                                                backgroundColor: "whitesmoke",
                                            },
                                        }}>
                                            <ListItemText primary= {serviceItem.item} secondary={ `${serviceItem.price} lei`}/>
                                            <IconButton onClick={() => {
                                                handleServiceDelete(serviceItem)
                                            }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItem>
                                    }
                                })}
                            </List>
                        </Box>
                    </Card>
                    </>
                }


                {currentTab === 2 &&
                    <>
                        <Grid container spacing={3} direction={'row'} justifyContent={'space-between'} alignItems={'center'} width = 'auto' marginBottom={'3vh'}>
                            <Grid item >
                                <TextField  size={'small'}
                                            label={'Denumire verificare'}
                                            onChange={(event)=>{
                                                setNewFinalVerification(event.target.value)
                                            }}
                                            value={newFinalVerification}
                                />
                            </Grid>
                            <Grid item>
                                <TextField  size={'small'}
                                            label={'Tarif (lei)'}
                                            sx={{width: '70%'}}
                                            onChange={(event) => {
                                                if (event.target.value >= 0 && event.target.value < 999999){
                                                    let price = event.target.value
                                                    setNewFinalVerificationPrice(price)
                                                }
                                                else if (event.target.value < 0)
                                                    event.target.value = 0
                                                else event.target.value = 999999
                                            }}
                                            value={newFinalVerificationPrice}
                                />
                            </Grid>

                            <Grid item>
                                <Button variant={'outlined'}
                                        onClick={addNewFinalVerification}
                                > Adaugă </Button>
                            </Grid>
                        </Grid>
                        <Card sx={{ width: '100%', maxWidth: '40vw', minHeight: '60vh', bgcolor: 'background.paper' }} elevation={6}>
                            <Box sx={{ width: '80%', bgcolor: 'background.paper', paddingLeft: '25%', paddingTop: '30px'}}>

                                <TextField size={'small'}
                                           label={'Caută o verificare'}
                                           onChange={(event)=>{
                                               setFinalVerificationSearchValue(event.target.value)
                                           }}
                                />

                                <IconButton disabled={true}>
                                    <SearchIcon color={'primary'}
                                    />
                                </IconButton>
                            </Box>
                            <Box sx={{ width: '80%', maxWidth: '20vw', maxHeight: '50vh', overflow: 'auto', bgcolor: 'background.paper', paddingLeft: '25%', paddingTop: '30px', marginBottom: '30px'}}>


                                <List style={{maxHeight: '100%', overflow: 'auto'}}>
                                    {finalVerificationsList.map(finalVerificationItem => {
                                        if (finalVerificationItem.item.toLowerCase().includes(finalVerificationSearchValue.toLowerCase())
                                            ||
                                            finalVerificationItem.price.toLowerCase().includes(finalVerificationSearchValue.toLowerCase())
                                        )
                                        {
                                            return <ListItem sx={{
                                                borderStyle: 'solid',
                                                borderWidth: '1px',
                                                borderColor: 'gray',
                                                marginBottom: '1px',
                                                borderRadius: '5px',
                                                '&:nth-of-type(even)': {
                                                    backgroundColor: "whitesmoke",
                                                },
                                            }}>
                                                <ListItemText primary= {finalVerificationItem.item} secondary={ `${finalVerificationItem.price} lei`}/>
                                                <IconButton onClick={() => {
                                                    handleFinalVerificationDelete(finalVerificationItem)
                                                }}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItem>
                                        }
                                    })}
                                </List>
                            </Box>
                        </Card>
                    </>
                }

            </Grid>

        </div>
    );
}

export default OfferedServices;