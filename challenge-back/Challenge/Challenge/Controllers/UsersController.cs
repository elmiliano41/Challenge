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

    public class UserController : ControllerBase
    {
        readonly IUsersService _userService;

        internal ChallengeSystemContext _context;

        public ILogger<UserController> _logger;

        public UserController(IUsersService userService, ILogger<UserController>
            logger, ChallengeSystemContext context)
        {
            _userService = userService;
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        [Route("/User")]
        public async Task<ActionResult<Users>> GetUser(int id)
        {
            try
            {
                var UserD = await _userService.GetUser(id);
                if (UserD == null)
                {
                    return NoContent();
                }
                return Ok(UserD);
            }
            catch (Exception)
            {
                return Problem("Some error happened please contact Sys Admin");
            }
        }
        [HttpGet]
        [Route("/Users")]
        public async Task<ActionResult<List<Users>>> GetUsers()
        {
            try
            {
                var users = await _userService.GetUsers();
                if (users == null)
                {
                    return NoContent();
                }
                return Ok(users);
            }
            catch (Exception)
            {
                return Problem("Some error happened please contact Sys Admin");
            }
        }

        [HttpPost]
        [Route("/User")]
        public async Task<ActionResult<Users>> PostUsers([FromBody] UserDTO m)
        {
            try
            {
                var user2 = await _userService.PostUsers(m);
                return Ok(user2);
            }
            catch (Exception ex)
            {
                if (ex.Message.ToLower().Contains("duplicate"))
                    return BadRequest("This email already exist");
                else
                    return Problem("Some error happened please contact Sys Admin");
            }
        }

        [HttpPut]
        [Route("/User")]
        public async Task<ActionResult<Users>> UpdateUsers([FromBody] UserDTO user)
        {
            try
            {
                
                var userUpdated = await _userService.UpdateUsers(user);
                if (userUpdated == null)
                {
                    return BadRequest("User not found");
                }
                return Ok(userUpdated);
            }
            catch (Exception)
            {
                return Problem("Some error happened please contact Sys Admin");
            }
        }

        [HttpDelete]
        [Route("/User")]
        [AllowAnonymous]
        public async Task<ActionResult<Users>> DeleteUsers(int userId)
        {
            try
            {
                var user = await _userService.DeleteUsers(userId);
                if (user == null)
                {
                    return BadRequest("User not found");
                }
                return Ok(user);
            }
            catch (Exception)
            {
                return Problem("Some error happened please contact Sys Admin");
            }
        }
    }
}
