using Challenge.DataAccess.Repository.Repositories.Interfaces;
using Challenge.DataAccess.Entities;
using Challenge.DataAccess.Repository.Context;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;

namespace Challenge.DataAccess.Repository.Repositories
{
    public class SessionRepository : ISessionRepository
    {
        internal ChallengeSystemContext _context;

        public SessionRepository(ChallengeSystemContext context)
        {
            _context = context;
        }

        public Task<Sessions> GetSession(int UserId)
        {
            return _context.Sessions
                .Where(u => u.UserId == UserId)
                .OrderBy(x => x.CreationDate)
                .LastAsync();
        }

        public async Task AddSession(Sessions session)
        {
             await _context.Sessions.AddAsync(session);
             await _context.SaveChangesAsync();
        }      
    }
}
