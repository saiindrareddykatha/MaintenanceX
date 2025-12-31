using Microsoft.AspNetCore.Mvc;
using PredictiveMaintenanceScheduler.Api.Models;
using PredictiveMaintenanceScheduler.Api.Services;
using PredictiveMaintenanceScheduler.Api.Shared;

namespace PredictiveMaintenanceScheduler.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaintenanceController : ControllerBase
    {
        private readonly MaintenanceService _service;

        public MaintenanceController(MaintenanceService service)
        {
            _service = service;
        }

        [HttpGet("schedules")]
        public ActionResult<ApiResponse<IEnumerable<MaintenanceSchedule>>> GetSchedules()
        {
            return Ok(ApiResponse<IEnumerable<MaintenanceSchedule>>.Ok(_service.GetAll().Where(s => s.Status != "Completed")));
        }

        [HttpGet("history")]
        public ActionResult<ApiResponse<IEnumerable<MaintenanceSchedule>>> GetHistory()
        {
            return Ok(ApiResponse<IEnumerable<MaintenanceSchedule>>.Ok(_service.GetAll().Where(s => s.Status == "Completed")));
        }

        [HttpPost("schedule")]
        public ActionResult Schedule([FromBody] ScheduleMaintenanceDto dto)
        {
             _service.ScheduleMaintenance(dto.MachineId, dto.MaintenanceType, dto.Priority, dto.Notes);
             return Ok(ApiResponse<string>.Ok(string.Empty, "Scheduled Successfully"));
        }

        [HttpPost("{id}/complete")]
        public ActionResult Complete(int id, [FromBody] string notes)
        {
            _service.CompleteMaintenance(id, notes);
            return Ok(ApiResponse<string>.Ok(string.Empty, "Maintenance Completed"));
        }
    }
}
