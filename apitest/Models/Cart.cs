using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace apitest.Models
{
    public class Cart
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int ProductId { get; set; }
    }
}