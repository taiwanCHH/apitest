using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using apitest.Data;
using apitest.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace apitest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class UserInfoController : ControllerBase
    {
        private readonly EcDbContext _context;

        public UserInfoController(EcDbContext context)
        {
            _context = context;
        }

        // GET: api/UserInfo
        [HttpGet]
        public async Task<ActionResult<UserInfo>> GetUserInfo()
        {
            var claims = HttpContext.User.Claims;
            var id = claims.FirstOrDefault(x => x.Type == "Id")?.Value;
            var userInfo = await _context.UserInfo.FirstOrDefaultAsync(info => info.UserId == id);

            if (userInfo == null)
            {
                return NotFound();
            }

            return userInfo;
        }

        // PUT: api/UserInfo/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut]
        public async Task<IActionResult> PutUserInfo([FromBody] UserInfo userInfo)
        {
            var claims = HttpContext.User.Claims;
            var id = claims.FirstOrDefault(x => x.Type == "Id")?.Value;
            var currentUserInfo = await _context.UserInfo.FirstOrDefaultAsync(info => info.UserId == id);
            currentUserInfo.UserPhone = userInfo.UserPhone;
            currentUserInfo.UserSex = userInfo.UserSex;
            currentUserInfo.UserBirthday = userInfo.UserBirthday;

            _context.Entry(currentUserInfo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserInfoExists(currentUserInfo.Id))
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

        internal async Task<int> CreatUserInfo(UserInfo userInfo)
        {
            _context.UserInfo.Add(userInfo);
        
            return await _context.SaveChangesAsync();
            ;
        }

        // DELETE: api/UserInfo/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserInfo(int id)
        {
            var claims = HttpContext.User.Claims;
            var Id = claims.FirstOrDefault(x => x.Type == "Id")?.Value;
            var userInfo = await _context.UserInfo.FirstOrDefaultAsync(info => info.UserId == Id);

            if (userInfo == null)
            {
                return NotFound();
            }

            _context.UserInfo.Remove(userInfo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserInfoExists(int id)
        {
            return _context.UserInfo.Any(e => e.Id == id);
        }
    }
}