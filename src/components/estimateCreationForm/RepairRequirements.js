import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {Tab, Tabs} from "@mui/material";
import Items from "./Items";
import ItemsList from './ItemsList'
import ProblemsList from "./ProblemsList";
import ProblemsFoundByService from "./ProblemsFoundByService";
import RequirementsList from "./RequirementsList";
import {useEffect, useState} from "react";
import AllRequirements from "./AllRequirements";
import ClientRequirementsList from "./ClientRequirementsList";

export default function RepairRequirements({currentRepairRequirementsTab, setCurrentRepairRequirementsTab,
                                               problemsData, setProblemsData,
                                               foundProblemsData, setFoundProblemsData,
                                                problemsDict, setProblemsDict,
                                               hourlyLabourData, setHourlyLabourData,
                                               finalVerificationsData, setFinalVerificationsData,
                                               servicesData, setServicesData,
                                               requirementsHourlyLabourData, setRequirementsHourlyLabourData,
                                               requirementsServicesData, setRequirementsServicesData,
                                               requirementsFinalVerificationsData, setRequirementsFinalVerificationsData,
                                               deletionError, newDeletionError, setNewDeletionError, setDeletionError
                                            }) {


    const handleChange = (event, newValue) => {
        setCurrentRepairRequirementsTab(newValue);
    };


    const [requirements, setRequirements] = useState({
        problems: [],
        newProblem: ''
    })

    useEffect(() => {
        if (problemsDict.length !== 0) {
            let req = []
            problemsDict.map(element => {
                req = req.concat(element.value.problems)
            })
            req = [...new Set(req)];

            setRequirements({...requirements, problems: req})
        }
    }, [problemsDict])

    return (
        <React.Fragment>
            <Grid container spacing={0} justifyContent={'space-around'} direction={'column'}>
                <Grid item position={'relative'} sx={{left: '10vw'}}>

                    <Tabs value={currentRepairRequirementsTab} onChange={handleChange} aria-label="icon label tabs example">
                        <Tab label="Lista de constatări service" />
                        <Tab label="Lista de cerințe si defecțiuni" />


                    </Tabs>
                </Grid>


                {currentRepairRequirementsTab === 0 &&
                    <Grid item>
                        {requirements.problems.length === 0
                            ?
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>

                                <img src={require('./images/mechanic-empty-requirements-list.png')}
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
                            <AllRequirements problemsData={requirements} setProblemsData={setRequirements}
                                             helperText={"Listă constatări"}
                                             problemsDict={problemsDict} setProblemsDict={setProblemsDict}
                                             hourlyLabourData={hourlyLabourData}
                                             setHourlyLabourData={setHourlyLabourData}
                                             finalVerificationsData={finalVerificationsData}
                                             setFinalVerificationsData={setFinalVerificationsData}
                                             servicesData={servicesData} setServicesData={setServicesData}

                                             requirementsHourlyLabourData={requirementsHourlyLabourData}
                                             setRequirementsHourlyLabourData={setRequirementsHourlyLabourData}
                                             requirementsServicesData={requirementsServicesData}
                                             setRequirementsServicesData={setRequirementsServicesData}
                                             requirementsFinalVerificationsData={requirementsFinalVerificationsData}
                                             setRequirementsFinalVerificationsData={setRequirementsFinalVerificationsData}


                            />
                        }
                    </Grid>
                }
                {currentRepairRequirementsTab === 1 &&
                    <>

                        <Grid item  margin={'5vh'}>
                            {problemsData.problems.length === 0 && foundProblemsData.problems.length === 0
                                ?
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>

                                    <img src={require('./images/mechanic-empty-client-service-problems-list.png')}
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
                                    <RequirementsList problemsData={problemsData} setProblemsData={setProblemsData}
                                                      helperText={"Listă defecțiuni"}
                                                      problemsDict={problemsDict} setProblemsDict={setProblemsDict}
                                                      requirementsHourlyLabourData={requirementsHourlyLabourData}
                                                      setRequirementsHourlyLabourData={setRequirementsHourlyLabourData}
                                                      requirementsServicesData={requirementsServicesData}
                                                      setRequirementsServicesData={setRequirementsServicesData}
                                                      requirementsFinalVerificationsData={requirementsFinalVerificationsData}
                                                      setRequirementsFinalVerificationsData={setRequirementsFinalVerificationsData}
                                                      deletionError = {deletionError} setDeletionError = {setDeletionError} newDeletionError = {newDeletionError}  setNewDeletionError = {setNewDeletionError}

                                    />
                                    <ClientRequirementsList problemsData={foundProblemsData} setProblemsData={setFoundProblemsData} helperText={"Listă cerințe"}
                                                      problemsDict={problemsDict} setProblemsDict={setProblemsDict}
                                                      requirementsHourlyLabourData = {requirementsHourlyLabourData} setRequirementsHourlyLabourData={setRequirementsHourlyLabourData}
                                                      requirementsServicesData={requirementsServicesData} setRequirementsServicesData={setRequirementsServicesData}
                                                      requirementsFinalVerificationsData={requirementsFinalVerificationsData} setRequirementsFinalVerificationsData = {setRequirementsFinalVerificationsData}
                                                      deletionError = {deletionError} setDeletionError = {setDeletionError} newDeletionError = {newDeletionError}  setNewDeletionError = {setNewDeletionError}

                                    />
                                </div>

                            }


                        </Grid>


                    </>


                }

            </Grid>




        </React.Fragment>
    );
}
