using System;
using System.Collections.Generic;
using System.Text;

namespace ISchool.AuthSvc.Domain.Models
{
    public enum LoginState
    {
        New = 0,
        PendingActivation = 1,
        Active = 2,
        Blocked = 3,
        Closed = 4
    }
}
