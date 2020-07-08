﻿using System;
using System.Collections.Generic;
using System.Text;

namespace ISchool.AuthSvc.Application.Models
{
    public class AuthRequest
    {
        public string Email { get; set; }

        public string Password { get; set; }

        public string Organization { get; set; }

        public string Source { get; set; }
    }
}
