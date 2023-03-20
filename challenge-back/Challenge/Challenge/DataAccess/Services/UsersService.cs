using Challenge.DataAccess.DTO;
using Challenge.DataAccess.Entities;
using Challenge.DataAccess.Repository.Repositories.Interfaces;
using Challenge.DataAccess.Services.Interfaces;


namespace Challenge.DataAccess.Services
{
    public class UsersService : IUsersService
    {
        readonly ILogger<UsersService> _logger;
        readonly IUserRepository _usersRepository;
        public UsersService(IUserRepository usersRepository,
                              ILogger<UsersService> logger)
        {
            _usersRepository = usersRepository;
            _logger = logger;
        }

        public async Task<Users> GetUserByUserAndPassword(string email, string pass)
        {
            try
            {
                Users user = await _usersRepository.GetUserByUserAndPassword(email, pass);
                if (user == null)

                {
                    throw new UnauthorizedAccessException();
                }

                return user;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw ex;
            }
        }
        public async Task<Users> GetUser(int userId)
        {
            try
            {
                Users user = await _usersRepository.GetUser(userId);
                return user;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw ex;
            }
        }
        public async Task<List<Users>> GetUsers()
        {
            try
            {
                List<Users> users = await _usersRepository.GetUsers();
                return users;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw ex;
            }
        }

        public async Task<Users> DeleteUsers(int UserId)
        {
            try
            {
                Users user = await _usersRepository.DeleteUser(UserId);
                return user;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw ex;
            }
        }

        public async Task<UserDTO> PostUsers(UserDTO user)
        {
            try
            {
                await _usersRepository.PostUser(user);
                return user;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw;
            }
        }

        public async Task<Users> UpdateUsers(UserDTO user)
        {
            try
            {
                var userUpdated = await _usersRepository.UpdateUser(user);
                return userUpdated;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw;
            }
        }
    }
}
