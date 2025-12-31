using PredictiveMaintenanceScheduler.Api.DataStore;
using PredictiveMaintenanceScheduler.Api.Models;
using PredictiveMaintenanceScheduler.Api.Shared;

namespace PredictiveMaintenanceScheduler.Api.Services
{
    public class AuthService
    {
        public User? Login(string username, string password)
        {
            var hash = TokenHelper.HashPassword(password);
            var user = MockDataStore.Users.FirstOrDefault(u => u.Username == username && u.PasswordHash == hash);
            if (user != null)
            {
                user.Token = TokenHelper.GenerateSecureToken();
                return user;
            }
            return null;
        }

        public bool ValidateToken(string token)
        {
            if (string.IsNullOrEmpty(token)) return false;
            return MockDataStore.Users.Any(u => u.Token == token);
        }
    }
}
