using PredictiveMaintenanceScheduler.Api.Shared;

namespace PredictiveMaintenanceScheduler.Api.Models
{
    public class User
    {
        public int ID { get; set; }
        public string Username { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Role { get; set; } = "MaintenanceEngineer"; // Admin, MaintenanceEngineer
        public string Token { get; set; } = string.Empty; // Store current active token for val
    }
}
