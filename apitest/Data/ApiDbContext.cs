using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using apitest.Models;

namespace apitest.Data
{
    public class ApiDbContext : IdentityDbContext
    {
        public virtual DbSet<MyGuest> MyGuests {get;set;}

        public ApiDbContext(DbContextOptions<ApiDbContext> options)
            : base(options)
        {
        }
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySql("server=192.168.50.248;port=3307;database=maria;user=maria;password=test123", Microsoft.EntityFrameworkCore.ServerVersion.FromString("10.3.7-mariadb"));
            }
        }
    }
}