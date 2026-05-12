using System.Collections.Generic;
using CourseAdminSystem.Model.Entities;

namespace CourseAdminSystem.Model.Repositories;

public interface IToiletRepository
{
    Toilet GetToiletById(int toiletid);
    List<Toilet> GetToilets();
    Toilet InsertToilet(Toilet toilet);
    bool UpdateToilet(Toilet toilet);
    bool DeleteToilet(int toiletid);
}
