using PredictiveMaintenanceScheduler.Api.Shared;

namespace PredictiveMaintenanceScheduler.Api.Models
{
    public class HealthMetric
    {
        // This represents the Threshold Configuration for a specific metric (e.g. Temperature) for a Machine Type
        public int MetricID { get; set; }
        public MachineType MachineType { get; set; }
        public string MetricName { get; set; } = string.Empty; // "Temperature", "Vibration"
        
        // Thresholds
        public double SafeMax { get; set; }
        public double WarningMax { get; set; }
        public double CriticalMin { get; set; } // For "Airflow < 1500"
        // In a real DB we might have Min/Max for each range, here simplifying to match logic needs or just use as data object
        // The prompt says "HealthMetric.cs" exists. 
    }
}
