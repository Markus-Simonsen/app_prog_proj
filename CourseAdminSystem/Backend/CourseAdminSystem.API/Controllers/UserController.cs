using CourseAdminSystem.Model.Entities;
using CourseAdminSystem.Model.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CourseAdminSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        protected UserRepository Repository { get; }
        public UserController(UserRepository repository)
        {
            Repository = repository;
        }

        [HttpGet("{Userid}")]
        public virtual ActionResult<User> GetUser([FromRoute] int Userid)
        {
            User user = Repository.GetUserById(Userid);
            if (user == null)
            {
                return NotFound("User with Userid " + Userid + " not found");
            }
            return Ok(user);
        }

        [HttpGet]
        public virtual ActionResult<IEnumerable<User>> GetUsers()
        {
            return Ok(Repository.GetUsers());
        }

        [HttpPost]
        public virtual ActionResult Post([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest("User info not correct");
            }
            bool status = Repository.InsertUser(user);
            if (status)
            {
                return Ok();
            }
            return BadRequest();
        }

        [HttpPost("login")]
        public ActionResult<User> Login([FromBody] User user)
        {
            if (user == null)
                return BadRequest("Invalid request.");

            User existing = Repository.GetUserByEmail(user.Email);
            if (existing == null || !Repository.VerifyPassword(user.Email, user.Password))
            {
                Console.WriteLine("condition: " + (existing == null) + " || " + (!Repository.VerifyPassword(user.Email, user.Password)));
                return Unauthorized("Invalid email or password.");
            }

            return Ok(existing);
        }

        [HttpPut]

        public virtual ActionResult UpdateUser([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest("User info not correct");
            }
            User existinUser = Repository.GetUserById(user.Userid);
            if (existinUser == null)
            {
                return NotFound($"User with Userid {user.Userid} not found");
            }
            bool status = Repository.UpdateUser(user);
            if (status)
            {
                return Ok();
            }
            return BadRequest("Something went wrong");
        }
        [HttpDelete("{Userid}")]
        public virtual ActionResult DeleteUser([FromRoute] int Userid)
        {
            User existingUser = Repository.GetUserById(Userid);
            if (existingUser == null)
            {
                return NotFound($"User with Userid {Userid} not found");
            }
            bool status = Repository.DeleteUser(Userid);
            if (status)
            {
                return NoContent();
            }
            return BadRequest($"Unable to delete user with Userid {Userid}");
        }
    }
}