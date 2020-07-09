using Microsoft.VisualBasic.CompilerServices;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ISchool.AuthSvc.Domain.Models
{
    public class LoginLog
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public DateTime LoginDate { get; set; }

        public string Message { get; set; }

        public int LoginLogStatus { get; set; }
    }

    public enum LoginLogState
    { 
        Error = 1,
        Success = 2
    }
}
