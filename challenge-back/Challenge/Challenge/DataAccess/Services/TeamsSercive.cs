using Challenge.DataAccess.DTO;
using Challenge.DataAccess.Entities;
using Challenge.DataAccess.Repository.Repositories.Interfaces;
using Challenge.DataAccess.Services.Interfaces;

namespace Challenge.DataAccess.Services
{
    public class TeamsService : ITeamsService
    {
        readonly ILogger<TeamsService> _logger;
        readonly ITeamsRepository _teamsRepository;

        public TeamsService(ITeamsRepository teamsRepository, ILogger<TeamsService> logger)
        {
            _teamsRepository = teamsRepository;
            _logger = logger;
        }

        public async Task<Teams> GetTeam(int teamId)
        {
            try
            {
                Teams team = await _teamsRepository.GetTeam(teamId);
                return team;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw ex;
            }
        }

        public async Task<List<Teams>> GetTeams()
        {
            try
            {
                List<Teams> teams = await _teamsRepository.GetTeams();
                return teams;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw ex;
            }
        }

        public async Task<Teams> DeleteTeam(int teamId)
        {
            try
            {
                Teams team = await _teamsRepository.DeleteTeam(teamId);
                return team;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw ex;
            }
        }

        public async Task<Teams> PostTeam(TeamsDTO team)
        {
            try
            {
                var postTeam = await _teamsRepository.PostTeam(team);
                return postTeam;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw;
            }
        }

        public async Task<Teams> UpdateTeam(TeamsDTO team)
        {
            try
            {
                var updatedTeam = await _teamsRepository.UpdateTeam(team);
                return updatedTeam;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw;
            }
        }
    }

}
