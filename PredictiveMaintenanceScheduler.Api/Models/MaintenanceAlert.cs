using PredictiveMaintenanceScheduler.Api.Shared;

namespace PredictiveMaintenanceScheduler.Api.Models
{
    public class MaintenanceAlert
    {
        public int AlertID { get; set; }
        public int MachineID { get; set; }
        public string Severity { get; set; } = "Warning"; // Warning or Critical
        public string Message { get; set; } = string.Empty; // "Issue: Overheating, Reason: >70C"
        public DateTime Timestamp { get; set; }
        public bool IsAcknowledged { get; set; }
    }
}
