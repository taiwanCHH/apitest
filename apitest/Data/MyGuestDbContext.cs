using System;
using apitest.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace apitest.Data
{
    public partial class MyGuestDbContext : IdentityDbContext
    {
        public MyGuestDbContext()
        {
        }

        public MyGuestDbContext(DbContextOptions<ApiDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<MyGuest> MyGuests { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySql("server=192.168.50.248;port=3307;database=maria;user=maria;password=test123", Microsoft.EntityFrameworkCore.ServerVersion.FromString("10.3.7-mariadb"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MyGuest>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnType("int(6) unsigned")
                    .HasColumnName("id");

                entity.Property(e => e.Email)
                    .HasColumnType("varchar(50)")
                    .HasColumnName("email")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnType("varchar(30)")
                    .HasColumnName("name")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.RegDate)
                    .HasColumnType("timestamp")
                    .ValueGeneratedOnAddOrUpdate()
                    .HasColumnName("reg_date")
                    .HasDefaultValueSql("current_timestamp()");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
