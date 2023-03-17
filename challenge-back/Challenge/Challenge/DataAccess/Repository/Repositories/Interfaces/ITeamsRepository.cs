using Challenge.DataAccess.DTO;
using Challenge.DataAccess.Entities;

namespace Challenge.DataAccess.Repository.Repositories.Interfaces
{
    public interface ITeamsRepository
    {
        Task<Teams> GetTeam(int teamId);
        Task<List<Teams>> GetTeams();
        Task<Teams> PostTeam(TeamsDTO team);
        Task<Teams> UpdateTeam(TeamsDTO team);
        Task<Teams> DeleteTeam(int teamId);
    }
}
