using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace ISchool.Domain.Core.Events
{
    public abstract class Message : IRequest<bool>
    {
        public string MessageType { get; protected set; }

        protected Message()
        {
            MessageType = GetType().Name;
        }

        public override string ToString()
        {
            var sb = new StringBuilder();
            char previousChar = char.MinValue; // Unicode '\0'
            foreach (char c in MessageType)
            {
                if (char.IsUpper(c))
                {
                    if (sb.Length != 0 && previousChar != ' ')
                    {
                        sb.Append('.');
                    }
                }
                sb.Append(c);
                previousChar = c;
            }

            return sb.ToString().ToLower();
        }
    }
}
