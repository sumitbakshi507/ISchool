using ISchool.AuthSvc.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ISchool.AuthSvc.Domain.Interfaces
{
    public interface IAuthRepository
    {
        Task<Login> Login(string userName, string password, string organization);
    }
}
