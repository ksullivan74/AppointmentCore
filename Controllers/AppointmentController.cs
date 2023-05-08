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
            List<Appointment> appointments = _AppointmentRepository.GetAll();
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
            int counter = 1;
            foreach (int insurance in appointment.InsuranceList)
            {
                InsuranceAppointment insuranceAppointment = new InsuranceAppointment();
                insuranceAppointment.AppointmentId = appointmentId;
                insuranceAppointment.InsuranceId = insurance;
                insuranceAppointment.InsuranceTypeId = counter++;
                _AppointmentRepository.AddInsuranceAppointment(insuranceAppointment);
            }
            return Ok();
        }

        [HttpPost("AppointmentDetails/{id}")]
        public IActionResult UpdateAppointment(Appointment appointment)
        {
            UserProfile user = GetCurrentUserProfile();
            appointment.UserProfileId = user.Id;
            appointment.IsDeleted = false;
            int appointmentId =  _AppointmentRepository.Add(appointment);
            int counter = 1;
            foreach ( int insurance in appointment.InsuranceList)
            {
                InsuranceAppointment insuranceAppointment = new InsuranceAppointment();
                insuranceAppointment.AppointmentId = appointmentId;
                insuranceAppointment.InsuranceId = insurance;
                insuranceAppointment.InsuranceTypeId = counter++;
               _AppointmentRepository.AddInsuranceAppointment(insuranceAppointment);
            }
            return Ok();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

    }
}
