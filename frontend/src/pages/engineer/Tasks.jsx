import { useState, useEffect } from 'react';
import { MOCK_DASHBOARD_DATA } from '../../api/mockData';
import Loader from '../../components/common/Loader';
import { Calendar, PlayCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            // Filter tasks assigned to 'Engineer Doe' (mock user)
            const myTasks = MOCK_DASHBOARD_DATA.maintenanceLogs.filter(
                t => t.assignedTo === 'Engineer Doe' && t.status !== 'Completed'
            );
            setTasks(myTasks);
            setLoading(false);
        }, 600);
    }, []);

    if (loading) return <Loader />;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">My Tasks</h1>

            <div className="grid grid-cols-1 gap-4">
                {tasks.map((task) => (
                    <div key={task.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                            <div className="flex items-center space-x-2 mb-2">
                                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full 
                                    ${task.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                                        task.priority === 'High' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'}`}>
                                    {task.priority}
                                </span>
                                <span className="text-sm text-gray-500">#{task.id}</span>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">{task.machineName}</h3>
                            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                            <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                                <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {task.date}</span>
                                <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> Estimated 2h</span>
                            </div>
                        </div>

                        <div className="mt-4 md:mt-0 flex space-x-3">
                            <button
                                onClick={() => navigate('/engineer/calendar')}
                                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                            >
                                <Calendar className="w-4 h-4 mr-2" />
                                Schedule
                            </button>
                            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                <PlayCircle className="w-4 h-4 mr-2" />
                                Start Task
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tasks;
