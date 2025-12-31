using PredictiveMaintenanceScheduler.Api.Shared;

namespace PredictiveMaintenanceScheduler.Api.Models
{
    public class MaintenanceSchedule
    {
        public int ScheduleID { get; set; }
        public int MachineID { get; set; }
        public string MachineName { get; set; } = string.Empty; 
        public string MaintenanceType { get; set; } = "Routine"; // Type of maintenance
        public string TaskDescription { get; set; } = string.Empty; // Description of what to do
        public DateTime ScheduledDate { get; set; }
        public string Status { get; set; } = "Open";
        public string Priority { get; set; } = "Medium"; 
        public string TechnicianNotes { get; set; } = string.Empty; // Notes from tech
        public DateTime? CompletedDate { get; set; } // When it finished
    }
}
