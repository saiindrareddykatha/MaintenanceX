import { useState, useEffect } from 'react';
import AlertsList from '../../components/dashboard/AlertsList';
import { MOCK_DASHBOARD_DATA } from '../../api/mockData';
import Loader from '../../components/common/Loader';
import { Filter } from 'lucide-react';

const Notifications = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        setTimeout(() => {
            // Re-using alerts from dashboard data, but in real app would be a separate list
            setAlerts(MOCK_DASHBOARD_DATA.alerts);
            setLoading(false);
        }, 500);
    }, []);

    const filteredAlerts = filter === 'All' ? alerts : alerts.filter(a => a.severity === filter);

    if (loading) return <Loader />;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">System Notifications</h1>
                <div className="flex items-center space-x-2">
                    <Filter className="w-5 h-5 text-gray-500" />
                    <select
                        className="border border-gray-300 rounded-md shadow-sm px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="All">All Severities</option>
                        <option value="Critical">Critical</option>
                        <option value="High">High</option>
                        <option value="Warning">Warning</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow border border-gray-200">
                <AlertsList alerts={filteredAlerts} />
            </div>
        </div>
    );
};

export default Notifications;
