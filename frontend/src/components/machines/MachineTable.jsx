import { useNavigate } from 'react-router-dom';
import { Edit2, Trash2, Eye } from 'lucide-react';
import HealthIndicator from './HealthIndicator';

const MachineTable = ({ machines, onEdit, onDelete }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Machine ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Machine Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Health Score</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Install Date</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {machines.map((machine) => (
                        <tr key={machine.machineID} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {machine.machineID}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{machine.machineName}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {machine.type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {machine.location}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {/* Use correct backend property property: status (camelCase of Status) */}
                                <HealthIndicator status={machine.status} />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="w-full bg-gray-200 rounded-full h-2.5 max-w-[100px]">
                                    <div
                                        className={`h-2.5 rounded-full ${machine.healthScore >= 80 ? 'bg-green-600' : machine.healthScore >= 50 ? 'bg-yellow-500' : 'bg-red-600'
                                            }`}
                                        style={{ width: `${machine.healthScore}%` }}
                                    ></div>
                                </div>
                                <span className="text-xs mt-1 block">{Math.round(machine.healthScore)}%</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(machine.installDate).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex justify-end space-x-2">
                                    <button className="text-blue-600 hover:text-blue-900">
                                        <Eye className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => onEdit && onEdit(machine)} className="text-indigo-600 hover:text-indigo-900">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => onDelete && onDelete(machine.machineID)} className="text-red-600 hover:text-red-900">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MachineTable;
