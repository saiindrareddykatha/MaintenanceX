import { Laptop, ClipboardList, PenTool, LayoutDashboard, History, Menu, LogOut, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../utils/constants';

const Sidebar = ({ isOpen, onClose }) => {
    const { user } = useAuth();

    if (!user) return null;

    const adminLinks = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Machines', path: '/admin/machines', icon: Laptop },
        { name: 'Notifications', path: '/admin/notifications', icon: ClipboardList },
        { name: 'Maintenance', path: '/admin/maintenance', icon: PenTool },
        { name: 'History', path: '/admin/history', icon: History },
    ];

    const engineerLinks = [
        { name: 'Dashboard', path: '/engineer/dashboard', icon: LayoutDashboard },
        { name: 'Tasks', path: '/engineer/tasks', icon: ClipboardList },
        { name: 'Calendar', path: '/engineer/calendar', icon: Laptop }, // Using Laptop as generic icon for now
        { name: 'History', path: '/engineer/history', icon: History },
    ];

    const links = user.role === ROLES.ADMIN ? adminLinks : engineerLinks;

    return (
        <>
            {/* Mobile overlay */}
            <div
                className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-40 lg:hidden ${isOpen ? 'block' : 'hidden'}`}
                onClick={onClose}
            />

            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between h-16 px-6 bg-blue-600 text-white">
                    <span className="text-xl font-bold">PMS</span>
                    <button className="lg:hidden" onClick={onClose}>
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <nav className="mt-6 px-4 space-y-2">
                    {links.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3 text-gray-700 rounded-lg transition-colors duration-200 ${isActive ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'
                                }`
                            }
                            onClick={() => {
                                if (window.innerWidth < 1024) onClose();
                            }}
                        >
                            <link.icon className="w-5 h-5 mr-3" />
                            <span className="font-medium">{link.name}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>
        </>
    );
};

export default Sidebar;
