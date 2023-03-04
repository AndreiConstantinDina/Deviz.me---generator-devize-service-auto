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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ClientDetails from './ClientDetails';
import CarDetails from './CarDetails';
import ProblemsDescribedByClient from "./ProblemsDescribedByClient";
import ProblemsFoundByService from "./ProblemsFoundByService";
import {useRef, useState} from "react";
import {db} from './firebase'
import {addDoc, collection} from '@firebase/firestore'
import {Routes, Route, redirect} from 'react-router-dom';
import { Link } from "react-router-dom";

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="src/components#">
                deviz.me
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const steps = ['Detalii client', 'Detalii masina', 'Probleme descrise de client', 'Cerințe service'];

// function getStepContent(step) {
//     switch (step) {
//         case 0:
//             return <ClientDetails clientData = {estimateData.clientData}  setClientData = {estimateData.setClientData}/>;
//         case 1:
//             return <CarDetails />;
//         case 2:
//             return <ProblemsDescribedByClient />;
//         case 3:
//             return <ProblemsFoundByService />;
//         default:
//             throw new Error('Unknown step');
//     }
// }

const theme = createTheme();

export default function CarEstimate() {

    const deviz = collection(db, "devize")

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

    const [estimateData, setEstimateData] = useState({
        clientData,
        carData,
        problemsData,
        foundProblemsData
    })

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <ClientDetails clientData = {clientData}  setClientData = {setClientData}/>;
            case 1:
                return <CarDetails carData = {carData} setCarData = {setCarData}/>;
            case 2:
                return <ProblemsDescribedByClient problemsData = {problemsData} setProblemsData = {setProblemsData}/>;
            case 3:
                return <ProblemsFoundByService foundProblemsData = {foundProblemsData} setFoundProblemsData = {setFoundProblemsData}/>;
            default:
                throw new Error('Unknown step');
        }
    }

    const [activeStep, setActiveStep] = React.useState(0);


    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleFinish = (e) => {

        try{
            //addDoc(deviz, estimateData)
            let date = new Date().getDate().toString() + '/' + new Date().getMonth().toString() + '/' + new Date().getFullYear().toString()
            // let hour = new Date().getHours().toString() + ':' + new Date().getMinutes().toString() + ":" + new Date().getSeconds().toString()
            // let fulldate = hour + " " + date
            let data = {clientData,
                carData,
                problemsData,
                foundProblemsData,
                date: date
            }
            // console.log(estimateData)
            addDoc(deviz, data);


        }
        catch(e){
            console.log(e);
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
                    position: 'relative',
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            >

            </AppBar>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Creare deviz
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                Devizul dumneavoastră este gata!

                            </Typography>
                            <Link to='/istoric-devize' style={{ textDecoration: 'none' }}>
                                <Button onClick={handleFinish} sx={{ mt: 3, ml: 1 }}>
                                    Salvează deviz
                                </Button>
                            </Link>

                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activeStep)}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                        Înapoi
                                    </Button>
                                )}

                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 3, ml: 1 }}
                                >
                                    {activeStep === steps.length - 1 ? 'Termină' : 'Înainte'}
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Paper>
                <Copyright />
            </Container>
        </ThemeProvider>
    );
}