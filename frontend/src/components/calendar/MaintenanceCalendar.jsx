import { useState } from 'react';
import { format, addDays, startOfToday, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const MaintenanceCalendar = () => {
    const today = startOfToday();
    const [selectedDate, setSelectedDate] = useState(today);
    const [scheduledSlots, setScheduledSlots] = useState([
        { date: addDays(today, 1), time: '10:00', task: 'Review Conveyor Belt' },
        { date: addDays(today, 2), time: '14:00', task: 'Oven Maintenance' },
    ]);

    const days = Array.from({ length: 7 }, (_, i) => addDays(today, i));
    const timeSlots = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];

    const getSlotStatus = (date, time) => {
        const scheduled = scheduledSlots.find(s => isSameDay(s.date, date) && s.time === time);
        return scheduled ? scheduled : null;
    };

    const handleSlotClick = (date, time) => {
        const status = getSlotStatus(date, time);
        if (status) {
            alert(`Slot occupied by: ${status.task}`);
        } else {
            const task = prompt('Schedule Maintenance Task:');
            if (task) {
                setScheduledSlots([...scheduledSlots, { date, time, task }]);
            }
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">Weekly Schedule</h2>
                <div className="flex space-x-2">
                    {/* Only showing next 7 days, so navigation might be limited or just scroll */}
                    <span className="text-sm text-gray-500">
                        {format(days[0], 'MMM d')} - {format(days[6], 'MMM d, yyyy')}
                    </span>
                </div>
            </div>

            <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                    {/* Header */}
                    <div className="grid grid-cols-8 border-b border-gray-200">
                        <div className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center border-r">Time</div>
                        {days.map(day => (
                            <div key={day.toString()} className="p-4 text-center border-r min-w-[100px]">
                                <div className="text-xs font-semibold text-gray-500 uppercase">{format(day, 'EEE')}</div>
                                <div className={`mt-1 text-sm font-bold ${isSameDay(day, today) ? 'text-blue-600' : 'text-gray-900'}`}>
                                    {format(day, 'd')}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Slots */}
                    {timeSlots.map(time => (
                        <div key={time} className="grid grid-cols-8 border-b border-gray-100 last:border-0">
                            <div className="p-3 text-sm text-gray-500 text-center border-r font-medium flex items-center justify-center bg-gray-50">
                                {time}
                            </div>
                            {days.map(day => {
                                const slot = getSlotStatus(day, time);
                                return (
                                    <div
                                        key={`${day}-${time}`}
                                        className={`p-1 border-r min-h-[60px] relative transition-colors 
                                    ${slot ? 'bg-blue-50 hover:bg-blue-100 cursor-pointer' : 'hover:bg-gray-50 cursor-pointer'}`}
                                        onClick={() => handleSlotClick(day, time)}
                                    >
                                        {slot ? (
                                            <div className="h-full w-full p-2 rounded bg-blue-100 border border-blue-200 text-xs text-blue-800 overflow-hidden">
                                                <div className="font-semibold truncate">{slot.task}</div>
                                            </div>
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center opacity-0 hover:opacity-100">
                                                <Plus className="w-4 h-4 text-gray-400" />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MaintenanceCalendar;
