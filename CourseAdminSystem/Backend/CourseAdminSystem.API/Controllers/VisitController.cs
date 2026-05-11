using CourseAdminSystem.Model.Entities;
using CourseAdminSystem.Model.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CourseAdminSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VisitController : ControllerBase
    {
        protected VisitRepository Repository { get; }
        public VisitController(VisitRepository repository)
        {
            Repository = repository;
        }

        [HttpGet("{Visitid}")]
        public ActionResult<Visit> GetVisit([FromRoute] int Visitid)
        {
            Visit visit = Repository.GetVisitById(Visitid);
            if (visit == null)
            {
                return NotFound();
            }
            return Ok(visit);
        }

        [HttpGet]
        public ActionResult<IEnumerable<Visit>> GetMoreVisits([FromQuery] int? toiletId, bool jointables = false)
        {
            if (toiletId.HasValue)
            {
                return Ok(Repository.GetVisitsByToiletId(toiletId.Value, jointables));
            }
            return Ok(Repository.GetMoreVisits());
        }

        [HttpPost]
        public ActionResult Post([FromBody] Visit visit)
        {
            if (visit == null)
            {
                return BadRequest("Visit info not correct");
            }
            bool status = Repository.InsertVisit(visit);
            if (status)
            {
                return Ok();
            }
            return BadRequest();
        }

        [HttpPut]

        public ActionResult UpdateVisit([FromBody] Visit visit)
        {
            if (visit == null)
            {
                return BadRequest("Visit info not correct");
            }
            Visit existingVisit = Repository.GetVisitById(visit.VisitID);
            if (existingVisit == null)
            {
                return NotFound($"Visit with Visitid {visit.VisitID} not found");
            }
            bool status = Repository.UpdateVisit(visit);
            if (status)
            {
                return Ok();
            }
            return BadRequest("Something went wrong");
        }
        [HttpDelete("{Visitid}")]
        public ActionResult DeleteVisit([FromRoute] int Visitid)
        {
            Visit existingVisit = Repository.GetVisitById(Visitid);
            if (existingVisit == null)
            {
                return NotFound($"Visit with Visitid {Visitid} not found");
            }
            bool status = Repository.DeleteVisit(Visitid);
            if (status)
            {
                return NoContent();
            }
            return BadRequest($"Unable to delete visit with Visitid {Visitid}");
        }
    }
}