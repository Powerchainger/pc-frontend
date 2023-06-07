import HomeIcon from '@mui/icons-material/Home';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

export const navData = [
    {
        id: 0,
        icon: <HomeIcon/>,
        text: "Home",
        link: "/home"
    },
    {
        id: 1,
        icon: <BatteryChargingFullIcon/>,
        text: "Devices",
        link: "/devices"
    },
    {
        id: 2,
        icon: <BarChartIcon/>,
        text: "Data",
        link: "/data"
    },
    {
        id: 3,
        icon: <SettingsIcon/>,
        text: "Settings",
        link: "/settings"
    },
    {
        id:4,
        icon: <LogoutIcon/>,
        text: "Logout",
        link: "/"
    }
]