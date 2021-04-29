using System;
using shop.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace shop.Data
{
    public partial class EcDbContext : DbContext
    {
        public EcDbContext()
        {
        }

        public EcDbContext(DbContextOptions<EcDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Cart> Carts { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<UserInfo> UserInfo { get; set; }

        // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        // {
        //     if (!optionsBuilder.IsConfigured)
        //     {
        //         optionsBuilder.UseMySql("server=127.0.0.1;port=3306;database=apidb;user=apiuser;password=test111", Microsoft.EntityFrameworkCore.ServerVersion.FromString("8.0.24"));
        //     }
        // }


    }
}
