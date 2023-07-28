import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from "./components/Sidebar";
import Layout from "./components/Layout";
import Guide from "./components/Guide";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DevicesPage from "./pages/DevicesPage";
import NoticesPage from "./pages/NoticesPage";
import NewNoticesContext from './hooks/NewNoticesContext';
import SettingsPage from "./pages/SettingsPage"; // Import the context

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
                    <Route path="/" element={<HomePage />} />
                    <Route path="/devices" element={<DevicesPage />} />
                    <Route path="/notices" element={<NoticesPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                </Routes>
            </Router>
        </NewNoticesContext.Provider>
    );
}

export default App;
