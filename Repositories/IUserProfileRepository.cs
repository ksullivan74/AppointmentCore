using System.Collections.Generic;
using Appointment_Core.Models;

namespace Appointment_Core.Repositories
{
    public interface IUserProfileRepository
    {
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        List<UserProfile> GetAll();
        void Add(UserProfile userProfile);
        UserProfile GetUserById(int id);
    }
}