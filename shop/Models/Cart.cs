using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace shop.Models
{
    public class Cart
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int ProductId { get; set; }
    }
}