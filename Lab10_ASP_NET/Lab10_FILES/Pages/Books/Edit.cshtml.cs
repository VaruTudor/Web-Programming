using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Lab10_FILES.Data;
using Lab10_FILES.Models;
using Microsoft.AspNetCore.Http;

namespace Lab10_FILES.Pages_Books
{
    public class EditModel : PageModel
    {
        private readonly Lab10_FILES.Data.BooksContext _context;

        public EditModel(Lab10_FILES.Data.BooksContext context)
        {
            _context = context;
        }

        [BindProperty]
        public Book Book { get; set; }

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (HttpContext.Session.GetString(Configurator.USERNAME) == null)
            {
                ModelState.AddModelError("NotLoggedIn", "You must log in to see the books");
            }
            else
            {
                if (HttpContext.Session.GetInt32(Configurator.IS_ADMIN) == 1)
                {
                    if (id == null)
                    {
                        return NotFound();
                    }

                    Book = await _context.Books.FirstOrDefaultAsync(m => m.Id == id);

                    if (Book == null)
                    {
                        return NotFound();
                    }
                }
                else
                {
                    ModelState.AddModelError("NotAdmin", "Only Admins can Delete!");
                    return Page();
                }
            }
            
            return Page();
        }

        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see https://aka.ms/RazorPagesCRUD.
        public async Task<IActionResult> OnPostAsync()
        {
            if (HttpContext.Session.GetString(Configurator.USERNAME) == null)
            {
                ModelState.AddModelError("NotLoggedIn", "You must log in to see the books");
                return Page();
            }
            else
            {
                if (HttpContext.Session.GetInt32(Configurator.IS_ADMIN) == 1)
                {
                    if (!ModelState.IsValid)
                    {
                        return Page();
                    }

                    _context.Attach(Book).State = EntityState.Modified;

                    try
                    {
                        await _context.SaveChangesAsync();
                    }
                    catch (DbUpdateConcurrencyException)
                    {
                        if (!BookExists(Book.Id))
                        {
                            return NotFound();
                        }
                        else
                        {
                            throw;
                        }
                    }
                }
                else
                {
                    ModelState.AddModelError("NotAdmin", "Only Admins can Delete!");
                    return Page();
                }
                
            }
            

            return RedirectToPage("./Index");
        }

        private bool BookExists(int id)
        {
            return _context.Books.Any(e => e.Id == id);
        }
    }
}
