using System.Collections.Generic;
using CourseAdminSystem.Model.Entities;

namespace CourseAdminSystem.Model.Repositories;

public interface IUserRepository
{
    User GetUserById(int userid);
    List<User> GetUsers();
    bool InsertUser(User user);
    bool UpdateUser(User user);
    bool DeleteUser(int userid);
    User GetUserByEmail(string email);
    void EnsurePgcryptoEnabled();
    bool VerifyPassword(string email, string password);
}
