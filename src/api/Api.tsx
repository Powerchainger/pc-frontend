import axios from "axios";

// Define the base URL for your API
//const API_BASE_URL = "http://demo.powerchainger.nl:8000"; // replace with your API's base URL
const API_BASE_URL = "http://127.0.0.1:8000";
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

