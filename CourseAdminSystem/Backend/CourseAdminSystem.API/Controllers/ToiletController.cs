using CourseAdminSystem.Model.Entities;
using CourseAdminSystem.Model.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CourseAdminSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToiletController : ControllerBase
    {
        protected IToiletRepository Repository { get; }
        public ToiletController(IToiletRepository repository)
        {
            Repository = repository;
        }

        [HttpGet("{id}")]
        public ActionResult<Toilet> GetToilet([FromRoute] int id)
        {
            Toilet toilet = Repository.GetToiletById(id);
            if (toilet == null)
            {
                return NotFound();
            }
            return Ok(toilet);
        }

        [HttpGet]
        public ActionResult<IEnumerable<Toilet>> GetToilets()
        {
            return Ok(Repository.GetToilets());
        }

        [HttpPost]
        public ActionResult Post([FromBody] Toilet toilet)
        {
            if (toilet == null)
            {
                return BadRequest("Toilet info not correct");
            }
            Toilet created = Repository.InsertToilet(toilet);
            if (created != null)
            {
                return Ok(created);
            }
            return BadRequest();
        }

        [HttpPut]

        public ActionResult UpdateToilet([FromBody] Toilet toilet)
        {
            if (toilet == null)
            {
                return BadRequest("Toilet info not correct");
            }
            Toilet existinToilet = Repository.GetToiletById(toilet.ToiletId);
            if (existinToilet == null)
            {
                return NotFound($"Toilet with id {toilet.ToiletId} not found");
            }
            bool status = Repository.UpdateToilet(toilet);
            if (status)
            {
                return Ok();
            }
            return BadRequest("Something went wrong");
        }
        [HttpDelete("{ToiletId}")]
        public ActionResult DeleteToilet([FromRoute] int ToiletId)
        {
            Toilet existingToilet = Repository.GetToiletById(ToiletId);
            if (existingToilet == null)
            {
                return NotFound($"Toilet with id {ToiletId} not found");
            }
            bool status = Repository.DeleteToilet(ToiletId);
            if (status)
            {
                return NoContent();
            }
            return BadRequest($"Unable to delete toilet with id {ToiletId}");
        }
    }
}