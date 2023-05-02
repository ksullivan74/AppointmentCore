using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration.UserSecrets;
using Microsoft.Identity.Client;
using System;
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
        public int UserId { get; set; }
        public UserProfile User { get; set; }
        public Boolean IsDeleted { get; set; }
        
    }
}