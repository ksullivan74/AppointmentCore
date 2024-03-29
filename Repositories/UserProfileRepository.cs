using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.Collections.Generic;
using Appointment_Core.Models;
using Appointment_Core.Utils;
using Appointment_Core.Repositories;

namespace Appointment_Core.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public UserProfile GetByFirebaseUserId(string firebaseUserId) //TESTED OPERATIONAL
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, FirebaseUserId, FirstName, LastName, Email, Age, Dob, DisplayName, CreateDate, IsDeleted
                          FROM UserProfile
                         WHERE FirebaseUserId = @FirebaseuserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            Age = DbUtils.GetInt(reader, "Age"),
                            Dob = DbUtils.GetDateTime(reader, "Dob"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            CreateDate = DbUtils.GetDateTime(reader, "CreateDate"),
                            IsDeleted = reader.GetBoolean(reader.GetOrdinal("IsDeleted"))
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

       
        public void Add(UserProfile userProfile) //TESTED OPERATIONAL
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (FirebaseUserId, FirstName, LastName, DisplayName, Email, Age, Dob, CreateDate, IsDeleted, YearlyMaxUsed, DeductibleUsed)
                        OUTPUT INSERTED.ID
                        VALUES (@FirebaseUserId, @FirstName, @LastName, @DisplayName, 
                                @Email, @Age,  @Dob, @CreateDate, @IsDeleted, @YearlyMaxUsed, @DeductibleUsed)";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@DisplayName", userProfile.DisplayName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@Age", userProfile.Age);
                    DbUtils.AddParameter(cmd, "@Dob", userProfile.Dob);
                    DbUtils.AddParameter(cmd, "@CreateDate", userProfile.CreateDate);
                    DbUtils.AddParameter(cmd, "@IsDeleted", userProfile.IsDeleted);
                    DbUtils.AddParameter(cmd, "@YearlyMaxUsed", userProfile.YearlyMaxUsed);
                    DbUtils.AddParameter(cmd, "@DeductibleUsed", userProfile.DeductibleUsed);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public List<UserProfile> GetAll() //TESTED OPERATIONAL
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT *
                        FROM UserProfile
                    ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<UserProfile> users = new List<UserProfile>();
                        while (reader.Read())
                        {
                            UserProfile user = new UserProfile
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                Age = DbUtils.GetInt(reader, "Age"),
                                Dob = DbUtils.GetDateTime(reader, "Dob"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                CreateDate = DbUtils.GetDateTime(reader, "CreateDate"),
                                IsDeleted = reader.GetBoolean(reader.GetOrdinal("IsDeleted"))
                            };
                            users.Add(user);
                        }
                        return users;
                    }
                }
            }
        }
        
        public UserProfile GetUserById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT *
                            FROM UserProfile
                            WHERE UserProfile.Id = @id
                    ";
                    cmd.Parameters.AddWithValue("@id", id);

                    UserProfile userProfile = null;
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            Age = DbUtils.GetInt(reader, "Age"),
                            Dob = DbUtils.GetDateTime(reader, "Dob"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            CreateDate = DbUtils.GetDateTime(reader, "CreateDate"),
                            IsDeleted = reader.GetBoolean(reader.GetOrdinal("IsDeleted"))
                        };
                    }
                    reader.Close();
                    return userProfile;
                }
            }
        } //TESTED OPERATIONAL
    }
 
};
