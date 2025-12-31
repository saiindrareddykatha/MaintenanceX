using PredictiveMaintenanceScheduler.Api.DataStore;
using PredictiveMaintenanceScheduler.Api.Models;

namespace PredictiveMaintenanceScheduler.Api.Services
{
    public class MaintenanceService
    {
         public void ScheduleMaintenance(int machineId, string type, string priority, string notes)
        {
            var schedule = new MaintenanceSchedule
            {
                ScheduleID = MockDataStore.Schedules.Count + 1,
                MachineID = machineId,
                MachineName = MockDataStore.Machines.FirstOrDefault(m => m.MachineID == machineId)?.MachineName ?? "Unknown",
                MaintenanceType = type,
                TaskDescription = $"Manual Schedule: {type}",
                ScheduledDate = DateTime.UtcNow,
                Status = "Open",
                Priority = priority,
                TechnicianNotes = notes
            };
            MockDataStore.Schedules.Add(schedule);
        }

        public IEnumerable<MaintenanceSchedule> GetAll() => MockDataStore.Schedules;
         
         public void CompleteMaintenance(int id, string notes)
         {
             var task = MockDataStore.Schedules.FirstOrDefault(s => s.ScheduleID == id);
             if (task != null)
             {
                 task.Status = "Completed";
                 task.CompletedDate = DateTime.UtcNow;
                 task.TechnicianNotes += $" | Completed: {notes}";
             }
         }
    }
}
