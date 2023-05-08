using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration.UserSecrets;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;

namespace Appointment_Core.Models
{
    public class Appointment
    {
        public int Id { get; set; }
        public DateTime AppointmentDate { get; set; }

        public Decimal AppointmentCost { get; set; }
        public int DentistId { get; set; }
        public Dentist Dentist { get; set; }
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }
        public Boolean IsDeleted { get; set; }
        public List<Insurance> Insurances { get; set; }
        public List<InsuranceType> InsuranceTypes { get; set; }
        public int InsuranceId {get; set; }
        public int InsuranceTypeId { get; set; }
        public List<int> InsuranceList { get; set; }

    }
}