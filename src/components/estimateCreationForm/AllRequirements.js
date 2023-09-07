import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import {useEffect} from "react";
import AddRequirementToProblem from "./AddRequirementToProblem";
import RequirementsListOfProblem from './RequirementsListOfProblem';
import AddFinalVerificationToRequirement from "./AddFinalVerificationToRequirement";
import Grid from '@mui/material/Grid'
import RequirementsList from "./RequirementsList";
import RequirementsListOfLabours from "./RequirementsListOfLabours";
import AddHourlyLabourToRequirement from "./AddHourlyLabourToRequirement";
import RequirementsListOfFinalVerifications from "./RequirementListOfFinalVerifications";
import AddServiceToRequirement from './AddServiceToRequirement'
import {useAuth} from "../../contexts/AuthContext";
import {doc, getDoc} from "@firebase/firestore";
import {db} from "../authentification/firebase";
import {useState} from "react";

export default function AllRequirements({   problemsData, setProblemsData,
                                            helperText,
                                            problemsDict, setProblemsDict,
                                            hourlyLabourData, setHourlyLabourData,
                                            finalVerificationsData, setFinalVerificationsData,
                                            servicesData, setServicesData,
                                            requirementsHourlyLabourData, setRequirementsHourlyLabourData,
                                            requirementsServicesData, setRequirementsServicesData,
                                            requirementsFinalVerificationsData, setRequirementsFinalVerificationsData

                                        }) {


    const currentUser = useAuth().currentUser
    const uid = currentUser.uid
    const [servicesList, setServicesList] = useState([]);
    const [finalVerificationsList, setFinalVerificationsList] = useState([]);
    const [hourlyLaboursList, setHourlyLaboursList] = useState([]);
    const [hourlyLabourPrice, setHourlyLabourPrice] = useState([]);

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

    return (
        <List sx={{ width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper' ,
            alignItems: 'flex-start' ,
            paddingLeft: '20px',
            marginTop: '5vw'
        }}>
            {problemsData.problems.map((value) => (

                <>
                    <ListItem
                        justifyContent= 'flex-start'
                        alignItems = "center"
                        key={value}
                        sx={{borderStyle: 'solid',
                            borderWidth: '0.5px',
                            borderColor: 'gray',
                            borderRadius: '5px',
                            width: '60vw',
                            paddingLeft: '10px'
                        }}
                    >
                        <ListItemText primary={`${value}`} sx={{overflowWrap: 'break-word'}} />
                    </ListItem>

                    <Grid container spacing={0} direction={'row'} justifyContent={'flex-start'} alignItems={'flex-start'} width={'60vw'}
                    >

                        {/*adauga lucrare*/}
                        <Grid item width={'20vw'}
                              sx={{marginTop: '2vh'}}
                        >
                            <AddHourlyLabourToRequirement addItemLabel={'Lucrare'} itemsData={requirementsHourlyLabourData} setItemsData={setRequirementsHourlyLabourData}
                                labourData={hourlyLabourData} setLabourData={setHourlyLabourData} currentRequirement={value}
                                                          hourlyLaboursList={hourlyLaboursList} hourlyLabourPrice={hourlyLabourPrice}

                            />
                            <RequirementsListOfLabours problemsData = {requirementsHourlyLabourData.find(item => item.key === value).value} setProblemsDict = {setRequirementsHourlyLabourData}
                                                       problemsDict={requirementsHourlyLabourData}
                                                       value={value}
                                                       labourData={hourlyLabourData} setLabourData={setHourlyLabourData}

                            />
                        </Grid>

                        {/*adauga serviciu*/}
                        <Grid item width={'20vw'}
                              sx={{marginTop: '7vh'}}
                        >
                            <AddServiceToRequirement addItemLabel={'Serviciu'} itemsData={requirementsServicesData} setItemsData={setRequirementsServicesData}
                                                    labourData={servicesData} setLabourData={setServicesData} currentRequirement={value}
                                                     servicesList={servicesList}
                            />
                            <RequirementsListOfLabours problemsData = {requirementsServicesData.find(item => item.key === value).value} setProblemsDict = {setRequirementsServicesData}
                                                       problemsDict={requirementsServicesData}
                                                       labourData={servicesData} setLabourData={setServicesData}

                                                       value={value}

                            />
                        </Grid>

                        {/*adauga verificare finala*/}
                        <Grid item width={'20vw'}
                              sx={{marginTop: '12vh'}}
                        >
                            <AddFinalVerificationToRequirement addItemLabel={'Verificare finală'} itemsData={requirementsFinalVerificationsData} setItemsData={setRequirementsFinalVerificationsData}
                                                               labourData={finalVerificationsData} setLabourData={setFinalVerificationsData} currentRequirement={value}
                                                               finalVerificationsList={finalVerificationsList}


                            />

                            <RequirementsListOfFinalVerifications problemsData = {requirementsFinalVerificationsData.find(item => item.key === value).value} setProblemsDict = {setRequirementsFinalVerificationsData}
                                                       problemsDict={requirementsFinalVerificationsData}
                                                      labourData={finalVerificationsData} setLabourData={setFinalVerificationsData}

                                                      value={value}

                            />
                        </Grid>
                    </Grid>

                </>

            ))}
        </List>
    );
}