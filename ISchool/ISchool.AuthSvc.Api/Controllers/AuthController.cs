using ISchool.AuthSvc.Application.Contracts;
using ISchool.AuthSvc.Application.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;

namespace ISchool.AuthSvc.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ILogger<AuthController> _logger;

        private readonly IAuthService _authService;

        public AuthController(ILogger<AuthController> logger,
            IAuthService authService)
        {
            _logger = logger;
            _authService = authService;
            _logger.LogInformation(Thread.CurrentThread.ManagedThreadId + ". AuthController Intiated");
        }

        [HttpPost]
        [Route("Login")]
        public async Task<AuthResponse> Login(AuthRequest authRequest)
        {
            _logger.LogInformation("Login Request" + authRequest);
            return await _authService.Login(authRequest);
        }

        [HttpGet]
        [Authorize]
        [Route("AuthorizedMenus")]
        public async Task<IList<string>> GetAuthorizedMenus()
        {
            var userRole = this.Request.HttpContext.User.Claims.FirstOrDefault(t => t.Type == "role");
            _logger.LogInformation("GetAuthorizedMenus" + userRole.Value);
            return await _authService.GetAuthorizedMenus(userRole.Value);
        }
    }
}