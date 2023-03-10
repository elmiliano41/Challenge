using Challenge.DataAccess.DTO;
using Challenge.DataAccess.Entities;

namespace Challenge.DataAccess.Services.Interfaces
{
    public interface IUsersService
    {
        public Task<Users> GetUserByUserAndPassword(string user, string pass);
        public Task<Users> GetUser(int userId);
        public Task<List<Users>> GetUsers();
        public Task<UserDTO> PostUsers(UserDTO user);
        public Task<Users> UpdateUsers(UserDTO user);
        public Task<Users> DeleteUsers(int UserId);
    }
}
