using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using apitest.Data;
using apitest.Models;
using apitest.Models.DTOs.Responses;

namespace apitest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly EcDbContext _context;
        private readonly ProductController _productController;

        public CartController(EcDbContext context, ProductController productController)
        {
            _context = context;
            _productController = productController;
        }

        // GET: api/Cart
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetCart()
        {
            var claims = HttpContext.User.Claims;
            var tokenId = claims.FirstOrDefault(x => x.Type == "Id")?.Value;

            return await _context.Carts.Join(
                    _context.Products,
                    cart => cart.Id,
                    product => product.Id,
                    (carts, products) => new
                    {
                        userid = carts.UserId,
                        Products = products
                    })
                .Where(x => x.userid == tokenId)
                .Select(p => p.Products)
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
            var count = await _context.SaveChangesAsync();
            return Ok(new BaseResult {Success = count == 1});
        }

        // DELETE: api/Cart/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCart(int productId)
        {
            var claims = HttpContext.User.Claims;
            var userId = claims.FirstOrDefault(x => x.Type == "Id")?.Value;
            var cart = await _context.Carts.FirstOrDefaultAsync(c => c.UserId == userId && c.ProductId == productId);
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