using HttpGetAttribute = Microsoft.AspNetCore.Mvc.HttpGetAttribute;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;
using Microsoft.AspNetCore.Mvc;
using Challenge.DataAccess.Entities;
using Challenge.DataAccess.DTO;
using Microsoft.AspNetCore.Authorization;
using Challenge.DataAccess.Repository.Context;
using Challenge.DataAccess.Services.Interfaces;

namespace Challenge.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]

    public class AccountController : ControllerBase
    {
        readonly IAccountsService _accountService;

        internal ChallengeSystemContext _context;

        public ILogger<AccountController> _logger;

        public AccountController(IAccountsService accountService, ILogger<AccountController>
            logger, ChallengeSystemContext context)
        {
            _accountService = accountService;
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        [Route("/Account")]
        public async Task<ActionResult<Accounts>> GetAccount(int accountId)
        {
            try
            {
                var accountD = await _accountService.GetAccount(accountId);
                if (accountD == null)
                {
                    return NoContent();
                }
                return Ok(accountD);
            }
            catch (Exception)
            {
                return Problem("Some error happened please contact Sys Admin");
            }
        }

        [HttpGet]
        [Route("/Accounts")]
        public async Task<ActionResult<List<Accounts>>> GetAccounts()
        {
            try
            {
                var accounts = await _accountService.GetAccounts();
                if (accounts == null)
                {
                    return NoContent();
                }
                return Ok(accounts);
            }
            catch (Exception)
            {
                return Problem("Some error happened please contact Sys Admin");
            }
        }

        [HttpPost]
        [Route("/Account")]
        public async Task<ActionResult<Accounts>> PostAccount([FromBody] AccountsDTO account)
        {
            try
            {
                var account2 = await _accountService.PostAccount(account);
                return Ok(account2);
            }
            catch (Exception ex)
            {
                if (ex.Message.ToLower().Contains("duplicate"))
                    return BadRequest("Account already exists");
                else
                    return Problem("Some error happened please contact Sys Admin");
            }
        }

        [HttpPut]
        [Route("/Account")]
        public async Task<ActionResult<Accounts>> UpdateAccount([FromBody] AccountsDTO account)
        {
            try
            {
                var accountUpdated = await _accountService.UpdateAccount(account);
                if (accountUpdated == null)
                {
                    return BadRequest("Account not found");
                }
                return Ok(accountUpdated);
            }
            catch (Exception)
            {
                return Problem("Some error happened please contact Sys Admin");
            }
        }

        [HttpDelete]
        [Route("/Account")]
        [AllowAnonymous]
        public async Task<ActionResult<Accounts>> DeleteAccount(int accountId)
        {
            try
            {
                var account = await _accountService.DeleteAccount(accountId);
                if (account == null)
                {
                    return BadRequest("Account not found");
                }
                return Ok(account);
            }
            catch (Exception)
            {
                return Problem("Some error happened please contact Sys Admin");
            }
        }
    }
}
