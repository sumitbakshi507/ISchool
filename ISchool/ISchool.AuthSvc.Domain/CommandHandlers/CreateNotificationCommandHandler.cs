using ISchool.AuthSvc.Domain.Commands;
using ISchool.AuthSvc.Domain.Events;
using ISchool.Domain.Core.Bus;
using MediatR;
using Serilog;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ISchool.AuthSvc.Domain.CommandHandlers
{
    public class CreateNotificationCommandHandler : IRequestHandler<CreateNotificationCommand, bool>
    {
        private readonly IEventBus _bus;

        public CreateNotificationCommandHandler(IEventBus bus)
        {
            _bus = bus;
        }

        public Task<bool> Handle(CreateNotificationCommand request, CancellationToken cancellationToken)
        {
            Log.Information("Handle" + request);
            _bus.Publish(new NotificationCreatedEvent(
                request.Subject, 
                request.Body,
                request.To,
                request.AppKey,
                request.AttachmentPath,
                request.AcknowledgementMessage));
            Log.Information("Handled" + request);
            return Task.FromResult(true);
        }
    }
}
