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
import Typography from '@mui/material/Typography';
import {createTheme, styled, ThemeProvider} from '@mui/material/styles';
import ClientDetails from './ClientDetails';
import CarDetails from './CarDetails';
import ProblemsDescribedByClient from "./ProblemsDescribedByClient";
import ProblemsFoundByService from "./ProblemsFoundByService";
import {useRef, useState} from "react";
import {db} from '../authentification/firebase'
import {addDoc, collection} from '@firebase/firestore'
import { Link } from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";
import EstimateError from "../alerts/EstimateError";
import Grid from "@mui/material/Grid";
import ToggleButton from "@mui/material/ToggleButton";
import Slide from "@mui/material/Slide";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from 'react-router-dom'
import Parts from "./Parts";
import VehicleReception from "./VehicleReception";
import ServiceRecommendations from "./ServiceRecommendations";
import Labour from "./Labour";
import RepairRequirements from "./RepairRequirements";



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


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

const steps = ['client', 'car', 'problemsDescription', 'serviceRequirements', 'reception', 'repairRequirements', 'parts', 'labour', 'recommendations']

const stepsDict = {
    'client': 'Client',
    'car': 'Autovehicul',
    'problemsDescription': 'Descriere defecțiuni',
    'serviceRequirements': 'Cerințe de service',
    'reception': 'Recepție autovehicul',
    'repairRequirements': 'Constatari în service',
    'parts': 'Piese',
    'labour': 'Manopera',
    'recommendations': "Recomandări service",

}

const theme = createTheme();

