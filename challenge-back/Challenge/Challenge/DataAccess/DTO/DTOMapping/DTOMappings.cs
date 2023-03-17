using Challenge.DataAccess.Entities;
using Challenge.DataAccess.Repository.Context;

namespace Challenge.DataAccess.DTO.DTOMapping

{
    public static class DTOMappings
    {
        #region UsersMapping
        public static Users Map(this UserDTO users) =>
    new Users
    {
        UserId = users.UserId,
        Name = users.Name,
        Email = users.Email,
        Password = users.Password,
        CV = users.CV,
        isAdmin = users.isAdmin,
        TechnicalKnowledge = users.TechnicalKnowledge,
        EnglishLevelId = users.EnglishLevelId,
        TeamId = users.TeamId
    };
        public static Accounts Map(this AccountsDTO accounts) =>
    new Accounts
    {
        AccountId = accounts.AccountId,
        Name = accounts.Name,
        ClientName = accounts.ClientName,
        OperationsManager = accounts.OperationsManager,
        CreatedDate = accounts.CreatedDate,
    };
        public static Teams Map(this TeamsDTO team)=>
    new Teams
    {
        TeamId = team.TeamId,
        Name = team.Name,
        AccountId = team.AccountId
    };

    }

    #endregion
}

