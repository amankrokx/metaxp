import { useMediaQuery, Typography, List, TextField, InputAdornment, ListItem, ListItemIcon, ListItemButton, ListItemText, Button } from "@mui/material"
import { onValue, ref } from "firebase/database"
import React from "react"
import { chooseCard, database, register } from "../../firebase/database"
import {user} from "../../components/AskName/user"
import SnackbarUtils from "../../components/SnackbarUtils"
import LoaderUtils from "../../components/Loader/LoaderUtils"

function Game (props) {
    const matches = useMediaQuery("(min-width:756px)")
    const [players, setPlayers] = React.useState({})
    const [cards, setCards] = React.useState([])
    const [canChoose, setCanChoose] = React.useState(false)
    const [mePlayer, setMePlayer] = React.useState("")
    const [gameId, setGameId] = React.useState("")
    const [finished, setFinished] = React.useState(false)
    const [cardArr, setCardArr] = React.useState([])
    const [winner, setWinner] = React.useState("")
    const [answer, setAnswer] = React.useState("")

    React.useEffect(() => {
        LoaderUtils.open()
        const paths = window.location.pathname.split('/')
        if (paths[paths.length - 1].length !== 6) window.location.href = "/"
        if (!user.name) {
            user.refresh()
            if (!user.name) {
                window.location.href = "/#" + paths[paths.length - 1]
            }
        }

        setGameId(paths[paths.length - 1])
        // now listen
        try {
            onValue(ref(database, 'game/' + paths[paths.length - 1]), snapshot => {
                const data = snapshot.val()
                if (!data || !data.status) window.location = '/#notExists'
                if (data.status === "finished") {
                    // check results
                    // if (cards[cardArr.indexOf(data.answer)] && cards[cardArr.indexOf(data.answer)].sel) 
                    //     setWinner(cards[cardArr.indexOf(data.answer)].name)
                    setFinished(true)
                }
                if (data.answer) setAnswer(data.answer)
                console.log(data)
                setPlayers(data.players)
                setCardArr(data.cards)
                console.log(cards, cardArr)
                let c = [
                    {sel: false, name: null},
                    {sel: false, name: null},
                    {sel: false, name: null},
                    {sel: false, name: null},
                    {sel: false, name: null},
                ]
                let mePresent = false
                let meSelected = false
                let noPlayers = 0
    
                for (const player in data.players) {
                    if ( player === "joined") continue
                    if (data.players[player]) {
                        if (finished && data.cards[data.players[player].selected - 1] == data.answer) setWinner(data.players[player].name)
                        if ( data.players[player].uuid === user.uuid) {
                            mePresent = true
                            setMePlayer(player)
                            meSelected = (data.players[player].selected ? true : false) || false
                        }
                        if (data.players[player].selected) noPlayers++
                        c[data.players[player].selected - 1] = { sel: true, name: data.players[player].name }
                    }
                }
                if (!mePresent && noPlayers < 5) {
                    // register myself
                    register(paths[paths.length - 1]).then(s => LoaderUtils.close()).catch(err => {
                        SnackbarUtils.error(err)
                    })
                }
                if (!meSelected && noPlayers < 5 && mePresent) {
                    LoaderUtils.close()
                    setCanChoose(true)
                } else setCanChoose(false)
                if (meSelected) LoaderUtils.close()
                console.log(meSelected, noPlayers, mePresent)
                setCards(c)
            })
            
        } catch (e) {
            window.location = "/#notExists"
        }
    }, [finished])

    const cardStyle = {
        height: matches ? 200 : 120,
        width: matches ? 180 : 120,
        backgroundColor: window.theme.palette.secondary.main,
        color: window.theme.palette.text.disabled,
        fontSize: '4em',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    }
    const cardStyleSelected = {
        height: matches ? 200 : 120,
        width: matches ? 180 : 120,
        boxSizing: "border-box",
        backgroundColor: window.theme.palette.grey.A400,
        color: window.theme.palette.text.disabled,
        fontSize: '4em',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    }

    return (
        <div>
            <div>
                <br></br>
                <div>

                    <Typography variant="h4" color="initial" style={{ margin: 20, display: "inline" }}>
                        Choose a card
                    </Typography>
                    <TextField
                        label="Invite Friends"
                        defaultValue={window.location}
                        style={{
                            float: matches ? "right" : "middle",
                            margin: 5
                        }}
                        InputProps={{
                            readOnly: true,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button variant="text" color="secondary" onClick={async () => {
                                        try {
                                            await navigator.share({
                                                title: "Card Game",
                                                text: "Goin my party on Card Game !",
                                                url: window.location
                                            })
                                            SnackbarUtils.success("Share URL to join party !")
                                        } catch (e) {
                                            navigator.clipboard.writeText(window.location)
                                            SnackbarUtils.success("Link Copied to Clipboard !")
                                            console.error(e)
                                        }
                                    }}>
                                        <span className="material-icons">share</span>
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <center>
                    <Typography variant="h3" color="primary">
                        {finished && winner.length > 0 ? "Winner is " + winner : finished && winner.length == 0 ? "Nobody won ! " + answer : ""}
                    </Typography>
                </center>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                    }}
                >
                    {cards.map((value, index, array) => (
                        <div key={index}>
                            <div
                                style={value.sel ? cardStyleSelected : cardStyle}
                                onClick={() => {
                                    // choose card
                                    if (value.sel || !canChoose) SnackbarUtils.toast("You have already Choosen !")
                                    else chooseCard(gameId, index + 1, mePlayer)
                                    console.log(index + 1 + mePlayer)
                                }}
                            >
                                {cardArr.length && finished ? cardArr[index] : "?"}
                            </div>
                            <center>{value.sel ? value.name : "Available"}</center>
                        </div>
                    ))}
                </div>
                <center>
                    {finished ? (
                        <Button
                            variant="contained"
                            onClick={() => {
                                window.location.href = "/"
                            }}
                        >
                            New Game
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            onClick={() => {
                                // Reveal cards early, before 5 players
                                LoaderUtils.open()
                                fetch("https://us-central1-metaxp-2d31a.cloudfunctions.net/reveal?id=" + gameId)
                                    .then(data => data.json())
                                    .then(data => {
                                        LoaderUtils.close()
                                        if (data.status === "success") SnackbarUtils.success("Result Revealed")
                                        else SnackbarUtils.error(data.message || "Some error occurred.")
                                    })
                            }}
                        >
                            Reveal
                        </Button>
                    )}
                </center>
            </div>
            <div style={{ padding: 20 }}>
                <Typography variant="body1" color="initial">
                    Participants
                </Typography>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <span className="material-icons">person</span>
                            </ListItemIcon>
                            <ListItemText primary={players.player1 ? players.player1.name : <i>Waiting</i>} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <span className="material-icons">person</span>
                            </ListItemIcon>
                            <ListItemText primary={players.player2 ? players.player2.name : <i>Waiting</i>} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <span className="material-icons">person</span>
                            </ListItemIcon>
                            <ListItemText primary={players.player3 ? players.player3.name : <i>Waiting</i>} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <span className="material-icons">person</span>
                            </ListItemIcon>
                            <ListItemText primary={players.player4 ? players.player4.name : <i>Waiting</i>} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <span className="material-icons">person</span>
                            </ListItemIcon>
                            <ListItemText primary={players.player5 ? players.player5.name : <i>Waiting</i>} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </div>
        </div>
    )
}

export default Game