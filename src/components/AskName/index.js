import * as React from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import SnackbarUtils from "../SnackbarUtils"
import { v4 as uuidv4 } from "uuid"

export default function AskName(props) {
    const inpref = React.useRef()
    const handleClose = () => {
        props.setOpen(false)
    }

    React.useEffect(() => {
        // const n = window.localStorage.getItem("name")
        // if (n && n.length > 0) inpref.current.value = n
    }, [])

    const saveName = () => {
        if (inpref.current.value.length > 0) window.localStorage.setItem("name", inpref.current.value)
        window.localStorage.setItem("uuid", uuidv4())
        SnackbarUtils.success("Changed Name !")
        props.setOpen(false)
    }

    return (
        <div>
            <Dialog open={props.open} >
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>To continue playing, please provide your Nickname .</DialogContentText>
                    <TextField autoFocus inputRef={inpref} margin="dense" id="name" label="Enter NickName" type="text" fullWidth variant="standard" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={saveName}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
