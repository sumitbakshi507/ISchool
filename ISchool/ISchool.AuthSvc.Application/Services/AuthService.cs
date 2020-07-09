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

        private const int MAX_SESSION_MIN = 20;

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
            var fullName = login.FirstName + " " + (!String.IsNullOrEmpty(login.MiddleName) ? login.MiddleName + " " : "") + login.LastName;
            var token = this.GenerateToken(login, out expireDate, fullName);
            var authResponse = new AuthResponse() { 
                Email = login.Email,
                FullName = fullName, 
                idToken = token,
                localId = login.Id.ToString(),
                Mobile = "",
                expiresIn = expireDate.Subtract(DateTime.Now).Milliseconds,
                Role = "Web"
            };

            return authResponse;
        }

        private string GenerateToken(Login user, out DateTime expireDate, string fullName)
        {
            expireDate = DateTime.Now.AddMinutes(MAX_SESSION_MIN);
            var mySecret = "2b357e9e-eb54-4ba1-973a-e5078dfad90b";
            var mySecurityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(mySecret));
            mySecurityKey.KeyId = mySecret;
            var myIssuer = "ISchoolSomething";
            var myAudience = "ISchoolUsers";

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, fullName),
                    new Claim(ClaimTypes.Email, user.Email)
                }),
                Expires = expireDate,
                Issuer = myIssuer,
                Audience = myAudience,
                IssuedAt = DateTime.Now, 
                SigningCredentials = new SigningCredentials(mySecurityKey, SecurityAlgorithms.HmacSha256Signature)
            };
            try
            {
                var token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
            }
            catch (Exception ex) {
                Log.Error(ex.Message);
                return "TokenError";
            }
        }
    }
}
