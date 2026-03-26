using System;
using CourseAdminSystem.Model.Entities;
using Microsoft.Extensions.Configuration;
using Npgsql;
using NpgsqlTypes;
namespace CourseAdminSystem.Model.Repositories;

public class ShitterRepository : BaseRepository
{
    public ShitterRepository(IConfiguration configuration) : base(configuration) { }
    public Shitter GetShitterById(int shitterid)
    {
        NpgsqlConnection dbConn = null;
        try
        {
            //create a new connection for database
            dbConn = new NpgsqlConnection(ConnectionString);
            //creating an SQL command
            var cmd = dbConn.CreateCommand();
            cmd.CommandText = "select * from shitter where shitterid = @shitterid";
            cmd.Parameters.Add("@shitterid", NpgsqlDbType.Integer).Value = shitterid;
            //call the base method to get data
            var data = GetData(dbConn, cmd);
            if (data != null)
            {
                if (data.Read()) //every time loop runs it reads next like from fetched rows
                {
                    return new Shitter(Convert.ToInt32(data["shitterid"]))
                    {
                        FirstName = data["firstname"].ToString(),
                        LastName = data["lastname"].ToString(),
                        Email = data["email"].ToString(),
                        Password = data["password"].ToString()
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
    public List<Shitter> GetShitters()
    {
        NpgsqlConnection dbConn = null;
        var shitters = new List<Shitter>();
        try
        {
            //create a new connection for database
            dbConn = new NpgsqlConnection(ConnectionString);
            //creating an SQL command
            var cmd = dbConn.CreateCommand();
            cmd.CommandText = "select * from shitter";
            //call the base method to get data
            var data = GetData(dbConn, cmd);
            if (data != null)
            {
                while (data.Read()) //every time loop runs it reads next like from fetched rows
                {
                    Shitter s = new Shitter(Convert.ToInt32(data["shitterid"]))
                    {
                        FirstName = data["firstname"].ToString(),
                        LastName = data["lastname"].ToString(),
                        Email = data["email"].ToString(),
                        Password = data["password"].ToString()
                    };
                    shitters.Add(s);
                }
            }
            return shitters;
        }
        finally
        {
            dbConn?.Close();
        }
    }
    //add a new shitter
    public bool InsertShitter(Shitter s)
    {
        NpgsqlConnection dbConn = null;
        try
        {
            dbConn = new NpgsqlConnection(ConnectionString);
            var cmd = dbConn.CreateCommand();
            cmd.CommandText = @"
insert into shitter
(shitterid, firstname,lastname, email, password)
values
(@shitterid, @firstname,@lastname, @email, @password)
";
            //adding parameters in a better way
            cmd.Parameters.AddWithValue("@shitterid", NpgsqlDbType.Bigint, s.Shitterid);
            cmd.Parameters.AddWithValue("@firstname", NpgsqlDbType.Text, s.FirstName);
            cmd.Parameters.AddWithValue("@lastname", NpgsqlDbType.Text, s.LastName);
            cmd.Parameters.AddWithValue("@email", NpgsqlDbType.Text, s.Email);
            cmd.Parameters.AddWithValue("@password", NpgsqlDbType.Text, s.Password);
            //will return true if all goes well
            bool result = InsertData(dbConn, cmd);
            return result;
        }
        finally
        {
            dbConn?.Close();
        }
    }
    public bool UpdateShitter(Shitter s)
    {
        var dbConn = new NpgsqlConnection(ConnectionString);
        var cmd = dbConn.CreateCommand();
        cmd.CommandText = @"
update shitter set
firstname=@firstname,
lastname=@lastname,
email=@email,
password=@password
where
shitterid = @shitterid";
        cmd.Parameters.AddWithValue("@firstname", NpgsqlDbType.Text, s.FirstName);
        cmd.Parameters.AddWithValue("@lastname", NpgsqlDbType.Text, s.LastName);
        cmd.Parameters.AddWithValue("@email", NpgsqlDbType.Text, s.Email);
        cmd.Parameters.AddWithValue("@password", NpgsqlDbType.Text, s.Password);
        cmd.Parameters.AddWithValue("@shitterid", NpgsqlDbType.Integer, s.Shitterid);
        bool result = UpdateData(dbConn, cmd);
        return result;
    }
    public bool DeleteShitter(int Shitterid)
    {
        var dbConn = new NpgsqlConnection(ConnectionString);
        var cmd = dbConn.CreateCommand();
        cmd.CommandText = @"
delete from shitter
where shitterid = @shitterid
";
        //adding parameters in a better way
        cmd.Parameters.AddWithValue("@shitterid", NpgsqlDbType.Integer, Shitterid);
        //will return true if all goes well
        bool result = DeleteData(dbConn, cmd);
        return result;
    }
}