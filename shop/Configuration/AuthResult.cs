using System.Collections.Generic;

namespace shop.Configuration
{
    public class AuthResult
    {
        public string name { get; set; }
        public string Token { get; set; }
        public bool Success { get; set; }
        public List<string> Errors { get; set; }
    }
}