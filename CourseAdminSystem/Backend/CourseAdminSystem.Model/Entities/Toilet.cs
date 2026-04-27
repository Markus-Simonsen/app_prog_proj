namespace CourseAdminSystem.Model.Entities;

public class Toilet
{
    public Toilet() { }
    public Toilet(int toiletId) { ToiletId = toiletId; }
    public int ToiletId { get; set; }
    public int Location { get; set; }
    
}