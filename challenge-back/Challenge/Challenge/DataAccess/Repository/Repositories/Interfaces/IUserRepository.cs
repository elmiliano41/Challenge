using Challenge.DataAccess.DTO;
using Challenge.DataAccess.Entities;

namespace Challenge.DataAccess.Repository.Repositories.Interfaces
{
    public interface IUserRepository
    {
        public Task<Users> GetUserByUserAndPassword(string user, string pass);
        public Task SaveUserAsync(Users user);
        public Task<Users> GetUser(int id);
        public Task<List<Users>> GetUsers();
        public Task<Users> PostUser(UserDTO user);
        public Task<Users> UpdateUser(UserDTO user);
        public Task<Users> DeleteUser(int UserId);
    }
}
