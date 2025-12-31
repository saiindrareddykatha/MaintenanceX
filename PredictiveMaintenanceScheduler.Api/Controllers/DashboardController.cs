using Microsoft.AspNetCore.Mvc;
using PredictiveMaintenanceScheduler.Api.DataStore;
using PredictiveMaintenanceScheduler.Api.Shared;

namespace PredictiveMaintenanceScheduler.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        [HttpGet("summary")]
        public ActionResult<ApiResponse<object>> GetSummary()
        {
            // Total machines, Active machines (assuming all installed are active?), Critical machines, Active alerts, Pending maintenance
            var total = MockDataStore.Machines.Count;
            var active = MockDataStore.Machines.Count; // Simplification
            var critical = MockDataStore.Machines.Count(m => m.Status == "Critical");
            var alerts = MockDataStore.Alerts.Count(a => !a.IsAcknowledged);
            var pending = MockDataStore.Schedules.Count(s => s.Status != "Completed");

            return Ok(ApiResponse<object>.Ok(new
            {
                TotalMachines = total,
                ActiveMachines = active,
                CriticalMachines = critical,
                ActiveAlerts = alerts,
                PendingMaintenance = pending
            }));
        }
    }
}
