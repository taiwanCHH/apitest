using System.ComponentModel.DataAnnotations;

namespace apitest.Models.DTOs.Requests
{
    public class UserPasswordDto
    {
        [Required]
        public string CurrentPassword { get; set; }
        [Required]
        public string NewPassword { get; set; }
        
    }
}