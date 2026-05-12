using System;
using CourseAdminSystem.Model.Entities;
using Microsoft.Extensions.Configuration;
using Npgsql;
using NpgsqlTypes;
namespace CourseAdminSystem.Model.Repositories;

public class UserRepository : BaseRepository, IUserRepository
{
    public UserRepository(IConfiguration configuration) : base(configuration)
    {
        EnsurePgcryptoEnabled();
    }
    public virtual User GetUserById(int userid)
    {
        NpgsqlConnection dbConn = null;
        try
        {
            //create a new connection for database
            dbConn = new NpgsqlConnection(ConnectionString);
            //creating an SQL command
            var cmd = dbConn.CreateCommand();
            cmd.CommandText = @"select * from ""user"" where userid = @userid";
            cmd.Parameters.Add("@userid", NpgsqlDbType.Integer).Value = userid;
            //call the base method to get data
            var data = GetData(dbConn, cmd);
            if (data != null)
            {
                if (data.Read()) //every time loop runs it reads next like from fetched rows
                {
                    return new User(Convert.ToInt32(data["userid"]))
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
    public virtual List<User> GetUsers()
    {
        NpgsqlConnection dbConn = null;
        var users = new List<User>();
        try
        {
            //create a new connection for database
            dbConn = new NpgsqlConnection(ConnectionString);
            //creating an SQL command
            var cmd = dbConn.CreateCommand();
            cmd.CommandText = @"select * from ""user""";
            //call the base method to get data
            var data = GetData(dbConn, cmd);
            if (data != null)
            {
                while (data.Read()) //every time loop runs it reads next like from fetched rows
                {
                    User s = new User(Convert.ToInt32(data["userid"]))
                    {
                        FirstName = data["firstname"].ToString(),
                        LastName = data["lastname"].ToString(),
                        Email = data["email"].ToString(),
                        Password = data["password"].ToString()
                    };
                    users.Add(s);
                }
            }
            return users;
        }
        finally
        {
            dbConn?.Close();
        }
    }
    //add a new ""user""
    public virtual bool InsertUser(User s)
    {
        NpgsqlConnection dbConn = null;
        try
        {
            dbConn = new NpgsqlConnection(ConnectionString);
            var cmd = dbConn.CreateCommand();
            cmd.CommandText = @"
insert into ""user""
(firstname, lastname, email, password)
values
(@firstname, @lastname, @email, crypt(@password, gen_salt('bf')))
";
            //adding parameters in a better way
            //cmd.Parameters.AddWithValue("@userid", NpgsqlDbType.Bigint, s.Userid);
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
    public virtual bool UpdateUser(User s)
    {
        var dbConn = new NpgsqlConnection(ConnectionString);
        var cmd = dbConn.CreateCommand();
        cmd.CommandText = @"
update ""user"" set
firstname = @firstname,
lastname = @lastname,
email = @email,
password = crypt(@password, gen_salt('bf'))
where
userid = @userid";
        cmd.Parameters.AddWithValue("@firstname", NpgsqlDbType.Text, s.FirstName);
        cmd.Parameters.AddWithValue("@lastname", NpgsqlDbType.Text, s.LastName);
        cmd.Parameters.AddWithValue("@email", NpgsqlDbType.Text, s.Email);
        cmd.Parameters.AddWithValue("@password", NpgsqlDbType.Text, s.Password);
        cmd.Parameters.AddWithValue("@userid", NpgsqlDbType.Integer, s.Userid);
        bool result = UpdateData(dbConn, cmd);
        return result;
    }
    public virtual bool DeleteUser(int Userid)
    {
        var dbConn = new NpgsqlConnection(ConnectionString);
        var cmd = dbConn.CreateCommand();
        cmd.CommandText = @"
delete from ""user""
where userid = @userid
";
        //adding parameters in a better way
        cmd.Parameters.AddWithValue("@userid", NpgsqlDbType.Integer, Userid);
        //will return true if all goes well
        bool result = DeleteData(dbConn, cmd);
        return result;
    }

    public User GetUserByEmail(string email)
    {
        NpgsqlConnection dbConn = null;
        try
        {
            dbConn = new NpgsqlConnection(ConnectionString);
            var cmd = dbConn.CreateCommand();
            cmd.CommandText = @"select * from ""user"" where email = @email";
            cmd.Parameters.Add("@email", NpgsqlDbType.Text).Value = email;
            var data = GetData(dbConn, cmd);
            if (data != null && data.Read())
            {
                return new User(Convert.ToInt32(data["userid"]))
                {
                    FirstName = data["firstname"].ToString(),
                    LastName = data["lastname"].ToString(),
                    Email = data["email"].ToString(),
                    Password = data["password"].ToString()
                };
            }
            return null;
        }
        finally
        {
            dbConn?.Close();
        }
    }

    public void EnsurePgcryptoEnabled()
    {
        NpgsqlConnection dbConn = null;
        try
        {
            dbConn = new NpgsqlConnection(ConnectionString);
            var cmd = dbConn.CreateCommand();
            cmd.CommandText = "CREATE EXTENSION IF NOT EXISTS pgcrypto;";
            InsertData(dbConn, cmd);
        }
        finally
        {
            dbConn?.Close();
        }
    }

    public bool VerifyPassword(string email, string password)
    {
        NpgsqlConnection dbConn = null;
        try
        {
            dbConn = new NpgsqlConnection(ConnectionString);
            var cmd = dbConn.CreateCommand();
            cmd.CommandText = @"select crypt(@password, password) = password as is_valid from ""user"" where email = @email";
            cmd.Parameters.AddWithValue("@email", NpgsqlDbType.Text, email);
            cmd.Parameters.AddWithValue("@password", NpgsqlDbType.Text, password);
            var data = GetData(dbConn, cmd);
            if (data != null && data.Read())
            {
                return Convert.ToBoolean(data["is_valid"]);
            }
            return false;
        }
        finally
        {
            dbConn?.Close();
        }
    }
}