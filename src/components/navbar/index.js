import React from "react"
import AppBar from "@mui/material/AppBar"
import Container from '@mui/material/Container'
import Toolbar from "@mui/material/Toolbar"
import Typography from '@mui/material/Typography'
import useMediaQuery from "@mui/material/useMediaQuery"
import useScrollTrigger from "@mui/material/useScrollTrigger"
import Slide from "@mui/material/Slide"

function NavBar(props) {
    const matches = useMediaQuery('(min-width:756px)')
    const trigger = useScrollTrigger()    

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            <AppBar position="fixed" style={{ zIndex: 5 }}>
                <Container maxWidth="xl">
                    <Toolbar
                        disableGutters
                        style={{
                            justifyContent: "space-between",
                        }}
                    >
                        <span
                            className="material-icons"
                            style={{
                                fontSize: matches ? "42px" : "36px",
                                // margin: "0 11px",
                            }}
                        >
                            sports_esports
                        </span>
                        <Typography
                            style={{
                                fontWeight: "bold",
                                // margin: "10px",
                                fontSize: "1.5em",
                                color: "white",
                                position: "absolute",
                                left: "50%",
                                transform: "translate(-50%, 0)",
                            }}
                        >
                            Card Game
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
        </Slide>
    )
}

export default NavBar
