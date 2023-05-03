using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;

namespace Appointment_Core.Models
{
    public class Insurance
    {
        public int Id { get; set; }
        public string InsuranceName { get; set; }
        public string GroupName { get; set; }
        public string GroupNumber { get; set; }
        public int YearlyMax { get; set; }
        public Decimal PreventativeCoveragePercent { get; set; }
        public Decimal BasicCoveragePercent { get; set; }
        public Decimal MajorCoveragePercent { get; set; }
        public int Deductible {get; set; }
        public Decimal DeductibleUsed { get;set; }
        public Decimal YearlyMaxUsed { get; set; }
        public int UserId { get; set; }
        public UserProfile UserProfile { get; set; }
        public Boolean IsActive { get; set; }
        public InsuranceType InsuranceType { get; set; }



    }
}