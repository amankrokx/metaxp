import LinearProgress from "@mui/material/LinearProgress"
import React, { useEffect, useState } from "react"
import LoaderUtils from "./LoaderUtils"

const Loader = props => {
    const providerRef = React.useRef()
    const [ loading, setLoading ] = useState(true)
    LoaderUtils.setLoader(loading, setLoading)
    useEffect(() => {
        //2. Store both  enqueueSnackbar & closeSnackbar to class variables
        LoaderUtils.setLoader(loading, setLoading)
    }, [])
    if (!loading) {
        return (
            <>
                <LinearProgress ref={providerRef} color="secondary" style={{
                    position: "fixed",
                    top: "0",
                    left: "0",
                    zIndex: "1000000",
                    width: "100%"
                }}>
                </LinearProgress>
                {props.children}
            </>
        )
    } else {
        return (<>{props.children}</>)
    }
}

export default Loader
