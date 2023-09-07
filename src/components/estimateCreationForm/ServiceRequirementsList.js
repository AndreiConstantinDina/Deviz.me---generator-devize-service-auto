import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import {FormGroup, FormControlLabel, Checkbox, RadioGroup, FormControl, FormLabel, Radio} from "@mui/material";
import Grid from "@mui/material/Grid";
import {useEffect, useState} from "react";
import {useAuth} from "../../contexts/AuthContext";
import {doc, getDoc} from "@firebase/firestore";
import {db} from "../authentification/firebase";

export default function ServiceRequirementsList({problemsData, setProblemsData, problemsDict, otherProblemsData, deletionError, setDeletionError, newDeletionError, setNewDeletionError,
                                                    hourlyLabourData, setHourlyLabourData,
                                                    servicesData, setServicesData
                                                }) {

    const [options, setOptions] = useState([])
    const [price, setPrice] = useState()

    const currentUser = useAuth().currentUser
    const uid = currentUser.uid

    useEffect(() => {
        let docRef = null
        let docSnap = null

        const getHourlyLabourPrice = async () => {
            try{
                docRef = await doc(db,  `${uid}lists`, 'hourlyLabours')
                docSnap = await getDoc(docRef);
            }
            catch(e){
            }
        }

        getHourlyLabourPrice().then(() => {
                let data = docSnap.data()
                setPrice(data.hourlyLabourPrice)
            }
        )

        const getOptions = async () => {
            try{
                docRef = await doc(db,  `${uid}lists`, 'services')
                docSnap = await getDoc(docRef);
            }
            catch(e){
            }
        }

        getOptions().then(() => {
                let data = docSnap.data()
                setOptions(data.servicesList)
            }
        )




    }, [])


    const handleProblemDelete = (value) => {
        let deleteElement = true
        for (const [key, val] of Object.entries(problemsDict)){
            // console.log(problemsDict[key].key)
            // console.log(value)
            if (problemsDict[key].key === value.problem) {
                if (problemsDict[key].value.problems.length !== 0) {
                    setDeletionError("Acest element nu poate fi șters deoarece are constatari asociate!")
                    setNewDeletionError(true)
                    return
                }
                else {
                    var problems = problemsData.problems.slice(0);
                    const newProblems = problems.filter((e) => e.problem !== value.problem)

                    setProblemsData({
                        ...problemsData,
                        problems: newProblems
                    }, [])

                    if (value.addLabourType === 'hourlyLabour')
                        for (let el of hourlyLabourData.items) {
                            if (el.item === value.problem) {
                                console.log(hourlyLabourData.items.indexOf(el))
                                hourlyLabourData.items.splice(hourlyLabourData.items.indexOf(el), 1)
                            } }
                    else servicesData.splice(servicesData.indexOf(value.problem), 1)


                }

                    if (otherProblemsData.includes(problemsDict[key].key))
                        return
                    problemsDict.splice(problemsDict.indexOf(problemsDict[key]), problemsDict.indexOf(problemsDict[key])+1)

            }
        }
    }

    useEffect(() => {
    }, [problemsData])

    return (
        <List sx={{ width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper' ,
            alignItems: 'flex-start' ,
            paddingLeft: '20px',
            marginTop: '3vh'
        }}>

            {problemsData.problems.map((element) => (
                <ListItem
                    justifyContent= 'flex-start'
                    alignItems = "center"
                    key={element.problem}
                    sx={{borderStyle: 'solid',
                        borderWidth: '0.5px',
                        borderColor: 'gray',
                        borderRadius: '5px',
                        margin: '8px',
                        width: '60vw',
                        paddingLeft: '10px',
                        minHeight: '60px'
                    }}
                >
                    <ListItemText primary={`${element.problem}`} sx={{overflowWrap: 'break-word', width: '500%'}} />
                    <Grid container spacing={0} direction={'column'} justifyContent={'flex-end'} alignItems={'flex-end'}>
                        <Grid item xs={6} >
                            <FormControl>
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={"hourlyLabour"}
                                >

                                    <FormControlLabel value="hourlyLabour" control={<Radio checked={element.addLabourType ==='hourlyLabour'}/>} label="Lucrare"
                                                      sx={{height: '20px'}}
                                                      onClick={(event)=>{
                                                          element.addLabourType = "hourlyLabour"

                                                          for (let el of servicesData.items) {
                                                              if (el.item === element.problem) {
                                                                  servicesData.items.splice(servicesData.items.indexOf(el), 1)
                                                                  hourlyLabourData.items.push({item: element.problem, quantity: 1, price: price, total: 0})
                                                                  break
                                                              }                                                          }


                                                          setProblemsData({...problemsData})
                                                      }}
                                    />
                                    <FormControlLabel value="service" control={<Radio checked={element.addLabourType==='service'}/>} label="Serviciu"
                                                      sx={{height: '20px'}}
                                                      onClick={(event)=>{
                                                          element.addLabourType = "service"
                                                          for (let el of hourlyLabourData.items) {
                                                              if (el.item === element.problem) {
                                                                  hourlyLabourData.items.splice(hourlyLabourData.items.indexOf(el),  1)
                                                                  let newPrice = 0
                                                                  if (!options.find((e) => (e.item === element.problem)))
                                                                      newPrice = 0;
                                                                  else newPrice = parseFloat(options.find((e) => (e.item === element.problem)).price)
                                                                  servicesData.items.push({item: element.problem, quantity: 1, price: newPrice, total: 0})
                                                                  break
                                                              }
                                                          }



                                                          setProblemsData({...problemsData})

                                                      }}
                                    />
                                </RadioGroup>
                            </FormControl>

                        </Grid>
                    </Grid>

                    <IconButton>
                        <DeleteIcon onClick={() => {handleProblemDelete(element)}}>
                        </DeleteIcon>
                    </IconButton>


                </ListItem>
            ))}
        </List>
    );
}