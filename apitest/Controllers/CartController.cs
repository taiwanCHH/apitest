using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using apitest.Data;
using apitest.Models;

namespace apitest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly EcDbContext _context;

        public CartController(EcDbContext context)
        {
            _context = context;
        }

        // GET: api/Cart
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cart>>> GetCart()
        {
            var claims = HttpContext.User.Claims;
            var userId = claims.FirstOrDefault(x => x.Type == "Id")?.Value;
            return await _context.Carts
                .Where(b => b.UserId==userId)
                .ToListAsync();
        }

        // GET: api/AddCart/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpGet("{id}")]
        public async Task<ActionResult<Cart>> AddCart(int productId)
        {
            var claims = HttpContext.User.Claims;
            var userId = claims.FirstOrDefault(x => x.Type == "Id")?.Value;
            var cart = new Cart() {UserId = userId, ProductId = productId};
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCart", new { id = cart.Id }, cart);
        }

        // DELETE: api/Cart/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCart(int productId)
        {
            var claims = HttpContext.User.Claims;
            var userId = claims.FirstOrDefault(x => x.Type == "Id")?.Value;
            var cart = await _context.Carts.FirstOrDefaultAsync(c => c.UserId==userId &&c.ProductId==productId );
            if (cart == null)
            {
                return NotFound();
            }

            _context.Carts.Remove(cart);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CartExists(int id)
        {
            return _context.Carts.Any(e => e.Id == id);
        }
    }
}
