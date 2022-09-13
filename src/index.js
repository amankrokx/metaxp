import React from 'react'
import ReactDOM from 'react-dom/client';
import './index.css';
import "material-icons/iconfont/material-icons.css"
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from "@mui/material/styles"

const root = ReactDOM.createRoot(document.getElementById("root"))
const theme = createTheme({
    palette: {
        primary: {
            main: "#4caf50", // This is an orange looking color
            light: "#80e27e",
            dark: "#087f23",
            contrastText: "#fff"
        },
        secondary: {
            main: "#2979ff", //Another orange-ish color
            light: "#75a7ff",
            dark: "#004ecb",
            // contrastText: "#888888"
        },
        white: {
            main: "#ffffff",
        },
        contrastThreshold: 3,
    },
})

window.theme = theme

root.render(
    <ThemeProvider theme={theme}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ThemeProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
