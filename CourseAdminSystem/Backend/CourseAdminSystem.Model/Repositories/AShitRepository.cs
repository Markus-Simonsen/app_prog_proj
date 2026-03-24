using System;
using CourseAdminSystem.Model.Entities;
using Microsoft.Extensions.Configuration;
using Npgsql;
using NpgsqlTypes;
namespace CourseAdminSystem.Model.Repositories;

public class AShitRepository : BaseRepository
{
    public AShitRepository(IConfiguration configuration) : base(configuration) { }
    public AShit GetAShitById(int shitid)
    {
        NpgsqlConnection dbConn = null;
        try
        {
            //create a new connection for database
            dbConn = new NpgsqlConnection(ConnectionString);
            //creating an SQL command
            var cmd = dbConn.CreateCommand();
            cmd.CommandText = "select * from ashit where shitid = @shitid";
            cmd.Parameters.Add("@shitid", NpgsqlDbType.Integer).Value = shitid;
            //call the base method to get data
            var data = GetData(dbConn, cmd);
            if (data != null)
            {
                if (data.Read()) //every time loop runs it reads next like from fetched rows
                {
                    return new AShit(Convert.ToInt32(data["shitid"]))
                    {
                        Shitterid = Convert.ToInt32(data["shitterid"]), //question 1: isn't shitterID under ashit equal id under shitter?
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
        var moreshits = new List<AShit>();
        try
        {
            //create a new connection for database
            dbConn = new NpgsqlConnection(ConnectionString);
            //creating an SQL command
            var cmd = dbConn.CreateCommand();
            cmd.CommandText = "select * from ashit";
            //call the base method to get data
            var data = GetData(dbConn, cmd);
            if (data != null)
            {
                while (data.Read()) //every time loop runs it reads next like from fetched rows
                {
                    AShit a = new AShit(Convert.ToInt32(data["shitid"]))
                    {
                        Shitterid = Convert.ToInt32(data["shitterid"]),
                        Toiletid = Convert.ToInt32(data["toiletid"]),
                        Time = DateTime.Parse(data["time"].ToString()),
                        Rating = Convert.ToInt32(data["rating"]),
                        Review = data["review"].ToString()
                    };
                    moreshits.Add(a);
                }
            }
            return moreshits;
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
insert into ashit
(shitid,shitterid, toiletid, time, rating, review)
values
(@shitid, @shitterid, @toiletid, @time, @rating, @review)
";
            //adding parameters in a better way
            cmd.Parameters.AddWithValue("@shitid", NpgsqlDbType.Integer, a.ShitID);
            cmd.Parameters.AddWithValue("@shitterid", NpgsqlDbType.Integer, a.Shitterid);
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
update ashit set
shitid=@shitid,
shitterid=@shitterid,
toiletid=@toiletid,
time=@time,
rating=@rating,
review=@review
where
shitid = @shitid";
        cmd.Parameters.AddWithValue("@shitid", NpgsqlDbType.Integer, a.ShitID);
        cmd.Parameters.AddWithValue("@shitterid", NpgsqlDbType.Integer, a.Shitterid);
        cmd.Parameters.AddWithValue("@toiletid", NpgsqlDbType.Integer, a.Toiletid);
        cmd.Parameters.AddWithValue("@time", NpgsqlDbType.Date, a.Time);
        cmd.Parameters.AddWithValue("@rating", NpgsqlDbType.Integer, a.Rating);
        cmd.Parameters.AddWithValue("@review", NpgsqlDbType.Text, a.Review);
        cmd.Parameters.AddWithValue("@shitid", NpgsqlDbType.Integer, a.ShitID);
        bool result = UpdateData(dbConn, cmd);
        return result;
    }
    public bool DeleteAShit(int id)
    {
        var dbConn = new NpgsqlConnection(ConnectionString);
        var cmd = dbConn.CreateCommand();
        cmd.CommandText = @"
delete from ashit
where shitid = @shitid
";
        //adding parameters in a better way
        cmd.Parameters.AddWithValue("@shitid", NpgsqlDbType.Integer, id);
        //will return true if all goes well
        bool result = DeleteData(dbConn, cmd);
        return result;
    }
}