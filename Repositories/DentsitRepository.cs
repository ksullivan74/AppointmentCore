using Appointment_Core.Models;
using Appointment_Core.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace Appointment_Core.Repositories
{
    public class DentsitRepository : BaseRepository, IDentsitRepository
    {
        public DentsitRepository(IConfiguration configuration) : base(configuration) { }

        public List<Dentist> GetAll()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                      SELECT *
                        FROM Dentist
                    ";
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var dentists = new List<Dentist>();
                        while (reader.Read())
                        {
                            {
                                Dentist dentist = new Dentist()
                                {
                                    Id = DbUtils.GetInt(reader, "id"),
                                    Name = DbUtils.GetString(reader, "name"),
                                    Specialty = DbUtils.GetString(reader, "Specialty"),
                                    IsDeleted = reader.GetBoolean(reader.GetOrdinal("IsDeleted"))

                                };
                                dentists.Add(dentist);
                            }
                        }
                        return dentists;

                    }
                }
            }
        }
    }
}
