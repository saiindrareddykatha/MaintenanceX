const HealthIndicator = ({ status }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'Healthy':
                return 'bg-green-100 text-green-800';
            case 'Warning':
                return 'bg-yellow-100 text-yellow-800';
            case 'Critical':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(status)}`}>
            {status}
        </span>
    );
};

export default HealthIndicator;
