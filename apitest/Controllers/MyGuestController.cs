using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using apitest.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using apitest.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace apitest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class MyGuestController : ControllerBase
    {
        private readonly ApiDbContext _context;

        public MyGuestController(ApiDbContext context)
        {
            _context = context;
        }

        // GET: api/MyGuest
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MyGuest>>> GetMyGuests()
        {
            return await _context.MyGuests.ToListAsync();
        }

        // GET: api/MyGuest/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MyGuest>> GetMyGuest(int id)
        {
            var myGuest = await _context.MyGuests.FindAsync(id);

            if (myGuest == null)
            {
                return NotFound();
            }

            return myGuest;
        }

        // PUT: api/MyGuest/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMyGuest(int id, MyGuest myGuest)
        {
            if (id != myGuest.Id)
            {
                return BadRequest();
            }

            _context.Entry(myGuest).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MyGuestExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/MyGuest
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MyGuest>> PostMyGuest(MyGuest myGuest)
        {
            _context.MyGuests.Add(myGuest);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMyGuest", new { id = myGuest.Id }, myGuest);
        }

        // DELETE: api/MyGuest/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMyGuest(int id)
        {
            var myGuest = await _context.MyGuests.FindAsync(id);
            if (myGuest == null)
            {
                return NotFound();
            }

            _context.MyGuests.Remove(myGuest);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        

        private bool MyGuestExists(int id)
        {
            return _context.MyGuests.Any(e => e.Id == id);
        }
    }
}
