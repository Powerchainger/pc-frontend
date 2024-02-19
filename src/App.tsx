import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DevicesPage from "./pages/DevicesPage";
import NoticesPage from "./pages/NoticesPage";
import RegisterPage from "./pages/RegisterPage";
import NewNoticesContext from './hooks/NewNoticesContext';
import SettingsPage from "./pages/SettingsPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthWrapper from './components/AuthWrapper';

function App() {
    const [newNotices, setNewNotices] = useState(0);

    useEffect(() => {
        const storedNoticesCount = localStorage.getItem('newNotices');
        if (storedNoticesCount) {
            setNewNotices(Number(storedNoticesCount));
        }
    }, []);

    return (
        <NewNoticesContext.Provider value={{ newNotices, setNewNotices }}>
            <Router>
                <AuthWrapper>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/" element={<HomePage />} />
                        <Route path="/prediction" element={<DevicesPage />} />
                        <Route path="/notices" element={<NoticesPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                    </Routes>
                </AuthWrapper>
                <ToastContainer style={{ top: '60px' }} />
            </Router>
        </NewNoticesContext.Provider>
    );
}

export default App;
