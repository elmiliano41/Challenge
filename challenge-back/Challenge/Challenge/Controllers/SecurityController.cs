using Challenge.DataAccess.Services.Interfaces;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;
using HttpPostAttribute = Microsoft.AspNetCore.Mvc.HttpPostAttribute;
using Microsoft.AspNetCore.Mvc;
using Challenge.DataAccess.Entities;
using Microsoft.AspNetCore.Authorization;
using Challenge.DataAccess.DTO;
using System.Security.Claims;


namespace Challenge.Controllers
{
        [Route("api/[controller]")]
        [ApiController]
        public class SecurityController : ControllerBase
        {
            public readonly ISessionService _sessionService;
            public readonly IUsersService _usersService;
            public ILogger<SecurityController> _logger;

            public SecurityController(ISessionService securityService,
                                      ILogger<SecurityController> logger,
                                      IUsersService usersService)
            {
                _sessionService = securityService;
                _logger = logger;
                _usersService = usersService;
            }

            [HttpGet]
            [Route("/auth")]
            public async Task<ActionResult<Sessions>> Auth()
            {
                try
                {
                    var r = ((ClaimsIdentity)User.Identity).FindFirst("Id");
                    var session = await _sessionService.GetSession(int.Parse(r.Value));

                    return Ok(session);
                }
                catch (UnauthorizedAccessException)
                {
                    return Unauthorized("Session Expired");
                }
                catch (NullReferenceException)
                {
                    return Unauthorized("Session Expired");
                }
                catch (Exception)
                {
                    return Problem("Some error happened please contact Sys Admin");
                }
            }

            [HttpPost]
            [Route("/Login")]
            [AllowAnonymous]
            public async Task<ActionResult<Sessions>> Login([FromBody] LoginDTO user)
            {
                try
                {
                    var userD = await _usersService.GetUserByUserAndPassword(user.Email, user.Password);
                    var session = await _sessionService.SaveSession(userD);

                    return Ok(session);
                }
                catch (UnauthorizedAccessException)
                {
                    return Unauthorized("Email or password does not match");
                }
                catch (Exception)
                {
                    _logger.LogError("Some error happened please contact Sys Admin");
                    return Problem("Some error happened please contact Sys Admin");
                }
            }
        }
    }