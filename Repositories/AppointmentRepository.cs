using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.Collections.Generic;
using Appointment_Core.Models;
using Appointment_Core.Utils;
using Appointment_Core.Repositories;
using System.Linq;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Hosting;

namespace Appointment_Core.Repositories
{
    public class AppointmentRepository : BaseRepository, IAppointmentRepository
    {
        public AppointmentRepository(IConfiguration configuration) : base(configuration) { }
        public List<Appointment> GetAll()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                      SELECT Appointment.Id AS AppId, Appointment.AppointmentDate, Appointment.AppointmentCost, Appointment.DentistId, Appointment.UserProfileId AS ApptuserId, Appointment.IsDeleted,

                        UserProfile.FirstName, UserProfile.LastName, UserProfile.DeductibleUsed, UserProfile.YearlyMaxUsed,

                        Dentist.[Name] AS DentistName,

                        Insurance.Id AS InsuranceObjectId, Insurance.InsuranceName, Insurance.YearlyMax ,Insurance.Deductible ,Insurance.PreventativeCoveragePercent,

                        InsuranceType.[type]

                        FROM Appointment
                        JOIN UserProfile ON UserProfile.Id = Appointment.UserProfileId
                        LEFT JOIN Dentist ON Appointment.DentistId = Dentist.Id
                        LEFT JOIN InsuranceAppointment ON Appointment.Id = InsuranceAppointment.AppointmentId
                        LEFT JOIN Insurance on Insurance.Id = InsuranceAppointment.InsuranceId
                        LEFT JOIN InsuranceType on InsuranceType.id = InsuranceAppointment.InsuranceTypeId
                    ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var appointments = new List<Appointment>();
                        while (reader.Read())
                        {
                            var apptId = DbUtils.GetInt(reader, "AppId");

                            var existingAppointment = appointments.FirstOrDefault(p => p.Id == apptId);
                            if (existingAppointment == null)
                            {
                                existingAppointment = new Appointment()
                                {
                                    Id = DbUtils.GetInt(reader, "AppId"),
                                    AppointmentDate = DbUtils.GetDateTime(reader, "AppointmentDate"),
                                    AppointmentCost = reader.GetDecimal(reader.GetOrdinal("AppointmentCost")),
                                    DentistId = DbUtils.GetInt(reader, "DentistId"),
                                    UserProfileId = DbUtils.GetInt(reader, "ApptuserId"),
                                    IsDeleted = reader.GetBoolean(reader.GetOrdinal("IsDeleted")),
                                    Dentist = new Dentist
                                    {
                                        Name = DbUtils.GetString(reader, "DentistName"),
                                    },
                                    UserProfile = new UserProfile
                                    {
                                        FirstName = DbUtils.GetString(reader, "FirstName"),
                                        LastName = DbUtils.GetString(reader, "LastName"),
                                        DeductibleUsed = reader.GetDecimal(reader.GetOrdinal("DeductibleUsed")),
                                        YearlyMaxUsed = reader.GetDecimal(reader.GetOrdinal("YearlyMaxUsed")),
                                    },
                                    Insurances = new List<Insurance>(),
                                    InsuranceTypes = new List<InsuranceType>()

                                };
                                appointments.Add(existingAppointment);
                            }
                            if (DbUtils.IsNotDbNull(reader, "InsuranceObjectId"))
                            {
                                existingAppointment.Insurances.Add(new Insurance()
                                {
                                    Id = DbUtils.GetInt(reader,"InsuranceObjectId"),
                                    InsuranceName = DbUtils.GetString(reader,"InsuranceName"),
                                    YearlyMax = DbUtils.GetInt(reader, "YearlyMax"),
                                    PreventativeCoveragePercent = reader.GetDecimal(reader.GetOrdinal("PreventativeCoveragePercent")),
                                    Deductible = DbUtils.GetInt(reader, "Deductible"),
                                    InsuranceType = new InsuranceType
                                    {
                                        Type = DbUtils.GetString(reader, "Type")
                                    }

                                });
                            }
                        }
                        return appointments;
                        
                    }
                }
            }
        }
        public Appointment GetById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                      SELECT Appointment.Id AS AppId, Appointment.AppointmentDate, Appointment.AppointmentCost, Appointment.DentistId, Appointment.UserProfileId AS ApptuserId, Appointment.IsDeleted,

                        UserProfile.FirstName, UserProfile.LastName, UserProfile.DeductibleUsed, UserProfile.YearlyMaxUsed,

                        Dentist.[Name] AS DentistName,

                        Insurance.Id AS InsuranceObjectId, Insurance.InsuranceName, Insurance.YearlyMax ,Insurance.Deductible ,Insurance.PreventativeCoveragePercent,

                        InsuranceType.[type]

                        FROM Appointment

                        JOIN UserProfile ON UserProfile.Id = Appointment.UserProfileId
                        LEFT JOIN Dentist ON Appointment.DentistId = Dentist.Id
                        LEFT JOIN InsuranceAppointment ON Appointment.Id = InsuranceAppointment.AppointmentId
                        LEFT JOIN Insurance on Insurance.Id = InsuranceAppointment.InsuranceId
                        LEFT JOIN InsuranceType on InsuranceType.id = InsuranceAppointment.InsuranceTypeId

                        WHERE Appointment.Id = @id
                    ";
                    cmd.Parameters.AddWithValue("@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        Appointment appointment = null;
                        while (reader.Read())
                        {
                            if (appointment == null)
                            {
                                appointment = new Appointment()
                                {
                                    Id = id,
                                    AppointmentDate = DbUtils.GetDateTime(reader, "AppointmentDate"),
                                    AppointmentCost = reader.GetDecimal(reader.GetOrdinal("AppointmentCost")),
                                    DentistId = DbUtils.GetInt(reader, "DentistId"),
                                    UserProfileId = DbUtils.GetInt(reader, "ApptuserId"),
                                    IsDeleted = reader.GetBoolean(reader.GetOrdinal("IsDeleted")),
                                    Dentist = new Dentist
                                    {
                                        Name = DbUtils.GetString(reader, "DentistName"),
                                    },
                                    UserProfile = new UserProfile
                                    {
                                        FirstName = DbUtils.GetString(reader, "FirstName"),
                                        LastName = DbUtils.GetString(reader, "LastName"),
                                        DeductibleUsed = reader.GetDecimal(reader.GetOrdinal("DeductibleUsed")),
                                        YearlyMaxUsed = reader.GetDecimal(reader.GetOrdinal("YearlyMaxUsed")),
                                    },
                                    Insurances = new List<Insurance>(),
                                    InsuranceTypes = new List<InsuranceType>()

                                };
                            }
                            if (DbUtils.IsNotDbNull(reader, "InsuranceObjectId"))
                            {
                                appointment.Insurances.Add(new Insurance()
                                {
                                    Id = DbUtils.GetInt(reader, "InsuranceObjectId"),
                                    InsuranceName = DbUtils.GetString(reader, "InsuranceName"),
                                    YearlyMax = DbUtils.GetInt(reader, "YearlyMax"),
                                    PreventativeCoveragePercent = reader.GetDecimal(reader.GetOrdinal("PreventativeCoveragePercent")),
                                    Deductible = DbUtils.GetInt(reader, "Deductible"),
                                    InsuranceType = new InsuranceType
                                    {
                                        Type = DbUtils.GetString(reader, "Type")
                                    }

                                });
                            }
                        }
                        return appointment;

                    }
                }
            }
        }
        public int Add(Appointment appointment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Appointment 
                        (AppointmentDate, AppointmentCost, DentistId, UserProfileId, IsDeleted)
                        OUTPUT INSERTED.ID
                        VALUES (
                            @AppointmentDate, @AppointmentCost, @DentistId, @UserProfileId, @IsDeleted
                        )";
                    DbUtils.AddParameter(cmd, "@AppointmentDate", appointment.AppointmentDate);
                    DbUtils.AddParameter(cmd, "@AppointmentCost", appointment.AppointmentCost);
                    DbUtils.AddParameter(cmd, "@DentistId", appointment.DentistId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", appointment.UserProfileId);
                    DbUtils.AddParameter(cmd, "@IsDeleted", appointment.IsDeleted);

                    appointment.Id = (int)cmd.ExecuteScalar();
                }
                return appointment.Id;
            }
        }

        public void AddInsuranceAppointment(InsuranceAppointment insuranceAppointment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO InsuranceAppointment 
                        (AppointmentId, InsuranceId, InsuranceTypeId)
                        OUTPUT INSERTED.ID
                        VALUES (@AppointmentId, @InsuranceId, @InsuranceTypeId)
                        ";
                    DbUtils.AddParameter(cmd, "@AppointmentId", insuranceAppointment.AppointmentId);
                    DbUtils.AddParameter(cmd, "@InsuranceId", insuranceAppointment.InsuranceId);
                    DbUtils.AddParameter(cmd, "@InsuranceTypeId", insuranceAppointment.InsuranceTypeId);

                   insuranceAppointment.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Delete(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @" DELETE FROM Post WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void Update(Appointment appointment)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Appointment
                                    SET 
                                        AppointmentDate = @AppointmentDate,
                                        AppointmentCost = @AppointmentCost,
                                        DentistId = @DentistId,
                                        UserProfileId = @UserProfileId,
                                        UserProfileId = @userProfileId,
                                        IsDeleted = @IsDeleted,
                                    WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@AppointmentDate", appointment.AppointmentDate);
                    DbUtils.AddParameter(cmd, "@AppointmentCost", appointment.AppointmentCost);
                    DbUtils.AddParameter(cmd, "@DentistId", appointment.DentistId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", appointment.UserProfileId);
                    DbUtils.AddParameter(cmd, "@IsDeleted", appointment.IsDeleted);
                    cmd.Parameters.AddWithValue("@id", appointment.Id);


                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}