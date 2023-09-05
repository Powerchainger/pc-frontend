import React, {useEffect, useState} from 'react';
import Layout from '../components/Layout';
import { Box, FormControlLabel, Checkbox, Radio, RadioGroup, Slider, Switch, TextField, Typography, IconButton } from '@mui/material';
const SettingsPage = () => {
    const initialModel = localStorage.getItem("selectedModel") || "fhmm";
    const [selectedModel, setSelectedModel] = useState<string>(initialModel);
    const [isChanged, setIsChanged] = useState<boolean>(false);
    const [suppModel, setSuppModel] = useState<string>("None");
    const [showSavedMsg, setShowSavedMsg] = useState<boolean>(false);

    useEffect(() => {
        setIsChanged(selectedModel !== initialModel || suppModel !== "None");
    }, [selectedModel, suppModel, initialModel]);

    const handleModelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newModel = event.target.value;
        setSelectedModel(newModel);
    };

    const handleSuppModelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSuppModel(event.target.value);
    };

    const handleSave = () => {
        localStorage.setItem("selectedModel", selectedModel);
        setIsChanged(false);
        setShowSavedMsg(true);
        setTimeout(() => setShowSavedMsg(false), 3000);
    };

    return (
        <Layout>
            <Box m={3} className="bg-white shadow-lg rounded-lg p-8">
                <Box className="flex justify-between items-center mb-4">
                    <Typography variant="h5" gutterBottom className="text-gray-700">
                        Settings 🛠️
                    </Typography>
                </Box>
                <Box my={4}>
                    <Typography variant="h6" gutterBottom>
                        Model Type 🚀
                    </Typography>
                    <RadioGroup value={selectedModel} onChange={handleModelChange}>
                        <FormControlLabel value="convexopt" control={<Radio color="primary" />} label="ConvexOpt" />
                        <FormControlLabel value="fhmm" control={<Radio color="primary" />} label="FHMM" />
                    </RadioGroup>
                    {selectedModel === "convexopt" && (
                        <Box mt={4}>
                            <Typography variant="h6" gutterBottom>
                                Supplementary Models
                            </Typography>
                            <RadioGroup value={suppModel} onChange={handleSuppModelChange}>
                                <FormControlLabel value="None" control={<Radio color="primary" />} label="None" />
                                <FormControlLabel value="Supp. Model 1" control={<Radio color="primary" />} label="Supp. Model 1" />
                            </RadioGroup>
                        </Box>
                    )}
                </Box>
                <Box mt={4}>
                    <button
                        className={`px-4 py-2 rounded ${isChanged ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'}`}
                        disabled={!isChanged}
                        onClick={handleSave}
                    >
                        Save
                    </button>
                    {showSavedMsg && <span className="ml-4 text-green-500">Settings have been saved!</span>}
                </Box>
            </Box>
        </Layout>
    );
};

export default SettingsPage;
