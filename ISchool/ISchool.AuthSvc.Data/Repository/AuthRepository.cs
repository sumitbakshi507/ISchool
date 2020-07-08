using ISchool.AuthSvc.Data.Context;
using ISchool.AuthSvc.Domain.Interfaces;
using ISchool.AuthSvc.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ISchool.AuthSvc.Data.Repository
{
    public class AuthRepository : IAuthRepository
    {
        private readonly ILogger<AuthRepository> _logger;

        private readonly AuthSvcDbContext _context;

        private readonly int MAX_RETRY = 5;

        public AuthRepository(
            ILogger<AuthRepository> logger,
            AuthSvcDbContext context)
        {
            _logger = logger;
            _context = context;

            _logger.LogInformation(Thread.CurrentThread.ManagedThreadId + ". AuthRepository Initiated");
        }

        public async Task<Login> Login(string userName, string password, string organization)
        {
            var login = await this._context.Logins
                .FirstOrDefaultAsync(t => t.Email == userName
                                        && t.Organization == organization);

            if (login == null) {
                this._context.LoginLogs.Add(new LoginLog() { 
                    Email = userName,
                    LoginDate = DateTime.UtcNow,
                    LoginLogStatus = (int)LoginLogState.Error,
                    Message = "InvalidLogin"
                });
                await _context.SaveChangesAsync();
                throw new Exception("InvalidLogin");
            }
            if (login.Password != password) {
                this._context.LoginLogs.Add(new LoginLog()
                {
                    Email = userName,
                    LoginDate = DateTime.UtcNow,
                    LoginLogStatus = (int)LoginLogState.Error,
                    Message = "InvalidPassword"
                });
                login.NumberOfRetries = login.NumberOfRetries + 1;
                if (login.NumberOfRetries == MAX_RETRY) {
                    login.LoginStatus = (int)LoginState.Blocked;
                }
                _context.Logins.Update(login);

                await _context.SaveChangesAsync();
                throw new Exception("InvalidLogin");
            }
            if (login.LoginStatus == (int)LoginState.Blocked || login.LoginStatus == (int)LoginState.Closed)
            {
                this._context.LoginLogs.Add(new LoginLog()
                {
                    Email = userName,
                    LoginDate = DateTime.UtcNow,
                    LoginLogStatus = (int)LoginLogState.Error,
                    Message = "LoginState" + (login.LoginStatus == (int)LoginState.Blocked ? "Blocked" : "Closed")
                });

                await _context.SaveChangesAsync();
                throw new Exception("LoginState" + (login.LoginStatus == (int)LoginState.Blocked ? "Blocked" : "Closed"));
            }
            if (login.LoginStatus != (int)LoginState.Active)
            {
                this._context.LoginLogs.Add(new LoginLog()
                {
                    Email = userName,
                    LoginDate = DateTime.UtcNow,
                    LoginLogStatus = (int)LoginLogState.Error,
                    Message = "LoginState" + login.LoginStatus
                });
                
                await _context.SaveChangesAsync();
                throw new Exception("LoginState" + (login.LoginStatus == (int)LoginState.PendingActivation ? "PendingActivation" : "New"));
            }

            this._context.LoginLogs.Add(new LoginLog()
            {
                Email = userName,
                LoginDate = DateTime.UtcNow,
                LoginLogStatus = (int)LoginLogState.Success,
                Message = "Success"
            });

            login.NumberOfRetries = 0;
            login.LastLoginDate = DateTime.UtcNow;
            
            _context.Logins.Update(login);
            await _context.SaveChangesAsync();

            return login;
        }
    }
}
