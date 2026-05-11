using System;
using CourseAdminSystem.Model.Entities;
using Microsoft.Extensions.Configuration;
using Npgsql;
using NpgsqlTypes;
namespace CourseAdminSystem.Model.Repositories;

public class VisitRepository : BaseRepository
{
    public VisitRepository(IConfiguration configuration) : base(configuration) { }
    public Visit GetVisitById(int visitid)
    {
        NpgsqlConnection dbConn = null;
        try
        {
            //create a new connection for database
            dbConn = new NpgsqlConnection(ConnectionString);
            //creating an SQL command
            var cmd = dbConn.CreateCommand();
            cmd.CommandText = "select * from visit where visitid = @visitid";
            cmd.Parameters.Add("@visitid", NpgsqlDbType.Integer).Value = visitid;
            //call the base method to get data
            var data = GetData(dbConn, cmd);
            if (data != null)
            {
                if (data.Read()) //every time loop runs it reads next like from fetched rows
                {
                    return new Visit(Convert.ToInt32(data["visitid"]))
                    {
                        Userid = Convert.ToInt32(data["userid"]), //question 1: isn't userID under visit equal id under user?
                        Toiletid = Convert.ToInt32(data["toiletid"]),
                        Time = DateTime.Parse(data["time"].ToString()),
                        Rating = Convert.ToInt32(data["rating"]),
                        Review = data["review"].ToString()
                    };
                }
            }
            return null;
        }
        finally
        {
            dbConn?.Close();
        }
    }
    public List<AShit> GetMoreShits()
    {
        NpgsqlConnection dbConn = null;
        var morevisits = new List<Visit>();
        try
        {
            //create a new connection for database
            dbConn = new NpgsqlConnection(ConnectionString);
            //creating an SQL command
            var cmd = dbConn.CreateCommand();
            cmd.CommandText = "select * from visit";
            //call the base method to get data
            var data = GetData(dbConn, cmd);
            if (data != null)
            {
                while (data.Read()) //every time loop runs it reads next like from fetched rows
                {
                    Visit a = new Visit(Convert.ToInt32(data["visitid"]))
                    {
                        Userid = Convert.ToInt32(data["userid"]),
                        Toiletid = Convert.ToInt32(data["toiletid"]),
                        Time = DateTime.Parse(data["time"].ToString()),
                        Rating = Convert.ToInt32(data["rating"]),
                        Review = data["review"].ToString()
                    };
                    morevisits.Add(a);
                }
            }
            return morevisits;
        }
        finally
        {
            dbConn?.Close();
        }
    }

