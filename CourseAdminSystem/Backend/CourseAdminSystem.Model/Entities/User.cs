namespace CourseAdminSystem.Model.Entities;

public class User
{
    public User() { }
    public User(int id) { Userid = id; }
    public int Userid { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
}