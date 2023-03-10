using Challenge.DataAccess.Entities;

namespace Challenge.Utils.Interfaces
{
    public interface IAuthUtils
    {
        string GenerateJWT(Users user);
    }
}
