import axios from "axios";

// Define the base URL for your API
//const API_BASE_URL = "http://demo.powerchainger.nl:8000"; // replace with your API's base URL
const API_BASE_URL = "http://127.0.0.1:8000";

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer: eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MDU2MDMzNDAsImV4cCI6MTcwNTYzOTM0MCwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiamFuZGVtYW4ifQ.iDgZrQb69DuAH95OxnmPRYSW0-tFTodAAODjFuVcR_KGT3icaeuFvgdwUinCJ_MftQfeGwwW3gJ2eY3W1bOZdZQ0pt5KxhbIdZF7vUPSVKVi4k41VHPemV4V4NxRc3A8P6XLZdG57PzRUN5eriQcg2nmRgtGppU2jp0nmhxoIL77tIFZlHqWvpv99f2sfGwYDRCtxtNTGhwpygGFdqx4ct7LWf1oKKZy2pyjISba3R2hNHcZ_HJ7HO_Vy19Hdb7LDkCR9aDn33Co_wvQDax4LmmHTnc4-duMfM9z71efqrX1rnFExVty2lZgB71KzSYou9QuVB6CRxeYScM2aVZYBw`
}

// Define interfaces for your data
interface MeasurementTest {
    measurement: number;
}

interface UserData {
    username:string;
    password:string;
}

interface PostMeasurementsData {
    owner: string;
    measurements: {
        active_power: number;
    }[];
}

// Define functions for each of your API endpoints
export const getApi = () => {
    return axios.get(`${API_BASE_URL}/api`);
}

export const postMeasurementTest = (data: MeasurementTest) => {
    return axios.post(`${API_BASE_URL}/measurement-test`, data);
}

export const postMeasurements = (data: PostMeasurementsData) => {
    return axios.post(`${API_BASE_URL}/post-measurements`, data);
}

export const register = (username:string, password:string) => {
    return axios.post(`${API_BASE_URL}/api/register`, {username:username, password:password})
}

export const changePassword = (oldPassword:string, newPassword:string) => {
    return axios.post(`${API_BASE_URL}/api/change-password`, {oldPassword:oldPassword, newPassword:newPassword}, {headers: headers})
}

export const login = (username:string, password:string) => {
    return axios.post(`${API_BASE_URL}/api/login`, {username:username, password:password})
}

export const getMeasurements24h = (username: string) => {
    return axios.get(`${API_BASE_URL}/api/measurements?owner=${username}`);
}

export const getPredict = () => {
    return axios.get(`${API_BASE_URL}/api/predict`);
}

export const getPredictions5m = () => {
    const modelType = localStorage.getItem("selectedModel") || "fhmm";
    const model_id = modelType === "fhmm" ? "test" : "optModel_levi";
    const dataset = modelType === "fhmm" ? "levi" : "levi";
    const encodedModelId = encodeURIComponent(model_id);
    return axios.get(`${API_BASE_URL}/api/predictions?dataset=${dataset}&model_id=${encodedModelId}&model_type=${modelType}`);
}

