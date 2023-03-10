using Challenge.DataAccess.DTO;
using Challenge.DataAccess.Entities;
using Challenge.DataAccess.Repository.Repositories.Interfaces;
using Challenge.DataAccess.Services.Interfaces;

namespace Challenge.DataAccess.Services
{
    public class AccountsService : IAccountsService
    {
        readonly ILogger<AccountsService> _logger;
        readonly IAccountsRepository _accountsRepository;

        public AccountsService(IAccountsRepository accountsRepository, ILogger<AccountsService> logger)
        {
            _accountsRepository = accountsRepository;
            _logger = logger;
        }

        public async Task<Accounts> GetAccount(int accountId)
        {
            try
            {
                Accounts account = await _accountsRepository.GetAccount(accountId);
                return account;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw ex;
            }
        }

        public async Task<List<Accounts>> GetAccounts()
        {
            try
            {
                List<Accounts> accounts = await _accountsRepository.GetAccounts();
                return accounts;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw ex;
            }
        }

        public async Task<Accounts> DeleteAccount(int accountId)
        {
            try
            {
                Accounts account = await _accountsRepository.DeleteAccount(accountId);
                return account;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw ex;
            }
        }

        public async Task<Accounts> PostAccount(AccountsDTO account)
        {
            try
            {
                var postAccount = await _accountsRepository.PostAccount(account);
                return postAccount;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw;
            }
        }

        public async Task<Accounts> UpdateAccount(AccountsDTO account)
        {
            try
            {
                var updatedAccount = await _accountsRepository.UpdateAccount(account);
                return updatedAccount;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw;
            }
        }
    }

}
