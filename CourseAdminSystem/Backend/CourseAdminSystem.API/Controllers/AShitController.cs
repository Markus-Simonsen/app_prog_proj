using CourseAdminSystem.Model.Entities;
using CourseAdminSystem.Model.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CourseAdminSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AShitController : ControllerBase
    {
        protected AShitRepository Repository { get; }
        public AShitController(AShitRepository repository)
        {
            Repository = repository;
        }

        [HttpGet("{id}")]
        public ActionResult<AShit> GetAShit([FromRoute] int id)
        {
            AShit ashit = Repository.GetAShitById(id);
            if (ashit == null)
            {
                return NotFound();
            }
            return Ok(ashit);
        }

        [HttpGet]
        public ActionResult<IEnumerable<AShit>> GetMoreShits()
        {
            return Ok(Repository.GetMoreShits());
        }

        [HttpPost]
        public ActionResult Post([FromBody] AShit ashit)
        {
            if (ashit == null)
            {
                return BadRequest("AShit info not correct");
            }
            bool status = Repository.InsertAShit(ashit);
            if (status)
            {
                return Ok();
            }
            return BadRequest();
        }

        [HttpPut]

        public ActionResult UpdateAShit([FromBody] AShit ashit)
        {
            if (ashit == null)
            {
                return BadRequest("AShit info not correct");
            }
            AShit existingAShit = Repository.GetAShitById(ashit.ShitID);
            if (existingAShit == null)
            {
                return NotFound($"AShit with id {ashit.ShitID} not found");
            }
            bool status = Repository.UpdateAShit(ashit);
            if (status)
            {
                return Ok();
            }
            return BadRequest("Something went wrong");
        }
        [HttpDelete("{id}")]
        public ActionResult DeleteAShit([FromRoute] int id)
        {
            AShit existingAShit = Repository.GetAShitById(id);
            if (existingAShit == null)
            {
                return NotFound($"AShit with id {id} not found");
            }
            bool status = Repository.DeleteAShit(id);
            if (status)
            {
                return NoContent();
            }
            return BadRequest($"Unable to delete ashit with id {id}");
        }
    }
}