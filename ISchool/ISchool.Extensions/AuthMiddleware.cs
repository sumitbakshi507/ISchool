using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ISchool.Extensions
{
    public class AuthMiddleware
    {
        private readonly RequestDelegate _next;

        public AuthMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var authToken = context.Request.Headers["bearer"];
            if (!string.IsNullOrWhiteSpace(authToken))
            {
                if (!this.ValidateCurrentToken(authToken))
                {
                    throw new HttpStatusCodeException(HttpStatusCode.Unauthorized, "Invalid Token.");
                }

                // If Valid Token
                var claims = this.GetClaims(authToken);
                var nameClaim = claims.FirstOrDefault(t => t.Type == "nameid");
                var oAuthIdentity = new ClaimsIdentity(claims, "ApplicationCookie");
                var claimsPrincipal = new ClaimsPrincipal(oAuthIdentity);

                //context.Request.HttpContext.User.AddIdentity(oAuthIdentity);
                context.Request.HttpContext.User = claimsPrincipal;
            }

            // Call the next delegate/middleware in the pipeline
            await _next(context);
        }

        private bool ValidateCurrentToken(string token)
        {
            var mySecret = "2b357e9e-eb54-4ba1-973a-e5078dfad90b";//this.configuration.GetValue<string>("Apps:TokenKey");
            var mySecurityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(mySecret));

            var myIssuer = "ISchoolSomething";//this.configuration.GetValue<string>("Apps:Issuer");
            var myAudience = "ISchoolUsers";//this.configuration.GetValue<string>("Apps:Audience");

            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidIssuer = myIssuer,
                    ValidAudience = myAudience,
                    IssuerSigningKey = mySecurityKey
                }, out SecurityToken validatedToken);
            }
            catch
            {
                return false;
            }
            return true;
        }

        private string GetClaim(string token, string claimType)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var securityToken = tokenHandler.ReadToken(token) as JwtSecurityToken;

            var stringClaimValue = securityToken.Claims.FirstOrDefault(claim => claim.Type == claimType).Value;
            return stringClaimValue;
        }

        private IEnumerable<Claim> GetClaims(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var securityToken = tokenHandler.ReadToken(token) as JwtSecurityToken;

            return securityToken.Claims;
        }
    }
}
