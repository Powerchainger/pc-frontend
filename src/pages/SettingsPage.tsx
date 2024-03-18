import React, {useEffect, useState} from 'react';
import Layout from '../components/Layout';
import { Box, FormControlLabel,  Radio, RadioGroup,Typography} from '@mui/material';

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
        localStorage.setItem("submodel", suppModel);
        setIsChanged(false);
        setShowSavedMsg(true);
        setTimeout(() => setShowSavedMsg(false), 3000);
    };

    return (
        <Layout>
            <Box m={3} className="bg-white shadow-lg rounded-lg p-8">
                <Box className="flex justify-between items-center mb-4">
                    <Typography variant="h5" gutterBottom className="text-gray-700">
                        Model settings 🛠️
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom className="text-gray-700">
                        <b>Current model:</b> {localStorage.getItem('selectedModel')}
                        <br></br>
                        <b>Current sub model:</b> {localStorage.getItem('submodel')}
                    </Typography>
                </Box>
                <Box my={4} className="flex">
                    <Box className="flex flex-col w-1/2">
                        <Typography variant="h6" gutterBottom>
                            Model Type 🚀
                        </Typography>
                        <RadioGroup value={selectedModel} onChange={handleModelChange}>
                            <FormControlLabel value="convexopt" control={<Radio color="primary" />} label="ConvexOpt" />
                            {selectedModel === "convexopt" && <span className="max-w-full">The Convex Optimization model is a model that infers which appliances are working based on:
                                <ul>
                                    <li>  o  the total consumption</li>
                                    <li>  o  the time of the day</li>
                                    <li>  o  the switching frequency of those appliances</li>
                                </ul></span>}
                        </RadioGroup>
                    </Box>
                    <Box mt={4} className="ml-8 flex-1 min-h-[100px]">
                        {selectedModel === "convexopt" && (
                            <>
                                <Typography variant="h6" gutterBottom>
                                    Supplementary Models
                                </Typography>
                                <RadioGroup value={suppModel} onChange={handleSuppModelChange}>
                                    <FormControlLabel value="None" control={<Radio color="primary" />} label="None" />
                                    <FormControlLabel value="fridge" control={<Radio color="primary" />} label="DL model fridge" />
                                    <FormControlLabel value="computer" control={<Radio color="primary" />} label="DL model computer" />
                                </RadioGroup>
                            </>
                        )}
                    </Box>
                </Box>
                <Box mt={4}>
                    <button
                        className={`px-4 py-2 rounded bg-blue-500 text-white`}
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
