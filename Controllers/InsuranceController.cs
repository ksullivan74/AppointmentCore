using Appointment_Core.Models;
using Appointment_Core.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Appointment_Core.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InsuranceController : ControllerBase
    {
        private readonly IInsuranceRepository _insuranceRepository;
        public InsuranceController(IInsuranceRepository insuranceRepository)
        {
            _insuranceRepository = insuranceRepository;
        }

        [HttpGet]
        public IActionResult GetAllInsurances() 
        {
            List<Insurance> insurances = _insuranceRepository.GetAll();
            return Ok(insurances);
        }

        [HttpGet("InsuranceDetails/{id}")]
        public IActionResult GetInsurance(int id)
        {
            Insurance insurance = _insuranceRepository.GetById(id);
            return Ok(insurance);
        }

        [HttpPost]
        public IActionResult Add(Insurance insurance)
        {
            insurance.IsDeleted = false;
            _insuranceRepository.Add(insurance);
            return Ok(insurance);
        }
    }
}
