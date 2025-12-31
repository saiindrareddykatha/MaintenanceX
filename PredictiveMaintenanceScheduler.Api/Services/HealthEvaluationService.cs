using PredictiveMaintenanceScheduler.Api.Models;
using PredictiveMaintenanceScheduler.Api.Shared;

namespace PredictiveMaintenanceScheduler.Api.Services
{
    public class HealthEvaluationService
    {
        public (string Status, double Score, string Issue, string Reason) EvaluateHealth(MachineType type, MachineHealthReading reading)
        {
            // Default safe
            string status = "Safe";
            double score = 100;
            string issue = "None";
            string reason = "All metrics within safe limits";
            
            List<string> warnings = new List<string>();
            List<string> criticals = new List<string>();

            // 1. Robotic Paint Spraying Arm
            if (type == MachineType.RoboticPaintSprayingArm)
            {
                // Temp: <=55, 56-70, >70
                if (reading.Temperature > 70) criticals.Add($"Temperature Critical: {reading.Temperature:F1}°C > 70");
                else if (reading.Temperature > 55) warnings.Add($"Temperature Warning: {reading.Temperature:F1}°C");

                // Vibration: <=3, 3-5, >5
                if (reading.Vibration > 5) criticals.Add($"Vibration Critical: {reading.Vibration:F1}mm/s > 5");
                else if (reading.Vibration > 3) warnings.Add($"Vibration Warning: {reading.Vibration:F1}mm/s");

                // Flow Rate: 2.5-3.5 Safe, 2-2.5|3.5-4 Warning, <2|>4 Critical
                // reading.SpecificMetricValue = FlowRate
                if (reading.SpecificMetricValue < 2 || reading.SpecificMetricValue > 4) criticals.Add($"Flow Rate Critical: {reading.SpecificMetricValue:F1} L/min");
                else if ((reading.SpecificMetricValue >= 2 && reading.SpecificMetricValue < 2.5) || (reading.SpecificMetricValue > 3.5 && reading.SpecificMetricValue <= 4)) 
                    warnings.Add($"Flow Rate Warning: {reading.SpecificMetricValue:F1} L/min");
            }

            // 2. Paint Booth Ventilation Motor
            else if (type == MachineType.PaintBoothVentilationMotor)
            {
                // Temp: <=65, 66-80, >80
                if (reading.Temperature > 80) criticals.Add($"Temperature Critical: {reading.Temperature:F1}°C > 80");
                else if (reading.Temperature > 65) warnings.Add($"Temperature Warning: {reading.Temperature:F1}°C");

                // Vibration: <=4.5, 4.5-7, >7
                if (reading.Vibration > 7) criticals.Add($"Vibration Critical: {reading.Vibration:F1}mm/s > 7");
                else if (reading.Vibration > 4.5) warnings.Add($"Vibration Warning: {reading.Vibration:F1}mm/s");

                // Airflow: >=2000 Safe, 1500-2000 Warning, <1500 Critical
                // SpecificMetricValue = Airflow
                if (reading.SpecificMetricValue < 1500) criticals.Add($"Airflow Critical: {reading.SpecificMetricValue:F0} CFM < 1500");
                else if (reading.SpecificMetricValue < 2000) warnings.Add($"Airflow Warning: {reading.SpecificMetricValue:F0} CFM");
            }

            // 3. Conveyor Belt System
            else if (type == MachineType.ConveyorBeltSystem)
            {
                // Temp: <=60, 61-75, >75
                if (reading.Temperature > 75) criticals.Add($"Temperature Critical: {reading.Temperature:F1}°C > 75");
                else if (reading.Temperature > 60) warnings.Add($"Temperature Warning: {reading.Temperature:F1}°C");

                // Vibration: <=4.5, 4.5-7, >7
                if (reading.Vibration > 7) criticals.Add($"Vibration Critical: {reading.Vibration:F1}mm/s > 7");
                else if (reading.Vibration > 4.5) warnings.Add($"Vibration Warning: {reading.Vibration:F1}mm/s");

                // Belt Speed: 20-25 Safe, 15-20|25-30 Warning, <15|>30 Critical
                if (reading.SpecificMetricValue < 15 || reading.SpecificMetricValue > 30) criticals.Add($"Speed Critical: {reading.SpecificMetricValue:F1} m/min");
                else if ((reading.SpecificMetricValue >= 15 && reading.SpecificMetricValue < 20) || (reading.SpecificMetricValue > 25 && reading.SpecificMetricValue <= 30))
                    warnings.Add($"Speed Warning: {reading.SpecificMetricValue:F1} m/min");
            }

            // 4. Paint Curing Oven
            else if (type == MachineType.PaintCuringOven)
            {
                // Temp: 160-180 Safe, 150-160|180-190 Warning, <150|>190 Critical
                if (reading.Temperature < 150 || reading.Temperature > 190) criticals.Add($"Temp Critical: {reading.Temperature:F1}°C");
                else if ((reading.Temperature >= 150 && reading.Temperature < 160) || (reading.Temperature > 180 && reading.Temperature <= 190))
                    warnings.Add($"Temp Warning: {reading.Temperature:F1}°C");

                // Vibration: <=4.5, 4.5-7, >7
                if (reading.Vibration > 7) criticals.Add($"Vibration Critical: {reading.Vibration:F1}mm/s > 7");
                else if (reading.Vibration > 4.5) warnings.Add($"Vibration Warning: {reading.Vibration:F1}mm/s");
            }

            // 5. Paint Circulation Pump
            else if (type == MachineType.PaintCirculationPump)
            {
                // Temp: <=65, 66-80, >80
                if (reading.Temperature > 80) criticals.Add($"Temp Critical: {reading.Temperature:F1}°C > 80");
                else if (reading.Temperature > 65) warnings.Add($"Temp Warning: {reading.Temperature:F1}°C");

                // Vibration: <=4.0, 4-6, >6
                if (reading.Vibration > 6) criticals.Add($"Vibration Critical: {reading.Vibration:F1}mm/s > 6");
                else if (reading.Vibration > 4) warnings.Add($"Vibration Warning: {reading.Vibration:F1}mm/s");

                // Pressure: 3-5 Safe, 2-3|5-6 Warning, <2|>6 Critical
                if (reading.SpecificMetricValue < 2 || reading.SpecificMetricValue > 6) criticals.Add($"Pressure Critical: {reading.SpecificMetricValue:F1} bar");
                else if ((reading.SpecificMetricValue >= 2 && reading.SpecificMetricValue < 3) || (reading.SpecificMetricValue > 5 && reading.SpecificMetricValue <= 6))
                    warnings.Add($"Pressure Warning: {reading.SpecificMetricValue:F1} bar");
            }

            // Determine Final Status
            if (criticals.Any())
            {
                status = "Critical";
                score = 30; // Arbitrary low score for critical
                issue = "Critical Validation Failed";
                reason = string.Join(", ", criticals);
            }
            else if (warnings.Any())
            {
                status = "Warning";
                score = 70;
                issue = "Warning Threshold Exceeded";
                reason = string.Join(", ", warnings);
            }
            else
            {
                // Status is Safe. Calculate Score dynamically (80-100) based on proximity to thresholds.
                // We sum up normalized usage ratios for metrics.
                // Base deduction roughly 0-20 points.
                
                double deduction = 0;
                
                // Generic Deviation Calculation (Simplified)
                // Temp Factor: Normalize to ~10 (e.g., 50C/100C * 10 = 5)
                deduction += (reading.Temperature / 100.0) * 10;
                
                // Vibration Factor: Normalize to ~5
                deduction += (reading.Vibration / 5.0) * 5;
                
                // Specific Metric Factor: Normalize to ~5
                // Absolute deviation from "ideal" center? Or just magnitude?
                // Simple magnitude for now
                deduction += (reading.SpecificMetricValue / 10.0) * 5; // Rough estimate
                
                // Random subtle variation for natural look
                deduction += new Random().NextDouble() * 2; 

                score = Math.Max(80, 100 - deduction);
            }

            return (status, score, issue, reason);
        }
    }
}
