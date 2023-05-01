using System.ComponentModel.DataAnnotations;

namespace Appointment_Core.Models
{
    public class UserType
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(20)]
        public string Type { get; set; }

        public static int ADMIN_ID => 1;
        public static int IBV_ID => 2;
        public static int FrontDesk_ID => 3;
    }
}