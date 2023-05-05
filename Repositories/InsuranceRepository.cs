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
    public class InsuranceRepository : BaseRepository, IInsuranceRepository
    {
        public InsuranceRepository(IConfiguration configuration) : base(configuration) { }
        public List<Insurance> GetAll()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                      SELECT *
                        FROM Insurance
                    ";
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var insurances = new List<Insurance>();
                        while (reader.Read())
                        {
                            {
                                Insurance insurance = new Insurance()
                                {
                                    Id = DbUtils.GetInt(reader, "Id"),
                                    InsuranceName = DbUtils.GetString(reader, "InsuranceName"),
                                    GroupName = reader.GetString(reader.GetOrdinal("GroupName")),
                                    GroupNumber = DbUtils.GetString(reader, "GroupNumber"),
                                    YearlyMax = DbUtils.GetInt(reader, "YearlyMax"),
                                    PreventativeCoveragePercent = reader.GetDecimal(reader.GetOrdinal("PreventativeCoveragePercent")),
                                    BasicCoveragePercent = reader.GetDecimal(reader.GetOrdinal("BasicCoveragePercent")),
                                    MajorCoveragePercent = reader.GetDecimal(reader.GetOrdinal("MajorCoveragePercent")),
                                    Deductible = DbUtils.GetInt(reader, "Deductible"),
                                    IsDeleted = reader.GetBoolean(reader.GetOrdinal("IsDeleted"))
                                };
                                insurances.Add(insurance);
                            }
                        }
                        return insurances;

                    }
                }
            }
        }

    }
}
