namespace CourseAdminSystem.Model.Entities;

public class AShit
{
    public AShit(int shitid) { ShitID = shitid; }
    public int ShitID { get; set; }
    public int userid { get; set; }
    public int toiletid{get;set;}
    public DateTime time { get; set; }
    public int rating { get; set; }
    public string review { get; set; }
}

