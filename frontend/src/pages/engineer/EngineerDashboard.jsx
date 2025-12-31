import { useState, useEffect } from 'react';
import StatsCard from '../../components/dashboard/StatsCard';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { ClipboardList, AlertCircle, Calendar } from 'lucide-react';
import { MOCK_DASHBOARD_DATA } from '../../api/mockData';
import Loader from '../../components/common/Loader';

const EngineerDashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setData(MOCK_DASHBOARD_DATA.engineerStats);
            setLoading(false);
        }, 800);
    }, []);

    if (loading) return <Loader />;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Engineer Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                    title="Assigned Tasks"
                    value={data.assignedTasks}
                    icon={ClipboardList}
                    color="blue"
                />
                <StatsCard
                    title="Priority Tasks"
                    value={data.priorityTasks}
                    icon={AlertCircle}
                    color="red"
                />
                <StatsCard
                    title="Tasks for Today"
                    value={data.todayTasks}
                    icon={Calendar}
                    color="green"
                />
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-[400px]">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Maintenance Completed</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.weeklyPerformance}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="day" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={50} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default EngineerDashboard;
