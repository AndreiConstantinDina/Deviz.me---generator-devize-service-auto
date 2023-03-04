import React from 'react';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Avatar from '@mui/material/Avatar'

const theme = createTheme();

function About() {
    const aboutUs = [
        {
            q: "Cine suntem?",
            a: "Momentan, un two-man-army ce isi doreste sa faca lucruri marete!"
        },
        {
            q: "Ce ne propunem?",
            a: "Dorim sa aducem pe piata cea mai puternica aplicatie de creat devize pentru service-urile auto din Romania."
        },
        {
            q: "De ce am ales sa facem aceasta aplicatie?",
            a: "Aceasta aplicatie a aparut din lipsa unei alternative digitale bune pentru crearea unui deviz de service"
        }
    ]
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

            <Container component="main" maxWidth="sm" sx={{ mb: 4, justifyContent: 'space-between', display: "grid", paddingTop: "30px"}}>
                <Container component="main" maxWidth="sm" sx={{ mb: 4, justifyContent: 'space-between', display: "flex", paddingTop: "30px"}}>
                   <Avatar alt="Andrei" src="./Andrei.jpeg" sx={{ width: 200, height: 200 }}/>
                    <Typography variant="outlined" sx={{my: {xs: 3, md: 1},
                        p: {xs: 1, md: 3},
                        display: 'flex',
                        justifyContent: 'space-between'}}>
                        Creator: Dina Andrei-Constantin
                    </Typography>
                </Container>
                {aboutUs.map(
                    (element) => {
                        return (

                            <div>
                                <React.Fragment>
                                    <Typography variant="h5" gutterBottom sx={{justifyContent: "center", display: 'block', paddingTop: "30px"}}>
                                        {element.q}
                                    </Typography>
                                </React.Fragment>

                                <Paper variant="outlined" sx={{my: {xs: 3, md: 1},
                                p: {xs: 1, md: 3},
                                display: 'flex',
                                justifyContent: 'space-between'}}>
                                    <Typography>
                                        {element.a}
                                    </Typography>
                                </Paper>
                            </div>
                    )}
                )}

            </Container>
        </ThemeProvider>
    );
}

export default About;