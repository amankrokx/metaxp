import { Button, Divider, useMediaQuery, TextField, InputAdornment, IconButton } from "@mui/material"
import React, { useEffect, useState } from "react"
// import AskName from "../../components/AskName"
const AskName = React.lazy(() => import("../../components/AskName"))


function Home() {
    const matches = useMediaQuery("(min-width:756px)")
    const [name, setName] = useState("")
    const [uuid, setUuid] = useState("")
    const [enterName, setEnterName] = useState(false)
    const joinCode = React.useRef()

    useEffect(() => {
        const n = window.localStorage.getItem("name")
        const u = window.localStorage.getItem("uuid")
        if (n && u && u.length > 0 && n.length > 0) {
            setName(n)
            setUuid(u)
        }
    }, [enterName])

    const joinGame = () => {
        alert("joingame")
    }

    return (
        <div
            style={{
                padding: 10,
            }}
        >
            <AskName open={enterName} setOpen={setEnterName} />
            <h2 style={{ paddingLeft: 20 }}>
                {name ? `Hi ${name} !` : `Set Name `}
                <Button onClick={() => setEnterName(true)}>
                    <span className="material-icons">edit</span>
                </Button>
            </h2>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    flexDirection: matches ? "row" : "column",
                    alignContent: "center",
                    justifyContent: "center",
                }}
            >
                <Button variant="contained" style={{ width: matches ? "40%" : 300 }}>
                    Create Game
                </Button>
                <Divider orientation={matches ? "vertical" : "horizontal"} style={{ padding: 10 }}></Divider>
                <TextField
                    style={{ width: matches ? "40%" : 300 }}
                    label="Join Game"
                    inputRef={joinCode}
                    type="number"
                    placeholder="Enter Code"
                    InputProps={{
                        onKeyDown: e => {
                            if (e.key === "Enter") joinGame()
                        },
                        startAdornment: (
                            <InputAdornment position="start">
                                <span className="material-icons">key</span>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton aria-label="Subscribe" onClick={joinGame}>
                                    <span className="material-icons" aria-label="subscribe" edge="end">
                                        login
                                    </span>
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
        </div>
    )
}

export default Home
