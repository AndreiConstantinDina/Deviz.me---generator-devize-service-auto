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
import {collection, getDocs, doc, deleteDoc, setDoc, getDoc} from "@firebase/firestore";

import {useAuth} from "../contexts/AuthContext";
import SuccessSnackBar from "./alerts/SuccessSnackBar";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";


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

function Estimates() {
    let data = ""
    let currentUser = useAuth().currentUser
    let uid = useAuth().currentUser.uid
    const [info, setInfo] =  useState([]);
    const [deletedEstimate, setDeletedEstimate] = useState(false)
    let estimatesRef = collection(db, `${uid}`) // luam colectia de devize din firestore
    const [pageRefreshed, setPageRefreshed] = useState(false)


    const newInformation = () => {
        const getEstimates = async () => {
            const data = await getDocs(estimatesRef)
            setInfo(data.docs.map((doc) => ({...doc.data(), id: doc.id, date: doc.data().date})))
        }
        getEstimates()
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

    const storageRef = ref(storage,`images/${uid}`)


    useEffect(() => {
        newInformation()
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
    const [alignment, setAlignment] = React.useState('open');

    const handleAlignment = (event, newAlignment) => {
        if (newAlignment)
            setAlignment(newAlignment);
    };


    return (

        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container display="flex" component="main" maxWidth="sm" sx={{ mb: 4, justifyContent: 'space-between'}}>
                    <StyledToggleButtonGroup
                        size="small"
                        value={alignment}
                        exclusive
                        onChange={handleAlignment}
                        aria-label="text alignment"
                    >

                    </StyledToggleButtonGroup>

            </Container>
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    position: 'relative',
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            >

            </AppBar>
            {alignment === "open" && <Container component="main" maxWidth="sm" sx={{ mb: 4, justifyContent: 'space-between'}}>

                {info.map((element) => {
                    return(
                    <div sx={{display: 'grid'}}>
                        <EstimateClick element = {element} info = {info} setInfo= {setInfo} deleteElement={deleteElement} usersData = {usersData} URL = {URL}/>
                    </div>)
                    }
                )}
            </Container>}
            {!pageRefreshed && <SuccessSnackBar message = "Devizul a fost șters cu succes!" refreshOn={deletedEstimate}/>}
        </ThemeProvider>
    );
}

export default Estimates;