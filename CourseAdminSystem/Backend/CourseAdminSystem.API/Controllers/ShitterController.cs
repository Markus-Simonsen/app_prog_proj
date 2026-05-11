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

        [HttpGet("{Shitterid}")]
        public virtual ActionResult<Shitter> GetShitter([FromRoute] int Shitterid)
        {
            Shitter shitter = Repository.GetShitterById(Shitterid);
            if (shitter == null)
            {
                return NotFound("Shitter with Shitterid " + Shitterid + " not found");
            }
            return Ok(shitter);
        }

        [HttpGet]
        public virtual ActionResult<IEnumerable<Shitter>> GetShitters()
        {
            return Ok(Repository.GetShitters());
        }

        [HttpPost]
        public virtual ActionResult Post([FromBody] Shitter shitter)
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

        public virtual ActionResult UpdateShitter([FromBody] Shitter shitter)
        {
            if (shitter == null)
            {
                return BadRequest("Shitter info not correct");
            }
            Shitter existinShitter = Repository.GetShitterById(shitter.Shitterid);
            if (existinShitter == null)
            {
                return NotFound($"Shitter with Shitterid {shitter.Shitterid} not found");
            }
            bool status = Repository.UpdateShitter(shitter);
            if (status)
            {
                return Ok();
            }
            return BadRequest("Something went wrong");
        }
        [HttpDelete("{Shitterid}")]
        public virtual ActionResult DeleteShitter([FromRoute] int Shitterid)
        {
            Shitter existingShitter = Repository.GetShitterById(Shitterid);
            if (existingShitter == null)
            {
                return NotFound($"Shitter with Shitterid {Shitterid} not found");
            }
            bool status = Repository.DeleteShitter(Shitterid);
            if (status)
            {
                return NoContent();
            }
            return BadRequest($"Unable to delete shitter with Shitterid {Shitterid}");
        }
    }
}