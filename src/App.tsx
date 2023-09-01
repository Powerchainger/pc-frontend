import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DevicesPage from "./pages/DevicesPage";
import NoticesPage from "./pages/NoticesPage";
import NewNoticesContext from './hooks/NewNoticesContext';
import SettingsPage from "./pages/SettingsPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [newNotices, setNewNotices] = useState(0); // Define the newNotices state

    // Get stored notices count from localStorage
    useEffect(() => {
        const storedNoticesCount = localStorage.getItem('newNotices');
        if (storedNoticesCount) {
            setNewNotices(Number(storedNoticesCount));
        }
    }, []);

    return (
        <NewNoticesContext.Provider value={{ newNotices, setNewNotices }}> {/* Add the Provider */}
            <Router>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/devices" element={<DevicesPage />} />
                    <Route path="/notices" element={<NoticesPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                </Routes>
                <ToastContainer />
            </Router>
        </NewNoticesContext.Provider>
    );
}

export default App;
