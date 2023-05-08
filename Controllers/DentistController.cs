using Appointment_Core.Models;
using Appointment_Core.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Appointment_Core.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DentistController : ControllerBase
    {
        private readonly IDentsitRepository _dentistRepository;
        public DentistController(IDentsitRepository dentistRepository)
        {
            _dentistRepository = dentistRepository;
        }

        [HttpGet]
        public IActionResult GetAllInsurances()
        {
            List<Dentist> dentists = _dentistRepository.GetAll();
            return Ok(dentists);
        }

    }
}
