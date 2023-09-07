import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import EstimateClick from "./EstimateClick";
import {useRef, useState} from "react";
import {db, storage} from './authentification/firebase'
import {useEffect} from "react";
import {collection, getDocs, doc, deleteDoc, setDoc, getDoc, addDoc} from "@firebase/firestore";

import {useAuth} from "../contexts/AuthContext";
import SuccessSnackBar from "./alerts/SuccessSnackBar";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {FormControl, InputLabel, Pagination, Select, TextField} from "@mui/material";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import ClosedEstimateClick from "./ClosedEstimateClick";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from "@mui/material/IconButton";
import secureLocalStorage from "react-secure-storage";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";

const theme = createTheme();

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
        margin: theme.spacing(5),
        marginBottom: 0,

        paddingTop: 0,
        border: 0,
        '&.Mui-disabled': {
            border: 0,
        },
        '&:not(:first-of-type)': {
            borderRadius: theme.shape.borderRadius,
        },
        '&:first-of-type': {
            borderRadius: theme.shape.borderRadius,
        },
    },
}));

function dateCheck(dateFrom,dateTo,dateCheck) {

    var d1 = dateFrom.split("/");
    var d2 = dateTo.split("/");
    var c = dateCheck.split("/");

    var from = new Date(d1[2], parseInt(d1[1])-1, d1[0]);  // -1 because months are from 0 to 11
    var to   = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
    var check = new Date(c[2], parseInt(c[1])-1, c[0]);

    return (check >= from && check <= to)
}


