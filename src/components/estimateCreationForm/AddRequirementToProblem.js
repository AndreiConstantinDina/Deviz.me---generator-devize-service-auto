import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button'
import Grid from "@mui/material/Grid";

function AddRequirementToProblem({problemsData, setProblemsData, addProblemLabel, helperText, problemsDict, setProblemsDict, val,
                                     requirementsHourlyLabourData, setRequirementsHourlyLabourData,
                                     requirementsServicesData, setRequirementsServicesData,
                                     requirementsFinalVerificationsData, setRequirementsFinalVerificationsData}) {

    const handleAddNewProblem = () => {

            let dict = [...problemsDict]

            for (let i = 0; i<dict.length; i++) {
                let elem = dict[i]
                try{
                    if (elem.value.newProblem !== '') {
                        for (let j=0; j<elem.value.problems.length; j++)
                            if (elem.value.problems[j] === elem.value.newProblem)
                                return
                        elem.value.problems.push(elem.value.newProblem)
                        setRequirementsHourlyLabourData([...requirementsHourlyLabourData, {
                                key: elem.value.newProblem,
                                value: {
                                    items: [],
                                    newItem: ''
                                }
                            }]
                        )

                        setRequirementsServicesData([...requirementsServicesData, {
                                key: elem.value.newProblem,
                                value: {
                                    items: [],
                                    newItem: ''
                                }
                            }]
                        )

                        setRequirementsFinalVerificationsData([...requirementsFinalVerificationsData, {
                                key: elem.value.newProblem,
                                value: {
                                    items: [],
                                    newItem: ''
                                }
                            }]
                        )

                        elem.value.newProblem = ''
                    }
                }
                catch{
                }

            }
            setProblemsDict(dict)


    }
    return (
        <Grid container spacing={1} direction={'row'} justifyContent={'left'} alignItems={'center'} width={'40vw'}>
            {/*<Grid item>*/}
            {/*    <Typography fontSize={'100%'}>*/}
            {/*        {helperText}*/}
            {/*    </Typography>*/}
            {/*</Grid>*/}
            <Grid item>
                <Autocomplete
                    size={'small'}
                    freeSolo
                    options={[]}
                    sx={{width: '20vw', marginLeft: '3vw'}}
                    value = {problemsDict.find(item => item.key === val).value.newProblem}
                    renderInput={(params) => <TextField{...params} label={addProblemLabel}
                           onChange={
                                (event) => {
                                    problemsDict.find(item => item.key === val).value.newProblem = event.target.value
                                    setProblemsDict([...problemsDict])
                                }
                            }
                           onSelect = {
                               (event) => {
                                   problemsDict.find(item => item.key === val).value.newProblem = event.target.value
                                   setProblemsDict([...problemsDict])

                               }
                           }
                    />}
                />

            </Grid>

            <Grid item>

                <Button variant="outlined" onClick={() => {handleAddNewProblem()}}>
                    Adaugă
                </Button>

            </Grid>
        </Grid>
    );
}


export default AddRequirementToProblem