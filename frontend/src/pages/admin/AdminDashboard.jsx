import { useState, useEffect } from 'react';
import StatsCard from '../../components/dashboard/StatsCard';
import { MachinesByTypeChart, MachineStatusChart, HealthTrendChart } from '../../components/dashboard/Charts';
import AlertsList from '../../components/dashboard/AlertsList';
import { Box, CheckCircle, AlertOctagon, Wrench } from 'lucide-react';
import Loader from '../../components/common/Loader';
import { getMachines } from '../../api/machineApi';

const AdminDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [machineList, setMachineList] = useState([]); // Store full list for dropdown
    const [selectedMachineId, setSelectedMachineId] = useState('');
    const [stats, setStats] = useState({
        totalMachines: 0,
        healthyMachines: 0,
        criticalMachines: 0,
        underMaintenance: 0
    });
    const [machinesByType, setMachinesByType] = useState([]);
    const [machineStatus, setMachineStatus] = useState([]);
    const [latestAlerts, setLatestAlerts] = useState([]);

    // Live Health Trend Data
    const [healthHistory, setHealthHistory] = useState([]);

    const fetchData = async () => {
        try {
            const res = await getMachines();
            // Backend returns ApiResponse: { success: true, data: [...] }
            const data = res.data && res.data.data ? res.data.data : [];
            setMachineList(data);

            // Default selection if none
            if (!selectedMachineId && data.length > 0) {
                setSelectedMachineId(data[0].machineID);
            }

            // Process Global Stats
            const total = data.length;
            const healthy = data.filter(m => m.status === 'Safe').length; // Backend uses 'Safe', 'Warning', 'Critical'
            const critical = data.filter(m => m.status === 'Critical').length;
            const warning = data.filter(m => m.status === 'Warning').length;

            setStats({
                totalMachines: total,
                healthyMachines: healthy,
                criticalMachines: critical,
                underMaintenance: warning
            });

            // Type Distribution
            const typeCount = {};
            data.forEach(m => {
                const type = m.type || 'Unknown';
                typeCount[type] = (typeCount[type] || 0) + 1;
            });
            setMachinesByType(Object.keys(typeCount).map(k => ({ name: k, count: typeCount[k] })));

            // Status Distribution
            setMachineStatus([
                { name: 'Healthy', value: healthy },
                { name: 'Critical', value: critical },
                { name: 'Warning', value: warning }
            ]);

            // Alerts
            const alerts = data.filter(m => m.status === 'Critical').map(m => ({
                id: m.machineID,
                machine: m.machineName,
                status: 'Critical',
                message: `Health Score dropped to ${Math.round(m.healthScore)}%`,
                time: new Date().toLocaleTimeString()
            }));
            setLatestAlerts(alerts);

            // Update Live Health Graph for Selected Machine
            if (selectedMachineId || (data.length > 0)) {
                const targetId = selectedMachineId || data[0].machineID;
                const targetMachine = data.find(m => m.machineID == targetId);
                if (targetMachine) {
                    setHealthHistory(prev => {
                        const newPoint = {
                            date: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                            score: Math.round(targetMachine.healthScore)
                        };
                        // Keep last 10 points
                        const newHistory = [...prev, newPoint];
                        return newHistory.slice(-10);
                    });
                }
            }

            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 5000); // 5s polling
        return () => clearInterval(interval);
    }, [selectedMachineId]); // Re-fetch/update logic if selection changes (mostly to keep history context clear if we wanted to reset, but here we just continue or reset)

    // Reset history when switching machines to avoid confusing lines
    useEffect(() => {
        setHealthHistory([]);
    }, [selectedMachineId]);

    if (loading && !stats.totalMachines) return <Loader />;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Live Dashboard</h1>
                <div className="flex items-center space-x-4">
                    <div className="text-sm text-green-600 animate-pulse">● Live (5s)</div>
                    {/* Machine Selector */}
                    <select
                        className="p-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={selectedMachineId}
                        onChange={(e) => setSelectedMachineId(Number(e.target.value))}
                    >
                        {machineList.map(m => (
                            <option key={m.machineID} value={m.machineID}>{m.machineName}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard title="Total Machines" value={stats.totalMachines} icon={Box} color="blue" />
                <StatsCard title="Healthy Machines" value={stats.healthyMachines} icon={CheckCircle} color="green" />
                <StatsCard title="Critical Status" value={stats.criticalMachines} icon={AlertOctagon} color="red" />
                <StatsCard title="Warnings" value={stats.underMaintenance} icon={Wrench} color="yellow" />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Live Health Trend - Takes 2 cols now */}
                <div className="lg:col-span-2">
                    <HealthTrendChart data={healthHistory} />
                </div>
                <div className="lg:col-span-1">
                    <MachineStatusChart data={machineStatus} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <MachinesByTypeChart data={machinesByType} />
                </div>
                {/* Alerts */}
                <div className="lg:col-span-1">
                    <AlertsList alerts={latestAlerts} />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
