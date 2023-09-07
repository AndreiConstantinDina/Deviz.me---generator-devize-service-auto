import * as React from 'react';
import {useAuth} from '../contexts/AuthContext'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useRef, useState} from "react";
import {db} from './authentification/firebase'
import {setDoc, deleteDoc, doc} from '@firebase/firestore'
import ClientDetails from './estimateCreationForm/ClientDetails'
import CarDetails from './estimateCreationForm/CarDetails';
import ProblemsDescribedByClient from "./estimateCreationForm/ProblemsDescribedByClient";
import ProblemsFoundByService from "./estimateCreationForm/ProblemsFoundByService";
import Parts from "./estimateCreationForm/Parts";
import {useNavigate} from "react-router-dom";
import VehicleReception from "./estimateCreationForm/VehicleReception";
import RepairRequirements from "./estimateCreationForm/RepairRequirements";
import Labour from "./estimateCreationForm/Labour";
import ServiceRecommendations from "./estimateCreationForm/ServiceRecommendations";
import EstimateError from "./alerts/EstimateError";

const theme = createTheme();

export default function EditEstimate({element, step, info, setInfo, save, setSave, handleClose, setEdit, setJustRendered, setShowConfirmDialog}) {
    const [clientData, setClientData] = useState(element.clientData);

    const [carData, setCarData] = useState(element.carData);

    const [problemsData, setProblemsData] = useState(element.problemsData);

    const [foundProblemsData, setFoundProblemsData] = useState(element.foundProblemsData);

    const [labourDiscount, setLabourDiscount] = useState(element.labourDiscount)
    const [labourDiscountType, setLabourDiscountType] = useState(element.labourDiscountType)

    const [partsDiscount, setPartsDiscount] = useState(element.partsDiscount)
    const [partsDiscountType, setPartsDiscountType] = useState(element.partsDiscountType)

    const [problemsDict, setProblemsDict] = useState(element.problemsDict)

    const [partsData, setPartsData] = useState(element.partsData)

    const [receptionData, setReceptionData] = useState(element.receptionData)

    const [recommendationsData, setRecommendationsData] = useState(element.recommendationsData)

    const [currentLabourTab, setCurrentLabourTab] = useState(element.currentLabourTab)

    const [activeStep, setActiveStep] = React.useState(element.activeStep);
    const [error, setError] = useState("")
    const [newError, setNewError] = useState(false)

    const [deletionError, setDeletionError] = useState("")
    const [newDeletionError, setNewDeletionError] = useState(false)

    const navigate = useNavigate();

    const [showCode, setShowCode] = useState(element.showCode)
    const [showMaker, setShowMaker] = useState(element.showMaker)
    const [showInfo, setShowInfo] = useState(element.showInfo)

    const [requirementsHourlyLabourData, setRequirementsHourlyLabourData] = useState(element.requirementsHourlyLabourData);
    const [requirementsServicesData, setRequirementsServicesData] = useState(element.requirementsServicesData);
    const [requirementsFinalVerificationsData, setRequirementsFinalVerificationsData] = useState(element.requirementsFinalVerificationsData);


    const [hourlyLabourData, setHourlyLabourData] = useState(element.hourlyLabourData)

    const [servicesData, setServicesData] = useState(element.servicesData)

    const [finalVerificationsData, setFinalVerificationsData] = useState(element.finalVerificationsData)

    const [currentRepairRequirementsTab, setCurrentRepairRequirementsTab] = useState(element.currentRepairRequirementsTab)




    const currentUser = useAuth().currentUser
    const uid = currentUser.uid


    // must replace with const [partsData, setPartsData] = useState(element.partsData)

    const deleteElement = (id) => {
        const docRef = doc(db, `${uid}`, id);
        deleteDoc(docRef)
            .then(() => {
            })
            .catch(error => {
                throw new Error("Datele nu au putut fi citite.")
            })
    }

    const saveInfo = () => {
        element.carData = carData
        element.clientData = clientData
        element.foundProblemsData = foundProblemsData
        element.problemsData = problemsData
        element.labourDiscount = labourDiscount
        element.labourDiscountType = labourDiscountType
        element.partsDiscount = partsDiscount
        element.partsDiscountType =partsDiscountType
        element.problemsDict =  problemsDict
        element.partsData = partsData
        element.receptionData = receptionData
        element.recommendationsData = recommendationsData
        element.currentLabourTab= currentLabourTab
        element.activeStep= activeStep
        element.step= step
        element.error= error
        element.newError=newError
        element.deletionError=deletionError
        element.newDeletionError=newDeletionError
        element.showCode=showCode
        element.showMaker=showMaker
        element.showInfo=showInfo
        element.requirementsHourlyLabourData=requirementsHourlyLabourData
        element.requirementsServicesData=requirementsServicesData
        element.requirementsFinalVerificationsData=requirementsFinalVerificationsData
        element.hourlyLabourData=hourlyLabourData
        element.servicesData=servicesData
        element.finalVerificationsData=finalVerificationsData
        element.currentRepairRequirementsTab=currentRepairRequirementsTab
        try{
            const date = element.date

            const data = {
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
            deleteElement(element.id)

            setDoc(doc(db, `${uid}`, element.id), data);
        }
        catch(e){
        }
    }

    const validateEstimate = () => {
        if (carData.plate === "")
            carData.plate = element.carData.plate
        if (clientData.phone === "")
            clientData.phone = element.clientData.phone
        if (clientData.name === "")
            clientData.name = element.clientData.name

    }

    const getStepContent = (step) => {
        validateEstimate()
        if (save){
            {
                setSave(false)
                setEdit(false)
                setJustRendered(false)
                setShowConfirmDialog(false)
                saveInfo()
            }
        }
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
                                               hourlyLabourData={hourlyLabourData} setHourlyLabourData={setHourlyLabourData}
                                               servicesData={servicesData} setServicesData={setServicesData}
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

    function validateStep() {

        switch (step) {
            case 'client':
                return clientData.name !== "" && clientData.phone !== ""
            case 'car':
                return carData.plate !== ""
            case 'clientReportedProblems':
                return true
            case 'foundProblems':
                return true
            default:
                throw new Error('Unknown step');
        }
    }
    return (
        <div>
            {
                getStepContent(step)
            }
            {error !== "" && <EstimateError error = {error}  refreshOn = {newError} setRefreshOn={setNewError}/>}
            {newDeletionError && <EstimateError error = {deletionError}  refreshOn = {newDeletionError} setRefreshOn={setNewDeletionError}/>}

        </div>

        );
}