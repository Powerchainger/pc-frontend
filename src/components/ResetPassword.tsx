import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import {changePassword} from "../api/Api";

export default function ResetPassword() {
        const [passwordMatch, setPasswordMatch] = React.useState(true);
        const [showPassword, setShowPassword] = useState(false);
        const [validCredentials, setValidCredentials] = useState(true)
        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            let oldPassword = data.get("oldPassword");
            let newPassword = data.get('newPassword');
            let newPassword2 = data.get('newPassword2');

            console.log(oldPassword);
            if (newPassword !== newPassword2) {
                setPasswordMatch(false);
                setValidCredentials(true);
            } else {
                setPasswordMatch(true);
                try {
                    changePassword(oldPassword! as string, newPassword as string).then((response) => {

                        if (response.status === 202) {
                            setValidCredentials(true)
                        } else {
                            setValidCredentials(false);
                        }
                    }).catch((error) => {
                        console.error("Error changing password:", error);
                        setValidCredentials(false);
                    });
                } catch (e) {
                    console.error("Error calling changePassword:", e);
                }
            }
        }

        const handleCheckboxChange = () => {
                setShowPassword(!showPassword);
                setTimeout(() => {
                    setShowPassword(false)
                }, 2000)

            }

       return <Box m={3} className="bg-white shadow-lg rounded-lg p-8" width="30%">
                              <Box className="flex justify-between items-center mb-4">
                                  <Typography variant="h5" gutterBottom className="text-gray-700">
                                      Reset Password
                                  </Typography>
                              </Box>
                              { !passwordMatch ? <Typography component="h1" color="red">
                                                                  Passwords don't match
                                                                </Typography>:null}
                            { !validCredentials ? <Typography component="h1" color="red">
                                 password incorrect
                                </Typography>:null}
                              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                              <TextField
                                  margin="normal"
                                  required
                                  fullWidth
                                  name="oldPassword"
                                  label="Old password"
                                  type={showPassword ? 'text' : 'password'}
                                  id="oldPassword"
                                  autoComplete="current-password" />

                              <TextField
                                  margin="normal"
                                  required
                                  fullWidth
                                  name="newPassword"
                                  label="New password"
                                  type={showPassword ? 'text' : 'password'}
                                  id="password"
                              autoComplete="current-password" />
                              <TextField
                                  margin="normal"
                                  required
                                  fullWidth
                                  name="newPassword2"
                                  label=" Repeat new password"
                                  type={showPassword ? 'text' : 'password'}
                                  id="password"
                                  autoComplete="current-password" />
                                  <input
                                  type="checkbox"
                                  checked={showPassword}
                                  onChange={handleCheckboxChange}
                              /> show passwords
                              <Button
                                  type="submit"
                                  fullWidth
                                  variant="contained"
                                  sx={{ mt: 3, mb: 2 }}> change password
                              </Button>
                          </Box>
                          </Box>

}