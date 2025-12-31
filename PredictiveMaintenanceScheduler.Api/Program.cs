using PredictiveMaintenanceScheduler.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register Services
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<HealthEvaluationService>();
builder.Services.AddScoped<AlertService>();
builder.Services.AddScoped<MachineService>();
builder.Services.AddScoped<MaintenanceService>();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

// Custom Auth Middleware for "Validate token for protected APIs"
// Simple inline middleware: Check Authorization header if path starts with /api/ but not /api/auth/login
app.Use(async (context, next) =>
{
    var path = context.Request.Path;
    if (path.StartsWithSegments("/api") && !path.StartsWithSegments("/api/auth"))
    {
        var authHeader = context.Request.Headers["Authorization"].FirstOrDefault();
        if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
        {
            context.Response.StatusCode = 401;
            await context.Response.WriteAsync("Unauthorized: Missing or invalid token");
            return;
        }

        var token = authHeader.Substring("Bearer ".Length).Trim();
        
        // Resolve AuthService to check token
        using (var scope = app.Services.CreateScope())
        {
            var authService = scope.ServiceProvider.GetRequiredService<AuthService>();
            if (!authService.ValidateToken(token))
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("Unauthorized: Invalid token");
                return;
            }
        }
    }
    await next();
});

app.UseAuthorization(); // Still keep structure though custom middleware handles "Auth"

app.MapControllers();

app.Run();
