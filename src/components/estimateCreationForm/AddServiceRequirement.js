import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button'
import Grid from "@mui/material/Grid";
import {useState} from "react";
import Typography from "@mui/material/Typography";
import {useAuth} from "../../contexts/AuthContext";
import {useEffect} from "react";
import {doc, getDoc} from "@firebase/firestore";
import {db} from "../authentification/firebase";

export default function AddServiceRequirement ({problemsData, setProblemsData, addProblemLabel, helperText, problemsDict, setProblemsDict,
                                                   hourlyLabourData, setHourlyLabourData,
                                                   servicesData, setServicesData}) {

    const [options, setOptions] = useState([])
    const [price, setPrice] = useState()

    const currentUser = useAuth().currentUser
    const uid = currentUser.uid

    useEffect(() => {
        let docRef = null
        let docSnap = null

        const getOptions = async () => {
            try{
                docRef = await doc(db,  `${uid}lists`, 'hourlyLabours')
                docSnap = await getDoc(docRef);
            }
            catch(e){
            }
        }

        getOptions().then(() => {
                let data = docSnap.data()
                setOptions(data.hourlyLaboursList)
                setPrice(data.hourlyLabourPrice)
            }
        )
    }, [])

    const handleAddNewProblem = () => {
        if (problemsData.newProblem === '')
            ;
        else {
            const problems = problemsData.problems.slice(0)
            var adauga = true;
            for (var i=0; i<problems.length; i++)
                if (problems[i] === problemsData.newProblem)
                    adauga = false
            if (adauga) {
                problems.push({problem: problemsData.newProblem, addLabourType: 'hourlyLabour' })
                problemsDict.push({
                        key: problemsData.newProblem,
                        value: {
                            problems: [],
                            newProblem: ''
                        }
                    }

                )
            }
            setProblemsData({...problemsData, problems: problems, newProblem: ''})
            hourlyLabourData.items.push({item: problemsData.newProblem, quantity: 1, price: price, total: 0})
        }

    }
    return (
        <Grid container spacing={3} direction={'row'} justifyContent={'space-between'} alignItems={'center'} width = 'auto' marginBottom={'3vh'}>
            {/*<Grid item>*/}
            {/*    <Typography fontSize={'140%'}>*/}
            {/*        {helperText}*/}
            {/*    </Typography>*/}
            {/*</Grid>*/}
            <Grid item>
                <Autocomplete
                    size={'small'}
                    freeSolo
                    options={problemsData.options}
                    sx={{width: 300}}
                    value = {problemsData.newProblem}
                    renderInput={(params) => <TextField{...params} label={addProblemLabel} onChange={
                        (event) => setProblemsData({
                            ...problemsData,
                            newProblem: event.target.value
                        })}
                                                       onSelect = {
                                                           (event) => setProblemsData({
                                                               ...problemsData,
                                                               newProblem: event.target.value
                                                           })}

                    />}
                />

            </Grid>

            <Grid item>

                <Button variant="outlined"
                        onClick={() => {handleAddNewProblem()}}

                >

                    Adaugă</Button>

            </Grid>
        </Grid>
    );
}