using PredictiveMaintenanceScheduler.Api.Shared;

namespace PredictiveMaintenanceScheduler.Api.Models
{
    public class Machine
    {
        public int MachineID { get; set; }
        public string MachineName { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty; // stored as string "Robotic Spray Arm" etc
        public string Location { get; set; } = string.Empty;
        public DateTime InstallDate { get; set; }
        public DateTime LastMaintenanceDate { get; set; }
        public double HealthScore { get; set; } // 0-100
        public string Status { get; set; } = "Safe"; // Safe, Warning, Critical
    }
}
