using Challenge.DataAccess.Entities;

namespace Challenge.DataAccess.Services.Interfaces
{
    public interface ISessionService
    {
        public Task<Sessions> SaveSession(Users user);

        public Task<Sessions> GetSession(int UserId);     
    }
}
