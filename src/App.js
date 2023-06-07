import './App.css';
import Login from "./components/login/login";
import Home from "./components/Home/Home"
import {Route, Routes} from "react-router-dom";
import DataPage from "./components/DataPage/DataPage";
import Settings from "./components/Settings/Settings";
import DevicePage from "./components/DevicePage/DevicePage";
function App() {
  return (
    <div className="App">
       <Routes>
           <Route path="/" element={<Login/>} />
           <Route path="/home" element={<Home/>} />
           <Route path="/data" element={<DataPage/>}/>
           <Route path="/settings" element={<Settings/>}/>
           <Route path="/devices" element={<DevicePage/>}/>
       </Routes>
    </div>
  );
}

export default App;
