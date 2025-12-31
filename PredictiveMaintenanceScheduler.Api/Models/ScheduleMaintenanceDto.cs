namespace PredictiveMaintenanceScheduler.Api.Models
{
    public class ScheduleMaintenanceDto
    {
        public int MachineId { get; set; }
        public string MaintenanceType { get; set; } = string.Empty;
        public string Priority { get; set; } = string.Empty;
        public string Notes { get; set; } = string.Empty;
    }
}
