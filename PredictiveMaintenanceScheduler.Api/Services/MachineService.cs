using PredictiveMaintenanceScheduler.Api.DataStore;
using PredictiveMaintenanceScheduler.Api.Models;
using PredictiveMaintenanceScheduler.Api.Shared;

namespace PredictiveMaintenanceScheduler.Api.Services
{
    public class MachineService
    {
        private readonly HealthEvaluationService _healthService;
        private readonly AlertService _alertService;
        
        // Deterministic Simulation State
        private static List<MachineHealthReading> _dummyReadings = new List<MachineHealthReading>();
        private static int _tick = 0;
        private static bool _initialized = false;

        public MachineService(HealthEvaluationService healthService, AlertService alertService)
        {
            _healthService = healthService;
            _alertService = alertService;
            InitializeDummyData();
        }

        private void InitializeDummyData()
        {
            if (_initialized) return;

            // Requirement:
            // 400 Healthy (Variable)
            // 90 Warnings (Variable)
            // 10 Critical
            
            var random = new Random(12345); // Fixed seed

            for (int i = 0; i < 500; i++)
            {
                // Segregation Logic
                // 0 - 399 : Healthy (400 items)
                // 400 - 489 : Warning (90 items)
                // 490 - 499 : Critical (10 items)

                float temp, vib, specVal;

                if (i < 400) // Healthy (Safe)
                {
                    // Randomize health 80-100% equivalent
                    // Safe Temp: 40-55. 
                    temp = 40f + (float)random.NextDouble() * 15f; 
                    vib = 0.5f + (float)random.NextDouble() * 2.5f; // < 3
                    specVal = 2.5f + (float)random.NextDouble() * 1.0f; // 2.5-3.5
                }
                else if (i < 490) // Warning
                {
                    // Trigger Warning Thresholds
                    // Temp: 56-70
                    temp = 56f + (float)random.NextDouble() * 14f; 
                    // Vib: 3-5
                    vib = 3.1f + (float)random.NextDouble() * 1.8f; 
                    // Spec: 2.0-2.5 or 3.5-4.0
                    specVal = 2.0f + (float)random.NextDouble() * 0.4f;
                }
                else // Critical
                {
                    // Trigger Critical Thresholds
                    // Temp > 70
                    temp = 75f + (float)random.NextDouble() * 15f;
                    // Vib > 5
                    vib = 6.0f + (float)random.NextDouble() * 5.0f;
                    // Spec < 2 or > 4
                    specVal = 1.0f + (float)random.NextDouble() * 0.8f;
                }

                _dummyReadings.Add(new MachineHealthReading
                {
                    ReadingID = i,
                    Temperature = temp,
                    Vibration = vib,
                    SpecificMetricValue = specVal, 
                    Timestamp = DateTime.UtcNow
                });
            }
            _initialized = true;
        }

        public IEnumerable<Machine> GetAll()
        {
            SimulateAllMachines();
            return MockDataStore.Machines;
        }

        public Machine? GetById(int id) => MockDataStore.Machines.FirstOrDefault(m => m.MachineID == id);

        public void SimulateAllMachines()
        {
            _tick = (_tick + 1) % 500;

            foreach (var m in MockDataStore.Machines)
            {
                var type = (MachineType)Enum.Parse(typeof(MachineType), m.Type.Replace(" ", ""));
                
                // Offset logic to distribute states
                int offset = m.MachineID * 35; // Larger offset to spread out events
                int index = (_tick + offset) % 500;
                var template = _dummyReadings[index];

                var reading = new MachineHealthReading
                {
                    ReadingID = MockDataStore.Readings.Count + 1,
                    MachineID = m.MachineID,
                    Timestamp = DateTime.UtcNow,
                    Temperature = template.Temperature,
                    Vibration = template.Vibration,
                    SpecificMetricValue = template.SpecificMetricValue,
                    OperatingHours = 1000 + _tick
                };

                // Adjust specific metrics based on Type
                switch (type)
                {
                    case MachineType.RoboticPaintSprayingArm:
                        reading.SpecificMetricName = "FlowRate";
                        break;
                    case MachineType.PaintBoothVentilationMotor: 
                        reading.SpecificMetricName = "Airflow";
                        // Map generic spec to Airflow. 
                        // Critical (Val ~1.5) -> < 1000
                        // Warning (Val ~2.2) -> 1000-1500
                        // Safe (Val ~3.0) -> 2000+
                        if (index >= 490) reading.SpecificMetricValue = 800; // Critical
                        else if (index >= 400) reading.SpecificMetricValue = 1200; // Warning
                        else reading.SpecificMetricValue = 2200 + (template.SpecificMetricValue * 100);
                        break;
                    case MachineType.ConveyorBeltSystem:
                        reading.SpecificMetricName = "BeltSpeed";
                        if (index >= 490) reading.SpecificMetricValue = 5; // Critical
                        else if (index >= 400) reading.SpecificMetricValue = 15; // Warning
                        else reading.SpecificMetricValue = 22;
                        break;
                    case MachineType.PaintCuringOven:
                        // Temp is direct
                        break;
                    case MachineType.PaintCirculationPump: 
                         reading.SpecificMetricName = "Pressure";
                         // Critical > 8. Safe 3-5.
                         if (index >= 490) reading.SpecificMetricValue = 9;
                         else if (index >= 400) reading.SpecificMetricValue = 6;
                         else reading.SpecificMetricValue = 4;
                         break;
                }

                var result = _healthService.EvaluateHealth(type, reading);

                m.HealthScore = result.Score;
                m.Status = result.Status;

                // Add to history
                reading.MachineID = m.MachineID;
                MockDataStore.Readings.Add(reading);
                
                var machineReadings = MockDataStore.Readings.Where(r => r.MachineID == m.MachineID).ToList();
                if (machineReadings.Count > 50) MockDataStore.Readings.Remove(machineReadings.First());

                // Alerts & Maintenance
                if (result.Status != "Safe")
                {
                    _alertService.ProcessHealthStatus(m.MachineID, result.Status, $"{result.Issue}: {result.Reason}");
                }
            }
        }

        public IEnumerable<MachineHealthReading> GetReadings(int machineId)
        {
            return MockDataStore.Readings
                .Where(r => r.MachineID == machineId)
                .OrderByDescending(r => r.Timestamp)
                .Take(50);
        }
    }
}
