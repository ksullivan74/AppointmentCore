﻿using Appointment_Core.Models;
using System.Collections.Generic;

namespace Appointment_Core.Repositories
{
    public interface IAppointmentRepository
    {
        List<Appointment> GetAll();
        Appointment GetById(int id);
        void Add(Appointment appointment);
        void Delete(int id);
        void Update(Appointment appointment);
    }
}