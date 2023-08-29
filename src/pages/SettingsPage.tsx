import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Box, FormControlLabel, Checkbox, Radio, RadioGroup, Slider, Switch, TextField, Typography } from '@mui/material';

const SettingsPage = () => {
    const [selectedModel, setSelectedModel] = useState<string>("fhmm");

    const handleModelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedModel(event.target.value);
        localStorage.setItem("selectedModel", event.target.value); // Save to local storage
    };

    return (
        <Layout>
            <Box m={3} className="bg-white shadow-lg rounded-lg p-8">
                <Box my={4} className="my-8 border-b border-gray-200 pb-4">
                    <Typography variant="h6" gutterBottom className="text-gray-700">Model Type</Typography>
                    <RadioGroup
                        value={selectedModel}
                        onChange={handleModelChange}
                        name="model-type"
                    >
                        <FormControlLabel value="convexopt" control={<Radio />} label="ConvexOpt" />
                        <FormControlLabel value="fhmm" control={<Radio />} label="FHMM" />
                    </RadioGroup>
                </Box>
                {/* ... */}
            </Box>
        </Layout>
    );
};


export default SettingsPage;
