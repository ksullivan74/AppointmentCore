using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;

namespace Appointment_Core.Models
{
    public class Dentist
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Specialty { get; set; }
        public Boolean IsDeleted { get; set; }

    }
}