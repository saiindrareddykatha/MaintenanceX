import api from './axios';

// Polling interval helper could go here, but usually components handle it.

export const getDashboardStats = async () => {
    // Determine healthy vs critical by fetching all machines + health
    // or let backend aggregate.
    // Since backend "HealthController" doesn't have a "Summary" endpoint shown in my file view,
    // I can fetch /machines and then /health/{id} for each, OR 
    // assumption: The "machineList" endpoint might be enhanced to return healthStatus.
    // If not, we have to do multiple requests.
    // Best Approach for React: Fetch MACHINES, then Promise.all/health.
    // OR create a new endpoint in Backend?
    // User restrictions: "change the programming". I can add an endpoint!
    // But typically simply fetching existing endpoints is safer.

    // Let's assume we can fetch all machines, then fetch updated health for them.
    // Better yet, update "HealthController" to have "GetAllMachineHealth".
    // I'll stick to frontend logic for now:
    try {
        const machines = await api.get('/machines');
        // machines is array of { machineID, machineName, type, ... }

        // Fetch health for each
        const healthPromises = machines.data.map(m => api.get(`/health/${m.machineID}`));
        const healthResponses = await Promise.all(healthPromises);

        // Combine
        const combined = machines.data.map((m, index) => ({
            ...m,
            health: healthResponses[index].data // { status: "Healthy", metrics: {...} }
        }));

        return combined;
    } catch (err) {
        console.error("Dashboard fetch error", err);
        return [];
    }
};
