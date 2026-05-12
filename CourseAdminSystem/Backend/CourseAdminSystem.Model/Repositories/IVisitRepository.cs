using System.Collections.Generic;
using CourseAdminSystem.Model.Entities;

namespace CourseAdminSystem.Model.Repositories;

public interface IVisitRepository
{
    Visit GetVisitById(int visitid);
    List<Visit> GetMoreVisits();
    List<Visit> GetVisitsByToiletId(int toiletid, bool jointables);
    bool InsertVisit(Visit visit);
    bool UpdateVisit(Visit visit);
    bool DeleteVisit(int visitid);
}
