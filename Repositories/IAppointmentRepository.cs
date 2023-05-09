using Appointment_Core.Models;
using System.Collections.Generic;

namespace Appointment_Core.Repositories
{
    public interface IAppointmentRepository
    {
        List<Appointment> GetAll(int id);
        Appointment GetById(int id);
        int Add(Appointment appointment);
        void Delete(int id);
        void Update(Appointment appointment, int id);
        void AddInsuranceAppointment(InsuranceAppointment insuranceAppointment);
        void UpdateInsuranceAppointment(InsuranceAppointment insuranceAppointment, int id);
        public List<InsuranceType> GetAllInsuraceTypes();
    }
}