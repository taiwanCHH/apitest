using System;
using System.Collections.Generic;

#nullable disable

namespace apitest.Models
{
    public partial class MyGuest
    {
        public uint Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public DateTime RegDate { get; set; }
    }
}
