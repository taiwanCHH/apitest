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
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace apitest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class CartController : ControllerBase
    {
        private readonly EcDbContext _context;

        public CartController(EcDbContext context)
        {
            _context = context;
        }

        // GET: api/Cart
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetCart()
        {
            var claims = HttpContext.User.Claims;
            var tokenId = claims.FirstOrDefault(x => x.Type == "Id")?.Value;

            return await _context.Products.Join(
                    _context.Carts,
                    p => p.Id,
                    c => c.ProductId,
                    (p, c) => new
                    {
                        userid = c.UserId,
                        p = p
                    })
                .Where(x => x.userid == tokenId)
                .Select(p => p.p)
                .ToListAsync();
        }

        // GET: api/Cart/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpGet("{productId}")]
        public async Task<ActionResult<Cart>> AddCart(int productId)
        {
            var claims = HttpContext.User.Claims;
            var userId = claims.FirstOrDefault(x => x.Type == "Id")?.Value;
            var cart = await _context.Carts.FirstOrDefaultAsync(c => c.UserId == userId && c.ProductId == productId);
            if (cart != null)
            {
                return Ok(new BaseResult {Success = false, message = "Already added product."});
                ;
            }

            var newCart = new Cart {UserId = userId, ProductId = productId};
            await _context.Carts.AddAsync(newCart);
            var count = await _context.SaveChangesAsync();
            return Ok(new BaseResult {Success = count == 1});
        }

        // DELETE: api/Cart/5
        [HttpDelete("{productId}")]
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