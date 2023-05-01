USE [master]
GO

IF db_id('AppointmentCore') IS NOT NULL
BEGIN
  ALTER DATABASE [AppointmentCore] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
  DROP DATABASE [AppointmentCore]
END
GO

CREATE DATABASE [AppointmentCore]
GO

USE [AppointmentCore]
GO
 
--------------------------------------------------------------------------- 

CREATE TABLE [Insurance] (
  [Id] INT PRIMARY KEY IDENTITY(1, 1),
  [InsuranceName] VARCHAR(255) NOT NULL,
  [GroupName] VARCHAR(255) NOT NULL,
  [GroupNumber] VARCHAR(255) NOT NULL,
  [YearlyMax] INT NOT NULL,
  [PreventativeCoveragePercent] DECIMAL(5,2) NOT NULL,
  [BasicCoveragePercent] DECIMAL(5,2) NOT NULL,
  [MajorCoveragePercent] DECIMAL(5,2) NOT NULL,
  [Deductible] INT NOT NULL,
  [DeductibleUsed] DECIMAL NOT NULL,
  [YearlyMaxUsed] DECIMAL NOT NULL,
  [UserId] INT NOT NULL,
  [IsActive] BIT NOT NULL
)
GO

CREATE TABLE [Dentist] (
  [Id] INT PRIMARY KEY IDENTITY(1, 1),
  [Name] VARCHAR(255) NOT NULL,
  [Specialty] VARCHAR(255),
  [IsActive] BIT NOT NULL
)
GO

CREATE TABLE [Appointment] (
  [Id] INT PRIMARY KEY IDENTITY(1, 1),
  [AppointmentDate] DATETIME NOT NULL,
  [AppointmentCost] DECIMAL NOT NULL,
  [DentistId] INT,
  [UserId] INT NOT NULL,
  [IsDeleted] BIT NOT NULL
)
GO

CREATE TABLE [User] (
  [Id] INT PRIMARY KEY IDENTITY(1, 1),
  [FirebaseUserId] VARCHAR(255) NOT NULL,
  [FirstName] VARCHAR(255) NOT NULL,
  [LastName] VARCHAR(255) NOT NULL,
  [Email] VARCHAR(255) NOT NULL,
  [Age] INT NOT NULL,
  [Dob] DATE NOT NULL,
  [DisplayName] VARCHAR(255) NOT NULL,
  [CreateDate] DATETIME NOT NULL,
  [IsActive] BIT
)
GO

CREATE TABLE [InsuranceAppointment] (
  [Id] INT PRIMARY KEY IDENTITY(1, 1),
  [AppointmentId] INT NOT NULL,
  [InsuranceId] INT,
  [InsuranceTypeId] INT
)
GO

CREATE TABLE [InsuranceType] (
  [id] INT PRIMARY KEY IDENTITY(1, 1),
  [type] VARCHAR(255) NOT NULL
)
GO

ALTER TABLE [Appointment] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [InsuranceAppointment] ADD FOREIGN KEY ([InsuranceTypeId]) REFERENCES [InsuranceType] ([id])
GO

ALTER TABLE [InsuranceAppointment] ADD FOREIGN KEY ([InsuranceId]) REFERENCES [Insurance] ([Id])
GO

ALTER TABLE [InsuranceAppointment] ADD FOREIGN KEY ([AppointmentId]) REFERENCES [Appointment] ([Id])
GO

ALTER TABLE [Appointment] ADD FOREIGN KEY ([DentistId]) REFERENCES [Dentist] ([Id])
GO

ALTER TABLE [Insurance] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO