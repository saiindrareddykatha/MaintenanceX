namespace PredictiveMaintenanceScheduler.Api.Models
{
    public class MachineHealthReading
    {
        public int ReadingID { get; set; }
        public int MachineID { get; set; }
        public DateTime Timestamp { get; set; }
        
        // We store the JSON blobs or specific values?
        // The prompt rules involve: Temperature, Vibration, OperatingHours, FlowRate/Speed/Airflow/Pressure
        // To be generic/simple:
        public double Temperature { get; set; }
        public double Vibration { get; set; }
        public double OperatingHours { get; set; }
        public double SpecificMetricValue { get; set; } // FlowRate, Speed, Airflow, Pressure
        public string SpecificMetricName { get; set; } = string.Empty;
        
        public string AlertLevel { get; set; } = "Safe"; // Safe, Warning, Critical (Snapshot of status)
    }
}
