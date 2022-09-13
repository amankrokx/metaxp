import React, { useState, useRef } from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Button from "@mui/material/Button"
import NavBar from "./components/navbar"
import Toolbar from '@mui/material/Toolbar'
import IconButton from "@mui/material/IconButton"
import { SnackbarProvider } from "notistack"
import Snack from "./components/Snack"
import Loader from "./components/Loader"
const Game = React.lazy(() => import("./pages/Game"))

function App(props) {
    const [loggedIn, setLoggedIn] = useState(true)
    const notistackRef = useRef()

    return (
        <SnackbarProvider
            dense
            preventDuplicate
            maxSnack={3}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            ref={notistackRef}
            action={key => (
                <IconButton aria-label="Close" onClick={() => notistackRef.current.closeSnackbar(key)}>
                    <span className="material-icons" style={{ color: window.theme.palette.white.main }}>
                        close
                    </span>
                </IconButton>
            )}
        >
            <div className="App">
                <Snack></Snack>
                <Loader></Loader>
                <NavBar state={loggedIn} />
                <Toolbar></Toolbar>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/game/*" element={<Game />} />
                    <Route exact path="/but" element={<Button variant="contained">But</Button>} />
                </Routes>
            </div>
        </SnackbarProvider>
    )
}

export default App
