using Microsoft.AspNetCore.Mvc;
using PredictiveMaintenanceScheduler.Api.Models;
using PredictiveMaintenanceScheduler.Api.Services;
using PredictiveMaintenanceScheduler.Api.Shared;

namespace PredictiveMaintenanceScheduler.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MachinesController : ControllerBase
    {
        private readonly MachineService _machineService;

        public MachinesController(MachineService machineService)
        {
            _machineService = machineService;
        }

        // GET /api/machines
        [HttpGet]
        public ActionResult<ApiResponse<IEnumerable<Machine>>> GetAll()
        {
            return Ok(ApiResponse<IEnumerable<Machine>>.Ok(_machineService.GetAll()));
        }

        // GET /api/machines/{id}
        [HttpGet("{id}")]
        public ActionResult<ApiResponse<Machine>> GetById(int id)
        {
            var machine = _machineService.GetById(id);
            if (machine == null) return NotFound(ApiResponse<Machine>.Fail("Machine not found"));
            return Ok(ApiResponse<Machine>.Ok(machine));
        }
        
        // GET /api/machines/{id}/health - Simple wrapper returning status
        [HttpGet("{id}/health")]
        public ActionResult<ApiResponse<object>> GetHealth(int id)
        {
            var machine = _machineService.GetById(id);
            if (machine == null) return NotFound(ApiResponse<object>.Fail("Machine not found"));
            return Ok(ApiResponse<object>.Ok(new { machine.Status, machine.HealthScore }));
        }

        // GET /api/machines/{id}/readings
        [HttpGet("{id}/readings")]
        public ActionResult<ApiResponse<IEnumerable<MachineHealthReading>>> GetReadings(int id)
        {
            return Ok(ApiResponse<IEnumerable<MachineHealthReading>>.Ok(_machineService.GetReadings(id)));
        }
    }
}
