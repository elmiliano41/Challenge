using Challenge.DataAccess.DTO;
using Challenge.DataAccess.DTO.DTOMapping;
using Challenge.DataAccess.Entities;
using Challenge.DataAccess.Repository.Context;
using Challenge.DataAccess.Repository.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Challenge.DataAccess.Repository.Repositories
{
    public class UserRepository : IUserRepository
    {
        internal ChallengeSystemContext _context;
        public UserRepository(ChallengeSystemContext context)
        {
            _context = context;
        }

        public async Task<Users> GetUser(int id) =>
              await _context.Users
                 .Where(x => x.UserId == id)
                 .FirstOrDefaultAsync();

        public async Task<Users> GetUserByUserAndPassword(string usuario, string pass) =>
              await _context.Users
                .Where(x => x.Email == usuario && x.Password == pass)
                .FirstOrDefaultAsync();

        public async Task<List<Users>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task SaveUserAsync(Users user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        public async Task<Users> PostUser(UserDTO users)
        {
            var user = users.Map();
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<Users> UpdateUser(UserDTO user)
        {
            var userUpdated = user.Map();
            _context.Users.Update(userUpdated);
            await _context.SaveChangesAsync();
            return userUpdated;
        }

        public async Task<Users> DeleteUser(int userId)
        {
            Users user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return null;
            }
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return user;
        }
    }
}
