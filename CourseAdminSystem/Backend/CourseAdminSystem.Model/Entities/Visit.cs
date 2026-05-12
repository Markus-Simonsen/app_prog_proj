namespace CourseAdminSystem.Model.Entities;

public class Visit
{
    public Visit() { }
    public Visit(int visitid) { VisitID = visitid; }
    public int VisitID { get; set; }
    public int Userid { get; set; }
    public int Toiletid { get; set; }
    public DateTime Time { get; set; }
    public int Rating { get; set; }
    public string Review { get; set; }

    public User TheUser { get; set; }

    public Toilet TheToilet { get; set; }

}

