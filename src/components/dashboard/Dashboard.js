import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import UserProfile from "./userProfile/UserProfile";
import OfferedServices from "./services/OfferedServices";
import Mechanics from "./mechanics/Mechanics";
import Bonuses from "./bonuses/Bonuses";
import Loading from "../utils/Loading";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import ToggleButton from "@mui/material/ToggleButton";
import Typography from "@mui/material/Typography";
import {styled} from "@mui/material/styles";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import IconButton from "@mui/material/IconButton";
import PersonIcon from '@mui/icons-material/Person';
import Divider from "@mui/material/Divider";
import SellIcon from '@mui/icons-material/Sell';
import BadgeIcon from '@mui/icons-material/Badge';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';


const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
        margin: theme.spacing(0),
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


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ width: '90vw'}} >
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

function Dashboard(props) {

    const getStepContent = (step) => {
        switch (step) {
            case('Profil'):
               return <UserProfile/>

            case('Servicii'):
                return <OfferedServices/>
            case('Mecanici'):
                return <Mechanics/>
            case('Bonusuri'):
                return <Bonuses/>
            default:
                throw new Error(`Unknown step: ${step}`);
        }
    }

    const getIcon = (step) => {
        switch (step) {
            case('Profil'):
                return <PersonIcon/>
            case('Servicii'):
                return <MiscellaneousServicesIcon/>
            case('Mecanici'):
                return <BadgeIcon/>
            case('Bonusuri'):
                return <SellIcon/>
            default:
                throw new Error(`Unknown step: ${step}`);
        }
    }

    const [value, setValue] = useState(0);

    const [isLoading, setIsLoading] = useState(true)

    const [step, setStep] = useState('Profil');

    const steps = ['Profil', 'Servicii', 'Mecanici', 'Bonusuri']

    const stepsDict = {
        'Profil': 'Profil',
        'Servicii': 'Servicii',
        'Mecanici': 'Mecanici',
        'Bonusuri': 'Bonusuri'
    }



    const handleStep = (event, newStep) => {
        if (newStep) {
            setStep(newStep)
        }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setIsLoading(true)
    };

    useEffect(() => {
        if (isLoading)
            setTimeout(() => {
                setIsLoading(false)
                }, 500)


    }, [isLoading])

    return (

            isLoading

                ?
                   <Loading/>
                :

                <Grid container spacing={2}
                      direction="column"
                      justifyContent="space-around  "
                      alignItems="center"
                      auto
                      padding={5}
                >

                    <Grid container>
                        {/*navigation system*/}

                        <Grid item width={'15vw'} height={'100vh'} justifyContent={'center'}>
                            <Container component="main" >
                                <StyledToggleButtonGroup
                                    value={step}
                                    exclusive
                                    onChange={handleStep}
                                    orientation="vertical"
                                    fullWidth
                                >
                                    {steps.map((element) => {
                                        return <ToggleButton value={element} sx={{justifyContent: 'flex-start', alignItems: 'center'}}>
                                            <IconButton>
                                                {getIcon(element)}
                                            </IconButton>
                                                {stepsDict[element]}

                                        </ToggleButton>
                                    })}
                                </StyledToggleButtonGroup>

                            </Container>
                        </Grid>

                        <Divider orientation="vertical" flexItem style={{borderWidth: '1px'}}/>

                        {/*/navigation system*/}

                        {/*content*/}

                        <Grid item width={'80vw'}>
                            {getStepContent(step)}
                        </Grid>

                        {/*content*/}


                    </Grid>
                </Grid>

                    );
}

export default Dashboard;