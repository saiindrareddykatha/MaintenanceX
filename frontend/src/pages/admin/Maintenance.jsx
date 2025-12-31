import { useState, useEffect } from 'react';
import Loader from '../../components/common/Loader';
import { Calendar, User, Clock, Plus, X } from 'lucide-react';
import { getMachines } from '../../api/machineApi';
import { scheduleMaintenance, getMaintenanceLogs } from '../../api/maintenanceApi'; // Assuming exists, need to ensure GetAll exists in backend or fetch per machine

const Maintenance = () => {
    const [tasks, setTasks] = useState([]); // In a real app with no "GetAllMaintenance", we might need to fetch per machine or add endpoint.
    // For Mock Backend, let's just assume we can fetch logs for *all* machines or iterates.
    // But wait, the Mock Backend "InMemoryMaintenanceRepository" only had "GetLogsByMachineId".
    // I should probably add "GetAllLogs" to backend repo or endpoint for this Admin View.
    // LIMITATION: Use existing. Checking "MaintenanceService.cs" -> GetMaintenanceHistory(machineId).
    // WORKAROUND: Fetch all machines, then fetch all logs, combine.

    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [machines, setMachines] = useState([]);

    const [newTask, setNewTask] = useState({
        machineId: '', // string initially, becomes int on select
        type: 'Routine',
        description: '',
        priority: 'Medium'
    });

    const fetchData = async () => {
        try {
            const mRes = await getMachines();
            setMachines(mRes.data);

            // Fetch logs using the API wrapper
            const { active, history } = await getMaintenanceLogs();

            let allLogs = [...active, ...history];



            // Filter inactive if needed, or show all. User asks for "In Maintenance".
            // Sort by Date Desc
            allLogs.sort((a, b) => new Date(b.scheduledDate) - new Date(a.scheduledDate));

            setTasks(allLogs);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSchedule = async (e) => {
        e.preventDefault();
        try {
            await scheduleMaintenance({
                machineId: newTask.machineId,
                type: newTask.type,
                priority: newTask.priority,
                description: newTask.description
            });
            setIsModalOpen(false);
            fetchData();
        } catch (err) {
            alert('Failed to schedule');
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Maintenance Planning</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center">
                    <Plus className="w-4 h-4 mr-2" /> Schedule Maintenance
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.map((task) => (
                    <div key={task.logID} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 relative">
                        <div className={`absolute top-4 right-4 px-2 py-1 text-xs font-semibold rounded-full 
              ${task.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                                task.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                                    task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                            {task.priority || 'Medium'}
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{task.machineName}</h3>
                        <p className="text-sm text-gray-500 mb-4">{task.maintenanceType}</p>
                        <p className="text-xs text-gray-400 mb-2 italic">{task.technicianNotes}</p>

                        <div className="space-y-3 text-sm text-gray-600">
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                <span>{new Date(task.scheduledDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2" />
                                <span>{task.status}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Schedule Maintenance</h2>
                            <button onClick={() => setIsModalOpen(false)}><X className="w-6 h-6" /></button>
                        </div>
                        <form onSubmit={handleSchedule} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Machine</label>
                                <select className="w-full border p-2 rounded" required
                                    value={newTask.machineId}
                                    onChange={e => setNewTask({ ...newTask, machineId: parseInt(e.target.value) })}
                                >
                                    <option value="">Select Machine</option>
                                    {machines.map(m => (
                                        <option key={m.machineID} value={m.machineID}>{m.machineName}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Type</label>
                                <select className="w-full border p-2 rounded"
                                    value={newTask.type}
                                    onChange={e => setNewTask({ ...newTask, type: e.target.value })}
                                >
                                    <option>Routine</option>
                                    <option>Repair</option>
                                    <option>Inspection</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Priority</label>
                                <select className="w-full border p-2 rounded"
                                    value={newTask.priority}
                                    onChange={e => setNewTask({ ...newTask, priority: e.target.value })}
                                >
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                    <option>Critical</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Description</label>
                                <textarea className="w-full border p-2 rounded" rows="3"
                                    value={newTask.description}
                                    onChange={e => setNewTask({ ...newTask, description: e.target.value })}
                                ></textarea>
                            </div>
                            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Schedule</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Maintenance;
