using Microsoft.AspNetCore.Mvc;
using PredictiveMaintenanceScheduler.Api.Models;
using PredictiveMaintenanceScheduler.Api.Services;
using PredictiveMaintenanceScheduler.Api.Shared;

namespace PredictiveMaintenanceScheduler.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlertsController : ControllerBase
    {
        private readonly AlertService _alertService;

        public AlertsController(AlertService alertService)
        {
            _alertService = alertService;
        }

        [HttpGet]
        public ActionResult<ApiResponse<IEnumerable<MaintenanceAlert>>> GetAll()
        {
            return Ok(ApiResponse<IEnumerable<MaintenanceAlert>>.Ok(_alertService.GetAlerts()));
        }

        [HttpGet("critical")]
        public ActionResult<ApiResponse<IEnumerable<MaintenanceAlert>>> GetCritical()
        {
            var criticals = _alertService.GetAlerts().Where(a => a.Severity == "Critical");
            return Ok(ApiResponse<IEnumerable<MaintenanceAlert>>.Ok(criticals));
        }

        // POST /api/alerts/{id}/acknowledge
        [HttpPost("{id}/acknowledge")]
        public ActionResult LogAcknowledgement(int id)
        {
            // Implementation...
            return Ok(ApiResponse<string>.Ok(string.Empty, "Acknowledged"));
        }
    }
}
