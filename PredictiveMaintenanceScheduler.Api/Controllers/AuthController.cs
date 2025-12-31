using Microsoft.AspNetCore.Mvc;
using PredictiveMaintenanceScheduler.Api.Models;
using PredictiveMaintenanceScheduler.Api.Services;
using PredictiveMaintenanceScheduler.Api.Shared;

namespace PredictiveMaintenanceScheduler.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public ActionResult<ApiResponse<User>> Login([FromBody] LoginRequest request)
        {
            var user = _authService.Login(request.Username, request.Password);
            if (user == null)
                return Unauthorized(ApiResponse<User>.Fail("Invalid credentials"));

            return Ok(ApiResponse<User>.Ok(user, "Login successful"));
        }
    }

    public class LoginRequest
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
