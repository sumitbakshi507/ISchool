using ISchool.AuthSvc.Application.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ISchool.AuthSvc.Application.Contracts
{
    public interface IAuthService
    {
        Task<AuthResponse> Login(AuthRequest authRequest);
        Task<IList<string>> GetAuthorizedMenus(string role);
    }
}
