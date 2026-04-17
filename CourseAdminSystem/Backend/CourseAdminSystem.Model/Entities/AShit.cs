namespace CourseAdminSystem.Model.Entities;

public class AShit
{
    public AShit() { }
    public AShit(int shitid) { ShitID = shitid; }
    public int ShitID { get; set; }
    public int Shitterid { get; set; }
    public int Toiletid { get; set; }
    public DateTime Time { get; set; }
    public int Rating { get; set; }
    public string Review { get; set; }

    public Shitter TheShitter { get; set; }

    public Toilet TheToilet { get; set; }

}

