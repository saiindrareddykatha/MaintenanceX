import { Menu, LogOut, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = ({ onMenuClick }) => {
    const { user, logout } = useAuth();

    if (!user) return null;

    return (
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 lg:px-8">
            <div className="flex items-center">
                <button
                    onClick={onMenuClick}
                    className="p-2 -ml-2 mr-2 text-gray-600 rounded-md lg:hidden hover:text-gray-900 focus:outline-none"
                >
                    <Menu className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-semibold text-gray-800 lg:hidden">PMS</h1>
            </div>

            <div className="flex items-center space-x-4">
                <div className="flex flex-col items-end mr-4">
                    <span className="text-sm font-medium text-gray-700">{user.username}</span>
                    <span className="text-xs text-gray-500">{user.role}</span>
                </div>
                <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
                    <Bell className="w-5 h-5" />
                </button>
                <button
                    onClick={logout}
                    className="flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Navbar;