    public List<AShit> GetAShitsByToiletId(int toiletid, bool jointables)
    {
        NpgsqlConnection dbConn = null;
        var visits = new List<Visit>();
        try
        {
            dbConn = new NpgsqlConnection(ConnectionString);
            var cmd = dbConn.CreateCommand();
            if (jointables)
            {
                cmd.CommandText = @"
select v.*, u.*, t.* from visit v
inner join user u on v.userid = u.userid
inner join toilet t on v.toiletid = t.toiletid
where v.toiletid = @toiletid
";
                cmd.Parameters.Add("@toiletid", NpgsqlDbType.Integer).Value = toiletid;
                var data = GetData(dbConn, cmd);
                if (data != null)
                {
                    while (data.Read())
                    {
                        Visit a = new Visit(Convert.ToInt32(data["visitid"]))
                        {
                            Userid = Convert.ToInt32(data["userid"]),
                            Toiletid = Convert.ToInt32(data["toiletid"]),
                            Time = DateTime.Parse(data["time"].ToString()),
                            Rating = Convert.ToInt32(data["rating"]),
                            Review = data["review"].ToString(),
                            TheUser = new User(Convert.ToInt32(data["userid"]))
                            {
                                FirstName = data["firstname"].ToString(),
                                LastName = data["lastname"].ToString(),
                                Email = data["email"].ToString(),
                                Password = data["password"].ToString()
                            },
                            TheToilet = new Toilet(Convert.ToInt32(data["toiletid"]))
                            {
                                Location = Convert.ToInt32(data["location"]),
                            }
                        };
                        visits.Add(a);
                    }
                }
            }
            else
            {

                cmd.CommandText = "select * from visit where toiletid = @toiletid";
                cmd.Parameters.Add("@toiletid", NpgsqlDbType.Integer).Value = toiletid;
                var data = GetData(dbConn, cmd);
                if (data != null)
                {
                    while (data.Read())
                    {
                        Visit a = new Visit(Convert.ToInt32(data["visitid"]))
                        {
                            Userid = Convert.ToInt32(data["userid"]),
                            Toiletid = Convert.ToInt32(data["toiletid"]),
                            Time = DateTime.Parse(data["time"].ToString()),
                            Rating = Convert.ToInt32(data["rating"]),
                            Review = data["review"].ToString()
                        };
                        visits.Add(a);
                    }
                }
            }
            return visits;
        }
        finally
        {
            dbConn?.Close();
        }
    }
    //add a new shitter
    public bool InsertAShit(AShit a)
    {
        NpgsqlConnection dbConn = null;
        try
        {
            dbConn = new NpgsqlConnection(ConnectionString);
            var cmd = dbConn.CreateCommand();
            cmd.CommandText = @"
insert into visit
(userid, toiletid, time, rating, review)
values
(@userid, @toiletid, @time, @rating, @review)
";
            //adding parameters in a better way
            //cmd.Parameters.AddWithValue("@visitid", NpgsqlDbType.Integer, a.VisitID);
            cmd.Parameters.AddWithValue("@userid", NpgsqlDbType.Integer, a.Userid);
            cmd.Parameters.AddWithValue("@toiletid", NpgsqlDbType.Integer, a.Toiletid);
            cmd.Parameters.AddWithValue("@time", NpgsqlDbType.Date, a.Time);
            cmd.Parameters.AddWithValue("@rating", NpgsqlDbType.Integer, a.Rating);
            cmd.Parameters.AddWithValue("@review", NpgsqlDbType.Text, a.Review);
            //will return true if all goes well
            bool result = InsertData(dbConn, cmd);
            return result;
        }
        finally
        {
            dbConn?.Close();
        }
    }
    public bool UpdateAShit(AShit a)
    {
        var dbConn = new NpgsqlConnection(ConnectionString);
        var cmd = dbConn.CreateCommand();
        cmd.CommandText = @"
update visit set
visitid=@visitid,
userid=@userid,
toiletid=@toiletid,
time=@time,
rating=@rating,
review=@review
where
visitid = @visitid";
        cmd.Parameters.AddWithValue("@visitid", NpgsqlDbType.Integer, a.VisitID);
        cmd.Parameters.AddWithValue("@userid", NpgsqlDbType.Integer, a.Userid);
        cmd.Parameters.AddWithValue("@toiletid", NpgsqlDbType.Integer, a.Toiletid);
        cmd.Parameters.AddWithValue("@time", NpgsqlDbType.Date, a.Time);
        cmd.Parameters.AddWithValue("@rating", NpgsqlDbType.Integer, a.Rating);
        cmd.Parameters.AddWithValue("@review", NpgsqlDbType.Text, a.Review);
        cmd.Parameters.AddWithValue("@visitid", NpgsqlDbType.Integer, a.VisitID);
        bool result = UpdateData(dbConn, cmd);
        return result;
    }
    public bool DeleteAShit(int id)
    {
        var dbConn = new NpgsqlConnection(ConnectionString);
        var cmd = dbConn.CreateCommand();
        cmd.CommandText = @"
delete from visit
where visitid = @visitid
";
        //adding parameters in a better way
        cmd.Parameters.AddWithValue("@visitid", NpgsqlDbType.Integer, id);
        //will return true if all goes well
        bool result = DeleteData(dbConn, cmd);
        return result;
    }
}