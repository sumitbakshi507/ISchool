using System;
using System.Collections.Generic;
using System.Text;

namespace ISchool.AuthSvc.Application.Models
{
    public class AuthResponse
    {
        public string Email { get; set; }

        public string localId { get; set; }

        public string Mobile { get; set; }

        public string Role { get; set; }

        public int expiresIn { get; set; }

        public string idToken { get; set; }
    }
}