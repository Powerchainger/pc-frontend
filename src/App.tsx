import './App.css';
import Login from "./components/login/login";
import Home from "./components/Home/Home"
import {Route, Routes} from "react-router-dom";
import DataPage from "./components/DataPage/DataPage";
import Settings from "./components/Settings/Settings";
import DevicePage from "./components/DevicePage/DevicePage";
import { ThemeProvider, ThemeOptions, createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Theme {
        status: {
            danger: string;
        };
    }

    // allow configuration using `createTheme`
    interface ThemeOptions {
        status?: {
            danger?: string;
        };
    }
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#2071b5',
        },
        secondary: {
            main: '#ffda00',
        },
        info: {
            main: '#808080',
        }
    },
    typography: {
        // Define typography options here
        fontFamily: 'Arial, sans-serif',
        fontSize: 14
    },
    transitions: {
        // Define transition options here
        duration: {
            shortest: 150,
            shorter: 200,
            short: 250,
            standard: 300,
            complex: 375,
            enteringScreen: 225,
            leavingScreen: 195,
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/data" element={<DataPage/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                    <Route path="/devices" element={<DevicePage/>}/>
                </Routes>
            </div>
        </ThemeProvider>
    );
}

export default App;
