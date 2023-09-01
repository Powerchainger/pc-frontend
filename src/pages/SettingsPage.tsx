import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Box, FormControlLabel, Checkbox, Radio, RadioGroup, Slider, Switch, TextField, Typography, IconButton } from '@mui/material';
const SettingsPage = () => {
    const initialModel = localStorage.getItem("selectedModel") || "fhmm";
    const [selectedModel, setSelectedModel] = useState<string>(initialModel);

    const handleModelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newModel = event.target.value;
        setSelectedModel(newModel);
        localStorage.setItem("selectedModel", newModel);
    };

    return (
        <Layout>
            <Box m={3} className="bg-white shadow-lg rounded-lg p-8">
                <Box className="flex justify-between items-center mb-4">
                    <Typography variant="h5" gutterBottom className="text-gray-700">
                        Settings 🛠️
                    </Typography>
                </Box>

                <Box my={4} className="my-8 border-b border-gray-200 pb-4">
                    <Typography variant="h6" gutterBottom className="text-gray-700">
                        Model Type 🚀
                    </Typography>
                    <RadioGroup
                        value={selectedModel}
                        onChange={handleModelChange}
                        name="model-type"
                    >
                        <FormControlLabel value="convexopt" control={<Radio color="primary" />} label="ConvexOpt" />
                        <FormControlLabel value="fhmm" control={<Radio color="primary" />} label="FHMM" />
                    </RadioGroup>
                </Box>
                {/* ... */}
            </Box>
        </Layout>
    );
};

export default SettingsPage;
