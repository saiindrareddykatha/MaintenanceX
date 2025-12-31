export const MOCK_DASHBOARD_DATA = {
    stats: {
        totalMachines: 45,
        healthyMachines: 38,
        criticalMachines: 2,
        underMaintenance: 5,
        activeAlerts: 3
    },
    machinesByType: [
        { name: 'Robotic Arm', count: 12 },
        { name: 'Conveyor', count: 8 },
        { name: 'Oven', count: 5 },
        { name: 'Pump', count: 10 },
        { name: 'Ventilation', count: 10 },
    ],
    healthTrend: [
        { date: 'Mon', score: 92 },
        { date: 'Tue', score: 94 },
        { date: 'Wed', score: 89 },
        { date: 'Thu', score: 91 },
        { date: 'Fri', score: 95 },
        { date: 'Sat', score: 96 },
        { date: 'Sun', score: 94 },
    ],
    machineStatus: [
        { name: 'Healthy', value: 38 },
        { name: 'Critical', value: 2 },
        { name: 'Warning', value: 5 }, // Using Warning for 'Under Maintenance' roughly for chart
    ],
    alerts: [
        { id: 1, machineName: 'Robot Arm Alpha', message: 'Vibration anomaly detected', severity: 'Critical', timestamp: '10 min ago' },
        { id: 2, machineName: 'Main Conveyor', message: 'Motor temperature high', severity: 'High', timestamp: '1 hour ago' },
        { id: 3, machineName: 'Paint Pump 2', message: 'Flow rate deviation', severity: 'Warning', timestamp: '2 hours ago' },
    ],
    upcomingMaintenance: [
        { id: 101, machine: 'Oven Zone 1', type: 'Routine', date: 'Tommorow, 10:00 AM' },
        { id: 102, machine: 'Vent Fan B', type: 'Inspection', date: 'Dec 30, 2:00 PM' },
    ],
    machines: Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        name: `Machine - ${String.fromCharCode(65 + (i % 5))}${i + 1}`,
        type: ['Robotic Spray Arm', 'Conveyor Belt', 'Paint Curing Oven', 'Paint Circulation Pump', 'Ventilation Motor'][i % 5],
        status: i % 10 === 0 ? 'Critical' : i % 5 === 0 ? 'Warning' : 'Healthy',
        healthScore: i % 10 === 0 ? 45 : i % 5 === 0 ? 75 : 95 + Math.floor(Math.random() * 5),
        lastMaintenance: '2023-12-15',
        nextMaintenance: '2024-01-15'
    })),
    maintenanceLogs: Array.from({ length: 30 }, (_, i) => ({
        id: 1000 + i,
        machineName: `Machine - ${String.fromCharCode(65 + (i % 5))}${i + 1}`,
        type: ['Routine', 'Repair', 'Inspection', 'Emergency'][i % 4],
        status: ['Completed', 'In Progress', 'Scheduled'][i % 3],
        priority: ['Low', 'Medium', 'High', 'Critical'][i % 4],
        assignedTo: 'Engineer Doe',
        date: '2023-12-25',
        description: 'Routine checkup and maintenance'
    })),
    engineerStats: {
        assignedTasks: 12,
        priorityTasks: 4,
        todayTasks: 2,
        weeklyPerformance: [
            { day: 'Mon', count: 3 },
            { day: 'Tue', count: 5 },
            { day: 'Wed', count: 2 },
            { day: 'Thu', count: 4 },
            { day: 'Fri', count: 6 },
            { day: 'Sat', count: 1 },
            { day: 'Sun', count: 0 },
        ]
    }
};
