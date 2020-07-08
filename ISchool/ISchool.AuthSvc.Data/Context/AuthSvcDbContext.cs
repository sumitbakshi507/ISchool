using ISchool.AuthSvc.Domain.Models;
using ISchool.Extensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace ISchool.AuthSvc.Data.Context
{
    public class AuthSvcDbContext : DbContext
    {
        public AuthSvcDbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.RemovePluralizingTableNameConvention();
            modelBuilder.Entity<Login>()
                .Property(s => s.CreatedDate)
                .HasDefaultValueSql("GETDATE()");
            modelBuilder.Entity<LoginLog>()
               .Property(s => s.LoginDate)
               .HasDefaultValueSql("GETDATE()");
        }

        public DbSet<Login> Logins { get; set; }

        public DbSet<LoginLog> LoginLogs { get; set; }
    }
}
