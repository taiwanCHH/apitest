using System.ComponentModel.DataAnnotations;

namespace shop.Models.DTOs.Requests
{
    public class UserPasswordDto
    {
        [Required]
        public string CurrentPassword { get; set; }
        [Required]
        public string NewPassword { get; set; }
        
    }
}