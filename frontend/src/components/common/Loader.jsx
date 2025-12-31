import { Loader2 } from 'lucide-react';

const Loader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        </div>
    );
};

export default Loader;
