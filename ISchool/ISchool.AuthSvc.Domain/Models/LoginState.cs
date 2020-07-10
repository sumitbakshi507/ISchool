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

    public enum UserRoleType
    {
        Teacher = 1,
        Student = 2,
        Head = 3,
        CenterAdmin = 98,
        Admin = 99
    }

    public static class UserRoles
    {
        public static int Admin = 99;
        public static int Teacher = 1;
        public static int Student = 2;
        public static int Head = 3;
        public static int CenterAdmin = 98;
    }
}