export default function CarEstimate() {
    const currentUser = useAuth().currentUser
    const uid = currentUser.uid
    const deviz = collection(db, `${uid}`)

    const [clientData, setClientData] = useState({
        lastName: '',
        firstName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        county: '',
        country: 'Romania'
    });

    const [carData, setCarData] = useState({
        vin: '',
        plate: '',
        brand: '',
        model: '',
        year: '',
        type: '',
        capacity: '',
        motorCode: '',
        fuel: '',
        color: ''
    });

    const [problemsData, setProblemsData] = useState({
        problems: [],
        newProblem: '',
        options: ["Martori aprinsi in bord", "Electromotorul functioneaza dar motorul nu porneste", "Electromotorul nu functioneaza", "Mers neregulat", "Relanti instabil", "Trepideaza in relanti", "Ne se accelereaza / nu se tureaza", "Nu trage", "Zgomot, batai motor in accelerare", "Zgomot de injectie", "Scoate fum alb/albastru in relanti", "Scoate fum negru in relanti", "Scoate fum alb/albastru in accelerare", "Scoate fum negru in accelerare", "Pierderi de ulei", "Consum de ulei", "Pierderi lichid de racire", "Dispare lichidul de racire din vasul de expansiune", "Fierbe motorul, in bord indica cresterea temperaturii motorului", "Nu pornesc ventilatoarele de racire a motorului", "Presiune mare in vasul de expansiune.", "Vapori si bule de aer in vasul de expansiune", "Arunca lichidul de racire afara din vasul de expansiune", "Termostat blocat", "Radiator racier motor infundat, spart", "Furtune din circuitul de racire sparte", "Faruri dereglate stg / dr", "Faruri matuite", "Nu functioneaza comenzile luminilor", "Nu franeaza corespunzator", "Zgomot la franare", "Trage stanga sau dreapta in timpul franarii", "Trepideaza volanul in timpul franarii", "Nu tine frana de mana", "O roata se incinta/merge blocata: stg/dr, fata/spate", "Pedala de frana se duce la podea", "Pedala de frana este elastica", "ABS-ul nu functioneaza", "Trage stanga sau dreapta in timpul mersului", "Zgomot in timpul mersului", "Zgomot in viraje", "Trepidatii in volan in timpul virarii stanga/dreapta", "Scartait in timpul virarii stanga sau dreapta", "Balans in timpul mersului", "Zgomote suspecte la trecerea peste denivelari", "Zgomote dese la mersul pe teren accidentat sau cu gropi", "Masina este lasata intr-o parte", "Arcuri rupte stg/dr, fata/spate", "Amortizoare curse stg/dr, fata/spate", "Zgomot la oprirea motorului", "Mers neregulat al motorului in relanti", "Zgomot la roti in timpul mersului stg/dr, fata/spate", "Socuri in timpul plecarii de pe loc", "Motorul se tureaza, dar masina nu fuge", "Intra greu / nu intra in treapta de viteza: pe loc/in mers", "Zgomot in cutia de viteze", "Schimba treptele de viteza cu socuri", "Pleaca greu de pe loc", "Desi este in viteza, cu motorul pornit, nu pleaca de pe loc", "Parbrizul se abureste in timpul mersului", "Nu face cald", "Nu comuta de la rece la cald in partea stg/dr, jos/sus", "Scurgeri de lichid de racire in habitaclul interior", "Indicatorul din bord arata ca nu creste temperatura lichidului de racire", "Umiditate crescuta in habitaclul pasagerilor", "AC-ul nu porneste", "AC-ul porneste, dar nu face rece", "Clapetele nu cumuta stg/dr, sus/jos", "Ventilatorul de interior, nu porneste", "Ventilatorul de interior nu functioneaza pe toate treptele", "Lipsa Freon", "Scurgeri de Freon", "Compresor defect", "Zgomot la cuplarea AC-ului in interiorul habitaclului", "Zgomot la cuplarea AC-ului in compartimentul motor", "Miros neplacut in habitaclul interior", "Parbriz fisurat", "Stergatoarele parbriz/luneta nu functioneaza", "Stergatoarele de parbriz/luneta nu curata bine", "Nu se dezabureste parbrizul / luneta", "Incalzirea in oglinzi nu mai functioneaza", "Oglinda sparta sau lipsa stg/dr, interior"]

    });

    const [foundProblemsData, setFoundProblemsData] = useState({
        problems: [],
        newProblem: '',
        options: ["Diagnoza computerizata", "Constatari pe elevator", "Proba in parcurs", "Verificari in vederea efectuarii ITP-ului", "Revizie Filtre", "Revizie Distributie", "Inlocuire kit distributie", "Inlocuire pompa de apa", "Inlocuire curea accesorii", "Inlocuire intinzator curea accesorii", "Inlocuire role de conducere curea accesorii", "Inlocuire verificare noxe", "Revizie Frane", "Inlocuire placute frana fata", "Inlocuire placute frana spate", "Resetare sistem franare", "Inlocuire lichid de frana", "Verificare frane pe stand", " Revizie AC", "Incarcare cu Freon", "Curatare instalatie climatizare", "Odorizant auto", "Revizie de vara", " Revizie de iarna", "Verificare si inlocuire lichid de racire", "Verificare si inlocuire lichid de spalare parbriz", "Inlocuire lamele stergatoare fata si spate", "Verificare stare anvelope", "Verificare sistem de incalzire", "Verificare scurgeri de ulei", "Verificare curele de transmisie", "Verificare sistem supraalimentare si turbosuflanta", "Verificare turbosuflanta pe stand", "Verificare sistem vacuum", "Verificare sistem de injectie", "Verificare sistem de alimentare", "Verificare injectoare pe autovehicul", "Verificare injectoare pe stamd", "Verificare sistem de aprindere si bujii", "Verificare sistem antipoluare si DPF", "Verificare functionare lumini", "Verificare stare faruri, proiectoare si lampi spate", "Verificare reglare faruri", "Verificare incarcare alternator", "Verificare baterie", "Verificare sistem franare, ABS, ESP", "Verificare / inlocuire lichid de frana", "Verificare sistem directie", "Proba in parcurs", "Verificare pe standul de jocuri la sistemul de directie", "Verificare si reglare directie", "Verificare / inlocuire ulei servodirectie", "Verificare suspensie", "Verificare pe standul de suspensie", "Verificare sistem evacuare noxe", "Verificare cu analizor de noxe sau opacimetru", "Verificare transmisie, ambreiaj si cutie de viteze", "Verificare / inlocuire ulei in cutia de viteze", "Verificare scurgeri de ulei cutia de viteze"]

    });

    const [labourDiscount, setLabourDiscount] = useState(0)
    const [labourDiscountType, setLabourDiscountType] = useState('percentage')

    const [partsDiscount, setPartsDiscount] = useState(0)
    const [partsDiscountType, setPartsDiscountType] = useState('percentage')

    const [problemsDict, setProblemsDict] = useState([])

    const [partsData, setPartsData] = useState({
        parts: [],
        newPart: ''
    })

    const [receptionData, setReceptionData] = useState({
        info: [],
        newInfo: ''
    })

    const [recommendationsData, setRecommendationsData] = useState({
        recommendations: [],
        newRecommendation: ''
    })

    const [currentLabourTab, setCurrentLabourTab] = useState(0)

    const [activeStep, setActiveStep] = React.useState(0);
    const [step, setStep] = React.useState('client');
    const [error, setError] = useState("")
    const [newError, setNewError] = useState(true)

    const [deletionError, setDeletionError] = useState("")
    const [newDeletionError, setNewDeletionError] = useState(false)

    const navigate = useNavigate();

    const [showCode, setShowCode] = useState(false)
    const [showMaker, setShowMaker] = useState(false)
    const [showInfo, setShowInfo] = useState(false)

    const [requirementsHourlyLabourData, setRequirementsHourlyLabourData] = useState([]);
    const [requirementsServicesData, setRequirementsServicesData] = useState([]);
    const [requirementsFinalVerificationsData, setRequirementsFinalVerificationsData] = useState([]);


    const [hourlyLabourData, setHourlyLabourData] = useState({
        items: [],
        options: [],
        newItem: ''
    })

    const [servicesData, setServicesData] = useState({
        items: [],
        options: [],
        newItem: ''
    })

    const [finalVerificationsData, setFinalVerificationsData] = useState({
        items: [],
        options: [],
        newItem: ''
    })

    const [currentRepairRequirementsTab, setCurrentRepairRequirementsTab] = useState(0)

    function validateStep() {
        //const steps = ['client', 'car', 'problemsDescription', 'serviceRequirements', 'reception', 'repairRequirements', 'parts', 'labour', 'recommendations']
        switch (step) {
            case 'client':
                return clientData.lastName !== "" && clientData.firstName !== "" && clientData.phone !== ""
            case 'car':
                return carData.plate !== ""
            case 'problemsDescription':
                return true
            case 'serviceRequirements':
                return true
            case 'reception':
                return true
            case 'repairRequirements':
                return true
            case 'parts':
                return true
            case 'labour':
                return true
            case 'recommendations':
                return true
            default:
                throw new Error('Unknown step');
        }
    }

    const validateEstimate = () => {
        if ( clientData.lastName === "" || clientData.firstName === "" || clientData.phone === "")
        {
            setError("Datele clientului sunt incomplete")
            setStep("client")
            setNewError(true)
            return false

        }
        else if (carData.plate === "")
        {
            setError("Datele autovehiculului sunt incomplete")
            setStep("car")
            setNewError(true)
            return false

        }
        return true
    }

    const getStepContent = (step) => {
        //const steps = ['client', 'car', 'problemsDescription', 'serviceRequirements', 'reception', 'repairRequirements', 'parts', 'labour', 'recommendations']

        switch (step) {
            case 'client':
                return <ClientDetails clientData = {clientData}  setClientData = {setClientData} error = {error}/>;
            case 'car':
                return <CarDetails carData = {carData} setCarData = {setCarData}  error = {error}/>;
            case 'problemsDescription':
                return <ProblemsDescribedByClient problemsData = {problemsData} setProblemsData = {setProblemsData} problemsDict={problemsDict} setProblemsDict={setProblemsDict}
                        otherProblemsData={foundProblemsData} deletionError = {deletionError} setDeletionError = {setDeletionError} newDeletionError = {newDeletionError}  setNewDeletionError = {setNewDeletionError}
                        />;
            case 'serviceRequirements':
                return <ProblemsFoundByService foundProblemsData = {foundProblemsData} setFoundProblemsData = {setFoundProblemsData} problemsDict={problemsDict} setProblemsDict={setProblemsDict}
                        otherProblemsData={foundProblemsData} deletionError = {deletionError} setDeletionError = {setDeletionError} newDeletionError = {newDeletionError}  setNewDeletionError = {setNewDeletionError}
                        />;
            case 'reception':
                return <VehicleReception receptionData={receptionData} setReceptionData={setReceptionData}/>
            case 'repairRequirements':
                return <RepairRequirements currentRepairRequirementsTab={currentRepairRequirementsTab} setCurrentRepairRequirementsTab={setCurrentRepairRequirementsTab}
                                           problemsData = {problemsData} setProblemsData = {setProblemsData}
                                           foundProblemsData={foundProblemsData} setFoundProblemsData={setFoundProblemsData}
                                           problemsDict = {problemsDict} setProblemsDict = {setProblemsDict}

                                           hourlyLabourData ={hourlyLabourData} setHourlyLabourData = {setHourlyLabourData}
                                           finalVerificationsData={finalVerificationsData} setFinalVerificationsData={setFinalVerificationsData}
                                           servicesData={servicesData} setServicesData={setServicesData}
                                           requirementsHourlyLabourData = {requirementsHourlyLabourData} setRequirementsHourlyLabourData={setRequirementsHourlyLabourData}
                                            requirementsServicesData={requirementsServicesData} setRequirementsServicesData={setRequirementsServicesData}
                                            requirementsFinalVerificationsData={requirementsFinalVerificationsData} setRequirementsFinalVerificationsData = {setRequirementsFinalVerificationsData}
                                           deletionError = {deletionError} setDeletionError = {setDeletionError} newDeletionError = {newDeletionError}  setNewDeletionError = {setNewDeletionError}

                />
            case 'parts':
                return <Parts partsData = {partsData} setPartsData={setPartsData} showCode={showCode} showMaker={showMaker} showInfo={showInfo}
                               setShowCode={setShowCode} setShowInfo={setShowInfo} setShowMaker={setShowMaker}
                                partsDiscount={partsDiscount} setPartsDiscount={setPartsDiscount} partsDiscountType={partsDiscountType} setPartsDiscountType={setPartsDiscountType}
                        />
            case 'labour':
                return <Labour currentLabourTab={currentLabourTab} setCurrentLabourTab={setCurrentLabourTab}
                               hourlyLabourData ={hourlyLabourData} setHourlyLabourData = {setHourlyLabourData}
                                finalVerificationsData={finalVerificationsData} setFinalVerificationsData={setFinalVerificationsData}
                               servicesData={servicesData} setServicesData={setServicesData}
                               labourDiscount={labourDiscount} setLabourDiscount = {setLabourDiscount}
                               labourDiscountType={labourDiscountType} setLabourDiscountType = {setLabourDiscountType}
                               requirementsHourlyLabourData = {requirementsHourlyLabourData} setRequirementsHourlyLabourData={setRequirementsHourlyLabourData}
                               requirementsServicesData={requirementsServicesData} setRequirementsServicesData={setRequirementsServicesData}
                               requirementsFinalVerificationsData={requirementsFinalVerificationsData} setRequirementsFinalVerificationsData = {setRequirementsFinalVerificationsData}
                               deletionError = {deletionError} setDeletionError = {setDeletionError} newDeletionError = {newDeletionError}  setNewDeletionError = {setNewDeletionError}

                />
            case 'recommendations':
                return <ServiceRecommendations recommendationsData={recommendationsData} setRecommendationsData={setRecommendationsData}/>
            default:
                throw new Error('Unknown step');
        }
    }


    const handleStep = (event, newStep) => {
        if (newStep) {
            setStep(newStep)
        }
    }

    const handleNext = () => {
        if (validateStep()){
            setActiveStep(activeStep + 1);
            setError('')
        }
        else
        {
            setError("Câmpurile marcate cu * nu pot fi goale")
            setNewError(true)
        }


    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleFinish = (e) => {

        if (!validateEstimate())
            return

        try{
            let date = new Date().getDate().toString() + '/' + new Date().getMonth().toString() + '/' + new Date().getFullYear().toString()

            let data = {
                clientData,
                carData,
                problemsData,
                foundProblemsData,
                labourDiscount,
                labourDiscountType,
                partsDiscount,
                partsDiscountType,
                problemsDict,
                partsData,
                receptionData,
                recommendationsData,
                currentLabourTab,
                activeStep,
                step,
                error,
                newError,
                deletionError,
                newDeletionError,
                showCode,
                showMaker,
                showInfo,
                requirementsHourlyLabourData,
                requirementsServicesData,
                requirementsFinalVerificationsData,
                hourlyLabourData,
                servicesData,
                finalVerificationsData,
                currentRepairRequirementsTab,
                date: date
            }
            addDoc(deviz, data);
            navigate('/log-in', { replace: true });
        }
        catch(e){
        }



    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            >

            </AppBar>
            <Grid container spacing={2}
                  direction="column"
                  justifyContent="space-around  "
                  alignItems="center"
                  auto
                  padding={5}
                  style={{ gap: 30 }}
            >

                <Grid container spacing={6}
                  direction="row"
                  justifyContent="start"
                  alignItems="start"
                  lg
                >
                {/*navigation system*/}

                    <Grid item width={'30vw'} sx={{justifyContent: 'start', position: 'static'}}>
                        <Container display="flex" component="main" maxWidth="xs"
                                   >

                            <StyledToggleButtonGroup
                                size="small"
                                value={step}
                                exclusive
                                onChange={handleStep}
                                orientation="vertical"
                                fullWidth
                            >
                                {steps.map((element) => {
                                    return <ToggleButton value={element} sx={{height: '7vh', justifyContent: 'start', alignItems: 'center', marginBottom: '99vh'}}>
                                        <Typography variant="h6" gutterBottom
                                                    sx={{justifyContent: "center", display: 'block', paddingTop: "3.5vh", textTransform: 'none'}}>
                                            {stepsDict[element]}
                                        </Typography>
                                    </ToggleButton>
                                })}
                            </StyledToggleButtonGroup>

                        </Container>
                    </Grid>

                {/*/navigation system*/}

                    {/*content*/}

                    <Grid item width={'60vw'} marginTop={"10vh"}>
                        {getStepContent(step)}
                    </Grid>

                    {/*content*/}


                </Grid>


            {/*set butoane cancel si save*/}
                <Grid container spacing={2}
                      direction="row"
                      justifyContent="flex-end"
                      alignItems="center"
                      lg
                >
                    <Grid item>
                        <Button variant="outlined"
                                onClick={handleFinish}
                                sx={{color: 'green', borderColor: 'green'}}
                        > Save </Button>
                    </Grid>
                        <Grid item>
                            <Button variant="outlined"
                                onClick={() =>{navigate('/log-in', { replace: true })}}
                                sx={{color: 'red', borderColor: 'red'}}

                        >Cancel
                            </Button>
                        </Grid>



                </Grid>
            </Grid>
            {error !== "" && <EstimateError error = {error}  refreshOn = {newError} setRefreshOn={setNewError}/>}
            {newDeletionError && <EstimateError error = {deletionError}  refreshOn = {newDeletionError} setRefreshOn={setNewDeletionError}/>}

        </ThemeProvider>

    );
}