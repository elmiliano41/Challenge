using Challenge.DataAccess.DTO;
using Challenge.DataAccess.Entities;

namespace Challenge.DataAccess.Repository.Repositories.Interfaces
{
    public interface IAccountsRepository
    {
        public Task SaveAccountAsync(Accounts account);
        public Task<Accounts> GetAccount(int id);
        public Task<List<Accounts>> GetAccounts();
        public Task<Accounts> PostAccount(AccountsDTO account);
        public Task<Accounts> UpdateAccount(AccountsDTO account);
        public Task<Accounts> DeleteAccount(int accountId);
    }
}