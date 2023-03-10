using Challenge.DataAccess.DTO;
using Challenge.DataAccess.DTO.DTOMapping;
using Challenge.DataAccess.Entities;
using Challenge.DataAccess.Repository.Context;
using Challenge.DataAccess.Repository.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Challenge.DataAccess.Repository.Repositories
{
    public class AccountsRepository : IAccountsRepository
    {
        internal ChallengeSystemContext _context;
        public AccountsRepository(ChallengeSystemContext context)
        {
            _context = context;
        }

        public async Task<Accounts> GetAccount(int id) =>
              await _context.Accounts
                 .Where(x => x.AccountId == id)
                 .FirstOrDefaultAsync();

        public async Task<List<Accounts>> GetAccounts()
        {
            return await _context.Accounts.ToListAsync();
        }

        public async Task SaveAccountAsync(Accounts account)
        {
            await _context.Accounts.AddAsync(account);
            await _context.SaveChangesAsync();
        }

        public async Task<Accounts> PostAccount(AccountsDTO account)
        {
            var newAccount = account.Map();
            await _context.Accounts.AddAsync(newAccount);
            await _context.SaveChangesAsync();
            return newAccount;
        }

        public async Task<Accounts> UpdateAccount(AccountsDTO account)
        {
            var accountUpdated = account.Map();
            _context.Accounts.Update(accountUpdated);
            await _context.SaveChangesAsync();
            return accountUpdated;
        }

        public async Task<Accounts> DeleteAccount(int accountId)
        {
            Accounts account = await _context.Accounts.FindAsync(accountId);
            if (account == null)
            {
                return null;
            }
            _context.Accounts.Remove(account);
            await _context.SaveChangesAsync();
            return account;
        }
    }
}
