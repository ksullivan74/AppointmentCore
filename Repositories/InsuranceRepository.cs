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

        public Insurance GetById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                      SELECT *
                        FROM Insurance
                        WHERE Insurance.Id = @id
                    ";
                    cmd.Parameters.AddWithValue("@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        Insurance insurance = null;
                        while (reader.Read())
                        {
                            if (insurance == null)
                            {
                                insurance = new Insurance()
                                {
                                    Id = id,
                                    InsuranceName = DbUtils.GetString(reader, "InsuranceName"),
                                    GroupName = DbUtils.GetString(reader, "GroupName"),
                                    GroupNumber = DbUtils.GetString(reader, "GroupNumber"),
                                    YearlyMax = DbUtils.GetInt(reader,"YearlyMax"),
                                    PreventativeCoveragePercent = reader.GetDecimal(reader.GetOrdinal("PreventativeCoveragePercent")),
                                    BasicCoveragePercent = reader.GetDecimal(reader.GetOrdinal("BasicCoveragePercent")),
                                    MajorCoveragePercent = reader.GetDecimal(reader.GetOrdinal("MajorCoveragePercent")),
                                    Deductible = DbUtils.GetInt(reader,"Deductible"),
                                    IsDeleted = reader.GetBoolean(reader.GetOrdinal("IsDeleted"))

                                };
                            }
                        }
                        return insurance;

                    }
                }
            }
        }

        public void Add(Insurance insurance)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Insurance (InsuranceName, GroupName, GroupNumber, YearlyMax, PreventativeCoveragePercent, BasicCoveragePercent, MajorCoveragePercent, Deductible, IsDeleted)
                        OUTPUT INSERTED.ID
                        VALUES (@InsuranceName, @GroupName, @GroupNumber, @YearlyMax, @PreventativeCoveragePercent, @BasicCoveragePercent, @MajorCoveragePercent, @Deductible, @IsDeleted)";

                    DbUtils.AddParameter(cmd, "@InsuranceName", insurance.InsuranceName);
                    DbUtils.AddParameter(cmd, "@GroupName", insurance.GroupName);
                    DbUtils.AddParameter(cmd, "@GroupNumber", insurance.GroupNumber);
                    DbUtils.AddParameter(cmd, "@YearlyMax", insurance.YearlyMax);
                    DbUtils.AddParameter(cmd, "@PreventativeCoveragePercent", insurance.PreventativeCoveragePercent);
                    DbUtils.AddParameter(cmd, "@BasicCoveragePercent", insurance.BasicCoveragePercent);
                    DbUtils.AddParameter(cmd, "@MajorCoveragePercent", insurance.MajorCoveragePercent);
                    DbUtils.AddParameter(cmd, "@Deductible", insurance.Deductible);
                    DbUtils.AddParameter(cmd, "@IsDeleted", insurance.IsDeleted);
                    insurance.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Insurance insurance, int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Insurance
                                    SET 
                                        YearlyMax = @YearlyMax,
                                        GroupName = @GroupName,
                                        GroupNumber = @GroupNumber,
                                        PreventativeCoveragePercent = @PreventativeCoveragePercent
                                    WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@YearlyMax", insurance.YearlyMax);
                    DbUtils.AddParameter(cmd, "@GroupName", insurance.GroupName);
                    DbUtils.AddParameter(cmd, "@GroupNumber", insurance.GroupNumber);
                    DbUtils.AddParameter(cmd, "@PreventativeCoveragePercent", insurance.PreventativeCoveragePercent);
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
