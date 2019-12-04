using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;
using TheaterAcademie.Models;

namespace TheaterAcademie
{
    public class NewsMessagesController : Controller
    {
        private readonly TheaterAcademieContext _context;
		private readonly IStringLocalizer<NewsMessagesController> _localizer;

        public NewsMessagesController(TheaterAcademieContext context, IStringLocalizer<NewsMessagesController> localizer)
        {
            _context = context;
			_localizer = localizer;
        }

        // GET: NewsMessages
        public async Task<IActionResult> Index()
        {
			ViewData["noNewsMessage"] = _localizer["NoMessages"];
            return View(await _context.NewsMessage.ToListAsync());
        }

		// GET: NewsMessages/NoMessages
		public IActionResult NoMessages()
		{
			//var test = _localizer.GetAllStrings();
			ViewData["noNewsMessage"] = _localizer["NoMessages"];
			return View("Index", new List<NewsMessage>());
		}

        // GET: NewsMessages/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var newsMessage = await _context.NewsMessage
                .FirstOrDefaultAsync(m => m.Id == id);
            if (newsMessage == null)
            {
                return NotFound();
            }

            return View(newsMessage);
        }

		// GET: NewsMessages/Create
		[Authorize]
		public IActionResult Create()
        {
            return View();
        }

		// POST: NewsMessages/Create
		// To protect from overposting attacks, please enable the specific properties you want to bind to, for 
		// more details see http://go.microsoft.com/fwlink/?LinkId=317598.
		[Authorize]
		[HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Title,Message,Date")] NewsMessage newsMessage)
        {
            if (ModelState.IsValid)
            {
                _context.Add(newsMessage);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Details), new { id=newsMessage.Id });
            }
            return View(newsMessage);
        }


		// GET: NewsMessages/Edit/5
		[Authorize]
		public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var newsMessage = await _context.NewsMessage.FindAsync(id);
            if (newsMessage == null)
            {
                return NotFound();
            }
            return View(newsMessage);
        }


		// POST: NewsMessages/Edit/5
		// To protect from overposting attacks, please enable the specific properties you want to bind to, for 
		// more details see http://go.microsoft.com/fwlink/?LinkId=317598.
		[Authorize]
		[HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int? id, [Bind("Id,Title,Message,Date")] NewsMessage newsMessage)
        {
            if (id != newsMessage.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(newsMessage);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!NewsMessageExists(newsMessage.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
				return RedirectToAction(nameof(Details), new { id = newsMessage.Id });
			}
            return View(newsMessage);
        }

		// GET: NewsMessages/Delete/5
		[Authorize]
		public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var newsMessage = await _context.NewsMessage
                .FirstOrDefaultAsync(m => m.Id == id);
            if (newsMessage == null)
            {
                return NotFound();
            }

            return View(newsMessage);
        }

		// POST: NewsMessages/Delete/5
		[Authorize]
		[HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int? id)
        {
            var newsMessage = await _context.NewsMessage.FindAsync(id);
            _context.NewsMessage.Remove(newsMessage);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool NewsMessageExists(int? id)
        {
            return _context.NewsMessage.Any(e => e.Id == id);
        }
    }
}
