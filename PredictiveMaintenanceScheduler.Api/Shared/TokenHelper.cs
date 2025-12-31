using System.Security.Cryptography;
using System.Text;

namespace PredictiveMaintenanceScheduler.Api.Shared
{
    public static class TokenHelper
    {
        // Simple mock token generation - In real world without JWT, we might store these in DB (DataStore here)
        // For this task, we will generate a random string and maybe store it in User session or just return it.
        // The prompt says "Generate a secure token after login" and "Validate token for protected APIs".
        // We will simple return a base64 string of random bytes.
        
        public static string GenerateSecureToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }
        
        public static string HashPassword(string password)
        {
            // Simple SHA256 caching for mock auth
            using (var sha256 = SHA256.Create())
            {
                var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(bytes);
            }
        }
    }
}
