import { useState, useEffect } from 'react';
import MachineTable from '../../components/machines/MachineTable';
import { getMachines, createMachine } from '../../api/machineApi';
import Loader from '../../components/common/Loader';
import { Plus, Search, Filter, X } from 'lucide-react';

const Machines = () => {
    const [machines, setMachines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('All');
    const [isIdModalOpen, setIsModalOpen] = useState(false);

    // Form State
    const [newMachine, setNewMachine] = useState({
        machineName: '',
        type: 'Robotic Spray Arm',
        location: '',
        installDate: new Date().toISOString().split('T')[0]
    });

    const fetchData = async () => {
        try {
            const res = await getMachines();
            setMachines(res.data && res.data.data ? res.data.data : []);
            setLoading(false);
        } catch (err) {
            console.error("Failed to load machines", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await createMachine(newMachine);
            setIsModalOpen(false);
            fetchData(); // Refresh list
            // Reset form
            setNewMachine({
                machineName: '',
                type: 'Robotic Spray Arm',
                location: '',
                installDate: new Date().toISOString().split('T')[0]
            });
        } catch (err) {
            alert('Failed to create machine');
        }
    };

    const filteredMachines = machines.filter(machine => {
        const matchesSearch = machine.machineName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === 'All' || machine.type === typeFilter;
        return matchesSearch && matchesType;
    });

    if (loading) return <Loader />;

    return (
        <div className="space-y-6 relative">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <h1 className="text-2xl font-bold text-gray-800">Machine Management</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="w-5 h-5 mr-2" />
                    Add Machine
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search machines..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                >
                    <option value="All">All Types</option>
                    <option value="Robotic Spray Arm">Robotic Spray Arm</option>
                    <option value="Conveyor Belt">Conveyor Belt</option>
                    <option value="Paint Curing Oven">Paint Curing Oven</option>
                    <option value="Ventilation Motor">Ventilation Motor</option>
                    <option value="Paint Circulation Pump">Paint Circulation Pump</option>
                </select>
            </div>

            <MachineTable machines={filteredMachines} />

            {/* Modal */}
            {isIdModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Add New Machine</h2>
                            <button onClick={() => setIsModalOpen(false)}><X className="w-6 h-6" /></button>
                        </div>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Name</label>
                                <input type="text" className="w-full border p-2 rounded" required
                                    value={newMachine.machineName}
                                    onChange={e => setNewMachine({ ...newMachine, machineName: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Type</label>
                                <select className="w-full border p-2 rounded"
                                    value={newMachine.type}
                                    onChange={e => setNewMachine({ ...newMachine, type: e.target.value })}
                                >
                                    <option>Robotic Spray Arm</option>
                                    <option>Conveyor Belt</option>
                                    <option>Paint Curing Oven</option>
                                    <option>Ventilation Motor</option>
                                    <option>Paint Circulation Pump</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Location</label>
                                <input type="text" className="w-full border p-2 rounded" required
                                    value={newMachine.location}
                                    onChange={e => setNewMachine({ ...newMachine, location: e.target.value })}
                                />
                            </div>
                            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Create</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Machines;
