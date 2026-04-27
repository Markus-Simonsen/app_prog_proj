using System;
using CourseAdminSystem.Model.Entities;
using Microsoft.Extensions.Configuration;
using Npgsql;
using NpgsqlTypes;
namespace CourseAdminSystem.Model.Repositories;

public class ToiletRepository : BaseRepository
{
    public ToiletRepository(IConfiguration configuration) : base(configuration) { }
    public Toilet GetToiletById(int Toiletid)
    {
        NpgsqlConnection dbConn = null;
        try
        {
            //create a new connection for database
            dbConn = new NpgsqlConnection(ConnectionString);
            //creating an SQL command
            var cmd = dbConn.CreateCommand();
            cmd.CommandText = "select * from toilet where toiletid = @id";
            cmd.Parameters.Add("@id", NpgsqlDbType.Integer).Value = Toiletid;
            //call the base method to get data
            var data = GetData(dbConn, cmd);
            if (data != null)
            {
                if (data.Read()) //every time loop runs it reads next like from fetched rows
                {
                    return new Toilet(Convert.ToInt32(data["toiletid"]))
                    {
                        Location = Convert.ToInt32(data["location"]),
                        ToiletId = Convert.ToInt32(data["toiletid"])
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
    public List<Toilet> GetToilets()
    {
        NpgsqlConnection dbConn = null;
        var toilet = new List<Toilet>();
        try
        {
            //create a new connection for database
            dbConn = new NpgsqlConnection(ConnectionString);
            //creating an SQL command
            var cmd = dbConn.CreateCommand();
            cmd.CommandText = "select * from toilet";
            //call the base method to get data
            var data = GetData(dbConn, cmd);
            if (data != null)
            {
                while (data.Read()) //every time loop runs it reads next like from fetched rows
                {
                    Toilet t = new Toilet(Convert.ToInt32(data["toiletid"]))
                    {
                        Location = Convert.ToInt32(data["location"]),
                        ToiletId = Convert.ToInt32(data["toiletid"])
                    };
                    toilet.Add(t);
                }
            }
            return toilet;
        }
        finally 
        {
            dbConn?.Close();
        }
    }
    //add a new toilet
    public Toilet InsertToilet(Toilet t)
    {
        NpgsqlConnection dbConn = null;
        try
        {
            dbConn = new NpgsqlConnection(ConnectionString);
            var cmd = dbConn.CreateCommand();
            cmd.CommandText = @"
insert into toilet (location)
values (@location)
RETURNING toiletid
";
            //adding parameters in a better way
            //cmd.Parameters.AddWithValue("@toiletid", NpgsqlDbType.Integer, t.ToiletId);
            cmd.Parameters.AddWithValue("@location", NpgsqlDbType.Integer, t.Location);
            dbConn.Open();
            var newId = cmd.ExecuteScalar();
            t.ToiletId = Convert.ToInt32(newId);
            //will return true if all goes well
            return t;
        }
        finally
        {
            dbConn?.Close();
        }
    }
    public bool UpdateToilet(Toilet t)
    {
        var dbConn = new NpgsqlConnection(ConnectionString);
        var cmd = dbConn.CreateCommand();
        cmd.CommandText = @"
update toilet set
    location = @location
where
    toiletid = @id";
        cmd.Parameters.AddWithValue("@location", NpgsqlDbType.Integer, t.Location);
        cmd.Parameters.AddWithValue("@id", NpgsqlDbType.Integer, t.ToiletId);
        bool result = UpdateData(dbConn, cmd);
        return result;
    }
    public bool DeleteToilet(int Toiletid)
    {
        var dbConn = new NpgsqlConnection(ConnectionString);
        var cmd = dbConn.CreateCommand();
        cmd.CommandText = @"
delete from toilet
where toiletid = @id
";
        //adding parameters in a better way
        cmd.Parameters.AddWithValue("@id", NpgsqlDbType.Integer, Toiletid);
        //will return true if all goes well
        bool result = DeleteData(dbConn, cmd);
        return result;
    }
}