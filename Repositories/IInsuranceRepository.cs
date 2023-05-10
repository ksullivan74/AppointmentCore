using Appointment_Core.Models;
using System.Collections.Generic;

namespace Appointment_Core.Repositories
{
    public interface IInsuranceRepository
    {
        List<Insurance> GetAll();
        Insurance GetById(int id);
        void Add(Insurance insurance);
        void Update(Insurance insurance, int id);
        void Delete(int id);
    }
}