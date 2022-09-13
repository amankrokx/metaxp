import { SnackbarProvider, useSnackbar } from "notistack"
import React, { useEffect, useRef } from "react"
import SnackbarUtils from "../SnackbarUtils"


const Snack = props => {
    const providerRef = React.useRef()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    SnackbarUtils.setSnackBar(enqueueSnackbar, closeSnackbar)
     useEffect(() => {
         //2. Store both  enqueueSnackbar & closeSnackbar to class variables
         SnackbarUtils.setSnackBar(enqueueSnackbar, closeSnackbar)
     }, [])
    return (
        <SnackbarProvider ref={providerRef} maxSnack={4}>
            {props.children}
        </SnackbarProvider>
    )
}

export default Snack
