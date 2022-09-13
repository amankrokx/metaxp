import React from "react"
// import { Link } from "react-router-dom"
import AppBar from "@mui/material/AppBar"
import Container from '@mui/material/Container'
import Toolbar from "@mui/material/Toolbar"
import Typography from '@mui/material/Typography'
import useMediaQuery from "@mui/material/useMediaQuery"
import useScrollTrigger from "@mui/material/useScrollTrigger"
import Slide from "@mui/material/Slide"
// import "./navbar.css"
import logo from "../../media/logo.png"

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
                        <img
                            src={logo}
                            alt="Logo"
                            className="navIcon"
                            style={{
                                height: matches ? "42px" : "36px",
                                width: matches ? "42px" : "36px",
                                // margin: "0 11px",
                            }}
                        ></img>
                        <Typography
                            style={{
                                fontWeight: "bold",
                                // margin: "10px",
                                fontSize: "1.5em",
                                color: "white",
                                position: "absolute",
                                left: "50%",
                                transform: "translate(-50%, 0)"
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
