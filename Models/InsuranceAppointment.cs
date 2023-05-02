using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;

namespace Appointment_Core.Models
{
    public class InsuranceAppointment
    {
        public int Id { get; set; }

        public int AppointmentId { get; set; }
        public int InsuranceId { get; set; }
        public int InsuranceTypeId { get; set; }
        public Appointment Appointment { get; set; }
        public Insurance Insurance { get; set; }
        public InsuranceType InsuranceType { get; set; }
    }
}
