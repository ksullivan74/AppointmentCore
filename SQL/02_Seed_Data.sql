INSERT INTO [Insurance] ([InsuranceName], [GroupName], [GroupNumber], [YearlyMax], [PreventativeCoveragePercent], [BasicCoveragePercent], [MajorCoveragePercent], [Deductible], [IsDeleted])
VALUES ('Blue Cross Blue Shield', 'Corporate', '12345', 3000, 80.00, 60.00, 40.00, 25, 0),
('Aetna', 'Individual', '98765', 1500, 90.00, 70.00, 50.00, 50, 0),
('Cigna', 'Family', '24680', 1500, 100.00, 80.00, 60.00, 25, 0),
('UnitedHealthcare', 'Family', '13579', 1000, 100.00, 70.00, 50.00, 0, 0);

INSERT INTO [Dentist] ([Name], [Specialty], [IsDeleted])
VALUES ('Emily Chen', 'General Dentistry', 0),
('Javier Rodriguez', 'Pediatric Dentistry', 0),
('Sarah Patel', 'Orthodontics', 0);

INSERT INTO [UserProfile] ([FirebaseUserId], [FirstName], [LastName], [Email], [Age], [Dob], [DisplayName], [CreateDate], [IsDeleted], [YearlyMaxUsed], [DeductibleUsed])
VALUES ('YhGdTH57iYdGUiGhah8gPV3a48L2', 'John', 'Doe', 'johndoe@gmail.com', 35, '1988-05-01', 'John Doe', GETDATE(), 0, 0, 0),
('JL4NJuCCoeenjvLkHKTeA52zjQh2', 'Lee', 'Susan', 'susanlee@gmail.com', 45, '1976-12-25', 'Susan Lee', GETDATE(), 0, 1000, 50),
('qtGpSlb9WPdHA8kNpdKYVZcr8pt2', 'Mike', 'Johnson', 'mikejohnson@hotmail.com', 25, '1997-07-15', 'Mike Johnson', GETDATE(), 0, 0, 0),
('dUfJyFxu6HUHmGHfH3ecJJLgHoL2', 'Smith', 'Jane', 'janesmith@yahoo.com', 40, '1981-10-10', 'Jane Smith', GETDATE(), 0, 0, 0),
('xrhAGe5BlvarsJv35fP32Iw1Wak2', 'Test', 'Neil', 'neil@test.com', 40, '1981-10-10', 'Neil Test', GETDATE(), 0, 0, 0),
('A2MDrZkEaKUymjwZsIBE0jgOBIF3', 'Test', 'Test', 'test@test.com', 40, '1981-10-10', 'Test Test', GETDATE(), 0, 0, 0);

INSERT INTO [Appointment] ([AppointmentDate], [AppointmentCost], [DentistId], [UserProfileId], [IsDeleted])
VALUES ('2023-05-15 09:00:00', 100.00, 1, 1, 0),
('2023-06-01 10:30:00', 150.00, 2, 2, 0),
('2023-07-10 13:00:00', 200.00, 3, 3, 0),
('2023-08-05 14:30:00', 250.00, 4, 4, 0);

INSERT INTO [InsuranceType] ([type])
VALUES ('Primary'), ('Secondary');

INSERT INTO [InsuranceAppointment] ([AppointmentId], [InsuranceId], [InsuranceTypeId])
VALUES (9, 1, 1),
(9, 2, 2),
(10, 2, 1),
(10, 3, 2),
(11, 3, 1),
(12, 4, 1);