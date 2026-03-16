namespace CourseAdminSystem.Model.Entities;

public class Shitter
{
    public Shitter(int id) { Id = id; }
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public DateOnly DateOfBirth { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
}