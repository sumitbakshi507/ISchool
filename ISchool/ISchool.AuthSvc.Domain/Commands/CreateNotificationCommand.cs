using ISchool.Domain.Core.Commands;
using System;
using System.Collections.Generic;
using System.Text;

namespace ISchool.AuthSvc.Domain.Commands
{
    public class CreateNotificationCommand: Command
    {
        public string Subject { get; private set; }

        public string Body { get; private set; }

        public string To { get; private set; }

        public string AppKey { get; private set; }

        public List<string> AttachmentPath { get; private set; }

        public string AcknowledgementMessage { get; private set; }

        public CreateNotificationCommand(
            string subject,
            string body,
            string to,
            string appKey,
            List<string> attachmentPath,
            string acknowledgementMessage)
        {
            Subject = subject;
            Body = body;
            To = to;
            AppKey = appKey;
            AttachmentPath = (attachmentPath == null) ? new List<string>() : attachmentPath;
            AcknowledgementMessage = acknowledgementMessage;
        }
    }
}
