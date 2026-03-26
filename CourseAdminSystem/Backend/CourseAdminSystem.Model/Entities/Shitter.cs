namespace CourseAdminSystem.Model.Entities;

public class Shitter
{
    public Shitter() { }
    public Shitter(int id) { Shitterid = id; }
    public int Shitterid { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
}