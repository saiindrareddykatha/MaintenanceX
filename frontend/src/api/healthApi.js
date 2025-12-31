import api from './axios';

export const getHealthStats = async (machineId) => {
    // Backend returns single machine health
    // To support dashboard list, we might need to iterate or add bulk endpoint.
    // user prompt: GET /api/health/{machineId}
    const response = await api.get(`/health/${machineId}`);
    return response.data;
};
