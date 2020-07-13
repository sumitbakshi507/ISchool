using ISchool.AuthSvc.Application.Contracts;
using ISchool.AuthSvc.Application.Services;
using ISchool.AuthSvc.Data.Repository;
using ISchool.AuthSvc.Domain.CommandHandlers;
using ISchool.AuthSvc.Domain.Commands;
using ISchool.AuthSvc.Domain.Interfaces;
using ISchool.Domain.Core.Bus;
using ISchool.Infra.Bus;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Serilog;
using System;

namespace ISchool.Infra.IoC
{
    public static class DependencyContainer
    {
        public static void RegisterServices(this IServiceCollection services)
        {
            Log.Logger = new LoggerConfiguration()
            .Enrich.FromLogContext()
            .WriteTo.ColoredConsole()
            .CreateLogger();

            //Domain Bus
            services.AddSingleton<IEventBus, ISchoolBus>(sp =>
            {
                var scopeFactory = sp.GetRequiredService<IServiceScopeFactory>();
                return new ISchoolBus(sp.GetService<IMediator>(), scopeFactory);
            });

            //Subscriptions

            //Domain Events
            services.AddTransient<IRequestHandler<CreateNotificationCommand, bool>, CreateNotificationCommandHandler>();

            //Domain Commands

            //Application Services
            services.AddTransient<IAuthService, AuthService>();

            //Data
            services.AddTransient<IAuthRepository, AuthRepository>();

            Log.Information("Registration Completed");
        }
    }
}
