import React from 'react';
import Layout from '../components/Layout';
import { Box, FormControlLabel, Checkbox, Radio, RadioGroup, Slider, Switch, TextField, Typography } from '@mui/material';

const SettingsPage = () => {

    return (
        <Layout>
            <Box m={3} className="bg-white shadow-lg rounded-lg p-8">
                <div className="text-left">
                    <Typography variant="h4" gutterBottom className="text-blue-600 mb-4">Settings</Typography>

                    <Box my={4} className="my-8 border-b border-gray-200 pb-4">
                        <Typography variant="h6" gutterBottom className="text-gray-700">Setting 1</Typography>
                        <RadioGroup defaultValue="option1" name="radio-buttons-group">
                            <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
                            <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
                            <FormControlLabel value="option3" control={<Radio />} label="Option 3" />
                        </RadioGroup>
                    </Box>

                    <Box my={4} className="my-8 border-b border-gray-200 pb-4">
                        <Typography variant="h6" gutterBottom className="text-gray-700">Setting 2</Typography>
                        <Slider
                            defaultValue={30}
                            getAriaValueText={value => `${value}%`}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={10}
                            marks
                            min={10}
                            max={110}
                        />
                    </Box>

                    <Box my={4} className="my-8 border-b border-gray-200 pb-4">
                        <Typography variant="h6" gutterBottom className="text-gray-700">Setting 3</Typography>
                        <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="Check me out"
                        />
                    </Box>

                    <Box my={4} className="my-8 border-b border-gray-200 pb-4">
                        <Typography variant="h6" gutterBottom className="text-gray-700">Setting 4</Typography>
                        <FormControlLabel
                            control={<Switch defaultChecked />}
                            label="Toggle switch"
                        />
                    </Box>

                    <Box my={4} className="my-8">
                        <Typography variant="h6" gutterBottom className="text-gray-700">Setting 5</Typography>
                        <TextField id="standard-basic" label="Input field" defaultValue="Placeholder" />
                    </Box>
                </div>
            </Box>
        </Layout>
    );
};

export default SettingsPage;
