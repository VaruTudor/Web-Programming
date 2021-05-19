using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Lab10_FILES.Data;
using Lab10_FILES.Models;
using Microsoft.AspNetCore.Http;

namespace Lab10_FILES.Pages_Books
{
    public class CreateModel : PageModel
    {
        private readonly Lab10_FILES.Data.BooksContext _context;

        public CreateModel(Lab10_FILES.Data.BooksContext context)
        {
            _context = context;
        }

        public IActionResult OnGet()
        {
            if (HttpContext.Session.GetString(Configurator.USERNAME) == null)
            {
                ModelState.AddModelError("NotLoggedIn", "You must log in to see the books");
            }

            return Page();
        }

        [BindProperty] public Book Book { get; set; }

        // To protect from overposting attacks, see https://aka.ms/RazorPagesCRUD
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            if (HttpContext.Session.GetString(Configurator.USERNAME) != null)
            {
                _context.Books.Add(Book);
                await _context.SaveChangesAsync();
                return RedirectToPage("./Index");
            }
            else
            {
                ModelState.AddModelError("NotLoggedIn", "You must log in to see the books");
                return Page();
            }
        }
    }
}