import * as React from 'react';
import MechanicProfile from "./MechanicProfile";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box'
import AddMechanic from "./AddMechanic";
import {collection, getDocs} from "@firebase/firestore";
import {db} from "../../authentification/firebase";
import {useAuth} from "../../../contexts/AuthContext";
import {useEffect, useState} from "react";

function Mechanics(props) {
    const currentUser = useAuth().currentUser
    const uid = currentUser.uid
    const mechanicsRef = collection(db, `${uid}mechanics`) // luam colectia de devize din firestore
    const [mechanics, setMechanics] = useState([])

    const getMechanics = async () => {
        const data = await getDocs(mechanicsRef).then()
        setMechanics(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        // setLoading(false)
    }

    useEffect(() => {
        getMechanics()
    }, [])

    const [newMechanicAdded, setNewMechanicAdded] = useState(false);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getMechanics()
        setLoading(true)
    }, [newMechanicAdded])

    useEffect(() => {
        if (loading)
            setTimeout(() => {
                setLoading(false)
            }, 100)

    }, [loading])

    return (
        <div>
            <Box sx={{ maxWidth: '80vw', maxHeight: '100vh', overflow: 'auto', marginTop: '7vh'}}>
                {loading ?
                <div>

                </div>
                :
                <Grid container m={2} sm={12} sx={{alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '10vw'}}>

                    <Grid item xs={4} sx={{ maxWidth: '20vw', marginBottom: '10vh'}}>
                        <AddMechanic setNewMechanicAdded = {setNewMechanicAdded} newMechanicAdded = {newMechanicAdded}/>
                    </Grid>
                    {mechanics.sort(function (a, b) {
                        if (a.name < b.name) {
                            return -1;
                        }
                        if (a.name > b.name) {
                            return 1;
                        }
                        return 0;
                    }).map((mechanic) =>  <Grid item xs={4} sx={{ maxWidth: '20vw', marginBottom: '10vh'}}> <MechanicProfile name = {mechanic.name} imageURL = {mechanic.imageURL}
                                         setNewMechanicAdded = {setNewMechanicAdded} newMechanicAdded = {newMechanicAdded} id = {mechanic.id}
                        /> </Grid>)}
                </Grid>
                }
            </Box>
        </div>

    );


}

export default Mechanics;