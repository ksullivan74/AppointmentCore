INSERT INTO [Insurance] ([InsuranceName], [GroupName], [GroupNumber], [YearlyMax], [PreventativeCoveragePercent], [BasicCoveragePercent], [MajorCoveragePercent], [Deductible], [DeductibleUsed], [YearlyMaxUsed], [UserId], [IsActive])
VALUES ('Blue Cross Blue Shield', 'Corporate', '12345', 3000, 80.00, 60.00, 40.00, 25, 0.00, 0.00, 1, 0),
('Aetna', 'Individual', '98765', 1500, 90.00, 70.00, 50.00, 50, 0.00, 0.00, 2, 0),
('Cigna', 'Family', '24680', 1500, 100.00, 80.00, 60.00, 25, 0.00, 0.00, 3, 0),
('UnitedHealthcare', 'Family', '13579', 1000, 100.00, 70.00, 50.00, 0, 0.00, 0.00, 4, 0);

INSERT INTO [Dentist] ([Name], [Specialty], [IsActive])
VALUES ('John Smith', 'General Dentistry', 0),
('Jane Doe', 'Pediatric Dentistry', 0),
('Mark Johnson', 'Orthodontics', 0),
('Susan Lee', 'Endodontics', 0);

INSERT INTO [User] ([FirebaseUserId], [FirstName], [LastName], [Email], [Age], [Dob], [DisplayName], [CreateDate], [IsActive])
VALUES ('abcdef123456', 'John', 'Doe', 'johndoe@gmail.com', 35, '1988-05-01', 'John Doe', GETDATE(), 0),
('ghijk789012', 'Jane', 'Smith', 'janesmith@yahoo.com', 45, '1976-12-25', 'Jane Smith', GETDATE(), 0),
('lmnop345678', 'Mike', 'Johnson', 'mikejohnson@hotmail.com', 25, '1997-07-15', 'Mike Johnson', GETDATE(), 0),
('qrstuv901234', 'Susan', 'Lee', 'susanlee@gmail.com', 40, '1981-10-10', 'Susan Lee', GETDATE(), 0);

INSERT INTO [Appointment] ([AppointmentDate], [AppointmentCost], [DentistId], [UserId], [IsDeleted])
VALUES ('2023-05-15 09:00:00', 100.00, 1, 1, 0),
('2023-06-01 10:30:00', 150.00, 2, 2, 0),
('2023-07-10 13:00:00', 200.00, 3, 3, 0),
('2023-08-05 14:30:00', 250.00, 4, 4, 0);

INSERT INTO [InsuranceType] ([type])
VALUES ('Primary'), ('Secondary');

INSERT INTO [InsuranceAppointment] ([AppointmentId], [InsuranceId], [InsuranceTypeId])
VALUES (1, 1, 1),
(2, 2, 1),
(3, 3, 1),
(4, 4, 1);