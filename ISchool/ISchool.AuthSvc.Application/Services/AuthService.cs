using ISchool.AuthSvc.Application.Contracts;
using ISchool.AuthSvc.Application.Models;
using ISchool.AuthSvc.Domain.Interfaces;
using ISchool.AuthSvc.Domain.Models;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ISchool.AuthSvc.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly ILogger<AuthService> _logger;

        private readonly IAuthRepository _authRepository;

        public AuthService(ILogger<AuthService> logger, IAuthRepository authRepository) {
            _logger = logger;
            _authRepository = authRepository;
            _logger.LogInformation(Thread.CurrentThread.ManagedThreadId + ". AuthService Intiated");
        }

        public async Task<AuthResponse> Login(AuthRequest authRequest)
        {
            _logger.LogInformation("Login Request", authRequest.Email, authRequest.Organization, authRequest.Source);

            var login = await _authRepository.Login(authRequest.Email, authRequest.Password, authRequest.Organization);
            DateTime expireDate;
            var token = this.GenerateToken(login, out expireDate);
            var authResponse = new AuthResponse() { 
                Email = login.Email,
                idToken = token,
                localId = login.Id.ToString(),
                Mobile = "",
                expiresIn = expireDate.Subtract(DateTime.Now).Milliseconds,
                Role = "Web"
            };

            return authResponse;
        }

        private string GenerateToken(Login user, out DateTime expireDate)
        {
            expireDate = DateTime.Now.AddMinutes(120);
            var mySecret = "123456";
            var mySecurityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(mySecret));

            var myIssuer = "ISchoolSomething";
            var myAudience = "ISchoolUsers";

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Email.ToString()),
                    new Claim(ClaimTypes.PrimaryGroupSid, user.Organization.ToString())
                }),
                Expires = expireDate,
                Issuer = myIssuer,
                Audience = myAudience,
                SigningCredentials = new SigningCredentials(mySecurityKey, SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
