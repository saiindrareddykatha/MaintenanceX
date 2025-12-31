import api from './axios';

export const getMaintenanceLogs = async () => {
    // Return all logs (Active + History)
    const active = await api.get('/maintenance/schedules');
    const history = await api.get('/maintenance/history');
    return {
        active: active.data.data,
        history: history.data.data
    };
};

export const scheduleMaintenance = async (task) => {
    const payload = {
        machineId: task.machineId,
        maintenanceType: task.type,
        priority: task.priority || 'Medium',
        notes: task.description
    };
    return await api.post('/maintenance/schedule', payload);
};
