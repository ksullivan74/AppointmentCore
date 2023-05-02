using Appointment_Core.Models;
using System.Collections.Generic;

namespace Appointment_Core.Repositories
{
    public interface IAppointmentRepository
    {
        List<Appointment> GetAll();
    }
}