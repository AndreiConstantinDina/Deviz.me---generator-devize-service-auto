import React, {useRef} from "react";
import { Page, Text, Image, Document, StyleSheet, PDFViewer} from "@react-pdf/renderer";
import PartsList from "../estimateCreationForm/PartsList";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import HourlyLabourList from "../estimateCreationForm/HourlyLabourList";
import Services from "../estimateCreationForm/Services";
import ServicesList from "../estimateCreationForm/ServicesList";
import ItemsList from "../estimateCreationForm/ItemsList";
import Grid from "@mui/material/Grid";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 24,
        textAlign: "center",
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: "justify",
        fontFamily: "Times-Roman",
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: "center",
        color: "grey",
    },
    pageNumber: {
        position: "absolute",
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "grey",
    },
});

export default function EstimatePreview({partsData, carData, problemsData, foundProblemsData, receptionData, problemsDict,
                                    hourlyLabourData, servicesData, finalVerificationsData,
                                    labourDiscount, labourDiscountType, partsDiscount, partsDiscountType,
                                    recommendationsData, previewDocumentRef, clientData,
                                    date,
                                    usersData, URL
                                            }) {

    const calculateTotalNoDiscountParts = () => {
        let sum = 0
        for (let i=0; i<partsData.parts.length; i++)
            sum += parseFloat(partsData.parts[i].total)
        return sum.toFixed(2)
    }
    const calculateDiscountParts = () => {
        let sum = calculateTotalNoDiscountParts()
        if (partsDiscountType === 'ammount')
            return parseFloat(partsDiscount).toFixed(2)
        else return (sum*(partsDiscount)/100).toFixed(2)
    }
    const calculateTotalParts = () => {
        return (calculateTotalNoDiscountParts() - calculateDiscountParts()).toFixed(2)
    }

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
    const calculateTotalNoDiscountLabours= () => {
        return (parseFloat(calculateTotalFinalVerifications()) + parseFloat(calculateTotalServices()) + parseFloat(calculateTotalHourlyLabour())).toFixed(2)
    }

    const calculateDiscountLabours = () => {
        let sum = calculateTotalNoDiscountLabours()
        if (labourDiscountType === 'ammount')
            return (parseFloat(labourDiscount).toFixed(2))
        else return (sum*(labourDiscount)/100).toFixed(2)
    }
    const calculateTotalLabours = () => {
        return (calculateTotalNoDiscountLabours() - calculateDiscountLabours()).toFixed(2)
    }

    const calculateTotal = () => {
        return (parseFloat(calculateTotalLabours()) + parseFloat(calculateTotalParts())).toFixed(2)
    }



    let problemsDescribedByClient = ''
    problemsData.problems.map((element) => (
        problemsDescribedByClient=problemsDescribedByClient.concat(element, '; ')
    ))
    problemsDescribedByClient=problemsDescribedByClient.slice(0,-2)


    let problemsFoundByService = ''
    foundProblemsData.problems.map((element) => (
        problemsFoundByService=problemsFoundByService.concat(element, '; ')
    ))
    problemsFoundByService=problemsFoundByService.slice(0,-2)

    let receptionInfo = ''
    receptionData.info.map((element) => (
        receptionInfo=receptionInfo.concat(element, '; ')
    ))
    receptionInfo=receptionInfo.slice(0,-2)

    let req = []
    problemsDict.map(element => {
        req = req.concat(element.value.problems)
    })
    req = [...new Set(req)];

    let requirements = ""
    req.map((element) => (
        requirements=requirements.concat(element, '; ')
    ))
    requirements=requirements.slice(0,-2)


    let recommendations = ''
    recommendationsData.recommendations.map((element) => (
        recommendations=recommendations.concat(element, '; ')
    ))
    recommendations=recommendations.slice(0,-2)


    const pdfRef = useRef();

        return (
                <div ref={previewDocumentRef}>

                            {/*car information*/}

                            <Container sx={{
                                width: "100vw",
                                paddingTop: 5
                            }}>

                                <Grid container
                                      direction="row"
                                      justifyContent="space-between"
                                      alignItems="flex-start"
                                      columns={15}
                                >
                                    <Grid item xs={7}>
                                        {/*{URL &&*/}
                                        {/*    <img src={URL} alt="" height={'100%'} width={'50%'} object-fit={'cover'} overflow={'hidden'}/>}*/}
                                        <Typography fontSize={18}>{usersData.company}</Typography>
                                        <Typography fontSize={18}>Sediu social: {usersData.address}</Typography>
                                        <Typography fontSize={18}>Punct de lucru: {usersData.workAddress}</Typography>
                                        <Typography fontSize={18}>Reg. Com.: {usersData.comerceRegisterNumber}</Typography>
                                        <Typography fontSize={18}>CUI: {usersData.CUI}</Typography>
                                        <Typography fontSize={18}>Banca: {usersData.bank}</Typography>
                                        <Typography fontSize={18}>IBAN: {usersData.IBAN}</Typography>

                                    </Grid>


                                    <Grid item xs={7}>
                                        <Stack direction="column" alignItems="flex-end">
                                            <Typography fontSize={18}>Nume și prenume: {clientData.lastName} {clientData.firstName}   </Typography>
                                            {
                                                (clientData.county || clientData.city || clientData.address) && <Typography fontSize={18}>Adresa: {clientData.county} {clientData.city} {clientData.address} </Typography>
                                            }
                                            <Typography fontSize={18}>Telefon: {clientData.phone}</Typography>
                                            {clientData.email && <Typography fontSize={18}>E-mail: {clientData.email}</Typography>}

                                        </Stack>
                                    </Grid>

                                </Grid>


                            </Container>

                            {/*<Divider sx={{marginTop: '2vh', marginBottom: '2vh'}}/>*/}


                            <Grid container
                                  direction="column"
                                  justifyContent="center"
                                  alignItems="center"
                            >
                                <Grid item>
                                        <Box sx={{
                                            lineHeight: 'large',
                                            fontWeight: 400,
                                            fontSize: 'h5.fontSize',
                                        }}>
                                            DEVIZ PARȚIAL
                                        </Box>
                                </Grid>
                                <Grid item>
                                    <Box sx={{
                                        lineHeight: 'normal',
                                        fontWeight: 400,
                                        fontSize: 'h7.fontSize',
                                    }}>nr. 1 / {date}
                                    </Box>
                                </Grid>
                            </Grid>

                            <Grid container
                                  direction="column"
                                  justifyContent="center"
                                  alignItems="flex-start"
                                >
                                <Grid item>
                                    <Typography sx={{
                                        marginLeft: '3vw'
                                    }}>
                                        <Box sx={{lineHeight: 'large',
                                            fontWeight: 400,
                                            fontSize: 'h6.fontSize',
                                            mt: 2
                                        }}>
                                            IDENTIFICARE AUTOVEHICUL
                                        </Box>

                                    </Typography>
                                </Grid>

                                <Grid item marginLeft = {'3vw'}>
                                    {carData.plate && <Typography>Număr auto: {carData.plate}</Typography>}
                                </Grid>
                                <Grid item marginLeft = {'3vw'}>
                                {carData.brand && <Typography>Marcă: {carData.brand}</Typography>}
                                </Grid>
                                <Grid item marginLeft = {'3vw'}>
                                {carData.model && <Typography>Model: {carData.model}</Typography>}
                                </Grid>
                                <Grid item marginLeft = {'3vw'}>
                                    {carData.year && <Typography>An fabricație: {carData.year}</Typography>}
                                </Grid>
                                <Grid item marginLeft = {'3vw'}>
                                    {carData.vin && <Typography>Serie sasiu: {carData.vin}</Typography>}
                                </Grid>
                                <Grid item marginLeft = {'3vw'}>
                                    {carData.capacity && <Typography>Capacitate motor (CC): {carData.capacity}</Typography>}
                                </Grid>
                            </Grid>

                            <Divider sx={{marginTop: '2vh', marginBottom: '2vh'}}/>

                            <Grid container sx={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                                <Grid item>
                                    <Typography sx={{
                                        marginLeft: '3vw'
                                    }}>
                                        <Box sx={{lineHeight: 'large',
                                            fontWeight: 400,
                                            fontSize: 'h6.fontSize',
                                            mt: 2
                                            }}>
                                            DEFECȚIUNI RECLAMATE DE CLIENT </Box>

                                    </Typography>
                                </Grid>
                           </Grid>
                            {problemsDescribedByClient.length != 0
                                ?
                                <Typography sx={{marginLeft: '3vw'}}>{problemsDescribedByClient}</Typography>
                                :
                                <Typography sx={{marginLeft: '3vw'}}>-</Typography>
                            }
                            <Grid container sx={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                                <Grid item>
                                    <Typography sx={{
                                        marginLeft: '3vw'

                                    }}>
                                        <Box sx={{
                                            lineHeight: 'large',
                                            fontWeight: 400,
                                            fontSize: 'h6.fontSize',
                                            mt: 2,
                                        }}>CERINȚE DE SERVICE</Box>

                                    </Typography>
                                </Grid>

                            </Grid>
                            {problemsFoundByService.length != 0
                                ?
                                <Typography sx={{marginLeft: '3vw'}}>{problemsFoundByService}</Typography>
                                :
                                <Typography sx={{marginLeft: '3vw'}}>-</Typography>
                            }

                            <Grid container sx={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                                <Grid item>
                                    <Typography sx={{
                                        marginLeft: '3vw'

                                    }}>
                                        <Box sx={{
                                            lineHeight: 'large',
                                            fontWeight: 400,
                                            fontSize: 'h6.fontSize',
                                            mt: 2,
                                        }}> RECEPȚIE AUTOVEHICUL </Box>

                                    </Typography>
                                </Grid>

                            </Grid>
                            {receptionInfo.length != 0
                                ?
                                <Typography sx={{marginLeft: '3vw'}}>{receptionInfo}</Typography>
                                :
                                <Typography sx={{marginLeft: '3vw'}}>-</Typography>
                                }

                            <Grid container sx={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                                <Grid item>
                                    <Typography sx={{
                                        marginLeft: '3vw'

                                    }}>
                                        <Box sx={{
                                            lineHeight: 'large',
                                            fontWeight: 400,
                                            fontSize: 'h6.fontSize',
                                            mt: 2,
                                        }}>CONSTATĂRI ÎN SERVICE</Box>

                                    </Typography>
                                </Grid>

                            </Grid>
                            {requirements.length != 0
                                ?
                                <Typography sx={{marginLeft: '3vw'}}> {requirements} </Typography>
                                :
                                <Typography sx={{marginLeft: '3vw'}}>-</Typography>
                            }

                            <Divider sx={{marginTop: '2vh', marginBottom: '2vh'}}/>


                            <Grid container sx={{justifyContent: 'center', alignItems: 'flex-start'}}>
                                <Grid item>
                                    <Typography sx={{
                                        marginLeft: '3vw'

                                    }}>
                                        <Box sx={{
                                            lineHeight: 'large',
                                            fontWeight: 400,
                                            fontSize: 'h5.fontSize',
                                        }}>PIESE FOLOSITE</Box>

                                    </Typography>
                                </Grid>

                            </Grid>
                            {partsData.parts.length !== 0
                                ?
                                <Grid container sx={{
                                    width: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Grid item>
                                        <PartsList partsData={partsData} enableDelete={"false"}/>
                                    </Grid>
                                </Grid>
                                :
                                <Grid container sx={{
                                    width: '100%',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    ml: '3vw'
                                }}>
                                    <Grid item>
                                        <Box sx={{
                                            lineHeight: 'large',
                                            fontWeight: 750,
                                            fontSize: 'h6.fontSize',

                                        }}>
                                            Nu există piese în deviz
                                        </Box>                                    </Grid>
                                </Grid>

                            }

                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="flex-end"
                                paddingRight={3}
                            >
                                <Grid item>

                                        <Box sx={{
                                            fontWeight: 600,
                                            fontSize: 'h7.fontSize',
                                        }}>

                                        Total piese fara discount: {calculateTotalNoDiscountParts()} RON
                                        </Box>

                                </Grid>
                                <Grid item>


                                        <Box sx={{
                                            fontWeight: 600,
                                            fontSize: 'h7.fontSize',
                                        }}>
                                        Discount: {calculateDiscountParts()} RON
                                        </Box>
                                </Grid>

                                <Grid item>

                                <Box sx={{
                                        fontWeight: 600,
                                        fontSize: 'h7.fontSize',
                                    }}>
                                        Total piese: {calculateTotalParts()} RON
                                    </Box>
                                </Grid>



                            </Grid>


                            <Divider sx={{marginTop: '2vh', marginBottom: '2vh'}}/>


                            <Grid container sx={{justifyContent: 'center', alignItems: 'flex-start'}}>
                                <Grid item>
                                    <Typography sx={{
                                        marginLeft: '3vw'

                                    }}>
                                        <Box sx={{
                                            lineHeight: 'large',
                                            fontWeight: 400,
                                            fontSize: 'h5.fontSize',
                                        }}>LUCRĂRI ÎN SERVICE</Box>

                                    </Typography>
                                </Grid>

                            </Grid>

                            {hourlyLabourData.items.length !== 0
                                ?
                                <Grid container sx={{
                                    width: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Grid item>
                                        <HourlyLabourList itemsData={hourlyLabourData} deleteEnabled={false}/>
                                    </Grid>
                                </Grid>
                                :
                                <Grid container sx={{
                                    width: '100%',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    ml: '3vw'
                                }}>
                                    <Grid item>
                                        <Box sx={{
                                            lineHeight: 'large',
                                            fontWeight: 750,
                                            fontSize: 'h6.fontSize',

                                        }}>
                                            Nu există lucrări efectuate
                                        </Box>
                                    </Grid>
                                </Grid>

                            }

                            <Divider sx={{marginTop: '2vh', marginBottom: '2vh'}}/>



                            <Grid container sx={{justifyContent: 'center', alignItems: 'flex-start'}}>
                                <Grid item>
                                    <Typography sx={{
                                        marginLeft: '3vw'

                                    }}>
                                        <Box sx={{
                                            lineHeight: 'large',
                                            fontWeight: 400,
                                            fontSize: 'h5.fontSize',
                                        }}>SERVICII</Box>

                                    </Typography>
                                </Grid>

                            </Grid>


                            {servicesData.items.length !== 0
                                ?
                                <Grid container sx={{
                                    width: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Grid item>
                                        <ServicesList itemsData={servicesData} deleteEnabled={false}/>
                                    </Grid>
                                </Grid>
                                :
                                <Grid container sx={{
                                    width: '100%',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    ml: '3vw'
                                }}>
                                    <Grid item>
                                        <Box sx={{
                                            lineHeight: 'large',
                                            fontWeight: 750,
                                            fontSize: 'h6.fontSize',

                                        }}>
                                            Nu există servicii efectuate
                                        </Box>
                                    </Grid>
                                </Grid>

                            }
                            <Divider sx={{marginTop: '2vh', marginBottom: '2vh'}}/>



                            <Grid container sx={{justifyContent: 'center', alignItems: 'flex-start'}}>
                                <Grid item>
                                    <Typography sx={{
                                        marginLeft: '3vw'

                                    }}>
                                        <Box sx={{
                                            lineHeight: 'large',
                                            fontWeight: 400,
                                            fontSize: 'h5.fontSize',
                                        }}>VERIFICĂRI FINALE</Box>

                                    </Typography>
                                </Grid>

                            </Grid>

                            {
                                finalVerificationsData.items.length !== 0
                                    ?
                                    <Grid container sx={{
                                    width: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                    }}>

                                        <Grid item>
                                            <ItemsList itemsData={finalVerificationsData} deleteEnabled={false}/>
                                        </Grid>
                                    </Grid>
                                    :

                                <Grid container sx={{
                                width: '100%',
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                                }}>
                                    <Grid item>
                                        <Box sx={{
                                        lineHeight: 'large',
                                        fontWeight: 750,
                                        fontSize: 'h6.fontSize',
                                        ml: '3vw'
                                        }}>
                                            Nu există verificări finale
                                        </Box>
                                    </Grid>
                                </Grid>
                            }


                            <Divider sx={{marginTop: '2vh', marginBottom: '2vh'}}/>


                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="flex-end"
                                paddingRight={3}
                            >


                            <Grid item xs = {10}>
                                        <Box sx={{
                                            fontWeight: 600,
                                            fontSize: 'h7.fontSize',
                                        }}>

                                            Total manoperă fara discount: {calculateTotalNoDiscountLabours()} RON
                                        </Box>

                                </Grid>
                                <Grid item xs = {10}>

                                        <Box sx={{
                                            fontWeight: 600,
                                            fontSize: 'h7.fontSize',
                                        }}>
                                            Discount: {calculateDiscountLabours()} RON
                                        </Box>
                                </Grid>
                                <Grid item xs = {10}>
                                    <Box sx={{
                                        fontWeight: 600,
                                        fontSize: 'h7.fontSize',
                                    }}>
                                        Total manoperă: {calculateTotalLabours()} RON
                                    </Box>

                                </Grid>

                            </Grid>

                            <Divider sx={{marginTop: '2vh', marginBottom: '2vh'}}/>


                            <Grid container sx={{
                                width: '100%',
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',
                                paddingRight: 3,

                            }}>
                                <Grid item>
                                    <Typography>
                                        <Box sx={{
                                            fontWeight: 600,
                                            fontSize: 'h5.fontSize',
                                        }}>
                                            Total general: {calculateTotal()} RON
                                        </Box> </Typography>

                                </Grid>
                            </Grid>

                            <Divider sx={{marginTop: '2vh', marginBottom: '2vh'}}/>


                            <Grid container sx={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                                <Grid item>
                                    <Typography sx={{
                                        marginLeft: '3vw'

                                    }}>
                                        <Box sx={{
                                            lineHeight: 'large',
                                            fontWeight: 750,
                                            fontSize: 'h6.fontSize',
                                        }}>Recomandări</Box>

                                    </Typography>
                                </Grid>

                            </Grid>

                            {recommendations.length != 0
                                ?
                                <Typography sx={{marginLeft: '3vw'}}>{recommendations}</Typography>
                                :
                                <Typography sx={{marginLeft: '3vw'}}>-</Typography>
                            }


                            <Divider sx={{marginTop: '2vh', marginBottom: '2vh'}}/>

                </div>

        );
};
