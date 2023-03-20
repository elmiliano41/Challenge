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

    public class TeamController : ControllerBase
    {
        readonly ITeamsService _teamService;

        internal ChallengeSystemContext _context;

        public ILogger<TeamController> _logger;

        public TeamController(ITeamsService teamService, ILogger<TeamController>
            logger, ChallengeSystemContext context)
        {
            _teamService = teamService;
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        [Route("/Team")]
        public async Task<ActionResult<Teams>> GetTeam(int teamId)
        {
            try
            {
                var team = await _teamService.GetTeam(teamId);
                if (team == null)
                {
                    return NoContent();
                }
                return Ok(team);
            }
            catch (Exception)
            {
                return Problem("Some error happened please contact Sys Admin");
            }
        }

        [HttpGet]
        [Route("/Teams")]
        public async Task<ActionResult<List<Teams>>> GetTeams()
        {
            try
            {
                var teams = await _teamService.GetTeams();
                if (teams == null)
                {
                    return NoContent();
                }
                return Ok(teams);
            }
            catch (Exception)
            {
                return Problem("Some error happened please contact Sys Admin");
            }
        }

        [HttpPost]
        [Route("/Team")]
        public async Task<ActionResult<Teams>> PostTeam([FromBody] TeamsDTO team)
        {
            try
            {
                var createdTeam = await _teamService.PostTeam(team);
                return Ok(createdTeam);
            }
            catch (Exception ex)
            {
                if (ex.Message.ToLower().Contains("duplicate"))
                    return BadRequest("Team already exists");
                else
                    return Problem("Some error happened please contact Sys Admin");
            }
        }

        [HttpPut]
        [Route("/Team")]
        public async Task<ActionResult<Teams>> UpdateTeam([FromBody] TeamsDTO team)
        {
            try
            {
                var updatedTeam = await _teamService.UpdateTeam(team);
                if (updatedTeam == null)
                {
                    return BadRequest("Team not found");
                }
                return Ok(updatedTeam);
            }
            catch (Exception)
            {
                return Problem("Some error happened please contact Sys Admin");
            }
        }

        [HttpDelete]
        [Route("/Team")]
        [AllowAnonymous]
        public async Task<ActionResult<Teams>> DeleteTeam(int teamId)
        {
            try
            {
                var team = await _teamService.DeleteTeam(teamId);
                if (team == null)
                {
                    return BadRequest("Team not found");
                }
                return Ok(team);
            }
            catch (Exception)
            {
                return Problem("Some error happened please contact Sys Admin");
            }
        }
    }
}