function Estimates() {
    let data = ""
    let currentUser = useAuth().currentUser
    let uid = useAuth().currentUser.uid
    const [info, setInfo] =  useState([]);
    const [deletedEstimate, setDeletedEstimate] = useState(false);
    let estimatesRef = collection(db, `${uid}`) // luam colectia de devize din firestore
    let closedEstimatesRef =  collection(db, `${uid}`+'closed')
    const [pageRefreshed, setPageRefreshed] = useState(false);

    const [pageNumber, setPageNumber] = useState(1);
    const [numberOfElements, setNumberOfElements] = useState(10);

    const [closedEstimates, setClosedEstimates] =  useState([]);

    const [searchValue, setSearchValue] = useState("")
    const [closedEstimatesSearchValue, setClosedEstimatesSearchValue] = useState("")

    const [elementWasArchived, setElementWasArchived] = useState(false)
    const [archivedElement, setArchivedElement] = useState(false);

    const [loading, setLoading] = useState(false)

    const newInformation = () => {
        // setLoading(true)
        const getEstimates = async () => {
            const data = await getDocs(estimatesRef)
            setInfo(data.docs.map((doc) => ({...doc.data(), id: doc.id, date: doc.data().date})))
            // setLoading(false)
        }
        getEstimates()
    }
    const getEstimates = async () => {
        const data = await getDocs(estimatesRef)
        setInfo(data.docs.map((doc) => ({...doc.data(), id: doc.id, date: doc.data().date})))
        // setLoading(false)
    }

    const newClosedEstimatesInformation = () => {
        // setLoading(true)
        const getClosedEstimates = async () => {
            const data = await getDocs(closedEstimatesRef)
            setClosedEstimates(data.docs.map((doc) => ({...doc.data(), id: doc.id, date: doc.data().date})))
        }
        getClosedEstimates()
        // setLoading(false)
    }

    const [usersData, setUsersData] =  useState({});

    const [company, setCompany] = useState("");
    const [address, setAddress] = useState("");
    const [workAddress, setWorkAddress] = useState("");
    const [CUI, setCUI] = useState("");
    const [comerceRegisterNumber, setComerceRegisterNumber] = useState("");
    const [bank, setBank] = useState("");
    const [IBAN, setIBAN] = useState("");

    const [imageUpload, setImageUpload] = useState(null);
    const [URL, setURL] = useState("");

    const [startDate, setStartDate] = useState('25/1/2022')
    let today = new Date().getDate().toString() + '/' + (new Date().getMonth() + 1).toString() + '/' + new Date().getFullYear().toString()

    const [endDate, setEndDate] = useState (today)

    const storageRef = ref(storage,`images/${uid}`)


    useEffect(() => {
        // newInformation()
        // newClosedEstimatesInformation()

        setPageRefreshed(true)
        let docRef = null
        let docSnap = null
        // uid = currentUser.uid
        // estimatesRef = collection(db, `${uid}`)

        getDownloadURL(storageRef).then((currentURL) => {
            setURL(currentURL);
        })

            .catch((error)=>{
            })

        const getUsersData = async () => {
            try{
                docRef = await doc(db, "Users", uid)
                docSnap = await getDoc(docRef);
            }
            catch(e){
            }
            finally {
            }
        }

        getUsersData().then(()=> {
            data = docSnap.data()
            // setUsersData(data)
            setUsersData(data)
            setCompany(data.company)
            setIBAN(data.IBAN)
            setBank(data.bank)
            setCUI(data.CUI)
            setComerceRegisterNumber(data.comerceRegisterNumber)
            setWorkAddress(data.workAddress)
            setAddress(data.address)

        })
    }, []);

    useEffect(()=>{
        if (searchValue === '')
            newInformation()

        let newInfo = []
        info.forEach((element) => {
            if (dateCheck(startDate, endDate, element.date))
                if (element.clientData.name.toLowerCase().includes(searchValue.toLowerCase())
                    ||
                    element.carData.plate.toLowerCase().includes(searchValue.toLowerCase())
                    ||
                    element.clientData.phone.includes(searchValue.toLowerCase())
                    ||
                    element.carData.brand.toLowerCase().includes(searchValue.toLowerCase())
                    ||
                    element.date.toLowerCase().includes(searchValue.toLowerCase())
            )
                newInfo.push(element)
        });
        setInfo(newInfo)
    }, [searchValue])

    useEffect(()=>{
        if (closedEstimatesSearchValue === '')
            newClosedEstimatesInformation()

        let newEstimates = []
        closedEstimates.forEach((element) => {
            if (dateCheck(startDate, endDate, element.date))
                if (element.clientData.name.toLowerCase().includes(closedEstimatesSearchValue.toLowerCase())
                ||
                element.carData.plate.toLowerCase().includes(closedEstimatesSearchValue.toLowerCase())
                ||
                element.clientData.phone.includes(closedEstimatesSearchValue.toLowerCase())
                ||
                element.carData.brand.toLowerCase().includes(closedEstimatesSearchValue.toLowerCase())
                ||
                element.date.toLowerCase().includes(closedEstimatesSearchValue.toLowerCase())
            )
                newEstimates.push(element)
        });
        setClosedEstimates(newEstimates)
    }, [closedEstimatesSearchValue])

    //
    // useEffect(() => {
    //     newInformation()
    //     let newInfo = []
    //     info.forEach((element) => {
    //         if (dateCheck(startDate, endDate, element.date))
    //             newInfo.push(element)
    //     });
    //     setInfo(newInfo)
    // }, [startDate, endDate])


    const deleteElement = (id) => {
        const docRef = doc(db, `${uid}`, id);
        deleteDoc(docRef)
            .then(() => {
                setDeletedEstimate(!deletedEstimate)
                setPageRefreshed(false)
            })
            .catch(error => {
            })
        const findID = (el) => el.id === id
        info.splice(info.findIndex(findID), 1)
    }
    const deleteClosedEstimate = (id) => {
        const docRef = doc(db, `${uid}`+'closed', id);
        deleteDoc(docRef)
            .then(() => {
                setDeletedEstimate(!deletedEstimate)
                setPageRefreshed(false)
            })
            .catch(error => {
            })
        const findID = (el) => el.id === id
        closedEstimates.splice(closedEstimates.findIndex(findID), 1)
    }
    const archiveElement = (id) => {
        const docRef = doc(db, `${uid}`, id);
        const data = info.find(e => e.id === id)

        addDoc(closedEstimatesRef, data)


        newClosedEstimatesInformation()

        deleteDoc(docRef)
            .then(() => {
                setDeletedEstimate(!deletedEstimate)
                setArchivedElement(!archivedElement)
                setElementWasArchived(true)
            })
            .catch(error => {
            })
        const findID = (el) => el.id === id
        info.splice(info.findIndex(findID), 1)
    }

    const [alignment, setAlignment] = React.useState('open');

    const handleAlignment = (event, newAlignment) => {
        if (newAlignment)
            setAlignment(newAlignment);
    };


    if (loading)
        return (<div></div>)

    return (

        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container display="flex" component="main"  sx={{ mb: 4, alignItems: 'center', justifyContent: 'flex-start'}}>
                    <StyledToggleButtonGroup
                        size={'large'}
                        value={alignment}
                        exclusive
                        onChange={handleAlignment}
                        fullWidth
                    >

                        <ToggleButton value={'open'}>
                          <Typography sx={{fontWeight: '500', fontSize: '20px'}} paddingTop={2}> Devize active</Typography>
                        </ToggleButton>

                        <ToggleButton value={'closed'}>
                          <Typography sx={{fontWeight: '500', fontSize: '20px'}} paddingTop={2}> Devize închise</Typography>
                        </ToggleButton>



                    </StyledToggleButtonGroup>

            </Container>

            <AppBar
                position="absolute"
                color="default"
                elevation={3}
                sx={{
                    position: 'relative',
                    borderBottom: (t) => `2px solid ${t.palette.divider}`,
                }}
            >

            </AppBar>
            {alignment === "open" &&

                <Grid container columns={21} >
                <Grid item xs={7} >
                    {/*<Container sx={{marginTop: 7, marginLeft: 10}}  >*/}
                    {/*    <LocalizationProvider dateAdapter={AdapterDayjs} >*/}
                    {/*        <DatePicker*/}
                    {/*            slotProps={{*/}
                    {/*                textField: {*/}
                    {/*                    helperText: 'Data de început',*/}
                    {/*                },*/}
                    {/*            }}*/}
                    {/*            onChange={(value)=>{*/}
                    {/*                setStartDate(value.$D + '/' + String(value.$M+1) + '/' + value.$y)*/}
                    {/*            }}*/}
                    {/*            format={'DD/MM/YYYY'}*/}
                    {/*        />*/}
                    {/*        <br/>*/}
                    {/*        <br/>*/}
                    {/*        <br/>*/}

                    {/*        <DatePicker*/}
                    {/*                    slotProps={{*/}
                    {/*                        textField: {*/}
                    {/*                            helperText: 'Data de final',*/}
                    {/*                        },*/}
                    {/*                    }}*/}
                    {/*                    onChange={(value)=>{*/}
                    {/*                        setEndDate(value.$D + '/' + String(value.$M+1) + '/' + value.$y)*/}

                    {/*                    }}*/}
                    {/*                    format={'DD/MM/YYYY'}*/}
                    {/*        />*/}
                    {/*        <br/>*/}
                    {/*        <Button onClick={() =>{*/}
                    {/*            let newInfo = []*/}
                    {/*            info.forEach((element) => {*/}
                    {/*                if (dateCheck(startDate, endDate, element.date))*/}
                    {/*                    newInfo.push(element)*/}
                    {/*            });*/}
                    {/*            setInfo(newInfo)*/}
                    {/*            }}>CAUTĂ</Button>*/}
                    {/*    </LocalizationProvider>*/}
                    {/*</Container>*/}
                </Grid>

                    <Grid item xs={7}>
                        <Container component="main" maxWidth="sm" sx={{ mb: 4, justifyContent: 'space-between', pt: 5}}>
                            {info.slice((pageNumber-1)*numberOfElements, pageNumber*numberOfElements).map((element) => {
                                    return(
                                        <div sx={{display: 'grid'}}>
                                            <EstimateClick element = {element} info = {info} setInfo= {setInfo} deleteElement={deleteElement} usersData = {usersData} URL = {URL}
                                                           archiveElement = {archiveElement}
                                            />
                                        </div>)
                                }
                            )}

                            <Stack justifyContent={'flex-end'} alignItems={"center"}>
                                <Pagination count={Math.ceil(info.length/numberOfElements)} color="primary" size={'large'}
                                            hideNextButton = {false}
                                            hidePrevButton = {false}
                                            onChange={(event, value)=>{
                                                setPageNumber(value)
                                            }}
                                />
                                {/*<FormControl>*/}
                                {/*    <Grid container direction={'row'} sx={{width: 'auto', paddingTop: '3vh', alignItems: 'center'}}>*/}
                                {/*        <Grid item marginRight={3}>*/}
                                {/*            <Typography>*/}
                                {/*                Număr de devize pe pagină*/}
                                {/*            </Typography>*/}
                                {/*        </Grid>*/}

                                {/*         <Grid item>*/}
                                {/*             <Select*/}
                                {/*                 sx={{width: '10'}}*/}
                                {/*                 defaultValue={numberOfElements}*/}
                                {/*                 label="Număr de devize pe pagină"*/}
                                {/*                 onChange={(event)=>{*/}
                                {/*                     setNumberOfElements(event.target.value)*/}
                                {/*                     setPageNumber(1)*/}
                                {/*                 }}*/}
                                {/*                 size={'small'}*/}
                                {/*             >*/}
                                {/*                 <MenuItem value={5}>5</MenuItem>*/}
                                {/*                 <MenuItem value={10}>10</MenuItem>*/}
                                {/*                 <MenuItem value={15}>15</MenuItem>*/}
                                {/*             </Select>*/}
                                {/*        </Grid>*/}

                                {/*    </Grid>*/}

                                {/*</FormControl>*/}
                            </Stack>

                        </Container>
                    </Grid>
                    <Grid item xs={7} >
                        <Container justifyContent={'flex-start'} alignItems={'flex-end'} sx={{marginTop: 7}}>

                            <TextField size={'small'}
                                       label={'Caută un deviz'}
                                       onChange={(event)=>{
                                    setSearchValue(event.target.value)
                                }}



                            />

                            <IconButton disabled={true}>
                                <SearchIcon color={'primary'}
                                />
                            </IconButton>
                        </Container>


                    </Grid>
            </Grid>
            }

            {alignment==='closed' &&
                <Grid container columns={21}>
                    <Grid item xs={7} >

                    </Grid>

                    <Grid item xs={7}>
                        <Container component="main" maxWidth="sm" sx={{ mb: 4, justifyContent: 'space-between', pt: 5}}>

                {closedEstimates.slice((pageNumber-1)*numberOfElements, pageNumber*numberOfElements).map((element) => {
                        return(
                            <div sx={{display: 'grid'}}>
                                <ClosedEstimateClick element = {element} info = {info} setInfo= {setInfo} deleteElement={deleteClosedEstimate} usersData = {usersData} URL = {URL}/>
                            </div>)
                    }
                )}
                        </Container>
                <Stack justifyContent={'flex-end'} alignItems={"center"}>
                    <Pagination count={Math.ceil(closedEstimates.length/numberOfElements)} color="primary" size={'large'}
                                hideNextButton = {false}
                                hidePrevButton = {false}
                                onChange={(event, value)=>{
                                    setPageNumber(value)
                                }}
                    />

                    {/*<FormControl>*/}
                    {/*    <Grid container direction={'row'} sx={{width: 'auto', paddingTop: '3vh', alignItems: 'center'}}>*/}
                    {/*        <Grid item marginRight={3}>*/}
                    {/*            <Typography>*/}
                    {/*                Număr de devize pe pagină*/}
                    {/*            </Typography>*/}
                    {/*        </Grid>*/}

                    {/*         <Grid item>*/}
                    {/*             <Select*/}
                    {/*                 sx={{width: '10'}}*/}
                    {/*                 defaultValue={numberOfElements}*/}
                    {/*                 label="Număr de devize pe pagină"*/}
                    {/*                 onChange={(event)=>{*/}
                    {/*                     setNumberOfElements(event.target.value)*/}
                    {/*                     setPageNumber(1)*/}
                    {/*                 }}*/}
                    {/*                 size={'small'}*/}
                    {/*             >*/}
                    {/*                 <MenuItem value={5}>5</MenuItem>*/}
                    {/*                 <MenuItem value={10}>10</MenuItem>*/}
                    {/*                 <MenuItem value={15}>15</MenuItem>*/}
                    {/*             </Select>*/}
                    {/*        </Grid>*/}

                    {/*    </Grid>*/}

                    {/*</FormControl>*/}
                </Stack>
                    </Grid>
                    <Grid item xs={7} >
                        <Container justifyContent={'flex-start'} alignItems={'flex-end'} sx={{marginTop: 7}}>

                            <TextField size={'small'}
                                       label={'Caută un deviz'}
                                       onChange={(event)=>{
                                setClosedEstimatesSearchValue(event.target.value)
                            }}
                            />

                            <IconButton disabled={true}>
                                <SearchIcon color={'primary'}
                                />
                            </IconButton>
                        </Container>


                    </Grid>


            </Grid>}
            {!pageRefreshed && <SuccessSnackBar message = "Devizul a fost șters cu succes!" refreshOn={deletedEstimate}/>}
            {elementWasArchived && <SuccessSnackBar message = "Devizul a fost arhivat cu succes!" refreshOn={archivedElement}/>}

        </ThemeProvider>
    );
}

export default Estimates;