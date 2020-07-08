using ISchool.Domain.Core.Bus;
using ISchool.Infra.Bus;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Serilog;
using System;

namespace ISchool.Infra.IoC
{
    public class DependencyContainer
    {
        public static void RegisterServices(IServiceCollection services)
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
            
            //Domain Commands

            //Application Services
            
            //Data

            Log.Information("Registration Completed");
        }
    }
}
