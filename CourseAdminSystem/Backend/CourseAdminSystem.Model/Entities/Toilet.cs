namespace CourseAdminSystem.Model.Entities;

public class Toilet
{
    public Toilet(int toiletId) { ToiletId = toiletId; }
    public int ToiletId { get; set; }
    public string Location { get; set; }
    
}