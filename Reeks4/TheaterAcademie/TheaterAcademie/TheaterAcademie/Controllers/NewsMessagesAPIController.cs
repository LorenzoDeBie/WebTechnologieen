using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TheaterAcademie.Models;

namespace TheaterAcademie.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
	[EnableCors("AllowAllOrigins")]
    public class NewsMessagesAPIController : ControllerBase
    {
        private readonly TheaterAcademieContext _context;

        public NewsMessagesAPIController(TheaterAcademieContext context)
        {
            _context = context;
        }

        // GET: api/NewsMessagesAPI
        [HttpGet]
        public IEnumerable<NewsMessage> GetNewsMessage()
        {
            return _context.NewsMessage;
        }

        // GET: api/NewsMessagesAPI/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetNewsMessage([FromRoute] int? id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newsMessage = await _context.NewsMessage.FindAsync(id);

            if (newsMessage == null)
            {
                return NotFound();
            }

            return Ok(newsMessage);
        }

        // PUT: api/NewsMessagesAPI/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNewsMessage([FromRoute] int? id, [FromBody] NewsMessage newsMessage)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != newsMessage.Id)
            {
                return BadRequest();
            }

            _context.Entry(newsMessage).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NewsMessageExists(id))
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

        // POST: api/NewsMessagesAPI
        [HttpPost]
        public async Task<IActionResult> PostNewsMessage([FromBody] NewsMessage newsMessage)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.NewsMessage.Add(newsMessage);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNewsMessage", new { id = newsMessage.Id }, newsMessage);
        }

        // DELETE: api/NewsMessagesAPI/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNewsMessage([FromRoute] int? id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newsMessage = await _context.NewsMessage.FindAsync(id);
            if (newsMessage == null)
            {
                return NotFound();
            }

            _context.NewsMessage.Remove(newsMessage);
            await _context.SaveChangesAsync();

            return Ok(newsMessage);
        }

        private bool NewsMessageExists(int? id)
        {
            return _context.NewsMessage.Any(e => e.Id == id);
        }
    }
}