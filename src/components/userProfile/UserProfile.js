import React, {useEffect} from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {useState} from "react";
import {useAuth} from "../../contexts/AuthContext";
import {db} from '../authentification/firebase'
import {addDoc, collection, doc, getDoc, setDoc} from '@firebase/firestore'
import { auth } from "../../components/authentification/firebase"
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
} from "firebase/storage";
import { storage } from "../authentification/firebase";
import { v4 } from "uuid";
import UserProfileTextInfo from './UserProfileTextInfo'



export default function UserProfile(){
    let data = ""
    const [usersData, setUsersData] =  useState({});

    const [company, setCompany] = useState("");
    const [address, setAddress] = useState("");
    const [workAddress, setWorkAddress] = useState("");
    const [CUI, setCUI] = useState("");
    const [comerceRegisterNumber, setComerceRegisterNumber] = useState("");
    const [bank, setBank] = useState("");
    const [IBAN, setIBAN] = useState("");

    const [imageUpload, setImageUpload] = useState(null);
    const [URL, setURL] = useState("");

    const currentUser = useAuth().currentUser
    const uid = currentUser.uid

    const storageRef = ref(storage,`images/${uid}`)

    const [isBusy, setIsBusy] = useState(true)



    const uploadFile = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${uid}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((URL) => {
                setURL(URL)
            });
        });
    };

    const handleImageChange = (event) => {
        setImageUpload(event.target.files[0]);
        const imageRef = ref(storage, `images/${uid}`);
        uploadBytes(imageRef, event.target.files[0]).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((URL) => {
                setURL(URL)
            });
        });
    };


     const handleSave = async () => {
        uploadFile()
        await setDoc(doc(db, "Users", uid), {
            "company": company,
            "address": address,
            "workAddress": workAddress,
            "CUI": CUI,
            "comerceRegisterNumber": comerceRegisterNumber,
            "bank": bank,
            "IBAN": IBAN});

    }

    useEffect(() => {

        let docRef = null
        let docSnap = null

        getDownloadURL(storageRef).then((currentURL) => {
            setURL(currentURL);
        })

            .catch((error)=>{
                setIsBusy(false)
            })

        const getUsersData = async () => {
            try{
                docRef = await doc(db, "Users", uid)
                docSnap = await getDoc(docRef);
            }
            catch(e){
            }
            finally {
            }
        }

        getUsersData().then(()=> {
            data = docSnap.data()
            // setUsersData(data)
            setCompany(data.company)
            setIBAN(data.IBAN)
            setBank(data.bank)
            setCUI(data.CUI)
            setComerceRegisterNumber(data.comerceRegisterNumber)
            setWorkAddress(data.workAddress)
            setAddress(data.address)
            setIsBusy(false)

        })
        return () => {
            // handleSave()
        }


    }, []);

     if (isBusy)
         return (<div></div>)

    return (<div>
        {<Grid container spacing={2}
               direction="column"
               justifyContent="space-around  "
               alignItems="center"
               auto
               padding={5}
               style={{gap: 30}}
        >

            <Stack direction="column" alignItems="center" spacing={2} marginTop={"8vh"}>
                {URL &&
                    <img src={URL} alt="" height={'100%'} width={'300vw'} object-fit={'cover'} overflow={'hidden'}/>}
                <Button variant="contained" component="label">
                    Schimbă logo
                    <input hidden accept="image/*" type="file" onChange={handleImageChange}/>
                </Button>
            </Stack>
            <Grid item width={'60vw'} marginTop={"2vh"}>

                <Grid container spacing={3} alignItems={'center'} justifyContent={'center'} direction={'row'}>
                    <Grid item xs={12} sm={9}>
                        <TextField
                            label="Denumirea firmei"
                            fullWidth
                            defaultValue={company}
                            onChange={(event) => {
                                setCompany(event.target.value)
                            }
                            }

                        />
                    </Grid>


                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Adresă sediu social"
                            fullWidth
                            autoComplete="family-name"
                            defaultValue={address}
                            onChange={(event) => {
                                setAddress(event.target.value)
                            }
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Adresă punct de lucru"
                            defaultValue={workAddress}

                            fullWidth
                            autoComplete="family-name"
                            onChange={(event) => {
                                setWorkAddress(event.target.value)
                            }
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Cod unic de înregistrare fiscală (CUI/CIF)"
                            fullWidth
                            autoComplete="family-name"
                            defaultValue={CUI}

                            onChange={(event) => {
                                setCUI(event.target.value)
                            }
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Numărul Registrului Comerțului"
                            defaultValue={comerceRegisterNumber}

                            fullWidth
                            autoComplete="family-name"
                            onChange={(event) => {
                                setComerceRegisterNumber(event.target.value)
                            }
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Denumire banca"
                            fullWidth
                            defaultValue={bank}
                            autoComplete="family-name"
                            onChange={(event) => {
                                setBank(event.target.value)
                            }
                            }
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="IBAN"
                            fullWidth
                            defaultValue={IBAN}

                            autoComplete="family-name"
                            onChange={(event) => {
                                setIBAN(event.target.value)
                            }
                            }
                        />
                    </Grid>

                </Grid>
                <Grid container spacing={0}
                      direction="row"
                      justifyContent="flex-end"
                      alignItems="center"
                      lg
                      paddingTop="6px"
                >
                </Grid>
            </Grid>
            <Grid item>
                <Button variant="outlined"
                        onClick={handleSave}

                        sx={{color: 'green', borderColor: 'green', width: "7vw"}}
                > Save </Button>
            </Grid>
        </Grid>}
    </div>);
}

