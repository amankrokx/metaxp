import { Button, Divider, useMediaQuery, TextField, InputAdornment, IconButton } from "@mui/material"
import React, { useEffect, useState } from "react"
import LoaderUtils from "../../components/Loader/LoaderUtils"
import SnackbarUtils from "../../components/SnackbarUtils"
import { createGame } from "../../firebase/database"
// import AskName from "../../components/AskName"
const AskName = React.lazy(() => import("../../components/AskName"))


function Home() {
    const matches = useMediaQuery("(min-width:756px)")
    const [name, setName] = useState("")
    const [uuid, setUuid] = useState("")
    const [enterName, setEnterName] = useState(false)
    const joinCode = React.useRef()

    useEffect(() => {
        if (window.location.hash.length === 7) SnackbarUtils.toast("Set Name to join game .")
        const n = window.localStorage.getItem("name")
        const u = window.localStorage.getItem("uuid")
        if (n && u && u.length > 0 && n.length > 0) {
            if (window.location.hash.length > 1) {
                if (window.location.hash === '#notExists')SnackbarUtils.error("The party does not exists !")
                else if (window.location.hash === '#finished')SnackbarUtils.info("The party is Over !")
                else if (window.location.hash.length === 7) {
                    window.location.href = "/game/" + window.location.hash.substring(1)
                    return
                }
            }
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
                <Button
                    variant="contained"
                    style={{ width: matches ? "40%" : 300 }}
                    onClick={() => {
                        LoaderUtils.open()
                        createGame()
                            .then(id => {
                                console.log(id)
                                window.location.href = "/game/" + id
                                LoaderUtils.close()
                            })
                            .catch(err => {
                                LoaderUtils.close()
                                SnackbarUtils.error(err.message ? err.message : "Something went wrong !")
                            })
                    }}
                >
                    Create Game
                </Button>
                <Divider orientation={matches ? "vertical" : "horizontal"} style={{ padding: 10 }}></Divider>
                <TextField
                    style={{ width: matches ? "40%" : 300 }}
                    label="Join Game"
                    inputRef={joinCode}
                    type="text"
                    placeholder="Enter Code"
                    InputProps={{
                        onKeyDown: e => {
                            if (e.key === "Enter") window.location.href = "/game/" + joinCode.current.value
                        },
                        startAdornment: (
                            <InputAdornment position="start">
                                <span className="material-icons">key</span>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="Join Game"
                                    onClick={() => {
                                        window.location.href = "/game/" + joinCode.current.value
                                    }}
                                >
                                    <span className="material-icons" aria-label="Join" edge="end">
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
