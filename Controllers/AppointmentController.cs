using Appointment_Core.Models;
using Appointment_Core.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Appointment_Core.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly IAppointmentRepository  _AppointmentRepository;
        public AppointmentController(IAppointmentRepository appointmentRepository)
        {
            _AppointmentRepository = appointmentRepository;
        }

        [HttpGet]
        public IActionResult GetAllAppointments()
        {
            List<Appointment> appointments = _AppointmentRepository.GetAll();
            return Ok(appointments);
        }

    }
}
