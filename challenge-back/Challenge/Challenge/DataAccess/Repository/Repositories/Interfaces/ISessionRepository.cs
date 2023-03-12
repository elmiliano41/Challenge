using Challenge.DataAccess.Entities;

namespace Challenge.DataAccess.Repository.Repositories.Interfaces
{
    public interface ISessionRepository
    {
        public Task<Sessions> GetSession(int UserId);
        public Task AddSession(Sessions session);
    }
}
