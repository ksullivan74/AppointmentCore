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
                        SELECT Appointment.Id AS ApptId, AppointmentDate, AppointmentCost, DentistId, UserId, IsDeleted, FirstName, LastName, [Name] AS DentistName
                            FROM Appointment
                            JOIN [User] on Appointment.UserId = [User].id
                            LEFT JOIN Dentist on Appointment.DentistId = Dentist.Id
                    ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Appointment> appointments = new List<Appointment>();
                        while (reader.Read())
                        {
                            Appointment appointment = new Appointment
                            {
                                Id = DbUtils.GetInt(reader, "ApptId"),
                                AppointmentDate = DbUtils.GetDateTime(reader,"AppointmentDate"),
                                AppointmentCost = reader.GetDecimal(reader.GetOrdinal("AppointmentCost")),
                                DentistId = DbUtils.GetInt(reader,"DentistId"),
                                UserId = DbUtils.GetInt(reader, "userId"),
                                IsDeleted = reader.GetBoolean(reader.GetOrdinal("IsDeleted")),
                                Dentist = new Dentist
                                {
                                    Name = DbUtils.GetString(reader, "DentistName"),
                                },
                                User = new UserProfile
                                {
                                    FirstName = DbUtils.GetString(reader,"FirstName"),
                                    LastName = DbUtils.GetString(reader,"LastName")
                                }

                            };
                            appointments.Add(appointment);
                        }
                        return appointments;
                    }
                }
            }
        }
    }
}