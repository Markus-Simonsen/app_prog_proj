using CourseAdminSystem.Model.Entities;
using CourseAdminSystem.Model.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CourseAdminSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShitterController : ControllerBase
    {
        protected ShitterRepository Repository { get; }
        public ShitterController(ShitterRepository repository)
        {
            Repository = repository;
        }

        [HttpGet("{id}")]
        public ActionResult<Shitter> GetShitter([FromRoute] int id)
        {
            Shitter shitter = Repository.GetShitterById(id);
            if (shitter == null)
            {
                return NotFound();
            }
            return Ok(shitter);
        }

        [HttpGet]
        public ActionResult<IEnumerable<Shitter>> GetShitters()
        {
            return Ok(Repository.GetShitters());
        }

        [HttpPost]
        public ActionResult Post([FromBody] Shitter shitter)
        {
            if (shitter == null)
            {
                return BadRequest("Shitter info not correct");
            }
            bool status = Repository.InsertShitter(shitter);
            if (status)
            {
                return Ok();
            }
            return BadRequest();
        }

        [HttpPut]

        public ActionResult UpdateShitter([FromBody] Shitter shitter)
        {
            if (shitter == null)
            {
                return BadRequest("Shitter info not correct");
            }
            Shitter existinShitter = Repository.GetShitterById(shitter.Id);
            if (existinShitter == null)
            {
                return NotFound($"Shitter with id {shitter.Id} not found");
            }
            bool status = Repository.UpdateShitter(shitter);
            if (status)
            {
                return Ok();
            }
            return BadRequest("Something went wrong");
        }
        [HttpDelete("{id}")]
        public ActionResult DeleteShitter([FromRoute] int id)
        {
            Shitter existingShitter = Repository.GetShitterById(id);
            if (existingShitter == null)
            {
                return NotFound($"Shitter with id {id} not found");
            }
            bool status = Repository.DeleteShitter(id);
            if (status)
            {
                return NoContent();
            }
            return BadRequest($"Unable to delete shitter with id {id}");
        }
    }
}