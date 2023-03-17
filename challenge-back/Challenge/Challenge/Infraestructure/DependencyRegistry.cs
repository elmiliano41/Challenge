using Challenge.DataAccess.Repository.Repositories.Interfaces;
using Challenge.DataAccess.Services.Interfaces;
using Challenge.DataAccess.Repository.Repositories;
using Challenge.DataAccess.Services;
using Challenge.Utils.Interfaces;
using Challenge.Utils.Security;
using Curso_Java_a_.net.DataAccess.Repository.Repositories;

namespace Challenge.Infraestructure
{
    public class DependencyRegistry
    {
        public DependencyRegistry(WebApplicationBuilder builder)
        {
            #region Services
            builder.Services.AddScoped<ISessionService, SessionService>();
            builder.Services.AddScoped<IUsersService, UsersService>();
            builder.Services.AddScoped<ITeamsService, TeamsService>();
            builder.Services.AddScoped<IAccountsService, AccountsService>();
            #endregion

            #region Repositories
            builder.Services.AddScoped<ISessionRepository, SessionRepository>();
            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<ITeamsRepository, TeamsRepository>();
            builder.Services.AddScoped<IAccountsRepository, AccountsRepository>();
            #endregion

            #region Utils
            builder.Services.AddScoped<IUtils, Utils.Utils>();
            builder.Services.AddScoped<IAuthUtils, AuthUtils>();
            #endregion
        }
    }
}
