import api from './axios';

export const getMachines = async () => {
    return await api.get('/machines');
};

export const getMachineDetails = async (id) => {
    return await api.get(`/machines/${id}`);
};

export const createMachine = async (data) => {
    return await api.post('/machines', data);
};
