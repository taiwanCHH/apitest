using System.ComponentModel.DataAnnotations;

namespace apitest.Models.DTOs.Requests
{
    public class UserRegistrationDto:UserInfo
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}