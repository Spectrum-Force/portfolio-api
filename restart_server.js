import axios from "axios";

const healthCheckUrl = 'http://localhost:5050/api/v1/health'; // Replace with your actual health endpoint URL

export const restartServer = async () => {
    try {
        const response = await axios.get(healthCheckUrl);
        console.log('Health Check Status:', response.data.status);
    } catch (error) {
        console.error('Health Check Failed:', error.message);
    }
};