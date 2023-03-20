using Challenge.DataAccess.DTO;
using Challenge.DataAccess.Entities;

namespace Challenge.DataAccess.Services.Interfaces
{
    public interface ITeamsService
    {
        public Task<Teams> GetTeam(int teamId);
        public Task<List<Teams>> GetTeams();
        public Task<Teams> PostTeam(TeamsDTO team);
        public Task<Teams> UpdateTeam(TeamsDTO team);
        public Task<Teams> DeleteTeam(int teamId);
    }
}
