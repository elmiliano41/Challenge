using Challenge.DataAccess.DTO;
using Challenge.DataAccess.Entities;
using Challenge.DataAccess.Repository.Context;
using Challenge.DataAccess.Repository.Repositories.Interfaces;
using Challenge.DataAccess.DTO.DTOMapping;
using Microsoft.EntityFrameworkCore;


namespace Curso_Java_a_.net.DataAccess.Repository.Repositories
{
    public class TeamsRepository : ITeamsRepository
    {
        internal ChallengeSystemContext _context;
        public TeamsRepository(ChallengeSystemContext context)
        {
            _context = context;
        }

        public async Task<List<Teams>> GetTeams()
        {
            return await _context.Teams.ToListAsync();
        }

        public async Task<Teams> GetTeam(int teamId) =>
            await _context.Teams
                .Where(x => x.TeamId == teamId)
                .FirstOrDefaultAsync();

        public async Task<Teams> PostTeam(TeamsDTO team)
        {
            var newTeam = team.Map();
            await _context.Teams.AddAsync(newTeam);
            await _context.SaveChangesAsync();
            return newTeam;
        }

        public async Task<Teams> UpdateTeam(TeamsDTO team)
        {
            var updatedTeam = team.Map();
            _context.Teams.Update(updatedTeam);
            await _context.SaveChangesAsync();
            return updatedTeam;
        }

        public async Task<Teams> DeleteTeam(int teamId)
        {
            Teams team = await _context.Teams.FindAsync(teamId);
            if (team == null)
            {
                return null;
            }
            _context.Teams.Remove(team);
            await _context.SaveChangesAsync();
            return team;
        }
    }
}
