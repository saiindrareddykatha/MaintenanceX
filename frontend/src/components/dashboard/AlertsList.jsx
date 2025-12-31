import { AlertTriangle, AlertOctagon, Info } from 'lucide-react';

const AlertsList = ({ alerts }) => {
    const getIcon = (severity) => {
        switch (severity) {
            case 'Critical': return <AlertOctagon className="w-5 h-5 text-red-500" />;
            case 'High': return <AlertTriangle className="w-5 h-5 text-orange-500" />;
            default: return <Info className="w-5 h-5 text-blue-500" />;
        }
    };

    const getSeverityClass = (severity) => {
        switch (severity) {
            case 'Critical': return 'bg-red-50 border-red-100';
            case 'High': return 'bg-orange-50 border-orange-100';
            default: return 'bg-blue-50 border-blue-100';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-full">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Recent Alerts</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
            </div>
            <div className="p-4 space-y-3">
                {alerts.map((alert) => (
                    <div
                        key={alert.id}
                        className={`p-4 rounded-lg flex items-start space-x-4 border ${getSeverityClass(alert.severity)} transition-all hover:shadow-md cursor-pointer`}
                    >
                        <div className="mt-1">{getIcon(alert.severity)}</div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                                {alert.machineName}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                {alert.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                                {alert.timestamp}
                            </p>
                        </div>
                        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${alert.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                                alert.severity === 'High' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                            {alert.severity}
                        </span>
                    </div>
                ))}
                {alerts.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No active alerts
                    </div>
                )}
            </div>
        </div>
    );
};

export default AlertsList;
