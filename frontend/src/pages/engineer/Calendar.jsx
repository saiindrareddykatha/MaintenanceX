import MaintenanceCalendar from '../../components/calendar/MaintenanceCalendar';

const Calendar = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Schedule Maintenance</h1>
            <p className="text-gray-500">Select a free slot to schedule a pending task.</p>
            <MaintenanceCalendar />
        </div>
    );
};

export default Calendar;
