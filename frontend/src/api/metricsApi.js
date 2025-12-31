import api from './axios';

export const getLatestMetrics = async (machineId) => {
    const response = await api.get(`/metrics/latest/${machineId}`);
    return response.data;
};

export const getMetricsHistory = async (machineId) => {
    const response = await api.get(`/metrics/history/${machineId}`);
    return response.data;
};
