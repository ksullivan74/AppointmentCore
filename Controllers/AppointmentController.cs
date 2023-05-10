using Appointment_Core.Models;
using Appointment_Core.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;

namespace Appointment_Core.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly IAppointmentRepository _AppointmentRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public AppointmentController(IAppointmentRepository appointmentRepository, IUserProfileRepository userProfileRepository)
        {
            _AppointmentRepository = appointmentRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult GetAllAppointments()
        {
            UserProfile user = GetCurrentUserProfile();
            var id = user.Id;
            List<Appointment> appointments = _AppointmentRepository.GetAll(id);
            return Ok(appointments);
        }

        [HttpGet("AppointmentDetails/{id}")]
        public IActionResult GetAppointment(int id) {

            var appointment = _AppointmentRepository.GetById(id);
            if (appointment == null)
            {
                return NotFound();
            }
            return Ok(appointment);
        }


        [HttpPost]
        public IActionResult AddAppointment(Appointment appointment)
        {
            UserProfile user = GetCurrentUserProfile();
            appointment.UserProfileId = user.Id;
            appointment.IsDeleted = false;
            int appointmentId = _AppointmentRepository.Add(appointment);
            foreach (Insurance insurance in appointment.InsuranceList)
            {
                var insuranceAppointment = new InsuranceAppointment();
                insuranceAppointment.AppointmentId = appointmentId;
                insuranceAppointment.InsuranceId = insurance.InsuranceId;
                insuranceAppointment.InsuranceTypeId = insurance.IsPrimary;
                _AppointmentRepository.AddInsuranceAppointment(insuranceAppointment);
            }
            return Ok();
        }

        [HttpPut("UpdateAppointmentDetails/{id}")]
        public IActionResult UpdateAppointment(Appointment appointment, int id)
        {
            _AppointmentRepository.Update(appointment, id);
            foreach (Insurance insurance in appointment.InsuranceList)
            {
                var insuranceAppointment = new InsuranceAppointment();
                insuranceAppointment.InsuranceId = insurance.InsuranceId;
                insuranceAppointment.InsuranceTypeId = insurance.IsPrimary;
                _AppointmentRepository.UpdateInsuranceAppointment(insuranceAppointment, id);
            }

            return Ok();
        }

        [HttpGet("InsuranceTypes")]
        public IActionResult GetAllInsuranceTypes()
        {
            List<InsuranceType> insuranceTypes = _AppointmentRepository.GetAllInsuraceTypes();
            return Ok(insuranceTypes);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteAppointment(int id)
        {
            _AppointmentRepository.Delete(id);
            return Ok();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

    }
}
