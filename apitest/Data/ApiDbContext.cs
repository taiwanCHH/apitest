using System;
using apitest.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace apitest.Data
{
    public partial class ApiDbContext : IdentityDbContext
    {
        public ApiDbContext()
        {
        }

        public ApiDbContext(DbContextOptions<ApiDbContext> options)
            : base(options)
        {
        }

        // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        // {
        //     if (!optionsBuilder.IsConfigured)
        //     {
        //         optionsBuilder.UseMySql("server=127.0.0.1;port=3306;database=apidb;user=apiuser;password=test111", Microsoft.EntityFrameworkCore.ServerVersion.FromString("8.0.24"));
        //     }
        // }
    }
}
