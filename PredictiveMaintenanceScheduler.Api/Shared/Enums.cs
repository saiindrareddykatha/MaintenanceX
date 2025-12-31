namespace PredictiveMaintenanceScheduler.Api.Shared
{
    public enum MachineType
    {
        RoboticPaintSprayingArm,
        PaintBoothVentilationMotor,
        ConveyorBeltSystem,
        PaintCuringOven,
        PaintCirculationPump
    }

    public enum HealthStatus
    {
        Safe,
        Warning,
        Critical
    }

    public enum MaintenanceStatus
    {
        Open,
        InProgress,
        Completed
    }

    public enum MaintenancePriority
    {
        Low,
        Medium,
        High,
        Critical
    }

    public enum UserRole
    {
        Admin,
        MaintenanceEngineer
    }
}
